document.addEventListener("DOMContentLoaded", () => {
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  const repo = "algo-notes";
  const params = new URLSearchParams(location.search);
  const fname = params.get('fname');
  if (fname) {
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
  } else {
    // 本番ページ用：ビルド済み HTML
    //content.innerHTML = `<object type="text/html" data="./index.html" style="width:100%;height:100%"></object>`;
  }
});
