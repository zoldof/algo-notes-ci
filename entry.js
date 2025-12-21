import { renderMarkdown } from "/algo-notes/main.js";
//import { renderKatex } from "/algo-notes/katex.js";

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;
  
  await renderMarkdown(el);
  renderKatex(el);
});

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;

  //Cache-Control
  const { renderKatex } = await import(`/algo-notes/katex.js?ts=${Date.now()}`);

  await renderMarkdown(el);
  renderKatex(el);
});
