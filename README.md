# 小丰收 · 使用说明

> 当前样式：**现代圆角版（v2）** —— 大圆角、2px 描边、硬边投影、荧光笔高亮。
> 上一版“米白纸感手账风”的整站压缩包保留为 `xiaofengshou-v1-手账风.zip`。

> 所有微小而确定的小丰收，都值得装进人生的粮仓！
> 草木、水与指尖的日常记录 —— 纯 HTML / CSS / 原生 JS，无生成器、无框架、无构建。

---

## 1. 目录结构

```
用户名.github.io/          ← 仓库根目录，直接放这些文件
├── index.html             # 首页：站点名 + Slogan + 三个栏目卡片 + 最新文章
├── plants.html            # 栏目页 01 草木生欢喜
├── fish.html              # 栏目页 02 水中小世界
├── guitar.html            # 栏目页 03 指尖流水（吉他笔记）
├── about.html             # 关于页
├── header.html            # 公共导航（片段，由 JS fetch 引入）
├── footer.html            # 公共页脚（片段，由 JS fetch 引入）
├── post-plants-hydro.html     # 文章：五个水培瓶（合果芋 / 小仙女 / 山乌龟 / 大蒜 / 绿萝）
├── post-fish-gufa.html        # 文章：古法缸（斑马鱼 / 观背青鳉 / 高珍珠 / 火焰红丁香）
├── post-guitar-qiandou.html   # 文章：前奏、弹唱与基础乐理
├── assets/
│   ├── css/
│   │   └── style.css      # 全站样式（颜色用 CSS 变量，顶部统一改）
│   ├── js/
│   │   └── common.js      # 引入导航/页脚、当前页高亮、页脚年份
│   └── img/               # 示例配图（可换成你自己的图床外链）
│       ├── hydroponic-bottles.jpg
│       ├── aquarium.jpg
│       └── guitar-neck.jpg
└── README.md              # 就是本文件，可删
```

**为什么所有页面都放在根目录？** 因为文章页和栏目页同级，链接永远是 `./xxx.html`，
不用出现 `../`，子路径部署也不会 404。想改成 `posts/` 子目录也可以，但要把文章页里的
`./assets/...` 改成 `../assets/...`，`./header.html` 改成 `../header.html`，所有站内链接都要补 `../`，
不如现在这样省心。

---

## 2. 本地预览（重要）

`fetch` 在 `file://` 协议下会被浏览器拦截，所以不要直接双击 HTML 看效果，
用任意一种本地服务器：

```bash
# 方式一：Python（macOS / Linux 自带）
cd 用户名.github.io
python3 -m http.server 8000
# 然后浏览器打开 http://localhost:8000

# 方式二：VS Code 装 Live Server 插件，右键 index.html → Open with Live Server
```

即使忘了开服务器、直接双击打开，`common.js` 里也写了兜底逻辑：
fetch 失败时用内置的精简导航，页面不会白屏，只是样式和导航会简化。

---

## 3. 公共导航 / 页脚是怎么工作的

每个页面只写两行占位：

```html
<div id="site-header"></div>
...
<div id="site-footer"></div>
<script src="./assets/js/common.js"></script>
```

`common.js` 做四件事：

1. `fetch('./header.html')` 和 `fetch('./footer.html')`，把内容塞进上面两个 div；
2. 读取 `<body data-nav="plants">`，给对应导航项加 `.is-active` 高亮；
3. 把页脚里 `<span data-year>` 换成当前年份；
4. fetch 失败时输出兜底导航，并 `console.warn` 提示。

所以**改导航只要改 `header.html` 一处**，全站同步生效。
文章页记得把 `<body data-nav="...">` 写成所属栏目（`plants` / `fish` / `guitar`），
这样打开文章时，导航上对应栏目会带下划线。

---

## 4. 首页栏目卡片结构

```html
<div class="cards">

  <a class="card is-plants" href="./plants.html">
    <span class="card-tag">草木</span>
    <h3 class="card-title">草木生欢喜</h3>
    <p class="card-sub">绿植养护 · 生长 · 翻盆</p>
    <p class="card-desc">一两句栏目介绍。</p>
    <div class="card-foot">
      <span>共 1 篇</span>
      <span class="card-arrow">进入 →</span>
    </div>
  </a>

  <!-- is-fish / is-guitar 同理 -->

</div>
```

