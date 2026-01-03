import { renderKatex } from "./docs/katex.js";

async function render() {
  const el = document.getElementById("content");
  if (!el) return;
  const params = new URLSearchParams(location.search);
  const dname = params.get("dname");

  if (!dname) {
    el.textContent = "dname not specified";
    return;
  }

  try {
    const res = await fetch(`docs/dist/${dname}/index.md`);
    if (!res.ok) throw new Error("fetch failed");

    const text = await res.text();
    marked.setOptions({
      breaks: true,
      gfm: true
    });
    el.innerHTML = marked.parse(text);
    renderKatex(el);
  } catch (err) {
    el.textContent = err.message;
  }
}
document.addEventListener("DOMContentLoaded", render);
