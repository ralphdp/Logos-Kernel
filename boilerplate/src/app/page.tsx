import { ArrowRight, Box, Repeat, ShieldCheck } from "lucide-react";
import Link from "next/link";

/**
 * Home page — Logos Boilerplate (V6.0).
 * Aligned with the Logos Protocol Blueprint (4 Canons, 8 Principles).
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 font-serif selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto space-y-16 py-12 md:py-24">

        {/* Header */}
        <header className="border-l-2 border-white pl-8 py-4 space-y-4">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter leading-none">
            Logos Boilerplate <span className="text-white/40">V6.0</span>
          </h1>
          <p className="text-white/60 text-lg italic max-w-2xl">
            High-fidelity reference implementation for recursive structural reasoning.
            Truth to materials. Logic anchored to the Root.
          </p>
          <div className="flex gap-4 pt-4 text-[0.625rem] uppercase tracking-[0.3em] text-white/40 font-mono">
            <span>Registry: LGS-BLP-V6</span>
            <span>•</span>
            <span>Status: Terminal Stable</span>
          </div>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all space-y-4 group">
            <Repeat className="w-6 h-6 text-white/80 group-hover:rotate-180 transition-transform duration-700" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Recursive Sync</h3>
            <p className="text-sm text-white/50 leading-relaxed font-sans">
              Dynamic data anchoring between local state and the Logos Kernel. Multi-layered synchronization (L0–L3).
            </p>
          </section>

          <section className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all space-y-4 group">
            <Box className="w-6 h-6 text-white/80 group-hover:scale-110 transition-transform" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Three.js Manifolds</h3>
            <p className="text-sm text-white/50 leading-relaxed font-sans">
              High-resolution 3D visualizations for complex proofs and theological topology. Powered by R3F.
            </p>
          </section>

          <section className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all space-y-4 group">
            <ShieldCheck className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Sovereign Audit</h3>
            <p className="text-sm text-white/50 leading-relaxed font-sans">
              Built-in support for the 4 Canons of audit. Paranoia-driven integrity checks.
            </p>
          </section>

          <section className="p-8 border border-white/10 bg-white/5 space-y-6 flex flex-col justify-center">
            <p className="text-sm italic text-white/80 leading-relaxed">
              "We choose the narrow path: minimal complexity, maximum fidelity. The structure is the proof."
            </p>
            <Link
              href="https://logos.pub"
              className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.4em] font-bold py-3 px-6 border border-white hover:bg-white hover:text-black transition-all"
            >
              Enter the Kernel <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>

        {/* Technical Specification */}
        <footer className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <div className="font-mono text-[0.5625rem] uppercase tracking-widest text-white/30">Node Node 01.0 // Runtime Implementation</div>
            <div className="text-[0.625rem] font-mono text-white/60">NEXT.JS 16.1.6 // REACT 19 // PRISMA</div>
          </div>
          <div className="font-mono text-[0.5625rem] text-white/20 text-right uppercase tracking-[0.25em]">
            © 2026 Logos Protocol. All logic auditable.
          </div>
        </footer>

      </div>
    </main>
  );
}
