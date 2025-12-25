import { renderMarkdown } from "main.js";
import { renderKatex } from "katex.js";

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;
  if (window.marked) {
    await renderMarkdown(el);
  }
  renderKatex(el);
});
