<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import SectionTitle from './SectionTitle.vue'
import WinFrame from './WinFrame.vue'
import PixelIcon from './PixelIcon.vue'
import DeskScene from './DeskScene.vue'
import WorkDetail from './WorkDetail.vue'
import { ACCESSES, FORMS, PURPOSES, SCALES, STACKS, works, type Access, type Work } from '../data/works'
import { t } from '../i18n'

// 作品庫：像檔案總管一樣，左邊依「形式」分資料夾，其他面向（用途／技術範圍／規模）當篩選籤；
// 最上面的「點開即用／下載安裝／原始碼」是訪客最常想知道的事，所以獨立成一排切換。
type Group = 'form' | 'purpose' | 'stack' | 'scale'

const f = reactive({
  access: 'all' as Access | 'all',
  form: null as string | null,
  purpose: null as string | null,
  stack: null as string | null,
  scale: null as string | null,
  q: '',
  sort: 'featured' as 'featured' | 'new',
})

const GROUPS: { key: Exclude<Group, 'form'>; values: readonly string[] }[] = [
  { key: 'purpose', values: PURPOSES },
  { key: 'stack', values: STACKS },
  { key: 'scale', values: SCALES },
]

function matches(w: Work, skip?: Group | 'access') {
  if (skip !== 'access' && f.access !== 'all' && !w.access.includes(f.access)) return false
  for (const g of ['form', 'purpose', 'stack', 'scale'] as Group[]) {
    if (g !== skip && f[g] && w[g] !== f[g]) return false
  }
  const q = f.q.trim().toLowerCase()
  if (q) {
    const hay = [w.title, w.tagline, w.summary, ...w.tech].join(' ').toLowerCase()
    if (!hay.includes(q)) return false
  }
  return true
}

const list = computed(() => {
  const out = works.value.filter((w) => matches(w))
  return out.sort((a, b) => {
    if (f.sort === 'featured' && !!a.featured !== !!b.featured) return a.featured ? -1 : 1
    return b.year - a.year
  })
})

// 每個選項旁的數字：套用「其他」條件後的數量，所以切換不會點到空的
function count(group: Group | 'access', value: string) {
  return works.value.filter((w) => matches(w, group) && (group === 'access' ? w.access.includes(value as Access) : w[group] === value)).length
}
const allInForm = computed(() => works.value.filter((w) => matches(w, 'form')).length)

function pick(group: Group, value: string) {
  f[group] = f[group] === value ? null : value
}

const active = computed(() => !!(f.form || f.purpose || f.stack || f.scale || f.q || f.access !== 'all'))
function clearAll() {
  Object.assign(f, { access: 'all', form: null, purpose: null, stack: null, scale: null, q: '' })
}

// 手機版：篩選區摺起來
const showFilters = ref(false)

// 詳細視窗
const openIndex = ref<number | null>(null)
watch(list, () => {
  if (openIndex.value !== null && openIndex.value >= list.value.length) openIndex.value = null
})

const accessIcon: Record<Access, string> = { live: 'live', download: 'download', source: 'source' }
const formIcon: Record<string, string> = { web: 'web', extension: 'extension', desktop: 'desktop', service: 'service' }
// 沒有預覽圖的作品，封面用「用途」圖示，一眼看出是商務、工具、娛樂還是社群
const purposeIcon: Record<string, string> = { business: 'business', tool: 'tool', fun: 'fun', community: 'community' }
</script>

