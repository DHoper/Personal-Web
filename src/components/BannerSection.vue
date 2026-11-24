<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile } from '../data/profile'
import scrollText from '../assets/svg/scroll-text.svg'
import scrollArrow from '../assets/svg/scroll-arrow.svg'

// 舊版 makelongshadow() 的進化：單一朱紅色的立體字，載入時「擠出」一次。
// 陰影方向由 --sx / --sy 決定：游標像一盞光源，陰影永遠落在背光的那一側。
const layers = 14
const extrude = Array.from({ length: layers }, (_, i) => {
  const d = ((i + 1) * 0.0055).toFixed(4)
  return `calc(var(--sx) * ${d}em) calc(var(--sy) * ${d}em) 0 #ff5a36`
}).join(',')
const flat = Array.from({ length: layers }, () => '0 0 0 #ff5a36').join(',')

const hello = ref<HTMLElement | null>(null)
let raf = 0
let px = 0
let py = 0

function update() {
  raf = 0
  const el = hello.value
  if (!el || window.scrollY > window.innerHeight) return
  const r = el.getBoundingClientRect()
  const clamp = (v: number) => Math.max(-1.3, Math.min(1.3, v))
  const sx = clamp(((r.left + r.width / 2 - px) / (window.innerWidth / 2)) * 1.3)
  const sy = clamp(((r.top + r.height / 2 - py) / (window.innerHeight / 2)) * 1.3)
  el.style.setProperty('--sx', sx.toFixed(3))
  el.style.setProperty('--sy', sy.toFixed(3))
}

function onMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  px = e.clientX
  py = e.clientY
  if (!raf) raf = requestAnimationFrame(update)
}

onMounted(() => window.addEventListener('pointermove', onMove, { passive: true }))
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  cancelAnimationFrame(raf)
})

const helloVars = { '--extrude': extrude, '--flat': flat }
const badgeVars = {
  '--mask-text': `url("${scrollText}")`,
  '--mask-arrow': `url("${scrollArrow}")`,
}
</script>

<template>
  <section id="top" class="banner">
    <div class="wrap banner__inner">
      <p class="meta eyebrow">
        <span>// Portfolio</span>
        <span>{{ profile.location }}</span>
        <span class="open"><i aria-hidden="true"></i>Open to work</span>
      </p>

      <h1 class="code" aria-label='console.log("HELLO!!")'>
        <span class="code__call" aria-hidden="true">
          <span class="c-obj">console</span>.<span class="c-fn">log</span>(
        </span>
        <span ref="hello" class="hello" :style="helloVars" aria-hidden="true">"HELLO!!"</span>
        <span class="code__close" aria-hidden="true">);</span>
      </h1>

      <div class="intro">
        <h2 class="name">
          I'm {{ profile.firstName }} {{ profile.lastName }}<span class="name__zh">{{ profile.nameZh }}</span>
        </h2>
        <p class="role">{{ profile.roleEn }}</p>
        <p class="pitch">{{ profile.pitch }}</p>
        <ul class="focus" aria-label="專長重點">
          <li v-for="f in profile.focus" :key="f">{{ f }}</li>
        </ul>
        <div class="cta">
          <a class="btn btn--accent" href="#work">查看作品 <span class="arrow">→</span></a>
          <a class="btn btn--ghost" href="#contact">聯絡我</a>
        </div>
      </div>
    </div>

    <a class="badge" href="#about" aria-label="往下捲動" :style="badgeVars">
      <span class="badge__text"></span>
      <span class="badge__arrow"></span>
    </a>
  </section>
</template>

<style scoped>
.banner {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-block: calc(var(--nav-h) + 2.5rem) 5rem;
  background:
    linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px) 0 0 / 100% 64px,
    linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px) 0 0 / 64px 100%,
    var(--ink);
  color: var(--paper);
  overflow: hidden;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  color: var(--muted-dark);
}
.open {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--paper);
}
.open i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3ddc84;
  box-shadow: 0 0 0 0 rgb(61 220 132 / 0.6);
  animation: ping 2s ease-out infinite;
}
@keyframes ping {
  to {
    box-shadow: 0 0 0 10px rgb(61 220 132 / 0);
  }
}

