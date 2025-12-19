document.addEventListener("DOMContentLoaded", () => {
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  const repo = "algo-notes";
  const params = new URLSearchParams(location.search);
  const fname = params.get('fname');
  const pathParts = location.pathname.split('/').filter(Boolean); 
  const currentDir = pathParts[pathParts.length - 1]; // 最後の要素が省略index.htmlなら最後がディレクトリ

  if (currentDir === fname) {
    console.log(`Skipping fetch: already in ${fname}/`);
    return;
  }
  if (!fname) {
    document.getElementById("content").textContent = "fname not specified";
    return;
  }
  //* Cache-Control *
  //fetch(`/${repo}/${fname}/${fname}.txt`)
  fetch(`/${repo}/${fname}/${fname}.txt?_=${Date.now()}`)
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
