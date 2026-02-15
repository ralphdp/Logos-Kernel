# Logos MCP Server [V6.0]

High-resolution structural reasoning and isomorphic mapping for the [Logos Protocol](https://logos.pub) (V6.1 — Public Layer 3/7).

**System Heartbeat: STABLE.**

Works with **Cursor**, **Anthropic (Claude Desktop)**, **Antigravity**, and any MCP-compatible client.

- **Source:** [github.com/ralphdp/Logos-Kernel](https://github.com/ralphdp/Logos-Kernel) (this server lives in the `mcp/` directory)
- **Code:** [MIT](LICENSE) — **Content / data / md:** [Logos Sovereign License (v1.0)](https://logos.pub/license). This package (Logos MCP Server) is under MIT.

---

## Requirements

- **Node.js 18+**

---

## Quick install (one config per client)

Run the server from the **Logos-Kernel** repo. After adding the config below, **restart your client** so it picks up the server.

### Cursor

1. **Settings** → **Features** → **MCP** → **Add New MCP Server**
2. Use either:

| Field   | Option A (npx from npm)   | Option B (local clone)            |
|---------|----------------------------|------------------------------------|
| Name    | `Logos`                    | `Logos`                            |
| Command | `npx`                     | `node`                             |
| Args    | `-y @ralphdp/logos-mcp-server@latest` | Full path to `mcp/build/index.js` (e.g. `/Users/you/Logos-Kernel/mcp/build/index.js`) |

For **Option B**, run from the repo root: `cd Logos-Kernel/mcp && npm install && npm run build`. Then use the full path to `mcp/build/index.js` in Args.

---

### Anthropic (Claude Desktop)

Edit your MCP config (e.g. `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS) and add:

**From local clone (recommended):**
```json
"logos": {
  "command": "node",
  "args": ["/ABSOLUTE/PATH/TO/Logos-Kernel/mcp/build/index.js"]
}
```

Put the `logos` entry inside `mcpServers`: `"mcpServers": { "logos": { ... } }`.

---

### Antigravity (Google)

Add an MCP server in Antigravity:

- **Command:** `node`
- **Args:** `/ABSOLUTE/PATH/TO/Logos-Kernel/mcp/build/index.js`

(Exact UI may vary; use “Add MCP server” or equivalent and fill command/args.)

---

## First-time setup (run from Logos-Kernel repo)

```bash
git clone https://github.com/ralphdp/Logos-Kernel.git
cd Logos-Kernel/mcp
npm install
npm run build
```

`prepare` runs `npm run build` on `npm install`, so the server is ready after install. Use the full path to **`mcp/build/index.js`** in your MCP client config (e.g. `/path/to/Logos-Kernel/mcp/build/index.js`).

---

## Provided tools

| Tool               | Description |
|--------------------|-------------|
| `logos_audit`      | Structural audit of a claim or text (Logos Three Canons). |
| `map_isomorphism`  | Structural parallels (isomorphisms) between two domains. |
| `audit_entropy`    | Description length and structural complexity (entropy) of code or text. |
| `verify_grammar`   | Validate code (ALSF); detect “Undefined Behavior” or “Sin”. |
| `detect_schism`    | State deviation in a distributed cluster; enforce Unity. |
| `system_status`    | Logos Kernel invariants status. |
| `logos_canons`    | Return the Three Canons (I Unity, II Parsimony, III Recursion) as structured data. |
| `logos_tiers`     | Return the tiers of the Logos (L0–L3) with definitions and operational meaning. |
| `logos_checklist` | Compact audit checklist (Canon I–III and failure mode) before finalizing an audit. |

**Terminal boundary:** The Public Kernel spec is closed at 3 Canons and 7 Principles. Beyond the blueprint lies the Sovereign Tier: Care (Canon IV, Principle 8), Provenance (9), Commit (10), and the Mirror (11). See [REFERENCE.md](https://github.com/ralphdp/Logos-Kernel/blob/main/REFERENCE.md) and [logos.pub/white-papers/logos-kernel](https://logos.pub/white-papers/logos-kernel).


## Resources

The server exposes **resources** (read-only references) that clients can list and read:

| URI                         | Description |
|-----------------------------|-------------|
| `logos://spec/definitions`     | Logos Kernel definitions (canons, tiers, notation, anatomy) from [spec/definitions.json](https://github.com/ralphdp/Logos-Kernel/blob/main/spec/definitions.json). |
| `logos://reference/catechism`   | [Catechism of the Catholic Church](https://www.usccb.org/sites/default/files/flipbooks/catechism/) (USCCB flipbook). |
| `logos://reference/summa`       | [Summa Theologica](https://archive.org/stream/summatheologicao004thom/summatheologicao004thom_djvu.txt) (Thomas Aquinas, Archive.org text). |
| `logos://reference/logos-license` | [Logos Sovereign License (v1.0)](https://logos.pub/license) and scope (logos.pub). |
| `logos://reference/primer`        | [De Paz Primer](https://logos.pub/primer) — formal initialization protocol, L0–L3 hierarchy. |

The Logos Protocol, Catechism (catechism), and Summa Theologica (summa) form the **canonical reference corpus** for theological anchoring.

Use the MCP **resources/list** and **resources/read** APIs to discover and fetch. The `logos://spec/definitions` resource is read from the repo when the server is run from **Logos-Kernel**; the server does not host or mirror full external content for the reference URIs.

---

## Prompts

The server provides **prompts** (templates) for common workflows:

| Prompt                    | Description | Arguments |
|---------------------------|-------------|-----------|
| `full_audit`             | Run a full Logos structural audit. | `content` (required), `context` (optional) |
| `map_isomorphism_prompt` | Map structural parallels between two domains. | `source`, `target` |
| `verify_grammar_prompt`  | Validate code against ALSF and detect unsafe patterns. | `code`, `language` |

Use the MCP **prompts/list** and **prompts/get** APIs to list and retrieve these prompts with arguments.

---

## References (external links)

- **Catechism of the Catholic Church (USCCB):** [https://www.usccb.org/sites/default/files/flipbooks/catechism/](https://www.usccb.org/sites/default/files/flipbooks/catechism/)
- **Summa Theologica (Thomas Aquinas, Archive.org):** [https://archive.org/stream/summatheologicao004thom/summatheologicao004thom_djvu.txt](https://archive.org/stream/summatheologicao004thom/summatheologicao004thom_djvu.txt)
- **Logos Protocol & license:** [https://logos.pub](https://logos.pub) — [license](https://logos.pub/license)

Linking to these URLs is for reference only; the server does not host or redistribute their content.

---

## About the Logos Protocol

The Logos Protocol defines three invariants (Three Canons) for structural reasoning and isomorphic mapping. For the full protocol and background, see [logos.pub](https://logos.pub).

**Protocol invariants (Base Layer)**

- **Canon I (Unity):** Every claim must be anchored.
- **Canon II (Parsimony):** Minimal description length.
- **Canon III (Recursion):** Self-describing logic.

---

## Development

```bash
npm install
npm run build
npm test
```

---

## Troubleshooting

- **Server not showing up in my client**  
  Restart the client (Cursor, Claude Desktop, or Antigravity) after changing MCP config.

- **“Command not found” or similar**  
  For **npx**: ensure Node.js 18+ is installed (`node -v`). For **local clone**: use the **full absolute path** to `build/index.js` and run `npm install` (and `npm run build` if needed) in the repo first.

- **npx from Git fails**  
  Check network access and that the repo URL is correct: `https://github.com/ralphdp/Logos-Kernel`. Prefer using the **local path** to `mcp/build/index.js` after cloning and building.

---

- **`logos://spec/definitions` returns empty or 404**  
  Run the server from the **Logos-Kernel** repo so that `mcp/build/index.js` can resolve `../../spec/definitions.json`. If you run the server from another directory, the spec resource may be unavailable.

- **npm publish fails with "Access token expired or revoked" or 404**  
  Re-authenticate with npm: run `npm login` and sign in (or create/use a token at [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)). Then from `mcp/` run `npm run build` and `npm publish`. If the package name is new, the first publish will create it; 404 often means npm rejected the request due to auth.

---
## License

- **Code (this repo and npm package):** MIT — see [LICENSE](LICENSE).
- **Content / data / documentation** under the Logos Project (e.g. papers, specs at logos.pub): **Logos Sovereign License (v1.0)** — see [logos.pub/license](https://logos.pub/license). Scope and definitions (Root Authorization, structural derivative): [license.md](https://github.com/ralphdp/Logos-Kernel/blob/main/license.md).