`is-plants` / `is-fish` / `is-guitar` 决定卡片主题色（苔绿 / 水青 / 木色），
加文章后把卡片里的「共 1 篇」数字改掉即可。

首页最新文章列表：

```html
<ul class="post-list">
  <li>
    <span class="post-date">2026-11-18</span>
    <a class="post-link" href="./post-plants-hydro.html">文章标题</a>
    <span class="post-tag is-plants">草木</span>
  </li>
</ul>
```

新增文章时，把新的 `<li>` 插到列表最上面（按日期倒序）。

---

## 5. 文章页统一模板

复制 `post-plants-hydro.html` 改内容，或直接用下面这份空模板：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>文章标题 · 小丰收</title>
  <meta name="description" content="一句话摘要，利于分享和搜索。">
  <link rel="stylesheet" href="./assets/css/style.css">
</head>

<body data-nav="plants">   <!-- 改成 plants / fish / guitar -->
  <div id="site-header"></div>

  <main>
    <div class="article-shell">
      <article class="article">

        <header class="article-head">
          <span class="post-tag is-plants">草木 · 翻盆</span>
          <h1>文章标题</h1>
          <div class="meta">
            <span>2026-11-25</span>
            <span>约 800 字</span>
            <span>草木生欢喜</span>
          </div>
        </header>

        <div class="post-body">
          <p>正文第一段……</p>

          <h2>小标题</h2>
          <p>正文……</p>

          <blockquote><p>想强调的一句话。</p></blockquote>
        </div>

        <div class="article-foot">
          <a href="./plants.html">← 回「草木生欢喜」</a>
          <a href="./index.html">回首页</a>
        </div>

      </article>
    </div>
  </main>

  <div id="site-footer"></div>
  <script src="./assets/js/common.js"></script>
</body>
</html>
```

`post-tag` 的配色也分三种：`is-plants` / `is-fish` / `is-guitar`。

---

## 6. 图片外链 + B 站视频的 HTML 写法

### 图片（外链直链）

```html
<figure class="figure">
  <img src="https://images.unsplash.com/photo-xxxx?w=1200&q=80"
       alt="图片内容的文字描述（必填，SEO 和读屏都用）"
       loading="lazy">
  <figcaption>图注：这张图在说什么。</figcaption>
</figure>
```

> 说明：三篇示例文章里的配图已经放在 `assets/img/`，是本地资源，随仓库一起上传就能显示，
> 这样即使图床挂了页面也不会空一块。想换成外链，把 `src` 换成直链即可；两种方式写法完全一样。

要点：

- 图片必须是**直链**（`https://.../xxx.jpg`），不能是网页地址或需要登录的链接；
- 建议宽度 1200px、体积 300KB 以内，GitHub Pages 不压缩图片，太大加载慢；
- `loading="lazy"` 让图片滚动到附近才加载；
- 想固定图文比例时，给 `<figure>` 加 `style="max-width:520px;margin-left:auto;margin-right:auto;"`。

如果只有一个图、不需要图注，直接：

```html
<p><img src="https://example.com/pic.jpg" alt="说明" loading="lazy"></p>
```

### B 站视频（iframe）

```html
<div class="video">
  <iframe
    src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&page=1&high_quality=1&danmaku=0"
    title="视频标题"
    scrolling="no"
    frameborder="0"
    allowfullscreen="true"
    referrerpolicy="no-referrer">
  </iframe>
</div>
```

要点：

- `bvid` 就是视频地址里 `BV` 开头那一串，`page=1` 是分 P 的第几集；
- `danmaku=0` 关弹幕（想开就删掉）；
- `high_quality=1` 尽量高清；
- 外层 `.video` 已经做了 16:9 自适应，手机上会自动铺满宽度；
- 协议写成 `//player.bilibili.com/...` 可以同时适配 http/https，不用手写 http/https。

---

## 7. 上传到 GitHub Pages

### 第一步：建仓库

