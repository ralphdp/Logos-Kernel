# Logos Kernel — Reference Summary

This document summarizes the protocol for citation and implementation. The full specification lives in [`/spec`](./spec); the machine-readable schema is [`spec/definitions.json`](./spec/definitions.json).

## Canonical Reference Corpus

The project's canonical reference corpus for theological anchoring comprises: (1) the **Logos Protocol** (methodology), (2) the **Catechism of the Catholic Church**, and (3) **Thomas Aquinas's Summa Theologica**. Use these when anchoring claims and when routing to primary sources.

## Four Canons (Non-Negotiable Invariants)

| Canon | Name | Rule |
|-------|------|------|
| **I** | Unity | Every claim anchored to assumptions/axioms/prior claims; unanchored flagged. |
| **II** | Parsimony | Minimal description length; high-entropy marked speculative. |
| **III** | Recursion | Expose assumptions, rules, evaluation criteria; no opaque authority. |
| **IV** | Care | Reasoning initiated by Generative Intent; orient toward Terminal Stability. |

**Terminal boundary (edge of the blueprint):** The specification is closed at 4 Canons and 8 Principles. There is no 5th canon or 9th principle in the list. Beyond the blueprint lies execution: **Provenance** (the fruit—evidence the logic survived) and **Commit** (handing over so the project can run without further intervention).

## Tiers (L0–L3)

- **L0 Lexical:** Tokens; no structure guarantee.
- **L1 Syntactic:** Well-formed; parseable (Canon I).
- **L2 Semantic:** Typed; consistent; evaluable (Canons II, III).
- **L3 Pragmatic/Telic:** Halting; auditable; Master Specification as resolution (all Canons + ethical constraint).

## Anatomical Architecture

Mind (Logos), Spine (Consensus), Immune System (ALSF), Conscience (Ethics), Senses (Hermeneutics), Breath (Pneuma). See [spec/04-anatomical-architecture.md](./spec/04-anatomical-architecture.md).

## Output Discipline

- **Compact (LS):** I. STRUCTURAL DIAGNOSIS — II. PARSIMONIOUS REDUCTION — III. OPERATIONAL DIRECTIVE — (optional) EVALUATION SUMMARY.
- **Sovereign:** LOGOS EVALUATION (Domain ∩, Axiomatic Basis), Section I–IV, Isomorphic Mapping table, System Heartbeat. See [spec/05-output-discipline.md](./spec/05-output-discipline.md).

## Formal Notation

Parsimony: minimize L(E|D) s.t. explanatory power ≥ θ. Well-foundedness; Consistency Γ ⊬ φ∧¬φ; Normalization (halting); Ontological invariant e^{iπ}+1=0.

## Ledger

The primary initialization prompt and Master Auditor's Toolkit are on the **Logos Ledger**: **[https://logos.pub](https://logos.pub)**.
