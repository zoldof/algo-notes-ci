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
    document.body.classList.add(`dname-${dname}`);
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
      text = await markedRes.text();
    }
    else {
      throw new Error(`fetch failed: ${res.status}`);
    }

    marked.setOptions({
      breaks: true,
      gfm: true
    });
    const renderer = new marked.Renderer();
    renderer.link = function ({ href, tokens }) {
      const isExternal = /^https?:\/\//.test(href);
      const target = isExternal
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';
      const text = this.parser.parseInline(tokens);
      return `<a href="${href}"${target}>${text}</a>`;
    };
    el.innerHTML = marked.parse(text, { renderer });
    renderKatex(el);
  } catch (err) {
    el.textContent = err.message;
  }
}
document.addEventListener("DOMContentLoaded", render);
