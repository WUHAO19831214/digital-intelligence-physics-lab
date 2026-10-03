import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Hash the exact inline scripts in the static export; never permit unsafe-inline
// or unsafe-eval scripts. Generate this only after Next finishes the export.
export async function secureExport(directory = "out") {
  const hashes = new Set();
  let pages = 0;
  async function walk(path) {
    for (const entry of await readdir(path, { withFileTypes: true })) {
      const file = join(path, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Symlink in static export: ${file}`);
      if (entry.isDirectory()) await walk(file);
      else if (entry.name.endsWith(".html")) {
        pages++;
        const html = await readFile(file, "utf8");
        for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
          if (!/\bsrc\s*=/i.test(match[1]) && match[2]) {
            hashes.add(`'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`);
          }
        }
      }
    }
  }
  await walk(directory);
  if (!pages || !hashes.size) throw new Error("Static export has no pages or script hashes");
  const policy = [
    "default-src 'none'", "base-uri 'none'", "object-src 'none'",
    "frame-ancestors 'none'", "frame-src 'none'", "form-action 'none'",
    `script-src 'self' ${[...hashes].sort().join(" ")}`,
    "script-src-attr 'none'", "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:", "font-src 'self'", "connect-src 'self'",
    "manifest-src 'self'", "worker-src 'none'", "upgrade-insecure-requests",
  ].join("; ");
  await writeFile(join(directory, "_headers"), `/*\n  Content-Security-Policy: ${policy}\n`);
  console.log(`Secured ${pages} HTML files with ${hashes.size} inline script hashes.`);
  return { pages, hashes: [...hashes], policy };
}

if (process.argv[1]?.endsWith("secure-export.mjs")) await secureExport();
