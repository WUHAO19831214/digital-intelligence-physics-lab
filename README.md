# 数智物理实验室

“数智物理实验室（Digital Intelligence Physics Lab）”是一个独立、静态、可持续维护的个人项目门户，用于组织 GitHub 与 Netlify 上的物理实验、教学研究和个人学习工具。

## 本地开发

环境要求：Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

常用检查：

```bash
npm run validate-projects
npm run lint
npm run build
npm test
npm run check-links
```

`npm run build` 执行 Next.js 静态导出并生成 `out/`，随后自动生成带内联脚本 SHA-256 哈希的 `out/_headers`。部署必须包含此文件；不要直接上传未经完整构建的目录。如需验证 Sites/vinext 运行时，可单独执行 `npm run build:sites`。

## 新增项目

项目清单在 [`src/data/projects.json`](src/data/projects.json)、`projects.en.json` 与 `projects.ja.json` 中同步维护，页面布局会自动读取数据。

1. 复制一条现有项目记录，修改 `id`、`slug`、中文标题、分类、摘要、状态与标签。
2. 只有经过核验且可正常打开的生产地址才写入项目级 `siteUrl`。
3. GitHub 对应关系可靠时再填写 `githubUrl`；未填写时页面不会显示 GitHub 按钮。
4. 同一项目的教师端、学生端、研究版和旧版放进 `versions`，不要拆成多个首页项目。
5. 单 HTML 离线文件使用版本级 `downloadUrl`，指向已核验、固定版本的 GitHub Release 资产；不要将下载文件当作在线实验入口。
6. 用 `featured: true` 控制首页重点项目，用 `order` 控制人工排序。
7. 有真实项目截图时，将图片放在 `public/projects/`，并填写根路径形式的 `imageUrl` 和准确的 `imageAlt`；校验脚本会检查图片是否存在。
8. 运行 `npm run validate-projects`，确认没有重复 id/slug、错误分类、不合法 URL 或缺失图片。

建议状态：

- `active`：已核验的正式在线项目；必须有 `siteUrl`。
- `beta`：可体验但仍在研究或能力不完整。
- `prototype`：用于验证教学或交互思路的原型。
- `archived`：仅保留版本记录，默认不应成为首页入口。
- `unknown`：对应关系或能力暂时无法可靠确认。

## 修改、下架与版本迁移

- 更新说明：直接修改对应数据项，保持 `updatedAt` 为 `YYYY-MM-DD`。
- 暂停正式入口：删除项目级 `siteUrl`，将状态改为 `beta` 或 `prototype`，并在 `notice` 中说明原因。
- 归档旧版本：保留在 `versions` 中并设为 `archived`，不删除研究历程。
- 完全从目录隐藏：先在 Git 历史中保留记录，再删除对应数据项；不要因此删除原 GitHub 仓库或 Netlify 站点。
- 新增分类：同时更新 [`src/data/projects.ts`](src/data/projects.ts) 的 `categories` 和 `scripts/validate-projects.mjs` 的允许分类列表。

## 部署

EdgeOne Makers 配置位于 [`edgeone.json`](edgeone.json)：生产分支为 `main`，构建命令为 `npm run build`，发布目录为 `out`。完整操作与故障排查见 [`docs/EDGEONE_DEPLOYMENT.md`](docs/EDGEONE_DEPLOYMENT.md)。

Netlify 配置位于 [`netlify.toml`](netlify.toml)，同样使用静态导出目录 `out`。

门户不在前端读取 GitHub Token、Netlify Token 或其他私人密钥。外部项目链接默认在新标签页打开，并使用 `noopener noreferrer`。

## 内容边界

该仓库仅包含门户代码和经过审计的项目元数据，不复制、修改或覆盖任何现有子项目、GitHub 仓库与 Netlify 站点。

## 安全维护（2026-10-03）

- 仅向 Netlify 发布 `out/` 静态文件，不上传源码、依赖、环境变量或备用 Worker。
- 构建生成的 CSP 禁止任意内联脚本、eval、第三方脚本、表单提交和页面嵌入；现有动态样式保留兼容。Netlify 同时配置 `X-Frame-Options: DENY`。
- 中英日数据校验覆盖可信站点、GitHub 所有者、固定版本下载链接和语言间结构一致性。新增站点时需核验后手工更新 `scripts/project-validation.mjs` 的允许列表。
- `npm run audit:production` 必须通过。全量审计当前保留 8 项开发依赖高危告警，来自未修复的 `braces` 链；不执行强制降级。开发服务器只应供本机使用，构建只处理受信任仓库内容，不将这些工具对公网提供服务。
- 已有 `.workflow/cloudflare-pages-main.yml` 为 Gitee 风格流水线，并非 GitHub Actions。本次保留其历史配置，仅发布 Netlify；未同步或执行 Gitee/Cloudflare 部署。
- 薄膜平整度恢复站点暂不收录。

完整执行记录见 `docs/MAINTENANCE_2026-10-03.md`。
