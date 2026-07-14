import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost" + pathname, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished portal homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /数智物理实验室/);
  assert.match(html, /Digital Intelligence Physics Lab/);
  assert.match(html, /安培力三维可视化与实验教学平台/);
  assert.match(html, /FringeLab/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("renders project directory and detail routes", async () => {
  const directory = await render("/projects/");
  assert.equal(directory.status, 200);
  assert.match(await directory.text(), /项目目录/);

  const detail = await render("/projects/ampere-force-platform/");
  assert.equal(detail.status, 200);
  const html = await detail.text();
  assert.match(html, /正式入口/);
  assert.match(html, /学生端 V2/);
  assert.match(html, /版本与研究历程/);

  const fringeDetail = await render("/projects/webcam-laser-fringelab/");
  assert.equal(fringeDetail.status, 200);
  const fringeHtml = await fringeDetail.text();
  assert.match(fringeHtml, /激光干涉与衍射智能分析平台/);
  assert.match(fringeHtml, /Fresnel 数/);
  assert.match(fringeHtml, /摄像头模式需要 HTTPS/);
  assert.doesNotMatch(fringeHtml, /GitHub 仓库/);
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
