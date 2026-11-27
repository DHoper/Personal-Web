<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { locale } from '../i18n'
import walkSheet from '../assets/img/tapir-walk.png'
import idleSheet from '../assets/img/tapir-idle.png'

// 在畫面最下緣散步的馬來貘（來自「網頁寵物」作品的素材）。
// 走一走、停下來發呆；點牠會跳一下冒出一句話。偏好減少動態效果時只靜靜站著。
const FRAME_W = 92
const FRAME_H = 56
const SCALE = 0.7
const SPEED = 22 // px / 秒

const x = ref(0)
const dir = ref<1 | -1>(1)
const mode = ref<'walk' | 'idle'>('idle')
const hop = ref(false)
const say = ref('')

const LINES = { zh: ['噗嚕～', '慢慢走', '黑白分明', '想吃葉子'], en: ['Snort~', 'Slow and steady', 'Black and white', 'Leaves, please?'] }

let raf = 0
let last = 0
let until = 0
let sayTimer = 0

function maxX() {
  return Math.max(0, window.innerWidth - FRAME_W * SCALE - 24)
}

function step(ts: number) {
  const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0
  last = ts
  if (ts > until) {
    if (mode.value === 'walk' && Math.random() < 0.5) {
      mode.value = 'idle'
      until = ts + 3000 + Math.random() * 5000
    } else {
      mode.value = 'walk'
      if (Math.random() < 0.35) dir.value = dir.value === 1 ? -1 : 1
      until = ts + 4000 + Math.random() * 7000
    }
  }
  if (mode.value === 'walk') {
    const max = maxX()
    x.value += dir.value * SPEED * dt
    if (x.value <= 0) {
      x.value = 0
      dir.value = 1
    } else if (x.value >= max) {
      x.value = max
      dir.value = -1
    }
  }
  raf = requestAnimationFrame(step)
}

function poke() {
  hop.value = false
  requestAnimationFrame(() => (hop.value = true))
  const lines = LINES[locale.value]
  say.value = lines[Math.floor(Math.random() * lines.length)]!
  clearTimeout(sayTimer)
  sayTimer = window.setTimeout(() => (say.value = ''), 1800)
}

onMounted(() => {
  x.value = maxX() * 0.7
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  raf = requestAnimationFrame(step)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  clearTimeout(sayTimer)
})
</script>

<template>
  <div
    class="pet"
    :style="{
      transform: `translateX(${x.toFixed(1)}px)`,
      '--w': `${FRAME_W * SCALE}px`,
      '--h': `${FRAME_H * SCALE}px`,
      '--walk': `url(${walkSheet})`,
      '--idle': `url(${idleSheet})`,
    }"
  >
    <span v-if="say" class="pet__say" aria-live="polite">{{ say }}</span>
    <button
      type="button"
      class="pet__body"
      :class="[`pet__body--${mode}`, { 'pet__body--hop': hop, 'pet__body--left': dir === -1 }]"
      :aria-label="locale === 'zh' ? '馬來貘' : 'Malayan tapir'"
      @click="poke"
      @animationend="hop = false"
    ></button>
  </div>
</template>

<style scoped>
.pet {
  position: fixed;
  left: calc(var(--frame) + 6px);
  bottom: var(--frame);
  z-index: 70;
  width: var(--w);
  height: var(--h);
  will-change: transform;
}
.pet__body {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: var(--idle) 0 0 / calc(var(--w) * 7) var(--h) no-repeat;
  image-rendering: pixelated;
  cursor: pointer;
  animation: idle 1.8s steps(7) infinite;
}
.pet__body--walk {
  background-image: var(--walk);
  background-size: calc(var(--w) * 6) var(--h);
  animation: walk 0.9s steps(6) infinite;
}
.pet__body--left {
  scale: -1 1;
}
.pet__body--hop {
  animation:
    hop 0.45s cubic-bezier(0.3, 1.6, 0.5, 1),
    idle 1.8s steps(7) infinite;
}
.pet__body--walk.pet__body--hop {
  animation:
    hop 0.45s cubic-bezier(0.3, 1.6, 0.5, 1),
    walk 0.9s steps(6) infinite;
}
@keyframes walk {
  to {
    background-position-x: calc(var(--w) * -6);
  }
}
@keyframes idle {
  to {
    background-position-x: calc(var(--w) * -7);
  }
}
@keyframes hop {
  40% {
    translate: 0 -12px;
  }
}
.pet__say {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 50%;
  translate: -50% 0;
  padding: 0.05rem 0.45rem;
  border: 1.5px solid var(--ink);
  border-radius: 4px;
  background: var(--white);
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .pet__body {
    animation: none;
  }
}
</style>
