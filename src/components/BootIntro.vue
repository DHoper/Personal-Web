<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { content } from '../data/profile'
import { works } from '../data/works'

// 進站時的「建置」畫面：逐行印出，跑完往上收起。
// 同一個分頁只播一次；偏好減少動態效果的使用者直接略過；點擊或按任意鍵可跳過。
const SEEN_KEY = 'boot-seen'
const STEP = 260

const show = ref(false)
const leaving = ref(false)
const lines = ref<string[]>([])
const progress = ref(0)
let timers: number[] = []
let start = 0

function finish() {
  timers.forEach(clearTimeout)
  timers = []
  const html = document.documentElement
  html.classList.remove('booting')
  html.classList.add('booted')
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* 無痕模式等情況無法寫入，忽略 */
  }
}

function leave() {
  if (leaving.value) return
  leaving.value = true
  finish()
  timers.push(window.setTimeout(() => (show.value = false), 800))
}

function skip() {
  if (show.value) leave()
}

onMounted(() => {
  let seen = false
  try {
    seen = sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    /* 忽略 */
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (seen || reduced) {
    finish()
    return
  }

  show.value = true
  document.documentElement.classList.add('booting')
  start = performance.now()

  const script = [
    '$ npm run portfolio',
    '> tingyi-lin@2.0.0 build',
    `✓ loaded career log (${content.value.experiences.length} commits)`,
    `✓ compiled ${content.value.projects.length} selected works`,
    `✓ mounted ~/library (${works.value.length} items)`,
    '__ready__',
  ]
  script.forEach((line, i) => {
    timers.push(
      window.setTimeout(() => {
        const text =
          line === '__ready__' ? `✓ ready in ${((performance.now() - start) / 1000).toFixed(2)}s` : line
        lines.value.push(text)
        progress.value = (i + 1) / script.length
      }, 250 + i * STEP),
    )
  })
  timers.push(window.setTimeout(leave, 250 + script.length * STEP + 450))

  window.addEventListener('keydown', skip, { once: true })
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  window.removeEventListener('keydown', skip)
})
</script>

<template>
  <div v-if="show" class="boot" :class="{ 'boot--leave': leaving }" aria-hidden="true" @click="skip">
    <div class="boot__inner">
      <p class="boot__logo">TL<span>/</span></p>
      <div class="boot__log">
        <p v-for="(l, i) in lines" :key="i" :class="{ ok: l.startsWith('✓') }">{{ l }}</p>
        <p class="caret-line"><span class="caret"></span></p>
      </div>
      <div class="boot__bar"><span :style="{ transform: `scaleX(${progress})` }"></span></div>
      <p class="boot__skip">click / press any key to skip</p>
    </div>
  </div>
</template>

<style scoped>
.boot {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: flex-end;
  padding: max(2rem, 6vw);
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-mono);
  clip-path: inset(0 0 0 0);
  transition: clip-path 0.8s cubic-bezier(0.8, 0, 0.2, 1);
}
.boot--leave {
  clip-path: inset(0 0 100% 0);
}
.boot__inner {
  width: min(100%, 40rem);
}
.boot__logo {
  margin-bottom: 2rem;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3rem, 10vw, 6rem);
  line-height: 1;
}
.boot__logo span {
  color: var(--accent);
}
.boot__log {
  min-height: 11rem;
  font-size: clamp(0.85rem, 1.6vw, 1rem);
  line-height: 1.9;
}
.boot__log p {
  animation: in 0.25s ease-out both;
}
.boot__log .ok {
  color: #7be0a0;
}
.caret {
  display: inline-block;
  width: 0.6em;
  height: 1.1em;
  vertical-align: text-bottom;
  background: var(--paper);
  animation: blink 0.9s steps(1) infinite;
}
.boot__bar {
  height: 4px;
  margin-top: 1.5rem;
  background: rgb(243 241 236 / 0.15);
}
.boot__bar span {
  display: block;
  height: 100%;
  background: var(--accent);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.boot__skip {
  margin-top: 1rem;
  font-size: 0.72rem;
  color: var(--muted-dark);
}
@keyframes in {
  from {
    opacity: 0;
    transform: translateX(-6px);
  }
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
