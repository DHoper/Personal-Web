<script setup lang="ts">
import { computed } from 'vue'

// 12×12 像素圖示：每個字元一格，「.」是透明。顏色由 CSS 變數決定，跟著主題走。
// t = 目前的主題色（--tone），其他字母是固定色。
const ICONS: Record<string, string[]> = {
  folder: [
    '............',
    '.kkkk.......',
    'kttttk......',
    'kttttkkkkkk.',
    'kttttttttttk',
    'kkkkkkkkkkkk',
    'kttttttttttk',
    'kttttttttttk',
    'kttttttttttk',
    'kttttttttttk',
    'kkkkkkkkkkkk',
    '............',
  ],
  web: [
    'kkkkkkkkkkkk',
    'kaywwwwwwwwk',
    'kkkkkkkkkkkk',
    'kwwwwwwwwwwk',
    'kwttttwwwwwk',
    'kwttttwgggwk',
    'kwttttwwwwwk',
    'kwwwwwwgggwk',
    'kwggggggwwwk',
    'kwwwwwwwwwwk',
    'kkkkkkkkkkkk',
    '............',
  ],
  extension: [
    '....kk......',
    '...kttk.....',
    '.kkkttkkkkk.',
    '.kttttttttk.',
    '.kttttttttkk',
    '.ktttttttttk',
    '.ktttttttttk',
    '.kttttttttkk',
    '.kttttttttk.',
    '.kkkkkkkkkk.',
    '............',
    '............',
  ],
  desktop: [
    'kkkkkkkkkkkk',
    'kttttttttttk',
    'ktwwtttttttk',
    'ktwttttttttk',
    'kttttttttttk',
    'kttttttttttk',
    'kttttttttttk',
    'kkkkkkkkkkkk',
    '.....kk.....',
    '.....kk.....',
    '...kkkkkk...',
    '............',
  ],
  service: [
    'kkkkkkkkkkkk',
    'kttttttttttk',
    'ktkkkttttntk',
    'kttttttttttk',
    'kkkkkkkkkkkk',
    'kttttttttttk',
    'ktkkkttttatk',
    'kttttttttttk',
    'kkkkkkkkkkkk',
    '.....kk.....',
    '..kkkkkkkk..',
    '............',
  ],
  business: [
    '............',
    '....kkkk....',
    '...k....k...',
    'kkkkkkkkkkkk',
    'kttttttttttk',
    'kttttttttttk',
    'kkkkkyykkkkk',
    'kttttyyttttk',
    'kttttttttttk',
    'kttttttttttk',
    'kkkkkkkkkkkk',
    '............',
  ],
  tool: [
    '.....kk.....',
    '..k.kttk.k..',
    '.kkkkttkkkk.',
    '..kttttttk..',
    'kkkttkkttkkk',
    'ktttk..ktttk',
    'ktttk..ktttk',
    'kkkttkkttkkk',
    '..kttttttk..',
    '.kkkkttkkkk.',
    '..k.kttk.k..',
    '.....kk.....',
  ],
  fun: [
    '............',
    '............',
    '.kkkkkkkkkk.',
    'kttttttttttk',
    'kttktttttatk',
    'ktkkktttatak',
    'kttktttttatk',
    'kttttttttttk',
    'kttkkkkkkttk',
    'kkk......kkk',
    '............',
    '............',
  ],
  community: [
    '............',
    '..kkk...kkk.',
    '.kyyyk.kyyyk',
    '.kyyyk.kyyyk',
    '..kkk...kkk.',
    '.kkkk..kkkk.',
    'kttttkkttttk',
    'kttttkkttttk',
    'kttttkkttttk',
    'kkkkkkkkkkkk',
    '............',
    '............',
  ],
  live: [
    '............',
    '..kk........',
    '..kakk......',
    '..kaaakk....',
    '..kaaaaakk..',
    '..kaaaaaaak.',
    '..kaaaaakk..',
    '..kaaakk....',
    '..kakk......',
    '..kk........',
    '............',
    '............',
  ],
  download: [
    '....kkkk....',
    '....kttk....',
    '....kttk....',
    '....kttk....',
    '.kkkkttkkkk.',
    '..kttttttk..',
    '...kttttk...',
    '....kttk....',
    '.....kk.....',
    'k..........k',
    'kkkkkkkkkkkk',
    '............',
  ],
  source: [
    '............',
    '............',
    '.......kk...',
    '...kk..kkk..',
    '..kk..kk.kk.',
    '.kk...kk..kk',
    '..kk.kk..kk.',
    '...kkkk.kk..',
    '....kk......',
    '............',
    '............',
    '............',
  ],
  user: [
    '....kkkk....',
    '...kyyyyk...',
    '...kyyyyk...',
    '...kyyyyk...',
    '....kkkk....',
    '..kkkkkkkk..',
    '.kttttttttk.',
    '.kttttttttk.',
    '.kttttttttk.',
    '.kkkkkkkkkk.',
    '............',
    '............',
  ],
  branch: [
    '..k.........',
    '.kkk........',
    '.kak........',
    '.kkk....kkk.',
    '..k.....kak.',
    '..k.....kkk.',
    '..k....k....',
    '..k..kk.....',
    '.kkkk.......',
    '.kak........',
    '.kkk........',
    '............',
  ],
  star: [
    '.....kk.....',
    '.....kk.....',
    '....kyyk....',
    'kkkkkyykkkkk',
    '.kyyyyyyyyk.',
    '..kyyyyyyk..',
    '...kyyyyk...',
    '..kyykkyyk..',
    '.kyyk..kyyk.',
    '.kkk....kkk.',
    '............',
    '............',
  ],
  stack: [
    '............',
    '.kkkkkkkkkk.',
    '.kttttttttk.',
    '.kkkkkkkkkk.',
    'kkkkkkkkkkk.',
    'kyyyyyyyyyk.',
    'kkkkkkkkkkk.',
    '..kkkkkkkkkk',
    '..kbbbbbbbbk',
    '..kkkkkkkkkk',
    '............',
    '............',
  ],
  mail: [
    '............',
    'kkkkkkkkkkkk',
    'kkwwwwwwwwkk',
    'kwkwwwwwwkwk',
    'kwwkwwwwkwwk',
    'kwwwkkkkwwwk',
    'kwwwwwwwwwwk',
    'kwwwwwwwwwwk',
    'kkkkkkkkkkkk',
    '............',
    '............',
    '............',
  ],
  search: [
    '..kkkk......',
    '.kwwwwk.....',
    'kwwbwwwk....',
    'kwbwwwwk....',
    'kwwwwwwk....',
    'kwwwwwwk....',
    '.kwwwwk.....',
    '..kkkkkk....',
    '......kkk...',
    '.......kkk..',
    '........kk..',
    '............',
  ],
}

