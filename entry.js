const url = new URL(import.meta.url);
const repo = url.pathname.split("/")[0];
import { renderKatex } from `/${repo}/katex.js`;

document.addEventListener("DOMContentLoaded", async () => {
  const el = document.getElementById("content");
  if (!el) return;
  if (window.marked) {
    const { renderMarkdown } = await import(`/${repo}/main.js`);
    await renderMarkdown(el);
  }
  renderKatex(el);
});
