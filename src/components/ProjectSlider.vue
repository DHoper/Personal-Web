<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SectionTitle from './SectionTitle.vue'
import ProjectCase from './ProjectCase.vue'
import { profile, projects } from '../data/profile'

// 左右切換作品：頭尾循環、手機滑動、鍵盤左右鍵
const index = ref(0)
const count = projects.length
const inView = ref(false)
const section = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

function go(i: number) {
  index.value = (i + count) % count
}

let startX: number | null = null
function onPointerDown(e: PointerEvent) {
  if (e.pointerType !== 'mouse') startX = e.clientX
}
function onPointerUp(e: PointerEvent) {
  if (startX === null) return
  const dx = e.clientX - startX
  startX = null
  if (Math.abs(dx) > 60) go(index.value + (dx < 0 ? 1 : -1))
}

onMounted(() => {
  if (!section.value || typeof IntersectionObserver === 'undefined') {
    inView.value = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        inView.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.25 },
  )
  observer.observe(section.value)
})
onBeforeUnmount(() => observer?.disconnect())

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section
    id="work"
    ref="section"
    class="work"
    aria-roledescription="carousel"
    aria-label="作品精選"
    @keydown.left="go(index - 1)"
    @keydown.right="go(index + 1)"
  >
    <div class="wrap">
      <SectionTitle index="04" en="Key Projects" zh="代表專案" />

      <div v-reveal class="controls">
        <div class="tabs" role="tablist" aria-label="選擇作品">
          <button
            v-for="(p, i) in projects"
            :key="p.title"
            type="button"
            role="tab"
            :aria-selected="i === index"
            :class="{ on: i === index }"
            :style="{ '--tone': p.color }"
            @click="go(i)"
          >
            {{ p.title }}
          </button>
        </div>
        <div class="nav">
          <span class="counter">{{ pad(index + 1) }} <i>/ {{ pad(count) }}</i></span>
          <button type="button" class="arrow" aria-label="上一個作品" @click="go(index - 1)">←</button>
          <button type="button" class="arrow" aria-label="下一個作品" @click="go(index + 1)">→</button>
        </div>
      </div>

      <div v-reveal class="viewport" @pointerdown="onPointerDown" @pointerup="onPointerUp" @pointercancel="startX = null">
        <div class="track" :style="{ transform: `translateX(-${index * 100}%)` }">
          <div
            v-for="(p, i) in projects"
            :key="p.title"
            class="slide"
            role="group"
            aria-roledescription="slide"
            :aria-label="`${i + 1} / ${count}：${p.title}`"
            :inert="i !== index"
          >
            <ProjectCase :project="p" :live="inView && i === index" />
          </div>
        </div>
      </div>

      <p v-reveal class="more">
        個人作品與原始碼放在 GitHub：
        <a :href="profile.github" target="_blank" rel="noopener">github.com/DHoper ↗</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.more {
  margin-top: 1.75rem;
  font-size: 0.95rem;
  color: var(--muted);
}
.more a {
  font-weight: 700;
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
.work {
  padding-block: clamp(4.5rem, 10vw, 8rem);
  background: var(--paper-2);
  border-block: var(--border);
}
.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.tabs button {
  position: relative;
  padding: 0.4em 0.95em;
  border: var(--border);
  border-radius: var(--radius);
  background: var(--white);
  font-weight: 700;
  font-size: 0.9rem;
  transition:
    transform 0.15s,
    box-shadow 0.15s,
    background-color 0.2s;
}
.tabs button:hover {
  background: var(--paper);
}
.tabs button.on {
  background: var(--tone);
  box-shadow: 3px 3px 0 0 var(--ink);
  transform: translate(-2px, -2px);
}
.nav {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.counter {
  margin-right: 0.5rem;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.1rem;
}
.counter i {
  font-style: normal;
  color: var(--muted);
}
.arrow {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: var(--border);
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: 3px 3px 0 0 var(--ink);
  font-family: var(--font-mono);
  font-size: 1.1rem;
  transition:
    transform 0.15s,
    box-shadow 0.15s,
    background-color 0.2s;
}
.arrow:hover {
  background: var(--accent);
}
.arrow:active {
  transform: translate(3px, 3px);
  box-shadow: none;
}
.viewport {
  overflow: hidden;
  /* 讓卡片後方的疊層與陰影不被裁掉 */
  padding: 4px 4px 22px;
  margin: -4px -4px -22px;
  touch-action: pan-y;
}
.track {
  display: flex;
  align-items: flex-start;
  transition: transform 0.9s cubic-bezier(0.7, 0, 0.25, 1);
}
.slide {
  flex: 0 0 100%;
  padding-right: 4px;
}
</style>
