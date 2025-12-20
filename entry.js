import { renderMarkdown } from `${window.BASE_PATH}main_.js`;
import { renderKatex } from `${window.BASE_PATH}katex.js`;

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;

  //if (!el.innerHTML.trim()) {
  await renderMarkdown(el);
  //}
  renderKatex(el);
});
//
