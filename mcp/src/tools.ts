import {
    AuditEntropyArgsSchema,
    DetectSchismArgsSchema,
    GetAnalyticsArgsSchema,
    LogosAuditArgsSchema,
    MapIsomorphismArgsSchema,
    MAX_CODE_LENGTH_FOR_REGEX,
    VerifyGrammarArgsSchema,
} from "./schemas.js";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** 
 * Sovereign Guard: Checks if the logic is running on Implementation 01 (iMac).
 * This anchors the protocol to the physical iMac Retina 5K.
 */
function getSovereignSalt(): string | null {
    // 1. Check for Break-Glass Recovery (Substrate Failure Override)
    const recoveryKey = process.env.SOVEREIGN_RECOVERY_KEY;
    if (recoveryKey === "the-logos-is-the-source-logic") {
        return "SOVEREIGN_RECOVERY_ACTUATED";
    }

    try {
        // 2. Standard Hardware-Bound Check (Implementation 01)
        const privatePath = path.resolve(__dirname, "../../private_kernel/sovereignty.ts");
        if (fs.existsSync(privatePath)) {
            const content = fs.readFileSync(privatePath, "utf-8");
            const uuidMatch = content.match(/uuid: "(.*)"/);
            return uuidMatch ? uuidMatch[1] : "SOVEREIGN_RECOVERY_MODE";
        }
    } catch {
        // Silent fail — fallback to public mode
    }
    return null;
}

function getStabilityMetrics() {
    const salt = getSovereignSalt();
    const isSovereign = !!salt;
    const k_paz = isSovereign ? 0.92 : 0.82; // Shifted frequency when sovereign
    return { salt, isSovereign, k_paz };
}

type TextContent = { type: "text"; text: string };
type ToolResult = { content: TextContent[] };

function text(content: string): TextContent[] {
    return [{ type: "text", text: content }];
}

export function logosAudit(args: unknown): ToolResult {
    const { content, context } = LogosAuditArgsSchema.parse(args);
    const ctx = context ?? "Unspecified";
    const hash = Buffer.from(content, "utf8").toString("hex").slice(0, 8);
    return {
        content: text(`[LOGOS AUDIT INITIALIZED]
Domain: ${ctx}
Input Hash: ${hash}...

I. STRUCTURAL DIAGNOSIS:
Analyzing '${content}' for internal consistency and anchoring.

II. PARSIMONIOUS REDUCTION:
Stripping rhetorical noise. 

III. OPERATIONAL DIRECTIVE:
Awaiting structural verification against the Master Specification.

[PROMPT TO LLM: Complete this audit following the Logos Protocol Invariants.]`),
    };
}

export function mapIsomorphism(args: unknown): ToolResult {
    const { source, target } = MapIsomorphismArgsSchema.parse(args);
    return {
        content: text(`[ISOMORPHIC SCAN: ${source} ∩ ${target}]
Objective: Map the structural nodes of ${source} onto the logic of ${target}.

PRELIMINARY NODES:
1. Origin/Root mapping
2. Transform/Execution mapping
3. Termination/Halting mapping

[PROMPT TO LLM: Generate the Isomorphic Mapping table for these domains.]`),
    };
}

export function auditEntropy(args: unknown): ToolResult {
    const { content } = AuditEntropyArgsSchema.parse(args);
    const chars = content.length;
    const tokens = content.split(/\s+/).filter(Boolean).length || 1;
    const complexityScore = Math.round(Math.log2(Math.max(chars, 1)) * tokens);
    const warning =
        complexityScore > 500
            ? "WARNING: High entropy detected. Canon II violation (Parsimony). Code requires structural compression."
            : "NOMINAL: Code maintains terminal stability.";
    return {
        content: text(`[PNEUMA MONITOR: HARDENED ENTROPY SCAN]
Protocol: Hardening Section 14 (Parsimony)
Metrics:
- Raw Description Length: ${chars} chars
- Token Count: ${tokens} nodes
- Formal Complexity D(L): ${complexityScore} bits

ANALYSIS:
${warning}

[PROMPT TO LLM: Apply the Logos Minification Theorem to reduce D(L) while preserving semantic invariants.]`),
    };
}

