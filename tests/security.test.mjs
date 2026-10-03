import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { validProjectUrl, validateProjectData } from "../scripts/project-validation.mjs";

test("rejects hostile external addresses and accepts pinned offline downloads", () => {
  for (const url of ["javascript:alert(1)", "http://github.com/WUHAO19831214/repo", "https://github.com.evil.example/WUHAO19831214/repo", "https://github.com/another-user/repo", "https://secret@github.com/WUHAO19831214/repo", "https://github.com:8443/WUHAO19831214/repo", "https://github.com/WUHAO19831214/repo?token=secret"]) assert.equal(validProjectUrl(url,"githubUrl"),false,url);
  assert.equal(validProjectUrl("https://unverified-site.netlify.app/", "siteUrl"),false);
  assert.equal(validProjectUrl("https://github.com/WUHAO19831214/repo/releases/download/v1/offline.html","downloadUrl"),true);
  assert.equal(validProjectUrl("https://github.com/WUHAO19831214/repo/releases/latest/download/offline.html","downloadUrl"),false);
});

test("rejects localization link drift and path traversal", async () => {
  const source = JSON.parse(await readFile("src/data/projects.json","utf8"));
  const localized = structuredClone(source);
  localized[0].versions[0].siteUrl = "https://charles-law-isochoric-lab.netlify.app/";
  assert.ok(validateProjectData(localized,source).some(e=>e.includes("mismatched version")));
  const unsafe = structuredClone(source); unsafe[0].imageUrl = "/projects/../../.env";
  assert.ok(validateProjectData(unsafe).some(e=>e.includes("invalid image path")));
});

test("every exported inline script is covered by the enforced CSP", async () => {
  const headers = await readFile("out/_headers","utf8");
  const policy = headers.split("Content-Security-Policy: ")[1].trim();
  const scriptDirective = policy.split(";").find(p=>p.trim().startsWith("script-src "));
  assert.doesNotMatch(scriptDirective,/unsafe-inline|unsafe-eval/);
  assert.match(policy,/frame-ancestors 'none'/); assert.match(policy,/object-src 'none'/); assert.match(policy,/form-action 'none'/);
  let checked=0;
  async function walk(path) {
    for (const e of await readdir(path,{withFileTypes:true})) {
      const file=join(path,e.name);
      if(e.isDirectory()) await walk(file);
      else if(e.name.endsWith(".html")) {
        const html=await readFile(file,"utf8");
        assert.doesNotMatch(html,/questionscope|thin-film-flatness/);
        for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
          if(!/\bsrc\s*=/i.test(m[1])&&m[2]) {
            const hash=createHash("sha256").update(m[2]).digest("base64");
            assert.ok(scriptDirective.includes(`'sha256-${hash}'`),file); checked++;
          }
        }
      }
    }
  }
  await walk("out"); assert.ok(checked>0);
});

test("new project pages and offline entry are present in the export", async () => {
  const directory=await readFile("out/projects/index.html","utf8");
  for(const slug of ["isochoric-gas-workbench","arc-track-force-demo","physics-software-sensors","classroom-signal-console"]) {
    assert.ok(directory.includes(`/projects/${slug}/`));
    const html=await readFile(`out/projects/${slug}/index.html`,"utf8");
    assert.match(html,/GitHub/);
  }
  const ampere=await readFile("out/projects/ampere-force-platform/index.html","utf8");
  assert.match(ampere,/下载离线 HTML/); assert.match(ampere,/v0\.1\.0-offline\.1/);
});
