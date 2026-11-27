<script setup lang="ts">
import { computed } from 'vue'
import { phase } from '../clock'

// 作品庫後方的像素桌布：天空、山丘、太陽或月亮，依目前時段換色（顏色在 main.css 的 --sky 等變數）。
const W = 320
const H = 90

// 山稜線：以 4px 為一階的階梯，讓邊緣保持像素感
function ridge(base: number, amp: number, freq: number, shift: number) {
  const cols: { x: number; y: number }[] = []
  for (let x = 0; x < W; x += 4) {
    const y = base - amp * (Math.sin((x + shift) * freq) * 0.6 + Math.sin((x + shift) * freq * 2.3) * 0.4)
    cols.push({ x, y: Math.round(y / 2) * 2 })
  }
  return cols
}
const far = ridge(58, 14, 0.021, 40)
const near = ridge(74, 9, 0.034, 0)

// 像素圓：每列算出寬度
function disc(cx: number, cy: number, r: number) {
  const rows: { x: number; y: number; w: number }[] = []
  for (let y = -r; y < r; y += 2) {
    const w = Math.round(Math.sqrt(r * r - (y + 1) * (y + 1)) / 2) * 2
    rows.push({ x: cx - w, y: cy + y, w: w * 2 })
  }
  return rows
}

const orb = computed(() => {
  switch (phase.value) {
    case 'morning':
      return disc(58, 40, 10)
    case 'evening':
      return disc(262, 48, 12)
    case 'night':
      return disc(270, 18, 8)
    default:
      return disc(236, 18, 10)
  }
})

const clouds = [
  { x: 30, y: 14, w: 36 },
  { x: 132, y: 24, w: 28 },
  { x: 188, y: 10, w: 40 },
]
const stars = [
  [18, 8], [46, 22], [80, 6], [104, 30], [126, 12], [158, 6], [176, 26], [206, 14], [228, 4], [244, 30], [292, 10], [306, 28],
]
</script>

<template>
  <svg class="scene" :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="xMidYMax slice" shape-rendering="crispEdges" aria-hidden="true">
    <g v-if="phase === 'night'" class="stars">
      <rect v-for="([x, y], i) in stars" :key="i" :x="x" :y="y" width="2" height="2" />
    </g>
    <g v-else class="clouds">
      <g v-for="(c, i) in clouds" :key="i">
        <rect :x="c.x + 6" :y="c.y" :width="c.w - 12" height="2" />
        <rect :x="c.x" :y="c.y + 2" :width="c.w" height="4" />
      </g>
    </g>
    <g class="orb">
      <rect v-for="(r, i) in orb" :key="i" :x="r.x" :y="r.y" :width="r.w" height="2" />
    </g>
    <g class="far">
      <rect v-for="c in far" :key="c.x" :x="c.x" :y="c.y" width="4" :height="H - c.y" />
    </g>
    <g class="near">
      <rect v-for="c in near" :key="c.x" :x="c.x" :y="c.y" width="4" :height="H - c.y" />
    </g>
  </svg>
</template>

<style scoped>
.scene {
  position: absolute;
  inset: auto 0 0;
  width: 100%;
  height: clamp(9rem, 30vw, 20rem);
  pointer-events: none;
}
.stars rect {
  fill: var(--orb);
}
.clouds rect {
  fill: var(--white);
  opacity: 0.9;
}
.orb rect {
  fill: var(--orb);
}
.far rect {
  fill: var(--hill-2);
}
.near rect {
  fill: var(--hill);
}
</style>
