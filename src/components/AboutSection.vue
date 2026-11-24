<script setup lang="ts">
import { ref } from 'vue'
import SectionTitle from './SectionTitle.vue'
import { content } from '../data/profile'
import { t } from '../i18n'
import avatarQ from '../assets/img/avatar-q.webp'
import avatarReal from '../assets/img/avatar-real.webp'

// 舊版 Q 版大頭的延續：預設是 Q 版，點卡片或下方切換鈕翻面看本人照片，對話框跟著換句話。
const real = ref(false)
</script>

<template>
  <section id="about" class="about">
    <div class="wrap">
      <SectionTitle index="01" en="About" :zh="t.sections.about" />
      <div class="grid">
        <div class="left">
          <div v-reveal class="me">
            <button
              type="button"
              class="card"
              :class="{ 'is-real': real }"
              :aria-pressed="real"
              :aria-label="t.avatar.toggleAria"
              @click="real = !real"
            >
              <span class="face face--q"><img :src="avatarQ" :alt="t.avatar.altQ" width="480" height="480" /></span>
              <span class="face face--real"><img :src="avatarReal" :alt="t.avatar.altReal" width="480" height="480" loading="lazy" /></span>
            </button>

            <div class="side">
              <p class="bubble" aria-live="polite">
                <span :key="String(real)" class="bubble__text">{{ real ? t.avatar.realSay : t.avatar.qSay }}</span>
              </p>
              <div class="switch" role="group" :aria-label="t.avatar.toggleAria">
                <button type="button" :class="{ on: !real }" :aria-pressed="!real" @click="real = false">{{ t.avatar.q }}</button>
                <button type="button" :class="{ on: real }" :aria-pressed="real" @click="real = true">{{ t.avatar.real }}</button>
              </div>
            </div>
          </div>

          <p v-reveal="120" class="statement">
            <template v-for="(seg, i) in content.about.statement" :key="i">
              <span v-if="seg.hl" class="hl">{{ seg.t }}</span>
              <template v-else>{{ seg.t }}</template>
            </template>
          </p>
        </div>

        <div class="body">
          <p v-for="(p, i) in content.about.paragraphs" :key="i" v-reveal="120 + i * 100">{{ p }}</p>
          <dl v-reveal="450" class="facts">
            <div v-for="f in content.about.facts" :key="f.k">
              <dt class="eyebrow">{{ f.k }}</dt>
              <dd>{{ f.v }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding-block: clamp(4.5rem, 10vw, 8rem);
}
.grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;
}
.left {
  display: grid;
  gap: clamp(1.75rem, 4vw, 2.75rem);
}

/* ---- Q 版 ⇄ 本人 翻牌卡 ---- */
.me {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 1.75rem);
}
.card {
  position: relative;
  flex: none;
  width: clamp(9.5rem, 22vw, 13rem);
  aspect-ratio: 1;
  max-width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  perspective: 900px;
}
.face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: var(--border);
  border-radius: calc(var(--radius) * 2);
  box-shadow: var(--shadow);
  backface-visibility: hidden;
  transition: transform 0.7s cubic-bezier(0.7, 0, 0.2, 1);
}
.face img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.face--q {
  background: var(--yellow);
}
.face--real {
  background: var(--white);
  transform: rotateY(180deg);
}
.card.is-real .face--q {
  transform: rotateY(-180deg);
}
.card.is-real .face--real {
  transform: rotateY(0deg);
}
.card:hover .face,
.card:focus-visible .face {
  box-shadow: var(--shadow), 0 0 0 4px var(--paper), 0 0 0 6px var(--accent);
}
.card:focus-visible {
  outline: none;
}

.side {
  display: grid;
  gap: 0.9rem;
  justify-items: start;
}
/* 舊版的對話框：白底粗框，尾巴指向左邊的頭像 */
.bubble {
  position: relative;
  padding: 0.7rem 1rem;
  border: var(--border);
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
  font-weight: 700;
  line-height: 1.5;
}
.bubble::before,
.bubble::after {
  content: '';
  position: absolute;
  top: 50%;
  border-style: solid;
  transform: translateY(-50%);
}
.bubble::before {
  left: -14px;
  border-width: 9px 14px 9px 0;
  border-color: transparent var(--ink) transparent transparent;
}
.bubble::after {
  left: -9px;
  border-width: 6px 10px 6px 0;
  border-color: transparent var(--white) transparent transparent;
}
.bubble__text {
  display: inline-block;
  animation: say 0.35s ease both;
}
@keyframes say {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
}
.switch {
  display: inline-flex;
  border: var(--border);
  border-radius: 999px;
  background: var(--white);
  overflow: hidden;
}
.switch button {
  padding: 0.35rem 0.95rem;
  border: none;
  background: none;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
}
.switch button.on {
  background: var(--ink);
  color: var(--paper);
}
.switch button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -4px;
}

.statement {
  font-size: clamp(1.6rem, 3.4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.01em;
}
/* 螢光筆在段落浮現後才「畫」上去 */
.statement .hl {
  background-size: 0% 100%;
  background-repeat: no-repeat;
  transition: background-size 0.9s cubic-bezier(0.7, 0, 0.2, 1);
}
.statement.in .hl {
  background-size: 100% 100%;
}
.statement.in .hl:nth-of-type(1) {
  transition-delay: 0.6s;
}
.statement.in .hl:nth-of-type(2) {
  transition-delay: 1.1s;
}
.body {
  display: grid;
  gap: 1.1rem;
  font-size: 1.02rem;
  color: #2b2a27;
}
.facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1rem;
  border: var(--border);
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
}
.facts > div {
  padding: 0.9rem 1rem;
  min-width: 0;
}
.facts > div + div {
  border-left: var(--border);
}
.facts dt {
  color: var(--muted);
  font-size: 0.7rem;
}
.facts dd {
  margin-top: 0.15rem;
  font-weight: 700;
}

@media (prefers-reduced-motion: reduce) {
  .face {
    transition: opacity 0.3s;
    transform: none !important;
  }
  .face--real {
    opacity: 0;
  }
  .card.is-real .face--q {
    opacity: 0;
  }
  .card.is-real .face--real {
    opacity: 1;
  }
}
@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .facts {
    grid-template-columns: 1fr;
  }
  .facts > div + div {
    border-left: none;
    border-top: var(--border);
  }
}
</style>
