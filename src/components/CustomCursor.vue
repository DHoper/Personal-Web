<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import arrowSvg from '../assets/svg/cursor-arrow.svg'
import handSvg from '../assets/svg/cursor-hand.svg'

// 舊版網站的大箭頭游標（素材圖），移到可點擊的東西上換成手指；外面再加一圈慢半拍跟隨的反色圓環。
// 只在有滑鼠的裝置啟用。
const INTERACTIVE = 'a, button, [role="button"], [role="tab"]'

const enabled = ref(false)
const hovering = ref(false)
// 作品庫、作品視窗裡按鈕很密，圓圈改小、碰到按鈕也不放大
const compact = ref(false)
const COMPACT = '#lab, .modal'
const visible = ref(false)
const ring = ref<HTMLElement | null>(null)
const pointer = ref<HTMLElement | null>(null)
// 素材 36×44（viewBox 單位），箭頭尖端／指尖在圖上的位置（熱點）
const HOT = { arrow: [5, 4], hand: [15.5, 3] } as const

let mq: MediaQueryList | null = null
let raf = 0
let x = -100
let y = -100
let rx = -100
let ry = -100

function loop() {
  rx += (x - rx) * 0.2
  ry += (y - ry) * 0.2
  if (ring.value) ring.value.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
  if (pointer.value) {
    const [hx, hy] = HOT[hovering.value ? 'hand' : 'arrow']
    // 顯示成 36×44 的 1 倍；作品庫裡小一點
    const k = compact.value ? 0.8 : 1
    pointer.value.style.transform = `translate3d(${x - hx * k}px, ${y - hy * k}px, 0) scale(${k})`
  }
  raf = requestAnimationFrame(loop)
}

function onMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  x = e.clientX
  y = e.clientY
  if (!visible.value) {
    rx = x
    ry = y
    visible.value = true
  }
}

function onOver(e: Event) {
  const el = e.target as Element | null
  hovering.value = !!el?.closest?.(INTERACTIVE)
  compact.value = !!el?.closest?.(COMPACT)
}

function onLeave() {
  visible.value = false
}

// 頂部閱讀進度條
const progress = ref<HTMLElement | null>(null)
let scrollRaf = 0
function paintProgress() {
  scrollRaf = 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  const p = max > 0 ? window.scrollY / max : 0
  if (progress.value) progress.value.style.transform = `scaleX(${p.toFixed(4)})`
}
function onScroll() {
  if (!scrollRaf) scrollRaf = requestAnimationFrame(paintProgress)
}

function apply() {
  enabled.value = !!mq?.matches
  document.documentElement.classList.toggle('has-custom-cursor', enabled.value)
  cancelAnimationFrame(raf)
  if (enabled.value) raf = requestAnimationFrame(loop)
}

onMounted(() => {
  mq = window.matchMedia('(hover: hover) and (pointer: fine)')
  apply()
  mq.addEventListener('change', apply)
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerover', onOver, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  paintProgress()
})

onBeforeUnmount(() => {
  mq?.removeEventListener('change', apply)
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerover', onOver)
  document.documentElement.removeEventListener('pointerleave', onLeave)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  document.documentElement.classList.remove('has-custom-cursor')
  cancelAnimationFrame(raf)
  cancelAnimationFrame(scrollRaf)
})
</script>

<template>
  <div class="frame" aria-hidden="true"></div>
  <div class="progress" aria-hidden="true"><span ref="progress"></span></div>
  <template v-if="enabled">
    <div ref="ring" class="cursor ring" :class="{ hover: hovering, compact, hidden: !visible }" aria-hidden="true">
      <span></span>
    </div>
    <img ref="pointer" class="pointer" :class="{ hidden: !visible }" :src="hovering ? handSvg : arrowSvg" alt="" aria-hidden="true" />
  </template>
</template>

<style scoped>
/* 視窗外框（舊版的黑框，改細） */
.frame {
  position: fixed;
  inset: 0;
  z-index: 90;
  pointer-events: none;
  border: var(--frame) solid var(--ink);
}
.progress {
  position: fixed;
  top: var(--frame);
  left: var(--frame);
  right: var(--frame);
  z-index: 91;
  height: 3px;
  pointer-events: none;
}
.progress span {
  display: block;
  height: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
}
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;
  mix-blend-mode: difference;
  will-change: transform;
  transition: opacity 0.2s;
}
.cursor span {
  display: block;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition:
    width 0.25s ease,
    height 0.25s ease,
    background-color 0.25s;
}
.ring span {
  width: 36px;
  height: 36px;
  border: 1.5px solid #fff;
}
.ring.hover span {
  width: 64px;
  height: 64px;
  background: #fff;
}
.ring.compact span {
  width: 18px;
  height: 18px;
}
.ring.compact.hover span {
  width: 24px;
  height: 24px;
  background: none;
  border-width: 2px;
}
.pointer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  width: 36px;
  height: 44px;
  max-width: none;
  pointer-events: none;
  transform-origin: 0 0;
  will-change: transform;
}
.hidden {
  opacity: 0;
}
</style>
