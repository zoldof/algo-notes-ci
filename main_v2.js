document.addEventListener("DOMContentLoaded", () => {
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  const params = new URLSearchParams(location.search);
  const fname = params.get('f');
  if (!fname) {
    document.getElementById("content").textContent = "fname not specified";
    return;
  }
  //* Cache-Control *
  //fetch(`./${fname}/${fname}.txt`)
  fetch(`./${fname}/${fname}.txt?_=${Date.now()}`)
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
//
