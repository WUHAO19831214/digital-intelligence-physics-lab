const statuses = new Set(["active", "beta", "prototype", "archived", "unknown"]);
const roles = new Set(["teacher", "student", "prototype", "legacy", "research", "stable"]);
export const categories = new Set(["digital-experiments", "electromagnetism-3d", "optics-mr", "teaching-tools", "personal-tools"]);
const siteHosts = new Set([
  "ampere-force-visualizer-teacher-yanan.netlify.app", "ampere-force-student-explorer-yananv2.netlify.app",
  "ampere-force-student-explorer-yanan.netlify.app", "physics-force-vector-visualizer-mvp-y.netlify.app",
  "physics-force-vector-visualizer-mvp.netlify.app", "webcam-laser-fringelab.netlify.app",
  "dual-camera-acoustic-marker-tracker-a.netlify.app", "dual-camera-acoustic-marker-tracker.netlify.app",
  "fspot-vibration-tracking-system.netlify.app", "forced-vibration-af-analyzer.netlify.app",
  "3dpolarizer2.netlify.app", "pdfocrtotxt.netlify.app", "resplendent-caramel-cff4b6.netlify.app",
  "physics-mr-lab-development.netlify.app", "local-textbook-structure2.netlify.app", "nihongo-master.netlify.app",
  "charles-law-isochoric-lab.netlify.app", "isochoric-gas-workbench-c-kimi-k3.netlify.app",
  "wuhao19831214.github.io",
]);
export function validProjectUrl(value, field) {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port || url.search || url.hash) return false;
    if (field === "siteUrl") return siteHosts.has(url.hostname);
    if (url.hostname !== "github.com" || !/^\/WUHAO19831214\/[\w.-]+(?:\/|$)/.test(url.pathname)) return false;
    if (field === "githubUrl") return /^\/WUHAO19831214\/[\w.-]+\/?$/.test(url.pathname);
    return field === "downloadUrl" && /^\/WUHAO19831214\/[\w.-]+\/releases\/download\/[\w.-]+\/[\w.-]+\.html$/.test(url.pathname);
  } catch { return false; }
}
export function validateProjectData(data, source) {
  const errors = [];
  const ids = new Set(), slugs = new Set();
  if (!Array.isArray(data)) return ["project data must be an array"];
  for (const [i, p] of data.entries()) {
    const label = p.id ?? `project ${i}`;
    for (const f of ["id", "slug", "title", "category", "summary", "status"]) {
      if (typeof p[f] !== "string" || !p[f].trim()) errors.push(`${label}: missing ${f}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug ?? "")) errors.push(`${label}: invalid slug`);
    if (ids.has(p.id) || slugs.has(p.slug)) errors.push(`${label}: duplicate id/slug`);
    ids.add(p.id); slugs.add(p.slug);
    if (!categories.has(p.category) || !statuses.has(p.status)) errors.push(`${label}: invalid category/status`);
    if (p.status === "active" && !p.siteUrl) errors.push(`${label}: active project requires siteUrl`);
    if (typeof p.featured !== "boolean" || !Number.isFinite(p.order)) errors.push(`${label}: invalid display fields`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.updatedAt ?? "") || Number.isNaN(Date.parse(p.updatedAt)) || new Date(p.updatedAt).toISOString().slice(0, 10) !== p.updatedAt) errors.push(`${label}: invalid updatedAt`);
    if (p.imageUrl && !/^\/projects\/[\w.-]+\.(png|jpe?g|webp)$/.test(p.imageUrl)) errors.push(`${label}: invalid image path`);
    if (p.imageUrl && !p.imageAlt) errors.push(`${label}: missing imageAlt`);
    for (const [j, item] of [p, ...(p.versions ?? [])].entries()) {
      for (const f of ["siteUrl", "githubUrl", "downloadUrl"]) {
        if (item[f] !== undefined && !validProjectUrl(item[f], f)) errors.push(`${label}.${j}: untrusted ${f}`);
      }
      if (j && (!statuses.has(item.status) || (item.role && !roles.has(item.role)))) errors.push(`${label}.${j}: invalid version`);
    }
    if (source) {
      const original = source[i];
      if (!original) { errors.push(`${label}: extra localized project`); continue; }
      for (const f of ["id", "slug", "category", "status", "featured", "order", "updatedAt", "siteUrl", "githubUrl", "repositoryName", "netlifySiteName", "imageUrl"]) {
        if (p[f] !== original[f]) errors.push(`${label}: mismatched ${f}`);
      }
      for (const f of ["audiences", "tags", "capabilities", "teachingValue", "scenarios", "technicalHighlights", "roadmap", "versions"]) {
        if ((p[f]?.length ?? 0) !== (original[f]?.length ?? 0)) errors.push(`${label}: mismatched ${f} length`);
      }
      for (const [j,v] of (p.versions??[]).entries()) {
        for (const f of ["siteUrl", "githubUrl", "downloadUrl", "role", "status"]) {
          if (v[f] !== original.versions?.[j]?.[f]) errors.push(`${label}: mismatched version ${j}.${f}`);
        }
      }
    }
  }
  if (source && data.length !== source.length) errors.push("localized project count differs");
  return errors;
}
