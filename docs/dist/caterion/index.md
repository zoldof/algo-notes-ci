---
layout: gallery
title: "星環のカタリオン"
description: "カタリオンはすべてオリジナルの創作であり、実在の作品・人物・団体とは関係ありません。"
---
<!-- 確認済み147~168  -->
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
  .site-hero__iconBtn{
    border: none;          /* ボーダーなし */
    background: transparent; /* 背景色なし（透明） */
    border-radius: 999px;
    width: 24px;
    height: 24px;
    font-size: 10px;
    top: 7px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  #site-hero__home{
    position: absolute;
    left: 7px;
    z-index: 2;
    text-decoration: none;
  }
  #site-hero__music{
    position: absolute;
    right: 32px;
    z-index: 2;
  }
  #site-hero__music_2{
    position: absolute;
    right: 7px;
    z-index: 2;
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
    aspect-ratio: 2.3 / 3;
    height: auto;
    object-fit: contain;
    display:block;
    background:#fff; /* containの余白色（気になるなら #111 などに） */
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
  const get = (id) => document.getElementById(id);
  const btns = [
    get('site-hero__music'),
    get('site-hero__music_2')
  ];
  const audios = [
    get('audio'),
    get('audio_2'),
    get('audio_3'),
    get('audio_4')
  ];
  const pool = audios.slice(1);
  let chainRunning = false;
  
  function stopChain() {
    chainRunning = false;
    pool.forEach(a => {
      if (!a) return;
      a.pause();
      a.currentTime = 0;
    });
  }
  
  function playRandomLoop() {
    chainRunning = true;
  
    // 全停止から開始（安全策）
    pool.forEach(a => {
      if (!a) return;
      a.pause();
      a.currentTime = 0;
    });
  
    const candidates = () => pool.filter(a => a); //念のため
    const pickRandom = () => {
      const list = candidates();
      return list[Math.floor(Math.random() * list.length)];
    };
  
    const playNext = () => {
      if (!chainRunning) return;
  
      const next = pickRandom();
  
      // 次のonendedでも止められるように
      next.onended = () => {
        if (!chainRunning) return;
        playNext();
      };
  
      next.currentTime = 0;
      next.play();
    };
  
    playNext();
  }
  
  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const audio = audios[0];
  
      // i=0側: audio（単体）
      if (i === 0) {
        // 鳴ってたら止める
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
          return;
        }
        // 他方停止＆自分開始
        stopChain();
        audio.currentTime = 0;
        audio.play();
        return;
      }
  
      // i=1側:（2/3/4ランダムループ）
      if (chainRunning) {
        stopChain();
        return;
      }
      audio.pause();
      audio.currentTime = 0;
      playRandomLoop();
    });
  });

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
