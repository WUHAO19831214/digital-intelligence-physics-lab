# EdgeOne Makers 部署说明

## 部署架构

项目采用以下发布链路：

```text
本地开发 → GitHub → Gitee → EdgeOne Makers
```

- GitHub 保存主代码仓库。
- Gitee 同步同一份代码，供中国大陆网络环境下的代码托管与 EdgeOne Makers 拉取。
- EdgeOne Makers 连接 Gitee 仓库的 `main` 分支，并在该分支更新时自动构建和部署。

## 生产配置

- 生产分支：`main`
- Node.js：`22.17.1`
- 安装命令：`npm ci`
- 构建命令：`npm run build`
- 输出目录：`out`
- Next.js 模式：静态导出（`output: "export"`）
- 路由格式：目录式 HTML，启用 `trailingSlash`

项目不需要 API Routes、Server Actions、SSR、动态服务端渲染或常驻 Node.js 服务。所有项目详情页均由 `generateStaticParams` 在构建阶段生成。

## 当前部署状态

EdgeOne Makers 已连接 Gitee 的 `main` 分支，生产部署已经成功，首页、项目目录和项目详情页均可正常加载。后续推送到 `main` 会自动触发新的生产构建与部署。

### 为什么默认地址只有 3 小时

腾讯云中国站为未绑定自定义域名的 Makers 项目提供带 `eo_token` 和 `eo_time` 参数的限时预览地址。该地址用于部署验证，默认只在三小时内有效，不应作为长期生产入口。

正式长期访问必须绑定用户拥有并可管理 DNS 的自定义域名。

## 中国大陆访问与 ICP 备案

如果项目使用包含中国大陆的加速区域，并希望通过自定义域名长期、稳定地向中国大陆用户提供服务，绑定域名前需要按腾讯云要求完成域名实名认证和 ICP 备案。

域名购买、实名认证、ICP 备案、证件上传、人脸核验、备案确认、控制台域名绑定和 DNS 修改必须由域名及腾讯云账户持有人完成。

## 自定义域名绑定后的更新方式

绑定完成后，日常更新流程不变：

```text
推送 main → EdgeOne 自动构建 → 自定义域名自动更新
```

不需要每次重新绑定域名。部署成功后，新版本会替换生产环境内容，自定义域名继续指向该生产环境。

## 本地验证

使用与生产一致的安装和构建流程：

```bash
npm ci
npm run build
npm test
```

成功标准：

1. `npm run build` 退出状态为 0。
2. 根目录生成 `out/`。
3. `out/index.html`、`out/projects/index.html`、`out/about/index.html` 存在。
4. 每个项目 slug 均生成 `out/projects/<slug>/index.html`。
5. `out/_next/static/`、`out/og.png` 和 `out/projects/` 中的公开资源存在。

## 故障排查

### 构建失败

1. 确认 Node.js 版本满足 `package.json`，EdgeOne 使用 `22.17.1`。
2. 本地运行 `npm ci`，确认锁文件和依赖一致。
3. 运行 `npm run validate-projects`，修复项目数据、URL 或图片校验错误。
4. 运行 `npm run build`，根据第一条实际错误修复，不要只处理后续连锁错误。
5. 对照 EdgeOne 构建日志中的提交 SHA，确认平台拉取的是预期版本。

### `out` 目录未生成

1. 确认 `next.config.ts` 中保留 `output: "export"`。
2. 确认构建命令是 `npm run build`。
3. 删除本地旧的 `.next/` 和 `out/` 后重新构建。
4. 确认构建过程中没有出现静态导出不支持的 API、SSR 或动态路由错误。

### 子页面刷新 404

1. 确认 `trailingSlash: true` 未被删除。
2. 确认对应路径生成了 `out/<route>/index.html`。
3. 动态项目详情页必须继续由 `generateStaticParams` 返回完整 slug。
4. EdgeOne 输出目录必须是 `out`，不要指向 `.next`。
5. 不要为静态详情页添加未经验证的 SPA 回退重写。

### 静态资源路径错误

1. 保持站点部署在域名根路径，不设置 `basePath`。
2. 未经验证不要设置 `assetPrefix`。
3. `public/` 资源使用以 `/` 开头的根路径。
4. 检查 `out/_next/static/`、`out/og.png` 和项目图片是否实际存在。
5. 浏览器开发者工具中检查 404 资源的请求路径是否与 `out/` 目录结构一致。

### 域名 DNS 验证失败

1. 使用 EdgeOne 控制台显示的最新验证记录，不复用旧值。
2. 在域名 DNS 服务商处确认主机记录、记录类型和值完全一致。
3. 删除同一主机名下冲突的 CNAME、A 或 AAAA 记录。
4. 等待 DNS TTL 生效后再次验证。
5. 使用公共 DNS 查询工具确认记录已在公网传播。

### HTTPS 证书未签发

1. 确认域名归属权和 DNS 验证已经完成。
2. 确认 CNAME 指向 EdgeOne 提供的目标且没有被代理或错误解析。
3. 检查域名是否满足腾讯云证书和备案要求。
4. 等待证书状态从签发中变为已生效。
5. 若长时间失败，保留控制台错误信息并提交腾讯云工单。

## 权限边界

Codex 可以检查和修改项目代码、验证静态导出、提交并推送 GitHub/Gitee，并检查 EdgeOne 自动部署状态。

以下操作必须由账户持有人完成，除非另行提供明确授权和必要的账户访问：

- 购买域名；
- 域名实名认证；
- ICP 备案；
- 上传身份证件或进行人脸核验；
- 在腾讯云控制台绑定自定义域名；
- 修改域名 DNS；
- 申请或确认备案。
