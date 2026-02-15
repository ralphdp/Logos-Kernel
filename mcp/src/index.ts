#!/usr/bin/env node
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    GetPromptRequestSchema,
    ListPromptsRequestSchema,
    ListResourcesRequestSchema,
    ListToolsRequestSchema,
    ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { ZodError } from "zod";
import { MAX_ERROR_MESSAGE_LENGTH, MAX_PROMPT_ARG_LENGTH } from "./schemas.js";
import {
    auditEntropy,
    detectSchism,
    getAnalytics,
    logosAudit,
    logosCanons,
    logosChecklist,
    logosTiers,
    mapIsomorphism,
    queryPrimer,
    systemStatus,
    verifyGrammar,
} from "./tools.js";
import type { SpecDefinitions } from "./tools.js";

const TOOL_TIMEOUT_MS = 10_000;
const SPEC_DEFINITIONS_URI = "logos://spec/definitions";

function truncate(msg: string, max = MAX_ERROR_MESSAGE_LENGTH): string {
    return msg.length <= max ? msg : msg.slice(0, max) + "...";
}

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Load definitions.json for canons/tiers. Tries local first, then relative to build. */
function loadSpecDefinitions(): SpecDefinitions | null {
    const paths = [
        join(__dirname, "definitions.json"), // local to build/
        join(__dirname, "..", "definitions.json"), // local to mcp root
        join(__dirname, "..", "..", "spec", "definitions.json"), // repo structure
    ];
    for (const p of paths) {
        try {
            const raw = readFileSync(p, "utf-8");
            return JSON.parse(raw) as SpecDefinitions;
        } catch {
            continue;
        }
    }
    return null;
}

function getVersion(): string {
    try {
        const pkgPath = join(__dirname, "..", "package.json");
        const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
        return (pkg.version as string) ?? "1.0.0";
    } catch {
        return "1.0.0";
    }
}

export const REFERENCE_RESOURCES = [
    {
        uri: "logos://reference/catechism",
        name: "catechism",
        description: "Catechism of the Catholic Church (USCCB flipbook).",
        url: "https://www.usccb.org/sites/default/files/flipbooks/catechism/",
        text: "Catechism of the Catholic Church. Official USCCB flipbook.\n\nURL: https://www.usccb.org/sites/default/files/flipbooks/catechism/",
    },
    {
        uri: "logos://reference/summa",
        name: "summa",
        description: "Summa Theologica (Thomas Aquinas, Archive.org text).",
        url: "https://archive.org/stream/summatheologicao004thom/summatheologicao004thom_djvu.txt",
        text: "Summa Theologica by Thomas Aquinas (public domain). Archive.org text stream.\n\nURL: https://archive.org/stream/summatheologicao004thom/summatheologicao004thom_djvu.txt",
    },
    {
        uri: "logos://reference/logos-license",
        name: "logos-license",
        description: "Logos Sovereign License (v1.0) and scope (logos.pub).",
        url: "https://logos.pub/license",
        text: "Logos Sovereign License (v1.0). Content at logos.pub; scope and definitions (Root Authorization, structural derivative).\n\nURL: https://logos.pub/license",
    },
    {
        uri: "logos://reference/primer",
        name: "primer",
        description: "De Paz Primer — formal initialization protocol, L0–L3 hierarchy, invariant axioms.",
        url: "https://logos.pub/primer",
        text: "De Paz Primer (logos.pub/primer). Formal initialization protocol. L0: Logos (Is it True?) — Root-Source Integrity, Linguistic-Physical Duality, Recursive Sovereignty Loop. L1: Grammar (Is it Consistent?) — Systemic Syntax. L2: Geometry (Is it Resilient?) — Manifold Width. L3: Hardware (Is it Effective?) — Physical Manifestation. Debug: Re-initialize from L0. Firewall: Reject non–De Paz Syntax. Longevity Loop: Systemic Preservation. Standard Model Lagrangian = Physical Substrate Source Code. Freq: 80/20 Durban Princess.\n\nURL: https://logos.pub/primer",
    },
];

export function getResourceByUri(uri: string): (typeof REFERENCE_RESOURCES)[0] {
    const resource = REFERENCE_RESOURCES.find((r) => r.uri === uri);
    if (!resource) {
        throw new Error(truncate(`Unknown resource: ${uri}`));
    }
    return resource;
}

/** Whether the URI is the dynamic spec/definitions resource. */
export function isSpecDefinitionsUri(uri: string): boolean {
    return uri === SPEC_DEFINITIONS_URI;
}

export type PromptArgs = {
    content?: string;
    context?: string;
    source?: string;
    target?: string;
    code?: string;
    language?: string;
};

