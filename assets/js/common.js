/* ============================================================
   小丰收 · 公共 JS（原生 JS，无依赖、无构建）
   做三件事：
   1. 用 fetch 把 header.html / footer.html 引入每个页面
   2. 给当前页面对应的导航项加高亮
   3. 自动填页脚年份
   说明：页面必须用本地服务器或 GitHub Pages 打开，
        直接用 file:// 双击打开时 fetch 会被浏览器拦截，
        这里做了兜底（用内置的精简导航），不会白屏。
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 兜底导航（仅在 fetch 失败时使用） ---------- */
  var FALLBACK_HEADER =
    '<header class="site-header"><div class="header-inner">' +
    '<a class="brand" href="./index.html"><span class="brand-mark">丰</span>' +
    '<span class="brand-text"><strong>小丰收</strong><small>XIAO FENG SHOU</small></span></a>' +
    '<nav class="nav" aria-label="主导航">' +
    '<a href="./index.html" data-nav="home">首页</a>' +
    '<a href="./plants.html" data-nav="plants">草木生欢喜</a>' +
    '<a href="./fish.html" data-nav="fish">水中小世界</a>' +
    '<a href="./guitar.html" data-nav="guitar">指尖流水</a>' +
    '<a href="./about.html" data-nav="about">关于</a>' +
    "</nav></div></header>";

  var FALLBACK_FOOTER =
    '<footer class="site-footer"><div class="footer-inner">' +
    '<p class="footer-slogan">所有微小而确定的小丰收，都值得装进人生的粮仓！</p>' +
    '<p class="footer-meta">© <span data-year="2026">2026</span> 小丰收</p>' +
    "</div></footer>";

  /* ---------- 1. 判断当前栏目 ---------- */
  function detectNav() {
    // 优先读 <body data-nav="plants">，文章页建议直接写上
    var explicit = document.body.getAttribute("data-nav");
    if (explicit) return explicit;

    var file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    var name = file.replace(/\.html$/, "");

    if (name === "" || name === "index") return "home";
    if (name.indexOf("plants") > -1) return "plants";
    if (name.indexOf("fish") > -1) return "fish";
    if (name.indexOf("guitar") > -1) return "guitar";
    if (name.indexOf("about") > -1) return "about";
    return "";
  }

  /* ---------- 2. 引入公共片段 ---------- */
  function mount(targetId, fileName, fallbackHTML) {
    var el = document.getElementById(targetId);
    if (!el) return Promise.resolve();

    return fetch(fileName, { cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) throw new Error(fileName + " 加载失败：" + res.status);
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
      })
      .catch(function (err) {
        // fetch 失败（例如用 file:// 直接双击打开）时用兜底内容，保证不白屏
        console.warn("[小丰收] " + err.message + "，已使用内置兜底内容。");
        el.innerHTML = fallbackHTML;
      });
  }

  /* ---------- 3. 高亮当前导航 ---------- */
  function highlight() {
    var current = detectNav();
    if (!current) return;
    var links = document.querySelectorAll(".nav a[data-nav]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-nav") === current) {
        links[i].classList.add("is-active");
        links[i].setAttribute("aria-current", "page");
      }
    }
  }

  /* ---------- 4. 自动年份 ---------- */
  function fillYear() {
    var nodes = document.querySelectorAll("[data-year]");
    var year = String(new Date().getFullYear());
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = year;
    }
  }

  /* ---------- 启动 ---------- */
  function boot() {
    var tasks = [
      mount("site-header", "./header.html", FALLBACK_HEADER),
      mount("site-footer", "./footer.html", FALLBACK_FOOTER)
    ];

    // 两个片段都插好之后再高亮，避免找不到 nav 节点
    Promise.all(tasks).then(function () {
      highlight();
      fillYear();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
