export function loadBookMark() {
  const bookmark = document.getElementById("bookmark");
  const sections  = document.querySelectorAll("h4");
  let offsetX, offsetY;
  let isDragging = false;
  let dragged = false;
  let pressTimer = null;
  let current = { id: null, label: "しおり" };

  // ---------- ユーティリティ ----------
  const setBookmarkPos = (x, y) => {
    bookmark.style.left = `${x}px`;
    bookmark.style.top  = `${y}px`;
  };
  const getScroll = () => ({ x: window.scrollX, y: window.scrollY });
  const placeBookmark = ({x, y}) => {
    const {x: sx, y: sy} = getScroll();
    setBookmarkPos(sx + x, sy + y);
  };

  // ------- 共有ロジック (テキストと位置) -------
  const applyBookmark = (section) => {
    // ラベルは常に current.label を使用
    bookmark.textContent = current.label;

    // セクションが与えられたときはその横に配置
    if (section) {
      const rect = section.getBoundingClientRect();
      placeBookmark({ x: rect.right + 10, y: rect.top - 3 });
    }
  };

  /* ======================
     ドラッグ
  ====================== */
  bookmark.addEventListener("pointerdown", e => {
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
    }, 500);
  });

  bookmark.addEventListener("pointermove", e => {
    if (!isDragging) return;
    if (!dragged) {
      dragged = true;
      bookmark.classList.add("dragging");
    }
    clearTimeout(pressTimer);
    placeBookmark({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  });

  bookmark.addEventListener("pointerup", e => {
    isDragging = false;
    bookmark.releasePointerCapture(e.pointerId);
    clearTimeout(pressTimer);
    bookmark.classList.remove("dragging");
    if (dragged) snapToSection();
  });

  /* ======================
     吸着
  ====================== */
  const snapToSection = () => {
    let closest = null;
    let minDist = Infinity;
    const by = bookmark.getBoundingClientRect().top;
    
    sections.forEach(sec => {
      const dist = Math.abs(sec.getBoundingClientRect().top - by);
      if (dist < minDist) {
        minDist = dist;
        closest = sec;
      }
    });
    if (closest) setBookmark(closest);
  };

  /* ======================
     配置
  ====================== */
  const setBookmark = (section) => {
    current.id = section.id;
    applyBookmark(section);   // ← ここでテキストと位置をまとめて設定
    save();
  };

  /* ======================
     編集
  ====================== */
  const editLabel = () => {
    const input = prompt("しおりの名前を変更", current.label);
    if (input !== null && input.trim() !== "") {
      current.label = input.trim();
      applyBookmark();        // ラベルだけ更新すれば位置はそのまま
      save();
    }
  };

  /* ======================
     保存
  ====================== */
  const save = () => {
    localStorage.setItem("bookmark", JSON.stringify(current));
  };

  /* ======================
     復元
  ====================== */
  const load = () => {
    const data = localStorage.getItem("bookmark");
    if (!data) {
      applyBookmark();  // デフォルト表示だけ
      placeBookmark({
        x: window.innerWidth - bookmark.offsetWidth - 20,
        y: 20
      });
      return;
    }
    current = JSON.parse(data);
    applyBookmark(document.getElementById(current.id) ?? null);
  };

  load();
}