const COLORS: Record<string, string> = {
  k: 'var(--ink)',
  w: 'var(--white)',
  a: 'var(--accent)',
  y: 'var(--yellow)',
  t: 'var(--tone, var(--yellow))',
  b: '#7fdcf5',
  n: '#7be0a0',
  g: 'var(--muted-dark)',
}

const props = withDefaults(defineProps<{ name: string; size?: number | string }>(), { size: 24 })

// 同一列連續同色的格子合併成一個矩形，減少節點數
const rects = computed(() => {
  const rows = ICONS[props.name] ?? ICONS.folder!
  const out: { x: number; y: number; w: number; fill: string }[] = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < 12) {
      const c = row[x] ?? '.'
      let w = 1
      while (x + w < 12 && (row[x + w] ?? '.') === c) w++
      if (c !== '.' && COLORS[c]) out.push({ x, y, w, fill: COLORS[c]! })
      x += w
    }
  })
  return out
})

const px = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg
    class="px-icon"
    viewBox="0 0 12 12"
    :width="px"
    :height="px"
    shape-rendering="crispEdges"
    aria-hidden="true"
    focusable="false"
  >
    <rect v-for="(r, i) in rects" :key="i" :x="r.x" :y="r.y" :width="r.w" height="1" :fill="r.fill" />
  </svg>
</template>

<style scoped>
.px-icon {
  display: block;
  flex: none;
  image-rendering: pixelated;
}
</style>
