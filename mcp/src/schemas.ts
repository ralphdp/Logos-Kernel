import { z } from "zod";

/** Max length for text/code inputs to prevent DoS and memory exhaustion. */
export const MAX_STRING_LENGTH = 1_000_000; // 1MB
/** Max number of nodes in detect_schism to prevent O(n) abuse. */
export const MAX_NODES_LENGTH = 10_000;
/** Max length for prompt arguments. */
export const MAX_PROMPT_ARG_LENGTH = 100_000;
/** Max length for code passed to regex checks (ReDoS mitigation). */
export const MAX_CODE_LENGTH_FOR_REGEX = 100_000;
/** Truncate error messages to this length. */
export const MAX_ERROR_MESSAGE_LENGTH = 200;

const boundedString = (msg: string) =>
    z.string().min(1, `${msg} is required`).max(MAX_STRING_LENGTH, `${msg} exceeds max length (${MAX_STRING_LENGTH})`);

export const LogosAuditArgsSchema = z.object({
    content: boundedString("content"),
    context: z.string().max(MAX_STRING_LENGTH).optional(),
});

export const MapIsomorphismArgsSchema = z.object({
    source: boundedString("source"),
    target: boundedString("target"),
});

export const AuditEntropyArgsSchema = z.object({
    content: boundedString("content"),
});

export const VerifyGrammarArgsSchema = z.object({
    code: boundedString("code"),
    language: boundedString("language"),
});

export const SchismNodeSchema = z.object({
    id: z.string().max(MAX_STRING_LENGTH),
    state_hash: z.string().max(MAX_STRING_LENGTH),
});

export const DetectSchismArgsSchema = z.object({
    nodes: z.array(SchismNodeSchema).max(MAX_NODES_LENGTH, `nodes exceeds max length (${MAX_NODES_LENGTH})`),
    root_hash: z.string().max(MAX_STRING_LENGTH).optional(),
});

export const GetAnalyticsArgsSchema = z.object({
    propertyId: z.string().max(MAX_STRING_LENGTH).optional(),
    days: z.number().min(1).max(365).optional().default(7),
    metrics: z.array(z.string()).optional(),
    dimensions: z.array(z.string()).optional(),
});

export type LogosAuditArgs = z.infer<typeof LogosAuditArgsSchema>;
export type MapIsomorphismArgs = z.infer<typeof MapIsomorphismArgsSchema>;
export type AuditEntropyArgs = z.infer<typeof AuditEntropyArgsSchema>;
export type VerifyGrammarArgs = z.infer<typeof VerifyGrammarArgsSchema>;
export type DetectSchismArgs = z.infer<typeof DetectSchismArgsSchema>;