1. 注册/登录 GitHub，右上角 **+ → New repository**；
2. 仓库名必须叫 **`你的用户名.github.io`**（例如 `xiaofengshou.github.io`），
   这是 GitHub Pages 的“用户主页”约定，之后访问根路径就是 `https://你的用户名.github.io/`；
3. 勾选 **Public**，不要勾选自动生成 README（避免多一个文件）；
4. 点 **Create repository**。

> 想用别的仓库名？可以，但访问地址会变成 `https://你的用户名.github.io/仓库名/`，
> 这时所有相对路径仍然可用——这正是本模板全部用 `./` 的原因。

### 第二步：推文件（命令行，推荐）

```bash
# 在项目根目录（就是有 index.html 的那一层）执行
git init
git add .
git commit -m "first commit: 小丰收上线"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

### 第三步：也可以在网页上传

进入仓库 → **Add file → Upload files** → 把整个文件夹拖进去（要包含 `assets` 目录）
→ 填提交信息 → **Commit changes**。文件多时网页上传很慢，建议用命令行或 GitHub Desktop。

### 第四步：开启 Pages

仓库 → **Settings → Pages**：

- **Source** 选 `Deploy from a branch`
- **Branch** 选 `main`，目录选 `/ (root)`
- 点 **Save**

等 1～3 分钟，页面顶部会出现 `Your site is live at https://你的用户名.github.io/`。
国内访问 GitHub Pages 可能较慢，属于网络问题，不是配置问题。

### 关于 https

选了 `github.io` 域名，Pages 默认就启用 HTTPS，不用自己配证书。
第一次部署后如果还是 http，去 Settings → Pages 里勾选 **Enforce HTTPS**（可能需要等几分钟才出现选项）。

### 以后更新

```bash
git add .
git commit -m "新增文章：xxx"
git push
```

推送后 1 分钟左右自动重新发布。浏览器有缓存时按 `Ctrl/Cmd + Shift + R` 强制刷新。

---

## 8. 新增一篇文章的操作步骤

以在「草木生欢喜」加一篇为例：

1. **复制** `post-plants-hydro.html`，重命名为 `post-plants-light.html`
   （命名建议 `post-栏目-英文关键词.html`，全小写、用连字符）；
2. 改 `<title>`、`<meta name="description">`；
3. 改 `<h1>` 文章标题、`.meta` 里的日期和字数；
4. 改 `.post-tag` 的文案（栏目 · 类型）；
5. 替换 `.post-body` 里的正文（`<p>` / `<h2>` / `<figure>` / `<blockquote>`）；
6. 确认 `<body data-nav="plants">`、`.article-foot` 里的返回链接指向 `plants.html`；
7. **加到栏目页**：打开 `plants.html`，把新的 `<li><a class="entry" ...>` 放在列表最前，
   写好日期、标签、标题、摘要，并更新首页卡片上的「共 N 篇」；
8. **加到首页**：打开 `index.html`，在 `.post-list` 最上面插一个 `<li>`，
   写日期、标题、链接、`post-tag`；
9. （可选）导航栏、页脚不用动，它们会自动生效；
10. 本地 `python3 -m http.server` 预览一遍，然后 `git add . && git commit -m "新增文章：xxx" && git push`。

**换栏目就是把第 1、6、7 步的 `plants` 换成 `fish` 或 `guitar`。**

---

## 9. 常见问题排查

### Q1：打开是 404

- 检查文件是否**真的推上去了**（GitHub 仓库里能看到 `index.html` 才算）；
- 检查 Pages 的 Branch 是不是 `main`、目录是不是 `/ (root)`；
- 仓库名拼错（少个 `s`、用户名大小写不对）也会 404；
- 访问带 `?` 或 `#` 的链接时，看是不是文件名大小写不一致——**GitHub Pages 区分大小写**，
  `Post-Plants.html` 和 `post-plants.html` 是两个文件。

### Q2：CSS 不加载 / 页面没样式

- 看 `<link rel="stylesheet" href="./assets/css/style.css">` 路径是否和实际目录一致；
- 打开浏览器控制台 Network，看 `style.css` 是不是 404（红色）；
- 常见原因：上传时漏了 `assets` 目录，或者 `assets/css` 层级写错（写成了 `./css/style.css`）；
- 浏览器缓存：强制刷新 `Ctrl/Cmd + Shift + R`。

