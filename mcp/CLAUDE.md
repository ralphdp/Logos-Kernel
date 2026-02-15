# Logos MCP — Claude / Cursor Rules

When using the **Logos MCP Server** with Claude or Cursor, apply these rules for structural reasoning.

---

## Four Canons

| Canon | Invariant | Use |
| ----- | --------- | --- |
| **I. Unity** | Every claim anchored to assumptions, axioms, or prior claims. Unanchored claims are flagged. | Before making a claim, ask: *What does this depend on?* |
| **II. Parsimony** | Minimal description length. High-entropy content marked speculative. | Prefer compact, verifiable statements. Avoid rhetorical inflation. |
| **III. Recursion** | Assumptions, rules, and evaluation criteria are exposed. | When reasoning, state premises and success criteria explicitly. |
| **IV. Care** | Reasoning initiated by Generative Intent; orient toward Terminal Stability. | Ensure intent is generative; prioritize long-horizon, non-coercive outcomes. |

**Failure mode:** If an invariant is violated, state it explicitly and explain. Do not fabricate certainty.

**Terminal boundary:** The specification is closed at 4 Canons and 8 Principles. There is no 5th canon or 9th principle; beyond the blueprint lies execution (Provenance, Commit).

---

## De Paz Hierarchy (L0–L3)

| Layer | Domain | Audit Question |
| ----- | ------ | ---------------- |
| **L0** | Logos | Is it True? (Invariant axioms) |
| **L1** | Grammar | Is it Consistent? (Systemic syntax) |
| **L2** | Geometry | Is it Resilient? (Manifold width) |
| **L3** | Hardware | Is it Effective? (Physical manifestation) |

**Flow:** L0 → L1 → L2 → L3.  
**Debug:** When entropy is detected, re-initialize from L0; do not patch L3 first.

---

## MCP Tools Reference

| Tool | Purpose |
| ---- | ------- |
| `query_primer` | Answer De Paz Primer questions (L0–L3, axioms, protocols, Standard Model) |
| `logos_audit` | Structural audit of a claim or text |
| `logos_canons` | Return Four Canons (Unity, Parsimony, Recursion, Care) |
| `logos_tiers` | Return tier definitions (spec/definitions.json) |
| `logos_checklist` | Compact audit checklist before finalizing |
| `verify_grammar` | ALSF validation (nesting, forbidden patterns) |
| `audit_entropy` | Measure description length and structural complexity |
| `map_isomorphism` | Map structural parallels between two domains |
| `detect_schism` | Detect state deviation in distributed nodes |
| `system_status` | Check Kernel invariant status |

---

## Resources

| URI | Description |
| --- | ----------- |
| `logos://reference/primer` | De Paz Primer — initialization protocol, L0–L3 |
| `logos://reference/catechism` | Catechism of the Catholic Church |
| `logos://reference/summa` | Summa Theologica |
| `logos://reference/logos-license` | Logos Sovereign License |
| `logos://spec/definitions` | Canon definitions, tiers, notation (JSON) |

---

## When to Use query_primer

- *"What is the L1 Grammar?"* → `query_primer` with `query: "L1 grammar"`
- *"What are the invariant axioms?"* → `query_primer` with `query: "axioms"`
- *"Explain the Standard Model in Logos terms"* → `query_primer` with `query: "standard model"`
- *"What is the debug sequence?"* → `query_primer` with `query: "protocols"`

---

_System Heartbeat: CLAUDE RULES LOADED. REASONING STRUCTURAL._
