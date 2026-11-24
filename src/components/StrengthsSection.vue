<script setup lang="ts">
import SectionTitle from './SectionTitle.vue'
import { strengths } from '../data/profile'

// 聚光燈：游標所在位置亮起一圈朱紅光暈，跨卡片連續移動
function onMove(e: PointerEvent) {
  const grid = e.currentTarget as HTMLElement
  for (const card of grid.children as HTMLCollectionOf<HTMLElement>) {
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
}
</script>

<template>
  <section class="strengths" aria-labelledby="strengths-title">
    <div class="wrap">
      <SectionTitle id="strengths-title" index="02" en="What I do" zh="專長領域" tone="dark" />
      <ol class="grid" v-reveal @pointermove="onMove">
        <li v-for="(s, i) in strengths" :key="s.en" class="card">
          <div class="card__head">
            <span class="card__no">0{{ i + 1 }}</span>
            <span class="eyebrow card__en">{{ s.en }}</span>
          </div>
          <h3 class="card__title">{{ s.title }}</h3>
          <p class="card__desc">{{ s.desc }}</p>
          <ul class="card__points">
            <li v-for="p in s.points" :key="p">{{ p }}</li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.strengths {
  padding-block: clamp(4.5rem, 10vw, 8rem);
  background: var(--ink);
  color: var(--paper);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16.5rem), 1fr));
  border: 1px solid rgb(243 241 236 / 0.25);
  border-radius: var(--radius);
  overflow: hidden;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.5rem 2rem;
  border-right: 1px solid rgb(243 241 236 / 0.25);
  margin-right: -1px;
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    22rem circle at var(--mx, -999px) var(--my, -999px),
    rgb(255 90 54 / 0.16),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.4s;
}
.grid:hover .card::before {
  opacity: 1;
}
.card > * {
  position: relative;
}
.card__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card__no {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 2.4rem;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px var(--paper);
  transition:
    color 0.3s,
    -webkit-text-stroke-color 0.3s;
}
.card:hover .card__no {
  color: var(--accent);
  -webkit-text-stroke-color: var(--accent);
}
.card__en {
  color: var(--muted-dark);
}
.card__title {
  margin-top: 1.75rem;
  font-size: 1.35rem;
}
.card__desc {
  margin-top: 0.75rem;
  color: #cfcbc2;
  font-size: 0.95rem;
}
.card__points {
  display: grid;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 1.5rem;
  font-size: 0.88rem;
}
.card__points li {
  display: flex;
  gap: 0.6rem;
}
.card__points li::before {
  content: '→';
  color: var(--accent);
  font-family: var(--font-mono);
}

@media (max-width: 600px) {
  .card {
    border-right: none;
    border-bottom: 1px solid rgb(243 241 236 / 0.25);
    margin: 0 0 -1px;
  }
}
</style>
