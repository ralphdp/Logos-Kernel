import { describe, it, expect } from "vitest";
import {
    REFERENCE_RESOURCES,
    getResourceByUri,
    getPrompt,
} from "./index.js";

describe("resources", () => {
    it("list returns expected URIs", () => {
        const uris = REFERENCE_RESOURCES.map((r) => r.uri);
        expect(uris).toContain("logos://reference/catechism");
        expect(uris).toContain("logos://reference/summa");
        expect(uris).toContain("logos://reference/logos-license");
        expect(REFERENCE_RESOURCES).toHaveLength(3);
    });

    it("read logos://reference/catechism returns text containing the URL", () => {
        const resource = getResourceByUri("logos://reference/catechism");
        expect(resource.text).toContain("usccb.org");
        expect(resource.uri).toBe("logos://reference/catechism");
    });

    it("read logos://reference/summa returns text containing archive.org", () => {
        const resource = getResourceByUri("logos://reference/summa");
        expect(resource.text).toContain("archive.org");
    });

    it("unknown resource URI throws", () => {
        expect(() => getResourceByUri("logos://reference/unknown")).toThrow(
            /Unknown resource/
        );
    });
});

describe("prompts", () => {
    it("list returns expected names via getPrompt", () => {
        expect(getPrompt("full_audit", { content: "x" }).messages).toHaveLength(1);
        expect(getPrompt("map_isomorphism_prompt", { source: "a", target: "b" }).messages).toHaveLength(1);
        expect(getPrompt("verify_grammar_prompt", { code: "x", language: "js" }).messages).toHaveLength(1);
    });

    it("get full_audit with content returns user message containing content", () => {
        const { messages } = getPrompt("full_audit", { content: "hello world" });
        expect(messages[0].role).toBe("user");
        expect(messages[0].content.type).toBe("text");
        expect(messages[0].content.text).toContain("hello world");
    });

    it("get map_isomorphism_prompt includes source and target", () => {
        const { messages } = getPrompt("map_isomorphism_prompt", {
            source: "Theology",
            target: "CS",
        });
        expect(messages[0].content.text).toContain("Theology");
        expect(messages[0].content.text).toContain("CS");
    });

    it("get verify_grammar_prompt includes code and language", () => {
        const { messages } = getPrompt("verify_grammar_prompt", {
            code: "const x = 1;",
            language: "JavaScript",
        });
        expect(messages[0].content.text).toContain("const x = 1;");
        expect(messages[0].content.text).toContain("JavaScript");
    });

    it("unknown prompt throws", () => {
        expect(() => getPrompt("unknown_prompt", {})).toThrow(/Unknown prompt/);
    });
});
