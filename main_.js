export async function renderMarkdown(el) {
  const repo = "algo-notes";
  const params = new URLSearchParams(location.search);
  const dname = params.get("dname");
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentDir = pathParts[pathParts.length - 1];

  if (currentDir !== repo) {
    el.textContent = `Test blocked: not launched from repo root (${currentDir})`;
    return;
  }
  if (!dname) {
    el.textContent = "dname not specified";
    return;
  }

  try {
    const res = await fetch(`/${repo}/dist/${dname}/index.md`);
    if (!res.ok) throw new Error("fetch failed");

    const text = await res.text();
    marked.setOptions({
      breaks: true,
      gfm: true
    });
    el.innerHTML = marked.parse(text);
  } catch (err) {
    el.textContent = err.message;
  }
}
