document.addEventListener("DOMContentLoaded", () => {
  const repo = "algo-notes";
  const params = new URLSearchParams(location.search);
  const fname = params.get('fname');
  const pathParts = location.pathname.split('/').filter(Boolean); 
  const currentDir = pathParts[pathParts.length - 1]; 
  const el = document.getElementById("content");
  if (currentDir != repo) {
    el.textContent = `Test blocked: not launched from repo root (${currentDir})`;
    return;
  }
  if (!fname) {
    el.textContent = "fname not specified";
    return;
  }
  //* Cache-Control *
  fetch(`/${repo}/${fname}/${fname}.txt`)
  //fetch(`/${repo}/${fname}/${fname}.md?_=${Date.now()}`)
    .then(res => {
      if (!res.ok) throw new Error("fetch failed");
      return res.text();
    })
    .then(text => {
      marked.setOptions({
        breaks: true,
        gfm: true
      });
      el.innerHTML = marked.parse(text);
      renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    })
    .catch(err => {
      el.textContent = err.message;
    });
});