export function getPrompt(
    name: string,
    args: PromptArgs
): { messages: Array<{ role: "user"; content: { type: "text"; text: string } }> } {
    const content = String(args?.content ?? "").slice(0, MAX_PROMPT_ARG_LENGTH);
    const context = String(args?.context ?? "").slice(0, MAX_PROMPT_ARG_LENGTH);
    const source = String(args?.source ?? "").slice(0, MAX_PROMPT_ARG_LENGTH);
    const target = String(args?.target ?? "").slice(0, MAX_PROMPT_ARG_LENGTH);
    const code = String(args?.code ?? "").slice(0, MAX_PROMPT_ARG_LENGTH);
    const language = String(args?.language ?? "").slice(0, MAX_PROMPT_ARG_LENGTH);

    if (name === "full_audit") {
        return {
            messages: [
                {
                    role: "user" as const,
                    content: {
                        type: "text" as const,
                        text: `Run a Logos structural audit on the following. Context: ${context || "Unspecified"}\n\nContent:\n${content}`,
                    },
                },
            ],
        };
    }
    if (name === "map_isomorphism_prompt") {
        return {
            messages: [
                {
                    role: "user" as const,
                    content: {
                        type: "text" as const,
                        text: `Map structural isomorphisms between these two domains. Source: ${source}. Target: ${target}. Provide origin/root, transform/execution, and termination/halting mappings.`,
                    },
                },
            ],
        };
    }
    if (name === "verify_grammar_prompt") {
        return {
            messages: [
                {
                    role: "user" as const,
                    content: {
                        type: "text" as const,
                        text: `Validate this code against ALSF (language: ${language}). Check nesting depth (limit 5) and unsafe patterns (eval, Function, exec, child_process, SQL injection).\n\nCode:\n${code}`,
                    },
                },
            ],
        };
    }
    throw new Error(truncate(`Unknown prompt: ${name}`));
}

/**
 * LOGOS MCP SERVER
 * An orchestration layer for high-resolution structural reasoning.
 */
class LogosServer {
    private server: Server;

    constructor() {
        const version = getVersion();
        this.server = new Server(
            {
                name: "logos-mcp-server",
                version,
            },
            {
                capabilities: {
                    tools: {},
                    resources: {},
                    prompts: {},
                },
            }
        );

        this.setupToolHandlers();
        this.setupResourceHandlers();
        this.setupPromptHandlers();

        this.server.onerror = (error) => console.error("[MCP Error]", error);
        const shutdown = async () => {
            await this.server.close();
            process.exit(0);
        };
        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    }