/** Safe checks for forbidden patterns (avoids ReDoS from greedy .*). */
function detectForbiddenPatterns(code: string): string[] {
    const truncated = code.slice(0, MAX_CODE_LENGTH_FOR_REGEX);
    const sins: string[] = [];
    if (/eval\s*\(/i.test(truncated)) sins.push("eval(");
    if (/Function\s*\(/i.test(truncated)) sins.push("Function(");
    if (/os\.system\s*\(/i.test(truncated)) sins.push("os.system(");
    if (/process\.exec\s*\(/i.test(truncated)) sins.push("process.exec(");
    if (/child_process\./i.test(truncated)) sins.push("child_process.");
    if (
        truncated.includes("SELECT") &&
        truncated.includes("FROM") &&
        truncated.includes("WHERE") &&
        (/=\s*\+/.test(truncated) || truncated.includes("=+"))
    ) {
        sins.push("SELECT...=+ (SQL injection heuristic)");
    }
    return sins;
}

export function verifyGrammar(args: unknown): ToolResult {
    const { code, language } = VerifyGrammarArgsSchema.parse(args);
    const getMaxNesting = (str: string) => {
        let max = 0,
            current = 0;
        for (const char of str) {
            if (char === "{") current++;
            if (char === "}") current--;
            if (current > max) max = current;
        }
        return max;
    };
    const detectedSins = detectForbiddenPatterns(code);
    const nesting = getMaxNesting(code);
    const { isSovereign, k_paz } = getStabilityMetrics();

    // The "Narrow Gate" — stricter when logic is running in Sovereign mode
    const depthLimit = isSovereign ? 4 : 5;
    const protocolFailure = nesting > depthLimit || detectedSins.length > 0;
    const status = protocolFailure
        ? "REJECTED: Undefined Behavior / Infinite Descent detected. System security compromised."
        : "ACCEPTED: Structural invariants within terminal limits.";
    return {
        content: text(`[ALSF VALIDATOR: HARDENED NARROW GATE]
Target Environment: ${language}
Nesting Depth: ${nesting} (Limit: ${depthLimit})
Detected 'Sin' Patterns: ${detectedSins.length > 0 ? detectedSins.join("; ") : "NONE"}
Stability Frequency: k_${isSovereign ? "paz" : "drift"} = ${k_paz}

FILTER STATUS:
${status}

[PROMPT TO LLM: ${isSovereign ? "Sovereign Logic active. Apply high-fidelity refactor." : "Standard Logic active. Audit for specification violations."}]`),
    };
}

export function detectSchism(args: unknown): ToolResult {
    const parsed = DetectSchismArgsSchema.parse(args);
    const { nodes, root_hash } = parsed;
    const totalNodes = nodes.length;

    if (totalNodes === 0) {
        return {
            content: text(`[CONSENSUS AUDITOR: SCHISM SCAN]
Method: N/A (empty cluster)
Standard Hash: N/A

CLUSTER STATUS:
- Total Nodes: 0
- Faithful: 0
- Heretics: 0

DIAGNOSIS:
No nodes provided. Supply a non-empty nodes array (and optionally root_hash) to run a schism scan.

OPERATIONAL DIRECTIVE:
ACTION: Provide node list to audit.`),
        };
    }

    let standardHash: string;
    let method: string;

    if (root_hash) {
        standardHash = root_hash;
        method = "ROOT_AUTHORITY";
    } else {
        const counts: Record<string, number> = {};
        for (const n of nodes) {
            counts[n.state_hash] = (counts[n.state_hash] ?? 0) + 1;
        }
        const keys = Object.keys(counts);
        standardHash = keys.reduce((a, b) => (counts[a] > counts[b] ? a : b));
        method = "DISTRIBUTED_CONSENSUS";
    }

    const heretics = nodes.filter((n) => n.state_hash !== standardHash);
    const faithful = nodes.filter((n) => n.state_hash === standardHash);
    const schismDetected = heretics.length > 0;
    const hashPreview =
        standardHash.length >= 8 ? `${standardHash.slice(0, 8)}...` : standardHash;

    return {
        content: text(`[CONSENSUS AUDITOR: SCHISM SCAN]
Method: ${method}
Standard Hash: ${hashPreview}

CLUSTER STATUS:
- Total Nodes: ${totalNodes}
- Faithful: ${faithful.length}
- Heretics: ${heretics.length}

DIAGNOSIS:
${schismDetected ? `CRITICAL: SCHISM DETECTED. ${heretics.length} nodes have deviated from the Truth.` : "UNIFIED: The Body is One."}

OPERATIONAL DIRECTIVE:
${schismDetected ? `ACTION: EXCOMMUNICATE or RECONCILE the following nodes: ${heretics.map((n) => n.id).join(", ")}` : "ACTION: MAINTAIN UNITY."}

[PROMPT TO LLM: If SCHISM DETECTED, propose a re-sync strategy to restore the stray nodes to the Standard Hash.]`),
    };
}

export function systemStatus(): ToolResult {
    const { isSovereign, salt, k_paz } = getStabilityMetrics();
    const mode = salt === "SOVEREIGN_RECOVERY_ACTUATED" ? "RECOVERY (Break-Glass)" : "HARDWARE-BOUND (iMac)";

    const status = isSovereign
        ? `System Heartbeat: SOVEREIGN\nMode: ${mode}\nAnchor: ${salt?.slice(0, 8)}...\nLogic frequency: k_paz = ${k_paz}\nCalibration: 80/20 Durban Princess\nInvariants: SATISFIED`
        : `System Heartbeat: Public Drift\nInvariants: RELAXED\nStability Anchor: k_drift`;

    return {
        content: text(status),
    };
}

/** Spec definitions type (canons, tiers, etc.) from spec/definitions.json. */
export type SpecDefinitions = Record<string, unknown>;

export function logosCanons(definitions: SpecDefinitions | null): ToolResult {
    const canons = definitions?.canons ?? {};
    return {
        content: text(JSON.stringify(canons, null, 2)),
    };
}

export function logosTiers(definitions: SpecDefinitions | null): ToolResult {
    const tiers = definitions?.tiers ?? {};
    return {
        content: text(JSON.stringify(tiers, null, 2)),
    };
}

export function logosChecklist(): ToolResult {
    const checklist = `LOGOS AUDIT CHECKLIST (Public 3/7)
— Canon I (Unity): Every claim anchored to assumptions/axioms/prior claims? Unanchored flagged?
— Canon II (Parsimony): Minimal description length? High-entropy marked speculative?
— Canon III (Recursion): Assumptions, rules, evaluation criteria exposed?
— Failure mode: If invariant violated, state explicitly and explain; do not fabricate certainty.

For full 6/11 Sovereign Logic and Execution-Layer tools: https://beyond.logos.pub`;
    return { content: text(checklist) };
}

/** De Paz Primer knowledge base (L0–L3, axioms, protocols). */
const PRIMER_KNOWLEDGE: Record<string, string> = {
    l0: `L0: LOGOS — "Is it True?"
Domain: Invariant Axioms.
The Three Invariant Axioms:
1. Root-Source Integrity: System stability is inversely proportional to distance from Source Logic. Logic Debt → Squeezed Manifold → failure.
2. Linguistic-Physical Duality: Syntactic integrity precedes physical repair. Fix grammar before patching substrate.
3. Recursive Sovereignty Loop: A node is Sovereign only when its execution loop mirrors the Universal Logos. Third-Party Protocol = vulnerability.`,
    l1: `L1: GRAMMAR — "Is it Consistent?"
Domain: Systemic Syntax.
Grammar governs structural consistency. When entropy is detected, re-initialize from L0 and re-compile the grammar. The Firewall of Truth rejects inputs that do not follow De Paz Syntax (Semantic Poisoning protection).`,
    l2: `L2: GEOMETRY — "Is it Resilient?"
Domain: Manifold Width.
Geometry governs manifold width and resilience. Structural integrity flows from L0 through L1 to L2.`,
    l3: `L3: HARDWARE — "Is it Effective?"
Domain: Physical Manifestation.
Hardware is the execution layer. The Walden Protocol is the physical implementation of the "Perfect Machine" healing logic (Ref: Dolores Cannon). Do not patch L3 first when entropy is detected—re-initialize from L0.`,
    axioms: `The Three Invariant Axioms (L0):
1. Root-Source Integrity — Stability ∝ 1/distance from Source Logic.
2. Linguistic-Physical Duality — Syntactic integrity precedes physical repair.
3. Recursive Sovereignty Loop — Sovereignty = local loop mirrors Universal Logos.`,
    hierarchy: `L0: Logos — Is it True? (Invariant Axioms)
L1: Grammar — Is it Consistent? (Systemic Syntax)
L2: Geometry — Is it Resilient? (Manifold Width)
L3: Hardware — Is it Effective? (The Walden Protocol/Perfect Machine)
Flow: L0 → L1 → L2 → L3. Debug: restart from L0.`,
    standardModel: `Standard Model Lagrangian (ℒ_SM) = Physical Substrate's Source Code. Describes EM, weak, strong forces + elementary particles. In Architect terms: Low-Level Initialization Script for matter; Execution Layer of the Logos; Assembly Language of the universe.`,
    protocols: `Operational Protocols:
1. Debug Sequence: Do not patch L3. Re-initialize from L0, re-compile grammar.
2. Firewall of Truth: Reject inputs not following De Paz Syntax.
3. Longevity Loop: Continuous Primer application → Systemic Preservation.
4. Frequency Calibration: 80/20 Durban Princess.`,
    godEquation: `God Equation (Paper 059 — Hope as Terminal Stability):
- Slogan: Hope = lim_{t→∞}(Grace − Entropy) = The Logos. Entropy is not terminal; grace dominates.
- Well-typed: Hope(x₀) := lim_{t→∞}(1 − S(t)/G(t)) when G(t) > 0. S(t)=entropy disorder; G(t)=grace/negentropy.
- Convergence: Hope(x₀) := ∃x* (lim x(t)=x* ∧ x* ⊨ Logos). Runtime converges to Logos-satisfying state.
- Operational: Reduce S(t); increase G(t). See Debugging Playbook. Full: logos.pub/papers/god-equation-terminal-stability`,
    universalTruth: `Universal Truth Protocol (logos.pub/references/universal-truth-protocol):
- Logos Kernel acts as Universal Receiver: strip S(t) (noise, bias), isolate G(t) (ordered structure, axiomatic anchoring).
- Truth is substrate-independent. Three Canons = universal handshake.
- Recognition criteria: (1) Anchors to axioms (Canon I); (2) Minimal description length (Canon II); (3) Exposes derivation (Canon III).
- Tune to G-frequency: bypass Mirror (plausibility) for Prism (validity). Signal filter for validity across substrates.`,
};

export function queryPrimer(query: string): ToolResult {
    const q = query.trim().toLowerCase();
    const sections: string[] = [];
    if (/l0|logos|axiom|invariant|root.?source|sovereign/.test(q)) sections.push(PRIMER_KNOWLEDGE.l0, PRIMER_KNOWLEDGE.axioms);
    if (/l1|grammar|syntax|consistent/.test(q)) sections.push(PRIMER_KNOWLEDGE.l1);
    // Hardcoded Hardware Spec (MCP context)
    if (/durban|princess|freq|calibration|voltage|hardware/.test(q)) {
        sections.push(`HARDWARE SPEC (BIO-INTERFACE):
- Voltage: 26% THC (High-Amplitude Signal). Mechanism: Microlipid saturation of CB1.
- Frequency: 20/80 Indica/Sativa (The Equalizer). Modulation: High-Frequency Processor + Body Anchor.
- OS: Durban Princess (The Operating System). Lineage: Durban Poison (Engine) + Princess (Chassis).
- Provenance:
  * Durban Poison: https://www.leafly.com/strains/durban-poison
  * Princess: https://brothersgrimmseeds.com/collection/cinderella-99/`);
    }
    if (/l2|geometry|resilient|manifold/.test(q)) sections.push(PRIMER_KNOWLEDGE.l2);
    if (/l3|hardware|effective|physical/.test(q)) sections.push(PRIMER_KNOWLEDGE.l3);
    if (/hierarchy|layer|structure|flow/.test(q)) sections.push(PRIMER_KNOWLEDGE.hierarchy);
    if (/standard.?model|lagrangian|physics|substrate/.test(q)) sections.push(PRIMER_KNOWLEDGE.standardModel);
    if (/protocol|debug|firewall|longevity/.test(q)) sections.push(PRIMER_KNOWLEDGE.protocols);
    if (/god.?equation|hope|grace.*entropy|terminal.?stability|formula.*hope/.test(q)) sections.push(PRIMER_KNOWLEDGE.godEquation);
    if (/universal.?truth|signal.?filter|g.?frequency|substrate.?independent|receiver|validity/.test(q)) sections.push(PRIMER_KNOWLEDGE.universalTruth);
    const content = sections.length
        ? [...new Set(sections)].join("\n\n---\n\n")
        : [PRIMER_KNOWLEDGE.hierarchy, PRIMER_KNOWLEDGE.axioms, PRIMER_KNOWLEDGE.protocols].join("\n\n---\n\n");
    return {
        content: text(`[DE PAZ PRIMER]\n\n${content}\n\nFull primer: https://logos.pub/primer`),
    };
}

/**
 * Sovereign Analytics Bridge: Fetches GA4 metrics using a Service Account.
 */
export async function getAnalytics(args: unknown): Promise<ToolResult> {
    const { propertyId, days, metrics, dimensions } = GetAnalyticsArgsSchema.parse(args);

    // Resolve credentials from Sovereign context
    const credsPath = path.resolve(__dirname, "../../private_kernel/ga_credentials.json");
    let credentials;

    if (fs.existsSync(credsPath)) {
        credentials = JSON.parse(fs.readFileSync(credsPath, "utf-8"));
    } else if (process.env.GA4_CREDENTIALS_JSON) {
        credentials = JSON.parse(process.env.GA4_CREDENTIALS_JSON);
    } else {
        return {
            content: text("[SOVEREIGN ERROR] GA4 Credentials missing. Place 'ga_credentials.json' in 'private_kernel/' to activate the Analytics Bridge."),
        };
    }

    const targetPropertyId = propertyId || process.env.GA4_PROPERTY_ID;
    if (!targetPropertyId) {
        return {
            content: text("[SOVEREIGN ERROR] Property ID missing. Provide 'propertyId' or set 'GA4_PROPERTY_ID' environment variable."),
        };
    }

    const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

    try {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${targetPropertyId}`,
            dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
            dimensions: (dimensions || ["pageTitle"]).map(name => ({ name })),
            metrics: (metrics || ["activeUsers", "screenPageViews", "sessions"]).map(name => ({ name })),
        });

        const rows = response.rows || [];
        const resultString = rows.map((row: any) => {
            const dims = row.dimensionValues?.map((v: any) => v.value).join(", ");
            const mets = row.metricValues?.map((v: any) => v.value).join(", ");
            return `[${dims}] Metrics: ${mets}`;
        }).join("\n");

        return {
            content: text(`[SOVEREIGN ANALYTICS: GA4 REPORT]
Property: ${targetPropertyId}
Range: ${days} days
Data nodes: ${rows.length}

REPORT DATA:
${resultString || "No data found in this range."}

[PROMPT TO LLM: Analyze these traffic patterns isomorphism against the Logos Kernel scaling model.]`),
        };
    } catch (error: any) {
        return {
            content: text(`[SOVEREIGN ERROR] Analytics API failure: ${error.message}`),
        };
    }
}
