export function addBackToTopLinks() {
  document.querySelectorAll("h2").forEach((h, i) => {
    if (i === 0) return;
    const a = document.createElement("a");
    a.href = "#top";
    a.className = "back-to-top";
    a.textContent = "^";
    h.appendChild(a);
  });
}
