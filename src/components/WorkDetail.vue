<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import WinFrame from './WinFrame.vue'
import PixelIcon from './PixelIcon.vue'
import type { Access, Work, WorkLink } from '../data/works'
import { locale, t } from '../i18n'

// 作品的詳細視窗。不用 <dialog>：dialog 會蓋過自訂游標，改用固定定位的圖層，自己處理焦點與 Esc。
const props = defineProps<{ list: Work[]; index: number }>()
const emit = defineEmits<{ close: []; 'update:index': [number] }>()

const work = computed(() => props.list[props.index]!)
const root = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
let returnFocus: HTMLElement | null = null

const formIcon: Record<string, string> = { web: 'web', extension: 'extension', desktop: 'desktop', service: 'service' }
const purposeIcon: Record<string, string> = { business: 'business', tool: 'tool', fun: 'fun', community: 'community' }
const ORDER: Access[] = ['live', 'download', 'source']
const links = computed(() => [...work.value.links].sort((a, b) => ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind)))

function linkLabel(l: WorkLink) {
  const base = t.value.lab.link[l.kind]
  if (!l.label) return base
  const extra = l.label[locale.value]
  return l.kind === 'source' ? `${base}・${extra}` : extra
}

function go(step: number) {
  const n = props.list.length
  emit('update:index', (props.index + step + n) % n)
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
  } else if (e.key === 'ArrowRight' && !(e.target as HTMLElement).closest('input, select, textarea')) {
    go(1)
  } else if (e.key === 'ArrowLeft' && !(e.target as HTMLElement).closest('input, select, textarea')) {
    go(-1)
  } else if (e.key === 'Tab' && root.value) {
    // 焦點留在視窗內
    const items = [...root.value.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)')]
    if (!items.length) return
    const first = items[0]!
    const last = items[items.length - 1]!
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

onMounted(async () => {
  returnFocus = document.activeElement as HTMLElement | null
  document.documentElement.classList.add('modal-open')
  const main = document.querySelector('main')
  if (main) main.inert = true
  await nextTick()
  closeBtn.value?.focus()
})
onBeforeUnmount(() => {
  document.documentElement.classList.remove('modal-open')
  const main = document.querySelector('main')
  if (main) main.inert = false
  returnFocus?.focus()
})
</script>

<template>
  <Teleport to="body">
    <div ref="root" class="modal" role="dialog" aria-modal="true" :aria-labelledby="`work-${work.id}`" @keydown="onKey">
      <div class="modal__backdrop" @click="emit('close')"></div>
      <WinFrame class="modal__win" :title="`${work.id}.app`" :icon="formIcon[work.form]" :tone="work.color" active>
        <template #actions>
          <span class="pager">
            <button type="button" :aria-label="t.lab.prev" @click="go(-1)">←</button>
            <span class="pager__n">{{ index + 1 }}/{{ list.length }}</span>
            <button type="button" :aria-label="t.lab.next" @click="go(1)">→</button>
          </span>
          <button ref="closeBtn" type="button" class="close" :aria-label="t.lab.close" @click="emit('close')">×</button>
        </template>

        <div class="content" :class="{ 'content--icon': !work.image }" :style="{ '--tone': work.color }">
          <div class="visual">
            <img v-if="work.image" :src="`./works/${work.image}`" :alt="work.title" />
            <span v-else class="visual__icon"><PixelIcon :name="purposeIcon[work.purpose]!" :size="64" /></span>
          </div>

          <div class="info">
            <p class="eyebrow year">
              {{ work.year }}<span v-if="work.wip" class="wip">{{ t.lab.wip }}</span><span v-if="work.featured" class="feat">★ {{ t.lab.featured }}</span>
            </p>
            <h3 :id="`work-${work.id}`" class="title">{{ work.title }}</h3>
            <p class="tagline">{{ work.tagline }}</p>
            <p class="summary">{{ work.summary }}</p>
            <ul class="highlights">
              <li v-for="h in work.highlights" :key="h">{{ h }}</li>
            </ul>

            <dl class="cats" :aria-label="t.lab.cats">
              <div><dt>{{ t.lab.groups.form }}</dt><dd>{{ t.lab.form[work.form] }}</dd></div>
              <div><dt>{{ t.lab.groups.purpose }}</dt><dd>{{ t.lab.purpose[work.purpose] }}</dd></div>
              <div><dt>{{ t.lab.groups.stack }}</dt><dd>{{ t.lab.stack[work.stack] }}</dd></div>
              <div><dt>{{ t.lab.groups.scale }}</dt><dd>{{ t.lab.scale[work.scale] }}</dd></div>
            </dl>

            <ul class="tags" :aria-label="t.lab.tech">
              <li v-for="x in work.tech" :key="x">{{ x }}</li>
            </ul>

            <p v-if="work.note && work.access.includes('download')" class="note">
              <strong>{{ t.lab.install }}：</strong>{{ work.note }}
            </p>

            <div class="links">
              <a
                v-for="l in links"
                :key="l.href"
                class="btn btn--sm"
                :class="{ 'btn--accent': l.kind === 'live' }"
                :href="l.href"
                target="_blank"
                rel="noopener"
              >
                <PixelIcon :name="l.kind" :size="14" />
                {{ linkLabel(l) }}
                <span class="arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </WinFrame>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 85;
  --bw: 1.5px;
  --border: 1.5px solid var(--ink);
  display: grid;
  place-items: center;
  padding: clamp(0.75rem, 3vw, 2.5rem);
  padding-bottom: calc(var(--taskbar-h) + clamp(0.75rem, 3vw, 2.5rem));
}
.modal__backdrop {
  position: absolute;
  inset: 0;
  background: repeating-conic-gradient(rgb(17 17 17 / 0.55) 0 25%, rgb(17 17 17 / 0.3) 0 50%) 0 0 / 4px 4px;
  animation: fade 0.2s ease-out;
}
.modal__win {
  position: relative;
  width: min(100%, 50rem);
  --win-off: 6px;
  max-height: 100%;
  animation: pop 0.28s cubic-bezier(0.2, 0.9, 0.3, 1.2);
}
.modal__win :deep(.win__frame) {
  max-height: calc(100dvh - var(--taskbar-h) - 3rem);
}
.modal__win :deep(.win__body) {
  overflow: auto;
  overscroll-behavior: contain;
}
@keyframes fade {
  from {
    opacity: 0;
  }
}
@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.94) translateY(12px);
  }
}

