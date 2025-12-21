import { renderMarkdown } from "/algo-notes/main.js";
//import・import・import・・・impo "/algo-notes/katex.js";
//Cache-Control
import { renderKatex } from `/algo-notes/katex.js?ts=${Date.now()}`;

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;
  await renderMarkdown(el);
  renderKatex(el);
});
