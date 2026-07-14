import { readFile } from "node:fs/promises";

const projects = JSON.parse(await readFile(new URL("../src/data/projects.json", import.meta.url), "utf8"));
const urls = new Set();
for (const project of projects) {
  if (project.siteUrl) urls.add(project.siteUrl);
  if (project.githubUrl) urls.add(project.githubUrl);
  for (const version of project.versions ?? []) {
    if (version.siteUrl) urls.add(version.siteUrl);
    if (version.githubUrl) urls.add(version.githubUrl);
  }
}

const failures = [];
for (const url of urls) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "user-agent": "digital-intelligence-physics-lab-link-check" } });
    if (!response.ok) failures.push(url + " -> HTTP " + response.status);
    else console.log("ok", response.status, url);
  } catch (error) {
    failures.push(url + " -> " + error.message);
  } finally {
    clearTimeout(timer);
  }
}

if (failures.length) {
  for (const failure of failures) console.error("failed", failure);
  process.exit(1);
}
console.log("External links valid:", urls.size);
