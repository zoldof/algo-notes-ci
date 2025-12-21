import { renderKatex } from "/algo-notes/katex.js";

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;
  if (window.marked) {
    const { renderMarkdown } = await import("/algo-notes/main.js");
    await renderMarkdown(el);
  }
  renderKatex(el);
});
