export function loadBookMark() {
  const bookmark = document.getElementById("bookmark") as HTMLElement;
  const sections = document.querySelectorAll("h4");
  let offsetX = 0,
      offsetY = 0,
      isDragging = false,
      dragged = false,
      pressTimer: number | null = null;
  let current = { id: null as string | null, label: "しおり" };

  // ---------- ユーティリティ ----------
  const setBookmarkPos = (x: number, y: number) => {
    bookmark.style.left = `${x}px`;
    bookmark.style.top = `${y}px`;
  };

  const getScroll = () => ({ x: window.scrollX, y: window.scrollY });

  // ---------- 位置設定 ----------
  function placeBookmark(
    mode: "section" | "default",
    opts: { section?: HTMLElement; margin?: number } = {}
  ) {
    const { x: sx, y: sy } = getScroll();
    if (mode === "section") {
      const sec = opts.section!;
      const r = sec.getBoundingClientRect();
      setBookmarkPos(sx + r.right + 10, sy + r.top - 3);
      return;
    }
    const margin = opts.margin ?? 20;
    setBookmarkPos(
      sx + window.innerWidth - bookmark.offsetWidth - margin,
      sy + margin
    );
  }

  // しおりテキストと current.label を同期
  function syncLabel() {
    bookmark.textContent = current.label;
  }

  // ---------- ドラッグ ----------
  bookmark.addEventListener("pointerdown", e => {
    isDragging = true;
    dragged = false;
    bookmark.setPointerCapture(e.pointerId);
    offsetX = e.clientX - bookmark.offsetLeft;
    offsetY = e.clientY - bookmark.offsetTop;

    pressTimer = window.setTimeout(() => {
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
    clearTimeout(pressTimer!);
    setBookmarkPos(e.clientX - offsetX, e.clientY - offsetY);
  });

  bookmark.addEventListener("pointerup", e => {
    isDragging = false;
    bookmark.releasePointerCapture(e.pointerId);
    clearTimeout(pressTimer!);
    bookmark.classList.remove("dragging");
    if (dragged) snapToSection();
  });

  // ---------- 吸着 ----------
  function snapToSection() {
    let closest: HTMLElement | null = null;
    let minDist = Infinity;
    const by = bookmark.getBoundingClientRect().top;
    sections.forEach(sec => {
      const dist = Math.abs(sec.getBoundingClientRect().top - by);
      if (dist < minDist) {
        minDist = dist;
        closest = sec as HTMLElement;
      }
    });
    if (closest) setBookmark(closest);
  }

  // ---------- 配置 ----------
  function setBookmark(section: HTMLElement) {
    current.id = section.id;
    syncLabel();
    placeBookmark("section", { section });
    save();
  }

  // ---------- 編集 ----------
  function editLabel() {
    const input = prompt("しおりの名前を変更", current.label);
    if (input !== null && input.trim() !== "") {
      current.label = input.trim();
      syncLabel();
      save();
    }
  }

  // ---------- 保存 ----------
  function save() {
    localStorage.setItem("bookmark", JSON.stringify(current));
  }

  // ---------- 復元 ----------
  function load() {
    const data = localStorage.getItem("bookmark");
    if (!data) {
      syncLabel();
      placeBookmark("default");
      return;
    }

    current = JSON.parse(data);
    const section = document.getElementById(current.id!);
    if (!section) return;
    syncLabel();
    placeBookmark("section", { section: section as HTMLElement });
  }

  load();
}
