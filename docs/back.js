export function addBackToTopLinks() {
  document.querySelectorAll("h1, h2, h3, h4").forEach(h => {
    const a = document.createElement("a");
    a.href = "#top";
    a.className = "back-to-top";
    a.textContent = "⤴️";
    h.appendChild(a);
  });
}
