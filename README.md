# Radix Primitives 中文站

Radix Primitives 的中文文档与可操作示例，基于 Astro 构建的静态站点。

内容译自 [Radix Primitives 官方文档](https://www.radix-ui.com/primitives/docs/overview/introduction)。组件与部件清单不是手写的：`scripts/extract-parts.mjs` 从已安装的 `radix-ui@1.8.1` 包的公开 `export` 语句中抽取。

## 技术栈

- Astro 7（静态输出）+ MDX 内容集合
- React 19 islands（`radix-ui` 1.8.1 真实组件）
- Tailwind CSS 4 + 自定义 Radix 风格令牌
- 自托管 Inter / JetBrains Mono 可变字体

## 环境

- Node.js ≥ 22.12
- Bun 1.4（`bun.lock` 为唯一锁文件）

```bash
bun install
bun run dev        # 本地开发
bun run build      # 生成静态站点到 dist/
bun run preview    # 预览 dist/
```

## 常用脚本

| 命令 | 作用 |
| --- | --- |
| `bun run check` | `astro check`，检查 Astro/TS/TSX 类型 |
| `bun run sync:parts` | 从 node_modules 重新抽取部件清单，写入 `src/data/parts.json` |
| `bun run count:categories` | 打印各分类组件数与部件总数，核对文档表格 |
| `bun run verify:links` | 检查 `dist/` 的站内链接、锚点与资源，需先构建 |
| `bun run verify:hydration [base]` | 用无头 Chrome 检查每个页面的 island 是否水合 |
| `bun run verify:interactions [base]` | 用真实指针/键盘事件验证关键交互 |

`verify:hydration` 与 `verify:interactions` 需要本机安装 Chrome / Edge / Chromium，并先启动一个预览服务。base 也可以用 `BASE_URL` 环境变量传入：

```bash
bun run preview
BASE_URL=http://localhost:4321 bun run verify:hydration
BASE_URL=http://localhost:4321 bun run verify:interactions
```

## 目录

```text
src/
  components/    React islands 与 Astro 包装组件
  content/docs/  MDX 文档
  data/          组件元数据与由脚本生成的 parts.json
  layouts/       Base / Site / Doc 布局
  pages/         首页、组件索引、文档路由、404、robots
  styles/        global.css 与 playground.css
scripts/         部件抽取与浏览器验证脚本
assets/          credits.json（图片出处与许可证）
public/          静态资源（图片、favicon）
```

## 部署

站点通过 GitHub Actions 部署到 GitHub Pages，线上地址为 <https://primitives.ndjp.net>。推送到 `main` 或手动触发 `Deploy` 工作流即可发布，构建时自动传入 `SITE_URL`。

- `public/CNAME` 固定自定义域名，Astro 构建时原样复制到产物根目录。
- DNS：`primitives.ndjp.net` 指向 GitHub Pages 的 A 记录（`185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`）。
- 本地构建若要输出 canonical、Open Graph URL 与 `sitemap-index.xml`，需手动传入站点地址：

  ```bash
  SITE_URL=https://primitives.ndjp.net bun run build
  ```

不传 `SITE_URL` 时也能正常构建，只是不生成 canonical 与 sitemap；`robots.txt` 会在未配置站点地址时省略 Sitemap 行。

## 图片许可

页面中的照片来自 Wikimedia Commons，单独按 Creative Commons 条款授权，具体作者、许可证与来源见每页图注及 [`assets/credits.json`](assets/credits.json)。

## 许可证

代码与文档以 MIT 许可证发布，详见 [LICENSE](LICENSE)。上游 Radix Primitives 的版权归 WorkOS 所有。
