import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

function exportedPageUrl(pathname = "/") {
  const normalized = pathname === "/" ? "" : pathname.replace(/^\/|\/$/g, "") + "/";
  return new URL(`../out/${normalized}index.html`, import.meta.url);
}

async function readExportedPage(pathname = "/") {
  return readFile(exportedPageUrl(pathname), "utf8");
}

test("statically exports the finished portal homepage", async () => {
  const html = await readExportedPage();
  assert.match(html, /数智物理实验室/);
  assert.match(html, /Digital Intelligence Physics Lab/);
  assert.match(html, /安培力三维可视化与实验教学平台/);
  assert.match(html, /FringeLab/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("exports project directory and every detail route as an index file", async () => {
  const directoryHtml = await readExportedPage("/projects/");
  assert.match(directoryHtml, /项目目录/);

  const html = await readExportedPage("/projects/ampere-force-platform/");
  assert.match(html, /正式入口/);
  assert.match(html, /学生端 V2/);
  assert.match(html, /版本与研究历程/);

  const fringeHtml = await readExportedPage("/projects/webcam-laser-fringelab/");
  assert.match(fringeHtml, /激光干涉与衍射智能分析平台/);
  assert.match(fringeHtml, /Fresnel 数/);
  assert.match(fringeHtml, /摄像头模式需要 HTTPS/);
  assert.doesNotMatch(fringeHtml, /GitHub 仓库/);

  const data = JSON.parse(await readFile(new URL("../src/data/projects.json", import.meta.url), "utf8"));
  await Promise.all(data.map((project) => access(exportedPageUrl(`/projects/${project.slug}/`))));
});

test("exports static assets and fallback pages at stable root-relative paths", async () => {
  await Promise.all([
    access(new URL("../out/404.html", import.meta.url)),
    access(new URL("../out/404/index.html", import.meta.url)),
    access(new URL("../out/og.png", import.meta.url)),
    access(new URL("../out/projects/webcam-laser-fringelab.png", import.meta.url)),
  ]);

  const fringeHtml = await readExportedPage("/projects/webcam-laser-fringelab/");
  assert.match(fringeHtml, /\/projects\/webcam-laser-fringelab\.png/);
  assert.match(fringeHtml, /\/_next\/static\//);
});

test("keeps project data centralized and excludes broken formal links", async () => {
  const data = JSON.parse(await readFile(new URL("../src/data/projects.json", import.meta.url), "utf8"));
  assert.equal(data.length, 11);
  const serialized = JSON.stringify(data);
  assert.doesNotMatch(serialized, /audio-visual-soundfield-tracker\.netlify\.app/);
  assert.doesNotMatch(serialized, /3d3polarizer\.netlify\.app/);
  assert.equal(new Set(data.map((project) => project.slug)).size, data.length);
  const fringe = data.find((project) => project.slug === "webcam-laser-fringelab");
  assert.equal(fringe.status, "active");
  assert.equal(fringe.featured, true);
  assert.equal(fringe.githubUrl, undefined);
  assert.equal(fringe.repositoryName, "WUHAO19831214/webcam-laser-fringelab");
});
