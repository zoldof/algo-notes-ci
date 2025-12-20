document.addEventListener("DOMContentLoaded", () => {
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  const repo = "algo-notes";
  const params = new URLSearchParams(location.search);
  const dname = params.get('dname');
  if (!dname) {
    document.getElementById("content").textContent = "dname not specified";
    return;
  }
  fetch(`/${repo}/dist/${dname}/${dname}.md`)
    .then(res => {
      if (!res.ok) throw new Error("fetch failed");
      return res.text();
    })
    .then(text => {
      const el = document.getElementById("content");
      el.innerHTML = marked.parse(text);
      renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    })
    .catch(err => {
      document.getElementById("content").textContent = err.message;
    });
});
