"use client";

/**
 * RecursiveSync — This component is aligned with the L2 Grammar of the Logos Kernel.
 *
 * L2 (Semantic): Meaningful interpretation; state maps to denotations.
 * - Canon I (Unity): Display state is anchored to root + version.
 * - Canon II (Parsimony): Minimal re-renders.
 * - Canon III (Recursion): Sync logic and evaluation criteria are exposed.
 * - Canon IV (Care): Initiated by Generative Intent toward Terminal Stability.
 */

import { useEffect, useState } from "react";
import {
  recursiveSync,
  type SyncPayload,
  type SyncResult,
} from "@/lib/logos-sync";

const initialLocal: SyncPayload<{ message: string }> = {
  root: "genesis",
  data: { message: "Initial state (V6.0 Aligned)." },
  version: 1,
};

export function RecursiveSync() {
  const [local, setLocal] = useState<SyncPayload<{ message: string }>>(initialLocal);
  const [result, setResult] = useState<SyncResult<{ message: string }> | null>(null);

  useEffect(() => {
    // Simulate structural synchronization with the Root
    const remote: SyncPayload<{ message: string }> = {
      root: "genesis",
      data: { message: "State from root (4 Canons, 8 Principles)." },
      version: 2,
    };
    const syncResult = recursiveSync(local, remote);
    setResult(syncResult);
    if (syncResult.status === "stale") {
      setLocal(syncResult.remote);
    }
  }, [local]);

  return (
    <div className="card">
      <h2 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        Recursive Sync
      </h2>
      <p className="muted" style={{ fontSize: '0.75rem' }}>
        Canon I-IV synchronization active. State anchored to root genesis.
      </p>

      {result && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f8f9fa', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.8rem' }}>
            <strong>Status:</strong> <span style={{ color: 'var(--accent)' }}>{result.status}</span>
          </p>
          {result.status === "synced" && (
            <p className="muted" style={{ margin: '0.25rem 0 0 0' }}>{result.payload.data.message}</p>
          )}
          {result.status === "stale" && (
            <p style={{ color: '#8b6914', margin: '0.25rem 0 0 0' }}>
              Relay v{result.local.version} → Root v{result.remote.version}. Syncing...
            </p>
          )}
          {result.status === "conflict" && (
            <p style={{ color: '#b91c1c', margin: '0.25rem 0 0 0' }}>{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