### Q3：导航栏/页脚不显示（fetch 失败）

- 控制台如果出现 `Fetch API cannot load file:///...`，说明你是直接双击打开的，
  **换成 `python3 -m http.server` 或 Live Server**；
- 如果线上 fetch 失败，检查 `header.html`、`footer.html` 是否上传到了根目录、文件名大小写是否一致；
- fetch 失败不会白屏，会退化成 `common.js` 里的兜底导航，所以页面还能用；
- 想彻底避开 fetch：把 `header.html` 的内容直接粘到每个页面，牺牲“改一处全站生效”的便利。

### Q4：部署到子路径后白屏 / 图片全裂

- 说明有地方写了绝对路径，比如 `/assets/css/style.css`、`https://用户名.github.io/assets/...`；
  子路径部署时这些都会指错。**统一改成 `./` 开头的相对路径**；
- 检查 `header.html`、`footer.html` 里的链接是否也都是 `./` 开头；
- 想把页面放进 `posts/` 子目录，记得把该目录文件的资源路径改成 `../assets/...`，
  公共片段的 fetch 改成 `../header.html`。

### Q5：手机上字太小 / 卡片挤在一起

- 已经在 `style.css` 底部写好了 `@media (max-width: 720px)` 的适配：
  卡片单列、正文 15.5px、导航换行；
- 如果要调，改 `:root` 里的 `--maxw`（内容最大宽度）和媒体查询里的字号即可；
- 检查每个页面 `<head>` 里有没有 `viewport` 那行 meta，漏了手机上会按桌面宽度缩放。

### Q6：B 站视频显示“无法播放 / 视频不存在”

- `bvid` 写错（不要带 `BV` 前面的 `https://www.bilibili.com/video/`）；
- 视频是私密、已删除、或仅限大会员观看的，播放器里会报错；
- 部分视频禁止站外播放，换一个视频测试即可；
- B 站对海外 IP、部分网络会限制播放，iframe 里就会显示那张“非常抱歉”的黑底卡片。
  同一段代码在境内访问的 GitHub Pages 上通常正常；想彻底避免，可以改成自托管视频：
  `<video controls src="./assets/video/xxx.mp4" style="width:100%;border-radius:10px;"></video>`。

---

## 10. 想改样式时看这里

`style.css` 顶部 `:root` 集中了所有可调项：

```css
:root {
  --bg: #fffcf6;         /* 页面奶油底色 */
  --ink: #1b1915;        /* 主文字 / 描边 */
  --green: #23a96b;      /* 草木栏目主色 */
  --blue: #2f86d6;       /* 水栏目主色 */
  --orange: #ef6f2c;     /* 吉他栏目主色 */
  --lime: #dcf36b;       /* 荧光笔高亮色 */
  --r-xl: 32px;          /* 大圆角（文章卡、栏目头） */
  --r-pill: 999px;       /* 胶囊圆角（标签、按钮、导航） */
  --shadow-card: 6px 6px 0 rgba(27, 25, 21, 0.12);  /* 卡片的硬边投影 */
  --maxw: 1000px;        /* 全站内容最大宽度 */
  --measure: 780px;      /* 文章卡片宽度，正文实际行宽约 690px */
}
```

这一版的主视觉是**大圆角 + 2px 描边 + 硬边投影**（退出“纸感手账”，走贴纸 / 积木的现代路线）：

- 导航是一条悬浮的白色圆角胶囊，当前页用实心黑胶囊高亮；
- 栏目卡片用主题色铺满底，右上角是「草 / 水 / 指」字徽章（不依赖 emoji 字体，任何系统都能显示）；
- 文章正文装在一张大圆角白卡里，标题下半截有荧光笔高亮，小标题前的小圆点会跟随栏目变色；
- 页脚是一块深色大圆角面板，与浅色页面形成对比；
- 想要更“安静”的版本，把 `--lime` 换成浅灰、把 `--shadow-card` 改小即可。

改完直接刷新即可，不需要任何编译。