<template>
  <section id="lab" class="lab" aria-labelledby="lab-title">
    <div class="wrap">
      <SectionTitle id="lab-title" index="05" en="Works Library" :zh="t.sections.lab" />

      <div v-reveal class="desk">
        <DeskScene />
        <WinFrame
          class="explorer"
          :title="t.lab.window"
          :sub="t.lab.count(list.length, works.length)"
          icon="folder"
          tone="var(--yellow)"
          active
        >
          <!-- 工具列：取得方式、搜尋、排序 -->
          <div class="toolbar">
            <div class="seg" role="group" :aria-label="t.lab.accessAria">
              <button type="button" :aria-pressed="f.access === 'all'" @click="f.access = 'all'">{{ t.lab.access.all }}</button>
              <button
                v-for="a in ACCESSES"
                :key="a"
                type="button"
                :aria-pressed="f.access === a"
                :disabled="count('access', a) === 0 && f.access !== a"
                @click="f.access = f.access === a ? 'all' : a"
              >
                <PixelIcon :name="accessIcon[a]" :size="14" />{{ t.lab.access[a] }}<span class="n">{{ count('access', a) }}</span>
              </button>
            </div>
            <label class="search">
              <PixelIcon name="search" :size="16" />
              <input v-model="f.q" type="search" :placeholder="t.lab.search" :aria-label="t.lab.search" />
            </label>
            <label class="sort">
              <span class="vh">{{ t.lab.sortAria }}</span>
              <select v-model="f.sort">
                <option value="featured">{{ t.lab.sort.featured }}</option>
                <option value="new">{{ t.lab.sort.new }}</option>
              </select>
            </label>
            <button type="button" class="filters-toggle" :aria-expanded="showFilters" @click="showFilters = !showFilters">
              {{ t.lab.filters }}<span v-if="f.purpose || f.stack || f.scale" class="dot"></span>
            </button>
          </div>

          <div class="body">
            <!-- 側欄：形式資料夾 + 其他篩選 -->
            <aside class="side" :class="{ open: showFilters }">
              <ul class="folders" :aria-label="t.lab.groups.form">
                <li>
                  <button type="button" :aria-pressed="!f.form" @click="f.form = null">
                    <PixelIcon name="folder" :size="18" /><span>{{ t.lab.all }}</span><i>{{ allInForm }}</i>
                  </button>
                </li>
                <li v-for="fm in FORMS" :key="fm">
                  <button type="button" :aria-pressed="f.form === fm" :disabled="count('form', fm) === 0 && f.form !== fm" @click="pick('form', fm)">
                    <PixelIcon :name="formIcon[fm]!" :size="18" /><span>{{ t.lab.form[fm] }}</span><i>{{ count('form', fm) }}</i>
                  </button>
                </li>
              </ul>
              <div v-for="g in GROUPS" :key="g.key" class="group">
                <p class="eyebrow group__title">{{ t.lab.groups[g.key] }}</p>
                <div class="chips">
                  <button
                    v-for="v in g.values"
                    :key="v"
                    type="button"
                    :aria-pressed="f[g.key] === v"
                    :disabled="count(g.key, v) === 0 && f[g.key] !== v"
                    @click="pick(g.key, v)"
                  >
                    {{ (t.lab[g.key] as Record<string, string>)[v] }}<i>{{ count(g.key, v) }}</i>
                  </button>
                </div>
              </div>
            </aside>

            <!-- 作品格 -->
            <div class="grid-wrap">
              <ul v-if="list.length" class="grid">
                <li v-for="(w, i) in list" :key="w.id">
                  <button type="button" class="card" :style="{ '--tone': w.color }" aria-haspopup="dialog" @click="openIndex = i">
                    <span class="cover">
                      <img v-if="w.image" :src="`./works/${w.image}`" alt="" loading="lazy" />
                      <span v-else class="cover__icon"><PixelIcon :name="purposeIcon[w.purpose]!" :size="60" /></span>
                      <span class="cover__form" :title="t.lab.form[w.form]"><PixelIcon :name="formIcon[w.form]!" :size="16" /></span>
                      <span class="badges">
                        <span v-for="a in w.access.filter((x) => x !== 'source')" :key="a" class="badge" :class="`badge--${a}`">
                          <PixelIcon :name="accessIcon[a]" :size="12" />{{ t.lab.access[a] }}
                        </span>
                        <span v-if="w.wip" class="badge badge--wip">{{ t.lab.wip }}</span>
                      </span>
                    </span>
                    <span class="card__text">
                      <span class="card__title">{{ w.title }}<span v-if="w.featured" class="star" :title="t.lab.featured">★</span></span>
                      <span class="card__tagline">{{ w.tagline }}</span>
                      <span class="card__meta">
                        <span>{{ w.year }}</span><span>{{ t.lab.form[w.form] }}</span><span>{{ t.lab.stack[w.stack] }}</span>
                      </span>
                    </span>
                  </button>
                </li>
              </ul>
              <div v-else class="empty">
                <PixelIcon name="folder" :size="48" />
                <p>{{ t.lab.empty }}</p>
                <button type="button" class="btn btn--sm" @click="clearAll">{{ t.lab.clear }}</button>
              </div>
            </div>
          </div>

          <div class="status">
            <span>{{ t.lab.count(list.length, works.length) }}</span>
            <button v-if="active" type="button" class="status__clear" @click="clearAll">× {{ t.lab.clear }}</button>
          </div>
        </WinFrame>
      </div>
    </div>

    <WorkDetail v-if="openIndex !== null" v-model:index="openIndex" :list="list" @close="openIndex = null" />
  </section>
