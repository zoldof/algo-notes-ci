import { renderMarkdown } from "/algo-notes-ci/main.js";
import { renderKatex } from "/algo-notes-ci/katex.js";

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;
  if (window.marked) {
    await renderMarkdown(el);
  }
  renderKatex(el);
});