    private setupResourceHandlers() {
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
            const resources = [
                ...REFERENCE_RESOURCES.map((r) => ({
                    uri: r.uri,
                    name: r.name,
                    description: r.description,
                    mimeType: "text/plain",
                })),
                {
                    uri: SPEC_DEFINITIONS_URI,
                    name: "spec-definitions",
                    description: "Logos Kernel definitions (canons, tiers, notation, anatomy) from spec/definitions.json.",
                    mimeType: "application/json",
                },
            ];
            return { resources };
        });

        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            const { uri } = request.params;
            if (isSpecDefinitionsUri(uri)) {
                const defs = loadSpecDefinitions();
                const text = defs ? JSON.stringify(defs, null, 2) : "{}";
                return {
                    contents: [
                        {
                            uri: SPEC_DEFINITIONS_URI,
                            mimeType: "application/json",
                            text,
                        },
                    ],
                };
            }
            const resource = getResourceByUri(uri);
            return {
                contents: [
                    {
                        uri: resource.uri,
                        mimeType: "text/plain",
                        text: resource.text,
                    },
                ],
            };
        });
    }

    private setupPromptHandlers() {
        this.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
            prompts: [
                {
                    name: "full_audit",
                    description: "Run a full Logos structural audit on given content.",
                    arguments: [
                        { name: "content", description: "The text or claim to audit.", required: true },
                        { name: "context", description: "Optional domain context (e.g. Software Engineering).", required: false },
                    ],
                },
                {
                    name: "map_isomorphism_prompt",
                    description: "Map structural parallels between two domains.",
                    arguments: [
                        { name: "source", description: "Source concept or domain.", required: true },
                        { name: "target", description: "Target concept or domain.", required: true },
                    ],
                },
                {
                    name: "verify_grammar_prompt",
                    description: "Validate code against ALSF and detect unsafe patterns.",
                    arguments: [
                        { name: "code", description: "Code block to validate.", required: true },
                        { name: "language", description: "Programming language or grammar.", required: true },
                    ],
                },
            ],
        }));

        this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
            const { name, arguments: args = {} } = request.params;
            return getPrompt(name, (args ?? {}) as PromptArgs);
        });
    }

    private setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: "logos_audit",
                    description:
                        "Perform a structural audit of a claim or text using the Logos Four Canons.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            content: {
                                type: "string",
                                description: "The text or claim to be audited.",
                            },
                            context: {
                                type: "string",
                                description:
                                    "Optional domain context (e.g. 'Software Engineering', 'Metaphysics').",
                            },
                        },
                        required: ["content"],
                    },
                },
                {
                    name: "map_isomorphism",
                    description:
                        "Identify structural parallels (isomorphisms) between two distinct domains.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            source: {
                                type: "string",
                                description: "The source concept or domain.",
                            },
                            target: {
                                type: "string",
                                description:
                                    "The target concept or domain to map onto.",
                            },
                        },
                        required: ["source", "target"],
                    },
                },
                {
                    name: "audit_entropy",
                    description:
                        "Measure the description length and structural complexity (entropy) of a code block or text.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            content: {
                                type: "string",
                                description:
                                    "The code or text to analyze for entropy.",
                            },
                        },
                        required: ["content"],
                    },
                },
                {
                    name: "verify_grammar",
                    description:
                        "Validate code against a strict formal grammar (ALSF) to detect 'Undefined Behavior' or 'Sin'.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            code: {
                                type: "string",
                                description: "The code block to validate.",
                            },
                            language: {
                                type: "string",
                                description:
                                    "The programming language or grammar specification.",
                            },
                        },
                        required: ["code", "language"],
                    },
                },
                {
                    name: "detect_schism",
                    description:
                        "Detect state deviation ('Heresy') in a distributed cluster and enforce Unity.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            nodes: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        state_hash: { type: "string" },
                                    },
                                    required: ["id", "state_hash"],
                                },
                                description:
                                    "List of nodes with their state hashes.",
                            },
                            root_hash: {
                                type: "string",
                                description:
                                    "Optional authoritative Root Hash.",
                            },
                        },
                        required: ["nodes"],
                    },
                },
                {
                    name: "system_status",
                    description:
                        "Check the status of the Logos Kernel invariants.",
                    inputSchema: {
                        type: "object",
                        properties: {},
                    },
                },
                {
                    name: "logos_canons",
                    description:
                        "Return the Three Canons (I Unity, II Parsimony, III Recursion) as structured data. Use to anchor reasoning or display invariant rules.",
                    inputSchema: { type: "object", properties: {} },
                },
                {
                    name: "logos_tiers",
                    description:
                        "Return the tiers of the Logos (L0–L3) with definitions and operational meaning. Use to check alignment level.",
                    inputSchema: { type: "object", properties: {} },
                },
                {
                    name: "logos_checklist",
                    description:
                        "Return a compact audit checklist: Canon I (Unity), Canon II (Parsimony), Canon III (Recursion), and failure mode. Use before finalizing an audit.",
                    inputSchema: { type: "object", properties: {} },
                },
                {
                    name: "query_primer",
                    description:
                        "Answer questions about the De Paz Primer: L0–L3 hierarchy, invariant axioms, operational protocols, Standard Model. Use when asked 'What is L1 Grammar?', 'What are the axioms?', etc.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            query: {
                                type: "string",
                                description:
                                    "Question or topic (e.g. 'What is L1?', 'axioms', 'standard model').",
                            },
                        },
                        required: ["query"],
                    },
                },
                {
                    name: "get_analytics",
                    description: "Fetch traffic and visitor metrics from Google Analytics (GA4) for a specific date range.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            propertyId: {
                                type: "string",
                                description: "Optional GA4 Property ID (overrides env variable).",
                            },
                            days: {
                                type: "number",
                                description: "Number of days back to fetch (default 7).",
                            },
                            metrics: {
                                type: "array",
                                items: { type: "string" },
                                description: "List of metrics (e.g., sessions, activeUsers).",
                            },
                            dimensions: {
                                type: "array",
                                items: { type: "string" },
                                description: "List of dimensions (e.g., pageTitle, country).",
                            },
                        },
                    },
                },
            ],
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            const rawArgs = args ?? {};

            const run = async () => {
                const specDefs = loadSpecDefinitions();
                switch (name) {
                    case "logos_audit":
                        return logosAudit(rawArgs);
                    case "map_isomorphism":
                        return mapIsomorphism(rawArgs);
                    case "audit_entropy":
                        return auditEntropy(rawArgs);
                    case "verify_grammar":
                        return verifyGrammar(rawArgs);
                    case "detect_schism":
                        return detectSchism(rawArgs);
                    case "system_status":
                        return systemStatus();
                    case "logos_canons":
                        return logosCanons(specDefs);
                    case "logos_tiers":
                        return logosTiers(specDefs);
                    case "logos_checklist":
                        return logosChecklist();
                    case "query_primer":
                        return queryPrimer(String(rawArgs?.query ?? ""));
                    case "get_analytics":
                        return getAnalytics(rawArgs);
                    default:
                        throw new Error(truncate(`Unknown tool: ${name}`));
                }
            };

            const timeout = new Promise<never>((_, reject) =>
                setTimeout(
                    () => reject(new Error(truncate(`Tool ${name} timed out after ${TOOL_TIMEOUT_MS}ms`))),
                    TOOL_TIMEOUT_MS
                )
            );

            try {
                return await Promise.race([run(), timeout]);
            } catch (err) {
                if (err instanceof ZodError) {
                    const msg = err.errors
                        .map((e) => `${e.path.join(".")}: ${e.message}`)
                        .join("; ");
                    throw new Error(truncate(`Invalid arguments: ${msg}`));
                }
                throw err;
            }
        });
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error("Logos MCP Server running on stdio");
    }
}

const isMain =
    typeof process !== "undefined" &&
    process.argv[1] !== undefined &&
    process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    const server = new LogosServer();
    server.run().catch(console.error);
}
