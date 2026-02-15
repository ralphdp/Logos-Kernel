import { describe, it, expect } from "vitest";
import {
    auditEntropy,
    detectSchism,
    logosAudit,
    mapIsomorphism,
    systemStatus,
    verifyGrammar,
} from "./tools.js";

describe("logosAudit", () => {
    it("returns audit content for valid args", () => {
        const result = logosAudit({ content: "Hello world" });
        expect(result.content).toHaveLength(1);
        expect(result.content[0].type).toBe("text");
        expect(result.content[0].text).toContain("LOGOS AUDIT INITIALIZED");
        expect(result.content[0].text).toContain("Hello world");
    });

    it("uses optional context when provided", () => {
        const result = logosAudit({
            content: "x",
            context: "Software Engineering",
        });
        expect(result.content[0].text).toContain("Software Engineering");
    });

    it("throws on missing content", () => {
        expect(() => logosAudit({})).toThrow();
    });

    it("throws on empty content", () => {
        expect(() => logosAudit({ content: "" })).toThrow();
    });
});

describe("mapIsomorphism", () => {
    it("returns mapping content for valid args", () => {
        const result = mapIsomorphism({
            source: "Theology",
            target: "Computer Science",
        });
        expect(result.content[0].text).toContain("ISOMORPHIC SCAN");
        expect(result.content[0].text).toContain("Theology");
        expect(result.content[0].text).toContain("Computer Science");
    });

    it("throws on missing source or target", () => {
        expect(() => mapIsomorphism({ source: "A" })).toThrow();
        expect(() => mapIsomorphism({ target: "B" })).toThrow();
    });
});

describe("auditEntropy", () => {
    it("returns entropy metrics for valid content", () => {
        const result = auditEntropy({ content: "const x = 1;" });
        expect(result.content[0].text).toContain("PNEUMA MONITOR");
        expect(result.content[0].text).toMatch(/\d+ chars/);
        expect(result.content[0].text).toMatch(/\d+ bits/);
    });

    it("throws on missing content", () => {
        expect(() => auditEntropy({})).toThrow();
    });
});

describe("verify_grammar", () => {
    it("accepts clean code", () => {
        const result = verifyGrammar({
            code: "function foo() { return 1; }",
            language: "JavaScript",
        });
        expect(result.content[0].text).toContain("ACCEPTED");
    });

    it("rejects code with eval", () => {
        const result = verifyGrammar({
            code: "eval('x')",
            language: "JavaScript",
        });
        expect(result.content[0].text).toContain("REJECTED");
    });

    it("throws on missing code or language", () => {
        expect(() => verifyGrammar({ language: "JS" })).toThrow();
        expect(() => verifyGrammar({ code: "x" })).toThrow();
    });
});

describe("detectSchism", () => {
    it("reports unified when all nodes match", () => {
        const result = detectSchism({
            nodes: [
                { id: "a", state_hash: "abc" },
                { id: "b", state_hash: "abc" },
            ],
        });
        expect(result.content[0].text).toContain("UNIFIED");
        expect(result.content[0].text).toContain("Faithful: 2");
        expect(result.content[0].text).toContain("Heretics: 0");
    });

    it("reports schism when nodes differ", () => {
        const result = detectSchism({
            nodes: [
                { id: "a", state_hash: "abc" },
                { id: "b", state_hash: "def" },
            ],
        });
        expect(result.content[0].text).toContain("SCHISM DETECTED");
        expect(result.content[0].text).toContain("Heretics: 1");
    });

    it("uses root_hash when provided", () => {
        const result = detectSchism({
            nodes: [
                { id: "a", state_hash: "x" },
                { id: "b", state_hash: "y" },
            ],
            root_hash: "x",
        });
        expect(result.content[0].text).toContain("ROOT_AUTHORITY");
        expect(result.content[0].text).toContain("Heretics: 1");
    });

    it("handles empty nodes without throwing", () => {
        const result = detectSchism({ nodes: [] });
        expect(result.content[0].text).toContain("Total Nodes: 0");
        expect(result.content[0].text).toContain("No nodes provided");
    });

    it("throws on missing nodes", () => {
        expect(() => detectSchism({})).toThrow();
    });
});

describe("systemStatus", () => {
    it("returns heartbeat text", () => {
        const result = systemStatus();
        expect(result.content[0].text).toContain("System Heartbeat");
        expect(result.content[0].text).toContain("ACTIVE");
        expect(result.content[0].text).toContain("SATISFIED");
    });
});
