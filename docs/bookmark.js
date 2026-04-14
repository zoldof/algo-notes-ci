export function loadBookMark() {
  const bookmark = document.getElementById("bookmark");
  const sections = document.querySelectorAll("h4");
  
  let offsetX, offsetY;
  let isDragging = false;
  let dragged = false;
  
  let pressTimer = null;
  
  let current = {
    id: null,
    label: "しおり"
  };
  
  /* ======================
     ドラッグ
  ====================== */
  bookmark.addEventListener("pointerdown", (e) => {
    isDragging = true;
    dragged = false;
  
    bookmark.setPointerCapture(e.pointerId);
  
    offsetX = e.clientX - bookmark.offsetLeft;
    offsetY = e.clientY - bookmark.offsetTop;
  
    // 長押し開始
    pressTimer = setTimeout(() => {
      if (!dragged) {
        editLabel();
        isDragging = false;
      }
    }, 500); // ←長押し判定（500ms）
  });
  
  bookmark.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
  
    if (!dragged) {
      dragged = true;
      bookmark.classList.add("dragging");
    }
  
    clearTimeout(pressTimer);
  
    bookmark.style.left = (e.clientX - offsetX) + "px";
    bookmark.style.top = (e.clientY - offsetY) + "px";
  });
  
  bookmark.addEventListener("pointerup", (e) => {
    isDragging = false;
  
    bookmark.releasePointerCapture(e.pointerId);
  
    clearTimeout(pressTimer);
    bookmark.classList.remove("dragging");
  
    if (dragged) snapToSection();
  });
  
  /* ======================
     吸着
  ====================== */
  function snapToSection() {
    let closest = null;
    let minDist = Infinity;
  
    const by = bookmark.getBoundingClientRect().top;
  
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const dist = Math.abs(rect.top - by);
  
      if (dist < minDist) {
        minDist = dist;
        closest = sec;
      }
    });
  
    if (closest) setBookmark(closest);
  }
  
  /* ======================
     配置
  ====================== */
  function setBookmark(section) {
    const rect = section.getBoundingClientRect();
  
    current.id = section.id;
  
    bookmark.textContent = current.label;
  
    bookmark.style.left = (window.scrollX + rect.right + 10) + "px";
    bookmark.style.top = (window.scrollY + rect.top - 3) + "px";
  
    save();
  }
  
  /* ======================
     編集
  ====================== */
  function editLabel() {
    const input = prompt("しおりの名前を変更", current.label);
  
    if (input !== null && input.trim() !== "") {
      current.label = input.trim();
      bookmark.textContent = current.label;
      save();
    }
  }
  
  /* ======================
     保存
  ====================== */
  function save() {
    localStorage.setItem("bookmark", JSON.stringify(current));
  }
  
  /* ======================
     復元
  ====================== */
  function load() {
    localStorage.removeItem('bookmark');
    const data = localStorage.getItem("bookmark");
    if (!data) {
      bookmark.textContent = current.label;
      const margin = 20;
      bookmark.style.left = (window.scrollX + window.innerWidth - bookmark.offsetWidth - margin) + "px";
      bookmark.style.top  = (window.scrollY + margin) + "px";
      return;
    }
  
    current = JSON.parse(data);
  
    const section = document.getElementById(current.id);
    if (!section) return;
  
    const rect = section.getBoundingClientRect();
  
    bookmark.textContent = current.label;
  
    bookmark.style.left = (window.scrollX + rect.right + 6) + "px";
    bookmark.style.top = (window.scrollY + rect.top) + "px";
  }
  
  load();
}
