async function render() {
  const el = document.getElementById("content");
  if (!el) return;

  try {
    const res = await fetch(`menu.md`);
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
document.addEventListener("DOMContentLoaded", render);
