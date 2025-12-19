document.addEventListener("DOMContentLoaded", () => {
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  const params = new URLSearchParams(location.search);
  const fname = params.get('fname');
  if (!fname) {
    document.getElementById("content").textContent = "fname not specified";
    return;
  }

  fetch(`./${fname}/${fname}.txt?_=${Date.now()}`)

  //* Cache-Control *
  //fetch(`./${fname}/${fname}.txt`)
  fetch(`./${fname}/${fname}.txt?_=${Date.now()}`)
    .then(res => {
      console.log(res.status, res.url);
      return res.text();
    })
    .then(text => {
      console.log(text.slice(0, 100));
    })
    .catch(err => console.error(err));
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
