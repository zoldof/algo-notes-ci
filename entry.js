import { renderMarkdown } from "/algo-notes/main_.js";
import { renderKatex } from "/algo-notes/katex.js";

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;

  //if (!el.innerHTML.trim()) {
  await renderMarkdown(el);
  //}
  renderKatex(el);
});
//
