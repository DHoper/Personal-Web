<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 跑馬燈：兩條相同軌道接在一起、各移動自身寬度的 100%，接縫不會跳動。
// 會跟著捲動反應：捲得越快轉得越快並微微傾斜，往上捲時反向。
withDefaults(defineProps<{ items: string[]; tone?: 'paper' | 'ink' | 'accent'; reverse?: boolean }>(), {
  tone: 'paper',
  reverse: false,
})

const root = ref<HTMLElement | null>(null)
let raf = 0
let lastY = 0
let rate = 1
let dir = 1
let skew = 0
let visible = false
let io: IntersectionObserver | null = null

function tick() {
  const y = window.scrollY
  const v = y - lastY
  lastY = y
  if (v !== 0) dir = v > 0 ? 1 : -1
  const target = dir * (1 + Math.min(Math.abs(v) * 0.12, 5))
  rate += (target - rate) * 0.08
  skew += (Math.max(-7, Math.min(7, -v * 0.25)) - skew) * 0.12

  const el = root.value
  if (el && visible) {
    for (const a of el.getAnimations({ subtree: true })) a.playbackRate = rate
    el.style.setProperty('--skew', `${skew.toFixed(2)}deg`)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  lastY = window.scrollY
  // 先把動畫時間推到很後面，往上捲（倒轉播放）時才不會倒回 0 而停住
  root.value?.getAnimations({ subtree: true }).forEach((a) => (a.currentTime = 400_000))
  io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting))
  if (root.value) io.observe(root.value)
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  io?.disconnect()
})
</script>

<template>
  <div
    ref="root"
    class="marquee"
    :class="[`marquee--${tone}`, { 'marquee--reverse': reverse }]"
    aria-hidden="true"
  >
    <div v-for="track in 2" :key="track" class="track">
      <template v-for="n in 2" :key="n">
        <template v-for="(item, i) in items" :key="`${n}-${i}`">
          <span class="word" :class="{ 'word--outline': i % 2 === 1 }">{{ item }}</span>
          <span class="star">✦</span>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  display: flex;
  overflow: hidden;
  padding-block: 0.9rem;
  border-block: var(--border);
  background: var(--paper);
  color: var(--ink);
  user-select: none;
}
.marquee--ink {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}
.marquee--accent {
  background: var(--accent);
}
.track {
  flex: none;
  display: flex;
  align-items: center;
  animation: marquee 40s linear infinite;
  transform-origin: center;
}
.word,
.star {
  transform: skewX(var(--skew, 0deg));
}
.marquee--reverse .track {
  animation-direction: reverse;
}
.word {
  flex: none;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.8rem, 5vw, 4.5rem);
  line-height: 1;
  text-transform: uppercase;
}
.word--outline {
  color: transparent;
  -webkit-text-stroke: 1.5px currentColor;
}
.marquee--ink .word--outline {
  -webkit-text-stroke-color: var(--paper);
}
.star {
  flex: none;
  padding-inline: clamp(1rem, 2.5vw, 2.25rem);
  font-size: clamp(1rem, 2.5vw, 2rem);
  color: var(--accent);
}
.marquee--accent .star {
  color: var(--ink);
}
@keyframes marquee {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
