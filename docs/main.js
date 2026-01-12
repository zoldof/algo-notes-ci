import { renderKatex } from "./katex.js";

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
    const res = await fetch(`dist/${dname}/index.md`);
    let text ="";

    if (res.ok) {
      text = await res.text();
    }
    else if (res.status === 404) {
      const markedRes = await fetch(`dist-marked/${dname}/index.md`);
      if (!markedRes.ok) {
        throw new Error("both fetches failed");
      }
      text = markedRes.text();
    }
    else {
      throw new Error(`fetch failed: ${res.status}`);
    }

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