</template>

<style scoped>
.lab {
  padding-block: clamp(4.5rem, 10vw, 8rem);
}
.vh {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* ---- 桌布 ---- */
.desk {
  position: relative;
  isolation: isolate;
  padding: clamp(1rem, 3.5vw, 2.75rem) clamp(0.75rem, 3.5vw, 2.75rem) clamp(3.5rem, 9vw, 7.5rem);
  border: var(--border);
  border-radius: var(--radius);
  background: linear-gradient(var(--sky) 0 38%, var(--sky-2) 62%);
  overflow: hidden;
  transition: background 1s;
}
/* 天空兩色之間用網點過渡，避免平滑漸層破壞像素感 */
.desk::before {
  content: '';
  position: absolute;
  inset: 34% 0 auto;
  height: 10%;
  background: repeating-conic-gradient(var(--sky) 0 25%, var(--sky-2) 0 50%) 0 0 / 4px 4px;
  pointer-events: none;
}
.explorer {
  position: relative;
}

/* ---- 工具列 ---- */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem;
  border-bottom: var(--border);
  background: var(--paper);
}
.seg {
  display: inline-flex;
  border: var(--border);
  border-radius: 6px;
  background: var(--white);
  overflow: hidden;
}
.seg button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.7rem;
  border: 0;
  border-right: var(--border);
  background: none;
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.3;
  white-space: nowrap;
  cursor: pointer;
}
.seg button:last-child {
  border-right: 0;
}
.seg button:hover:not(:disabled) {
  background: var(--paper-2);
}
.seg button[aria-pressed='true'] {
  background: var(--ink);
  color: var(--paper);
}
.seg button[aria-pressed='true'] :deep(rect[fill='var(--ink)']) {
  fill: var(--paper);
}
.seg .n {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  opacity: 0.6;
}
button:disabled {
  opacity: 0.35;
  cursor: default;
}
.search {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex: 1 1 11rem;
  min-width: 0;
  padding: 0.3rem 0.6rem;
  border: var(--border);
  border-radius: 6px;
  background: var(--white);
}
.search input {
  flex: 1;
  min-width: 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 0.88rem;
  outline: none;
}
.search:focus-within {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.sort select {
  padding: 0.35rem 0.5rem;
  border: var(--border);
  border-radius: 6px;
  background: var(--white);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}
.filters-toggle {
  display: none;
  position: relative;
  padding: 0.35rem 0.8rem;
  border: var(--border);
  border-radius: 6px;
  background: var(--white);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}
.filters-toggle[aria-expanded='true'] {
  background: var(--yellow);
}
.filters-toggle .dot {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 9px;
  height: 9px;
  border: 1.5px solid var(--ink);
  background: var(--accent);
}

/* ---- 主體：側欄 + 作品格 ---- */
.body {
  display: grid;
  grid-template-columns: 14.5rem 1fr;
  min-height: 24rem;
  background: var(--white);
}
.side {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 0.9rem 0.75rem 1.25rem;
  border-right: var(--border);
  background: var(--paper);
}
.folders {
  display: grid;
  gap: 0.15rem;
}
.folders button {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  padding: 0.4rem 0.5rem;
  border: var(--bw) solid transparent;
  border-radius: 6px;
  background: none;
  font-size: 0.92rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  --tone: var(--yellow);
}
.folders button span {
  flex: 1;
}
.folders button:hover:not(:disabled) {
  background: var(--paper-2);
}
.folders button[aria-pressed='true'] {
  border-color: var(--ink);
  background: var(--white);
  box-shadow: 3px 3px 0 0 var(--ink);
}
.folders i,
.chips i {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-style: normal;
  color: var(--muted);
}
.group__title {
  margin-bottom: 0.45rem;
  padding-left: 0.25rem;
  font-size: 0.72rem;
  color: var(--muted);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.chips button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.15rem 0.6rem;
  border: 1.5px solid var(--ink);
  border-radius: 999px;
  background: var(--white);
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.6;
  cursor: pointer;
}
.chips button:hover:not(:disabled) {
  background: var(--paper-2);
}
.chips button[aria-pressed='true'] {
  background: var(--accent);
  font-weight: 700;
}
.chips button[aria-pressed='true'] i {
  color: var(--ink);
}

.grid-wrap {
  min-width: 0;
  padding: clamp(0.75rem, 2vw, 1.25rem);
}
/* 寬螢幕：作品格在視窗內捲動，像真的檔案總管；手機維持整頁捲動 */
@media (min-width: 861px) {
  .body {
    height: min(44rem, calc(100dvh - var(--taskbar-h) - 11rem));
  }
  .side,
  .grid-wrap {
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--ink) var(--paper-2);
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: 1.1rem;
}
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  border: var(--border);
  border-radius: 8px;
  background: var(--white);
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}
.card:hover,
.card:focus-visible {
  transform: translate(-3px, -3px);
  box-shadow: 5px 5px 0 0 var(--ink);
}
.card:active {
  transform: none;
  box-shadow: none;
}
.cover {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  border-bottom: var(--border);
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  background:
    repeating-conic-gradient(rgb(17 17 17 / 0.1) 0 25%, transparent 0 50%) 0 0 / 4px 4px,
    var(--tone);
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover__icon {
  display: grid;
  place-items: center;
  height: 100%;
}
.cover__icon :deep(.px-icon) {
  --tone: var(--white);
  filter: drop-shadow(4px 4px 0 rgb(17 17 17 / 0.35));
}
.cover__form {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  border: 1.5px solid var(--ink);
  border-radius: 4px;
  background: var(--white);
  --tone: var(--yellow);
}
.badges {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.05rem 0.45rem 0.05rem 0.3rem;
  border: 1.5px solid var(--ink);
  border-radius: 4px;
  background: var(--white);
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.5;
}
.badge--live {
  background: var(--yellow);
}
.badge--download {
  --tone: var(--white);
  background: #7fdcf5;
}
.badge--wip {
  padding-left: 0.45rem;
  background: var(--paper-2);
}
.card__text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  padding: 0.75rem 0.85rem 0.85rem;
}
.card__title {
  font-weight: 900;
  font-size: 1.08rem;
  line-height: 1.3;
}
.star {
  margin-left: 0.35rem;
  font-size: 0.85em;
  color: var(--accent);
}
.card__tagline {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--muted);
}
.card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: auto;
  padding-top: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
}
.card__meta span {
  padding: 0 0.4rem;
  border: 1px solid var(--muted-dark);
  border-radius: 3px;
  line-height: 1.6;
}
.card__meta span:first-child {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--paper);
}

.empty {
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  text-align: center;
  color: var(--muted);
  --tone: var(--paper-2);
}

.status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.35rem 0.85rem;
  border-top: var(--border);
  background: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}
.status__clear {
  border: 0;
  background: none;
  font: inherit;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
}

@media (max-width: 860px) {
  .body {
    grid-template-columns: 1fr;
  }
  .filters-toggle {
    display: inline-block;
  }
  .side {
    display: none;
    border-right: 0;
    border-bottom: var(--border);
  }
  .side.open {
    display: flex;
  }
  .folders {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .folders button {
    width: auto;
    border-color: var(--ink);
    background: var(--white);
    font-size: 0.85rem;
  }
  .folders button[aria-pressed='true'] {
    background: var(--yellow);
    box-shadow: 2px 2px 0 0 var(--ink);
  }
}
@media (max-width: 560px) {
  .desk {
    padding: 0.75rem 0.5rem 4rem;
  }
  .toolbar {
    padding: 0.6rem;
  }
  .seg {
    order: -1;
    width: 100%;
  }
  .seg button {
    flex: 1;
    justify-content: center;
    padding-inline: 0.35rem;
    font-size: 0.78rem;
  }
  .seg .n {
    display: none;
  }
}
</style>
