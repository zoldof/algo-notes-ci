document.addEventListener("DOMContentLoaded", () => {
  const repo = "algo-notes";
  const params = new URLSearchParams(location.search);
  const dname = params.get('dname');
  const pathParts = location.pathname.split('/').filter(Boolean); 
  const currentDir = pathParts[pathParts.length - 1]; 
  const el = document.getElementById("content");
  if (currentDir != repo) {
    el.textContent = `Test blocked: not launched from repo root (${currentDir})`;
    return;
  }
  if (!dname) {
    el.textContent = "dname not specified";
    return;
  }
  //* Cache-Control *
  fetch(`/${repo}/${dname}/index.md`)
  //fetch(`/${repo}/${dname}/$index.md?_=${Date.now()}`)
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
      import('katexr.js').then(mod => mod.katexr(el));
    })
    .catch(err => {
      el.textContent = err.message;
    });
});
