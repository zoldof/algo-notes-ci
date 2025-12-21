import { renderMarkdown } from "/algo-notes/main.js";
import { renderKatex } from "/algo-notes/katex.js";

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;
  await renderMarkdown(el);
  renderKatex(el);
});
//
