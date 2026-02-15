/**
 * Recursive Sync — Logos Kernel alignment (L2 Grammar)
 *
 * Canon I (Unity): State is anchored to a root; every sync references a prior state or genesis.
 * Canon II (Parsimony): Minimal payload; only diff or full snapshot as needed.
 * Canon III (Recursion): Sync logic is self-describing; evaluation criteria exposed here.
 *
 * Operational: Ensures client state converges to server/root state without infinite loops
 * (well-foundedness) and without contradictory assignments (consistency).
 */

export type SyncPayload<T> = {
  /** Root hash / version — anchors this state (Canon I). */
  root: string;
  /** Payload; minimal description (Canon II). */
  data: T;
  /** Version for normalization; every derivation halts at a known version. */
  version: number;
};

export type SyncResult<T> =
  | { status: "synced"; payload: SyncPayload<T> }
  | { status: "stale"; local: SyncPayload<T>; remote: SyncPayload<T> }
  | { status: "conflict"; local: SyncPayload<T>; remote: SyncPayload<T>; message: string };

/**
 * Recursive Sync: compare local and remote by root and version.
 * If remote.version > local.version and remote.root !== local.root, treat as update from root.
 * If versions equal and roots equal → synced. Otherwise → stale or conflict.
 * L2-aligned: typed, consistent, no undefined behavior.
 */
export function recursiveSync<T>(
  local: SyncPayload<T>,
  remote: SyncPayload<T>
): SyncResult<T> {
  if (local.root === remote.root && local.version === remote.version) {
    return { status: "synced", payload: local };
  }
  if (remote.version > local.version) {
    return { status: "stale", local, remote };
  }
  if (local.version === remote.version && local.root !== remote.root) {
    return {
      status: "conflict",
      local,
      remote,
      message: "Same version, different root — manual resolution required.",
    };
  }
  return { status: "stale", local, remote };
}
