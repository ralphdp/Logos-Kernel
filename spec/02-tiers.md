# 02 — Tiers of the Logos (L0–L3)

The Logos Kernel defines four tiers of grammar. Each tier corresponds to a level of structural commitment and operational clarity. Implementations and audits can declare alignment with a specific tier.

---

## L0 — Lexical

**Definition:** Raw tokens and vocabulary. The layer of symbols without fixed structure.

- **Role:** Input alphabet; admissible symbols.
- **Operational:** Lexer output; token stream. No guarantee of well-formedness.
- **Risk:** Unconstrained symbolism (category errors, injection) if promoted to higher tiers without parsing.

---

## L1 — Syntactic

**Definition:** Well-formed expressions. Grammar rules apply; structure is parseable.

- **Role:** Sentences in L(G). Every expression has a derivation.
- **Operational:** Parser output; AST. Consistency with grammar; no undefined parses.
- **Invariant:** Canon I (Unity)—every node anchors to a rule and prior nodes.

---

## L2 — Semantic

**Definition:** Meaningful interpretation. Expressions map to denotations; type and reference are coherent.

- **Role:** Interpreted structures. Type safety; no contradictory assignments.
- **Operational:** Type checker / interpreter. Consistency (Γ ⊬ φ ∧ ¬φ); normalization (halting).
- **Invariant:** Canon II (Parsimony)—minimal description; Canon III (Recursion)—exposed evaluation.

**Implementation note:** Components that are "aligned with the L2 Grammar of the Logos Kernel" satisfy syntactic and semantic coherence and expose their evaluation criteria.

---

## L3 — Pragmatic / Telic

**Definition:** Goal-directed, stable under execution. The layer of "story that resolves."

- **Role:** Systems that terminate in a defined state; no non-termination, no silent failure.
- **Operational:** Master Specification as halting condition. Audit trail; accountability.
- **Invariant:** All four Canons; ethical constraint (CTR-aligned); failure mode explicit.

**Theological isomorphism:** Telos / Judgment—every narrative resolves against the Master Specification.

---

## Summary Table

| Tier | Name | Anchor | Operational meaning |
|------|------|--------|----------------------|
| L0 | Lexical | Symbols | Token stream; no structure guarantee |
| L1 | Syntactic | Grammar | Parseable; well-formed expressions |
| L2 | Semantic | Meaning | Typed; consistent; evaluable |
| L3 | Pragmatic | Telos | Halting; auditable; aligned |

Implementations may claim "L2-aligned" or "L3-aligned" when their design and documentation satisfy the corresponding invariants.
