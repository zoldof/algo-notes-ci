import { renderKatex } from "./katex.js";

function externalLinkRenderer() {
  const renderer = new marked.Renderer();
  renderer.link = function ({ href, tokens }) {
    const isExternal = /^https?:\/\//.test(href);
    const target = isExternal
      ? ' target="_blank" rel="noopener noreferrer"'
      : '';
    const text = this.parser.parseInline(tokens);
    return `<a href="${href}"${target}>${text}</a>`;
  };
  return renderer;
}

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
    const urls = dname === "dist"
      ? [`dist/index.md`]
      : [`dist/${dname}/index.md`,`dist-marked/${dname}/index.md`];
    let text = "";
    let lastError;
    for (const url of urls) {
      const res = await fetch(url);
      if (res.ok) {
        text = await res.text();
        break;
      }
      lastError = res;
    }
    if (!text) {
      throw new Error(`all fetches failed: ${lastError?.status}`);
    }
    marked.setOptions({ breaks: true, gfm: true });
    const renderer = externalLinkRenderer();
    el.innerHTML = marked.parse(text, { renderer });
    renderKatex(el);
  } catch (err) {
    el.textContent = err.message;
  }
}
document.addEventListener("DOMContentLoaded", render);
