import { renderMarkdown } from "/repo/main_.js";
import { renderKatex } from "/repo/katex.js";

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;
  await renderMarkdown(el);
  renderKatex(el);
});
//
