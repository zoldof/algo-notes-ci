export functiin InitTocToggle(){
  const toggle = document.getElementById("toc-toggle");
  const toc = document.getElementById("toc-container");

  if (!toggle || !toc) return;

  toggle.addEventListener("click", () => {
    const isClosed = toc.classList.toggle("is-closed");
    toggle.setAttribute("aria-expanded", String(!isClosed));
}
