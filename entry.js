import { renderKatex } from "/algo-notes-ci/katex.js";

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;
  if (window.marked) {
    const { renderMarkdown } = await import("/algo-notes-ci/main.js");
    await renderMarkdown(el);
  }
  renderKatex(el);
});