/* console.log("HELLO!!"); */
.code {
  margin-top: clamp(1.5rem, 4vw, 3rem);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 0.4rem;
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: clamp(1rem, 2vw, 1.6rem);
  color: var(--muted-dark);
  line-height: 1;
}
.c-obj {
  color: var(--paper);
}
.c-fn {
  color: var(--yellow);
}
.hello {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3rem, 12.5vw, 11.5rem);
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: var(--paper);
  -webkit-text-stroke: 1px var(--ink);
  text-shadow: var(--extrude);
  animation: extrude 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.45s backwards;
  transition:
    --sx 0.35s ease-out,
    --sy 0.35s ease-out;
}
@keyframes extrude {
  from {
    text-shadow: var(--flat);
    transform: translate(0.04em, 0.04em);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
}

/* 首屏錯落進場（開場終端機收起後才開始） */
.meta,
.code__call,
.code__close,
.intro > *,
.badge {
  animation: riseIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.meta {
  animation-delay: 0.1s;
}
.code__call {
  animation-delay: 0.25s;
}
.code__close {
  animation-delay: 0.9s;
}
.intro > :nth-child(1) {
  animation-delay: 0.7s;
}
.intro > :nth-child(2) {
  animation-delay: 0.8s;
}
.intro > :nth-child(3) {
  animation-delay: 0.9s;
}
.intro > :nth-child(4) {
  animation-delay: 1s;
}
.intro > :nth-child(5) {
  animation-delay: 1.1s;
}
.badge {
  animation-delay: 1.3s;
}
@keyframes riseIn {
  from {
    opacity: 0;
    translate: 0 24px;
  }
}

.intro {
  margin-top: clamp(1.75rem, 4vw, 3rem);
  max-width: 46rem;
}
.name {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.4rem, 3.4vw, 2.6rem);
  line-height: 1.2;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.name__zh {
  margin-left: 0.75rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.55em;
  letter-spacing: 0.2em;
  color: var(--muted-dark);
  vertical-align: middle;
}
.role {
  margin-top: 0.6rem;
  font-family: var(--font-mono);
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
  color: var(--accent);
}
.pitch {
  margin-top: 1rem;
  font-size: clamp(1.05rem, 1.8vw, 1.3rem);
  line-height: 1.7;
  color: #dcd8cf;
}
.focus {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.5rem;
}
.focus li {
  padding: 0.35em 0.9em;
  border: 1px solid rgb(243 241 236 / 0.35);
  border-radius: var(--radius);
  font-size: 0.9rem;
}
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}
.cta .btn {
  border-color: var(--paper);
  box-shadow: 4px 4px 0 0 var(--paper);
}
.cta .btn:hover {
  box-shadow: 2px 2px 0 0 var(--paper);
}
.btn--ghost {
  background: transparent;
  color: var(--paper);
}

/* 旋轉的 scroll 徽章（保留舊版，改成單色） */
.badge {
  position: absolute;
  right: calc(var(--frame) + 2rem);
  bottom: calc(var(--frame) + 2rem);
  width: clamp(5.5rem, 8vw, 8rem);
  aspect-ratio: 1;
}
.badge__text,
.badge__arrow {
  position: absolute;
  background: var(--paper);
  -webkit-mask: var(--mask-text) center / contain no-repeat;
  mask: var(--mask-text) center / contain no-repeat;
}
.badge__text {
  inset: 0;
  animation: spin 16s linear infinite;
}
.badge__arrow {
  inset: 28%;
  background: var(--accent);
  -webkit-mask-image: var(--mask-arrow);
  mask-image: var(--mask-arrow);
  transition: transform 0.3s;
}
.badge:hover .badge__arrow {
  transform: translateY(12%);
}
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

@media (max-width: 720px) {
  .banner {
    align-items: flex-start;
  }
  .badge {
    display: none;
  }
  .name__zh {
    display: block;
    margin: 0.4rem 0 0;
  }
}
</style>