.modal__win :deep(.win__bar) {
  min-height: 1.9rem;
  padding: 0.2rem 0.4rem 0.2rem 0.6rem;
}
.modal__win :deep(.win__title) {
  font-size: 0.74rem;
}
.modal__win :deep(.win__stripes) {
  height: 0.6rem;
  background: repeating-linear-gradient(to bottom, var(--ink) 0 1px, transparent 1px 3px);
}
.pager {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-right: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}
.pager button,
.close {
  display: grid;
  place-items: center;
  width: 1.3rem;
  height: 1.3rem;
  padding: 0;
  border: var(--bw) solid var(--ink);
  border-radius: 3px;
  background: var(--white);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1;
  cursor: pointer;
}
.close {
  font-size: 1.1rem;
  font-weight: 700;
}
.pager button:hover,
.close:hover {
  background: var(--ink);
  color: var(--white);
}
.pager__n {
  min-width: 2.5rem;
  text-align: center;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
}
.content--icon {
  grid-template-columns: 0.75fr 1.1fr;
}
.visual {
  display: grid;
  place-items: center;
  border-right: var(--border);
  background:
    repeating-conic-gradient(rgb(17 17 17 / 0.1) 0 25%, transparent 0 50%) 0 0 / 4px 4px,
    var(--tone);
}
.visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.visual__icon {
  padding: 3rem;
}
.visual__icon :deep(.px-icon) {
  --tone: var(--white);
  filter: drop-shadow(6px 6px 0 rgb(17 17 17 / 0.35));
}
.info {
  display: flex;
  flex-direction: column;
  padding: clamp(1rem, 2.4vw, 1.5rem);
}
.year {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  color: var(--muted);
}
.wip,
.feat {
  padding: 0 0.4rem;
  border: 1.5px solid var(--ink);
  border-radius: 3px;
  color: var(--ink);
}
.wip {
  background: var(--paper-2);
}
.feat {
  background: var(--yellow);
}
.title {
  margin-top: 0.4rem;
  font-size: clamp(1.3rem, 2.6vw, 1.7rem);
  font-weight: 900;
  line-height: 1.2;
}
.tagline {
  margin-top: 0.1rem;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--muted);
}
.summary {
  margin-top: 0.7rem;
  font-size: 0.85rem;
  line-height: 1.7;
}
.highlights {
  display: grid;
  gap: 0.2rem;
  margin-top: 0.7rem;
  font-size: 0.8rem;
}
.highlights li {
  display: flex;
  gap: 0.6rem;
}
.highlights li::before {
  content: '→';
  font-family: var(--font-mono);
  color: var(--accent);
}
.cats {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: start;
  gap: 0.35rem 1.1rem;
  margin-top: 1.1rem;
  padding-top: 0.9rem;
  border-top: 1.5px dashed var(--muted-dark);
}
.cats dt {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--muted);
  text-transform: uppercase;
}
.cats dd {
  font-weight: 700;
  font-size: 0.8rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.9rem;
}
.tags li {
  padding: 0.05em 0.6em;
  border: 1.5px solid var(--ink);
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  line-height: 1.6;
}
.note {
  margin-top: 0.9rem;
  padding: 0.5em 0.75em;
  border-left: 3px solid var(--yellow);
  background: var(--paper);
  font-size: 0.76rem;
  line-height: 1.6;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 1.25rem;
}
.links .btn {
  --tone: var(--white);
  font-size: 0.78rem;
  padding: 0.45em 0.85em;
  box-shadow: 2px 2px 0 0 var(--ink);
}

@media (max-width: 760px) {
  .content,
  .content--icon {
    grid-template-columns: 1fr;
  }
  .visual {
    aspect-ratio: 16 / 9;
    border-right: 0;
    border-bottom: var(--border);
  }
  .visual__icon {
    padding: 1.5rem;
  }
  .cats {
    grid-template-columns: repeat(2, auto);
  }
  .pager__n {
    display: none;
  }
}
</style>
