---
layout: gallery
title: "星環のカタリオン"
---

<div class="page-cards">
  <div class="page-cards__grid">
    {% for c in site.data.caterion %}
      <div class="page-cards__card">
        <div class="page-cards__imgwrap">
          <img
            class="page-cards__img"
            src="{{ site.cdn_base }}main/docs{{ c.image }}"
            alt="{{ c.title }}"
            loading="lazy"
            data-modal-img="{{ site.cdn_base }}main/docs{{ c.image }}"
          >
        </div>
      </div>
    {% endfor %}
  </div>
</div>

<style>
  .site-hero {
    position: relative;
  }
  .site-hero__img {
    width: 100%;
    height: auto;      /* 縦は比率維持 */
    object-fit: contain;
    display: block;
  }
  .site-hero__home{
    position: absolute;
    top: 7px;
    left: 7px;
    z-index: 2;
    font-size: 10px;
    color: inherit;
    text-decoration: none;
    font-weight: 700;
  
    /* 背景画像の上で読めるようにする（好みで） */
    background: rgba(0,0,0,0.35);
    padding: 3px 6px;
    border-radius: 5px;
  }
  .site-hero__music{
    position: absolute;
    top: 7px;
    right: 7px;
    z-index: 2;
  }
  #site-hero__playBtn{
    border: 2px solid #ffffff;      /* ボーダー白 */
    background: #0b1f4a;           /* 紺色 */
    border-radius: 999px;
    width: 24px;
    height: 24px;
    font-size: 10px;
    cursor: pointer;
  }
  #site-hero__playBtn.is-playing{
    border-color: #ffffff; /* 必要なら維持 */
    background: #4a7dff; /* 薄い青（お好みで調整） */
  }
  
  .page-cards{
    margin-top: 16px; /* カード間のgapと同じ16pxにして統一 */
  }
  .page-cards .page-cards__grid{
    display:grid;
    gap: 16px;
    align-items: stretch;
  
    /* スマホ（デフォルト）：2列 */
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  /* 640px以上：3列 */
  @media (min-width: 640px){
    .page-cards .page-cards__grid{
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  
  /* 980px以上：4列 */
  @media (min-width: 980px){
    .page-cards .page-cards__grid{
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  
  .page-cards .page-cards__card{
    border:1px solid #e5e5e5;
    border-radius:12px;
    overflow:hidden;
    background:#fff;
    box-shadow:0 1px 2px rgba(0,0,0,0.04);
    height:100%;
  }
  
  .page-cards .page-cards__imgwrap{
    cursor: zoom-in;
  }
  
  /* カード画像：大きめ + 見切れ回避（余白は出る可能性あり） */
  .page-cards .page-cards__img{
    width:100%;
    height:220px;
    object-fit: contain;
    display:block;
    background:#fff; /* containの余白色（気になるなら #111 などに） */
  }
  
  /* 画面が小さいときは高さを調整 */
  @media (max-width: 639.98px){
    .page-cards .page-cards__img{ height:170px; }
  }
  @media (min-width: 640px) and (max-width: 979.98px){
    .page-cards .page-cards__img{ height:200px; }
  }


  /* モーダル */
  .pc-modal{
    position:fixed; inset:0;
    background: rgba(0,0,0,.7);
    display:none;
    align-items:center;
    justify-content:center;
    z-index:9999;
    padding: 24px;
  }
  .pc-modal.is-open{ display:flex; }

  .pc-modal__panel{
    width:min(980px, 100%);
    background:transparent;
    color:#fff;
  }
  .pc-modal__img{
    width:100%;
    max-height: 80vh;
    object-fit: contain;
    display:block;
    border-radius: 12px;
    background:#111;
  }
</style>

<div class="pc-modal" id="pcModal" aria-hidden="true">
  <div class="pc-modal__panel">
    <img class="pc-modal__img" id="pcModalImg" alt="">
  </div>
</div>

<script>
  const btn = document.getElementById('site-hero__playBtn');
  const audio = document.getElementById('audio');

  function setPlayingUI(isPlaying) {
    if (isPlaying) btn.classList.add('is-playing');
    else btn.classList.remove('is-playing');
  }

  // 初期状態
  setPlayingUI(!audio.paused);
  
  btn.addEventListener('click', async () => {
    if (audio.paused) {
      audio.currentTime = 0;
      audio.play();
    } else {
      audio.pause();
    }
  });
  
  // 状態に応じてUIを同期（ズレ防止）
  audio.addEventListener('play', () => setPlayingUI(true));
  audio.addEventListener('pause', () => setPlayingUI(false));
  audio.addEventListener('ended', () => setPlayingUI(false));

  (function(){
    const modal = document.getElementById('pcModal');
    const imgEl = document.getElementById('pcModalImg');

    const open = (src) => {
      imgEl.src = src;
      imgEl.alt = '';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    };

    const close = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      imgEl.src = '';
    };

    document.querySelectorAll('[data-modal-img]').forEach(im => {
      im.addEventListener('click', () => {
        open(im.getAttribute('data-modal-img'));
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  })();
</script>
