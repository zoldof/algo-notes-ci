import { renderMarkdown } from "./docs/main.js";
import { renderKatex } from "./docs/katex.js";

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;
  if (window.marked) {
    await renderMarkdown(el);
  }
  renderKatex(el);
});
