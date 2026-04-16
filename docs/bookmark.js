const bookmark = document.getElementById("bookmark");
const sections = document.querySelectorAll("h4");
let offsetX, offsetY;
let isDragging = false;
let dragged = false;
let pressTimer = null;
let current = { id: null, label: "しおり" };

// ── 位置ヘルパー ───────────────────────────────────────
function setBookmarkPos(left, top) {
  bookmark.style.left = `${left}px`;
  bookmark.style.top  = `${top}px`;
}
function placeAtDefault() {
  const margin = 20;
  const left = window.scrollX + window.innerWidth - bookmark.offsetWidth - margin;
  const top  = window.scrollY + margin;
  setBookmarkPos(left, top);
}
function placeBeside(el) {
  const rect = el.getBoundingClientRect();
  const bookmarkHeight = bookmark.offsetHeight;
  const centerY = window.scrollY + rect.top + rect.height / 2;
  const top  = Math.round(centerY - bookmarkHeight / 2);
  const left = Math.round(window.scrollX + rect.right + 10);
  setBookmarkPos(left, top);
}

// ラベル＋位置を同時に適用
function applyBookmark(label, placeFn) {
  bookmark.textContent = label;
  if (typeof placeFn === "function") placeFn();
}

/* ====================== ドラッグ ====================== */
bookmark.addEventListener("pointerdown", e => {
  isDragging = true;
  dragged = false;
  bookmark.setPointerCapture(e.pointerId);
  offsetX = e.clientX - bookmark.offsetLeft;
  offsetY = e.clientY - bookmark.offsetTop;
  
  pressTimer = setTimeout(() => {
    if (!dragged) {
      editLabel();
      isDragging = false;
    }
  }, 500);
});

bookmark.addEventListener("pointermove", e => {
  if (!isDragging) return;
  if (!dragged) {
    dragged = true;
    bookmark.classList.add("dragging");
  }
  clearTimeout(pressTimer);
  setBookmarkPos(e.clientX - offsetX, e.clientY - offsetY);
});

bookmark.addEventListener("pointerup", e => {
  isDragging = false;
  bookmark.releasePointerCapture(e.pointerId);
  clearTimeout(pressTimer);
  bookmark.classList.remove("dragging");
  if (dragged) snapToSection();
});

/* ====================== 吸着 ====================== */
function snapToSection() {
  let closest = null;
  let minDist = Infinity;
  const by = bookmark.getBoundingClientRect().top;
  sections.forEach(sec => {
    const dist = Math.abs(sec.getBoundingClientRect().top - by);
    if (dist < minDist) { minDist = dist; closest = sec; }
  });
  if (closest) setBookmark(closest);
}

/* ====================== 配置 ====================== */
function setBookmark(section) {
  current.id = section.id;
  applyBookmark(current.label, () => placeBeside(section));
  save();
}

/* ====================== 編集 ====================== */
function editLabel() {
  const input = prompt("しおりの名前を変更", current.label);
  if (input !== null && input.trim() !== "") {
    current.label = input.trim();
    applyBookmark(current.label);
    save();
    load();
  }
}

/* ====================== 保存 ====================== */
function save() {
  localStorage.setItem("bookmark", JSON.stringify(current));
}

/* ====================== 復元 ====================== */
export function load() {
  const data = localStorage.getItem("bookmark");
  if (!data) {
    applyBookmark(current.label, placeAtDefault);
    return;
  }

  current = JSON.parse(data);
  const section = document.getElementById(current.id);
  if (!section) return;
  applyBookmark(current.label, () => placeBeside(section));
}
