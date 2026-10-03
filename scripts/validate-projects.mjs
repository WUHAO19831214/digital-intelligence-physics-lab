import { access, readFile } from "node:fs/promises";
import { validateProjectData, categories } from "./project-validation.mjs";
const read = async (suffix = "") => JSON.parse(await readFile(new URL(`../src/data/projects${suffix}.json`, import.meta.url), "utf8"));
const source = await read();
const errors = validateProjectData(source);
for (const suffix of [".en", ".ja"]) errors.push(...validateProjectData(await read(suffix), source).map(e=>`${suffix}: ${e}`));
for (const p of source) {
  if (p.imageUrl && /^\/projects\/[\w.-]+\.(png|jpe?g|webp)$/.test(p.imageUrl)) {
    try { await access(new URL(`../public${p.imageUrl}`, import.meta.url)); }
    catch { errors.push(`${p.id}: image file missing`); }
  }
}
if (errors.length) { errors.forEach(e=>console.error(e)); process.exit(1); }
console.log(`Validated ${source.length} project families in all three languages and ${categories.size} categories.`);
