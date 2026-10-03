# 门户维护执行记录 · 2026-10-03

用户已确认更新，明确排除“薄膜平整度”。本轮只维护门户，未修改子项目源码、发布状态、平台权限或私有仓库可见性。

## 已完成内容

- 项目家族从 12 个增至 16 个：气体等容工作台（两个版本）、圆弧轨道受力演示器、物理实验软件传感器库、课堂脉搏。
- OCR Builder 列为教材工作台配套版本。补充公式/Word 导出、安培力学生端固定版本单 HTML 下载、振动传感器回放适配器、另一双摄部署版本及教师调查 v2.0。
- 补齐 FringeLab、PDF OCR、教材工作台仓库映射，修正过时私有/失效描述，保留本地运行与研究边界。
- 中英日资料同步。薄膜平整度及其原作者资源链接均未收录。
- Next.js 16.3.8，React/React DOM/RSC 19.3.0，Vite 8.3.2，vinext 1.0.1，Wrangler 4.147.0，Cloudflare 插件 1.62.5，Tailwind 4.3.3；锁定版本。fflate 固定同分支修复版 0.7.5。

## 安全加固

- 保持静态导出，每次构建自动计算全部内联脚本 SHA-256，并生成 out/_headers 的 CSP。脚本禁用 unsafe-inline/unsafe-eval；禁止第三方资源、脚本属性、嵌入、对象加载和表单提交。样式保留 unsafe-inline 以兼容现有界面。
- 增加 X-Frame-Options: DENY，保留 nosniff、Referrer-Policy、Permissions-Policy；生产安全头已验证。
- 元数据新增准确站点允许列表、GitHub 所有者与固定 Release 下载限制，拒绝 URL 凭据、参数和非默认端口；限制图片路径，并验证三语言结构/链接一致。
- 修正 lint 生成目录忽略配置，将源码 build/sites-vite-plugin.ts 纳入检查。
- 在隔离发布目录中仅上传 124 个静态文件和头部配置，显式使用空函数目录。不上传源码、依赖、环境变量或备用 Worker。平台函数查询返回空对象，未观察到函数列表。
- 已快进同步远端两个历史提交。其 .workflow 是 Gitee 风格，不作为 GitHub Actions 执行；本轮保留历史配置，未向 Gitee 推送或执行 Cloudflare 部署。

## 依赖审计与局限

全量 audit 从 28 项降至 8 项，生产依赖从 5 项降至 0。剩余 8 个 high 依赖包告警沿 braces 3.0.3 链传播，涉及 ESLint 和备用 vinext 工具链；当前官方版本无已发布修复，不采用 audit fix --force 的降级建议。

开发工具仅处理可信仓库内容，不向公网提供服务，也不随静态网站部署。此风险仍需后续跟进。零生产依赖告警不等于网站绝对安全；本次也不构成所有子项目和账号的完整安全审计。

## 验证结果

- 三语言校验、lint、Next.js 静态构建、TypeScript 检查：通过。
- 自动化测试 9/9：新增页面、下载入口、导出脚本 CSP 覆盖、恶意 URL 拒绝、语言链接漂移及图片路径穿越。
- 备用 build:sites 构建通过，无部署。
- 46 个去重项目外链含固定离线资产均 HEAD 200。
- 预览中英日切换、搜索、客户端详情导航、版本折叠与下载链接通过；浏览器无 error/warn。
- 生产站 19 个页面均 HTTP 200。Netlify 插入了固定平台说明 HTML 注释；仅移除这一准确注释后，全部页面 SHA-256 与已验证本地构建一致。
- 全部生产页面内联脚本均被 CSP 哈希覆盖，DENY 头生效，未含排除项目。4 个敏感路径均 404。
- 正式站浏览器复核和截图完成。

## 部署与回滚

正式站：https://digital-intelligence-physics-lab.netlify.app

新生产部署：`6ac0b663acb1d8631024b364`，平台发布时间（UTC）：`2026-10-03T08:01:41.070Z`（北京时间 16:01:41）。

部署详情：https://app.netlify.com/projects/digital-intelligence-physics-lab/deploys/6ac0b663acb1d8631024b364

预览部署：`6ac0b5bb5b9257bbf9735f94`。旧生产部署 `6a71eac01afc762d81fe83ee` 保留，可在 Netlify 重新发布用于回滚。

后续内容更改必须重新完整构建，以生成匹配的 CSP 哈希。

## MR 光学实验室新入口同步

用户补充授权后，已将 https://physics-mr-lab.netlify.app/ 设为 MR 光学实验室在线入口，同步中英日资料，更新资料日期为 2026-10-03。旧 physics-mr-lab-development 入口保留为历史归档版本。

新站映射到同一公开仓库，发布源码提交为 `366181e6ac12c65688ced457802b1939d9b7e5e1`。本次是入口同步，不宣称自动分析能力升级。保留研究测试状态及“自动 OpenCV 分析需要本机 FastAPI 后端”说明。薄膜平整度继续排除。

精确主机允许列表新增 physics-mr-lab.netlify.app。完整静态重建并重新计算 CSP 哈希；构建、lint、TypeScript、9 项测试通过。预览三语言切换通过，预览和正式页浏览器无 error/warn。正式首页、目录、MR 详情均 HTTP 200，内容与本地导出一致（仅移除准确的 Netlify 平台注释），全部内联脚本被 CSP 覆盖，DENY 头生效；4 个敏感路径为 404。

预览部署：`6ac0b9d190c8c0966428b5ad`。正式部署：`6ac0ba0845051f937cf6fd5a`。上一正式部署 `6ac0b663acb1d8631024b364` 保留，可回滚。仍使用隔离目录、空函数目录、仅静态文件发布。

部署详情：https://app.netlify.com/projects/digital-intelligence-physics-lab/deploys/6ac0ba0845051f937cf6fd5a
