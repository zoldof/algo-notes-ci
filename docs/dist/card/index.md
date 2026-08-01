---
layout: default
title: Cards
---

<div class="page-cards">
  <div class="page-cards__grid">
    {% for c in site.data.cards %}
      <div class="page-cards__card">
        <a class="page-cards__link" href="{{ c.url }}">
          <img
            class="page-cards__img"
            src="{{ c.image }}"
            alt="{{ c.title }}"
            loading="lazy"
          >
          <div class="page-cards__body">
            <h3 class="page-cards__title">{{ c.title }}</h3>
            <p class="page-cards__desc">{{ c.description }}</p>
          </div>
        </a>
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
  .page-cards .page-cards__link{
    display:block;
    color:inherit;
    text-decoration:none;
    height:100%;
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
</style>
