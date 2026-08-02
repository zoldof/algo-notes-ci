---
layout: default
title: "星環のカタリオン"
---

<div class="page-cards">
  <div class="page-cards__grid">
    {% for c in site.data.cards %}
      <div class="page-cards__card">
        <div class="page-cards__imgwrap">
          <img
            class="page-cards__img"
            src="{{ site.cdn_base }}main/docs/{{ c.image }}"
            alt="{{ site.cdn_base }}main/docs/{{ c.title }}"
            loading="lazy"
            data-modal-img="{{ site.cdn_base }}main/docs/{{ c.image }}"
            data-modal-title="{{ site.cdn_base }}main/docs/{{ c.title }}"
          >
        </div>
        <div class="page-cards__body">
          <h3 class="page-cards__title">{{ site.cdn_base }}main/docs/{{ c.title }}</h3>
          <p class="page-cards__desc">{{ site.cdn_base }}main/docs/{{ c.description }}</p>
        </div>
      </div>
    {% endfor %}
  </div>
</div>

<style>
  .page-cards .page-cards__grid{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    align-items: stretch;
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
  .page-cards .page-cards__img{
    width:100%;
    height:160px;
    object-fit:cover;
    display:block;
  }
  .page-cards .page-cards__body{ padding:12px; }
  .page-cards .page-cards__title{
    margin:0 0 8px 0;
    font-size:1rem;
  }
  .page-cards .page-cards__desc{
    margin:0;
    color:#444;
    font-size:.95rem;
    line-height:1.5;
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
  .pc-modal__caption{
    margin-top:10px;
    font-size: 1rem;
    text-align:center;
  }
</style>

<div class="pc-modal" id="pcModal" aria-hidden="true">
  <div class="pc-modal__panel">
    <img class="pc-modal__img" id="pcModalImg" alt="">
    <div class="pc-modal__caption" id="pcModalCaption"></div>
  </div>
</div>

<script>
  (function(){
    const modal = document.getElementById('pcModal');
    const imgEl = document.getElementById('pcModalImg');
    const capEl = document.getElementById('pcModalCaption');

    const open = (src, title) => {
      imgEl.src = src;
      imgEl.alt = title || '';
      capEl.textContent = title || '';
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
        open(im.getAttribute('data-modal-img'), im.getAttribute('data-modal-title'));
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
