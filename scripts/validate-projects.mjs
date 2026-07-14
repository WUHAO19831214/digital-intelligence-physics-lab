import { access, readFile } from "node:fs/promises";

const projects = JSON.parse(await readFile(new URL("../src/data/projects.json", import.meta.url), "utf8"));
const allowedStatuses = new Set(["active", "beta", "prototype", "archived", "unknown"]);
const allowedCategories = new Set(["digital-experiments", "electromagnetism-3d", "optics-mr", "teaching-tools", "personal-tools"]);
const ids = new Set();
const slugs = new Set();
const errors = [];
const warnings = [];

function validUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

for (const [index, project] of projects.entries()) {
  const label = project.title || project.slug || "project #" + (index + 1);
  for (const field of ["id", "slug", "title", "category", "summary", "status"]) {
    if (!project[field]) errors.push(label + ": missing " + field);
  }
  if (ids.has(project.id)) errors.push(label + ": duplicate id " + project.id);
  if (slugs.has(project.slug)) errors.push(label + ": duplicate slug " + project.slug);
  ids.add(project.id);
  slugs.add(project.slug);
  if (!allowedCategories.has(project.category)) errors.push(label + ": invalid category " + project.category);
  if (!allowedStatuses.has(project.status)) errors.push(label + ": invalid status " + project.status);
  if (project.status === "active" && !project.siteUrl) errors.push(label + ": active project requires siteUrl");
  for (const field of ["siteUrl", "githubUrl"]) {
    if (project[field] && !validUrl(project[field])) errors.push(label + ": invalid HTTPS URL in " + field);
  }
  if (project.imageUrl) {
    if (!project.imageUrl.startsWith("/")) errors.push(label + ": imageUrl must be a root-relative path");
    if (!project.imageAlt) errors.push(label + ": imageAlt is required when imageUrl is present");
    try {
      await access(new URL("../public" + project.imageUrl, import.meta.url));
    } catch {
      errors.push(label + ": image file not found at public" + project.imageUrl);
    }
  }
  if (!project.siteUrl) warnings.push(label + ": no formal online entry; card will show details only");
  if (!project.githubUrl) warnings.push(label + ": no reliable GitHub mapping; GitHub button will be hidden");
  for (const version of project.versions ?? []) {
    if (!allowedStatuses.has(version.status)) errors.push(label + ": invalid version status " + version.status);
    for (const field of ["siteUrl", "githubUrl"]) {
      if (version[field] && !validUrl(version[field])) errors.push(label + ": invalid version URL in " + field);
    }
  }
}

for (const warning of warnings) console.warn("warning:", warning);
if (errors.length) {
  for (const error of errors) console.error("error:", error);
  process.exit(1);
}
console.log("Project data valid:", projects.length, "project families,", allowedCategories.size, "categories.");
