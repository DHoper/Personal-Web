<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PixelIcon from './PixelIcon.vue'
import TaskPet from './TaskPet.vue'
import { content } from '../data/profile'
import { locale, setLocale, t } from '../i18n'
import { clockText, startClock } from '../clock'

// 像素桌面風格的工作列：開始選單、每個區塊一個「視窗按鈕」（目前所在的區塊會被按下）、語言切換與時鐘。
const tasks = [
  { id: 'about', icon: 'user', en: 'About', key: 'about' },
  { id: 'career', icon: 'branch', en: 'Career', key: 'career' },
  { id: 'work', icon: 'star', en: 'Work', key: 'work' },
  { id: 'lab', icon: 'folder', en: 'Library', key: 'lab' },
  { id: 'skills', icon: 'stack', en: 'Skills', key: 'skills' },
  { id: 'contact', icon: 'mail', en: 'Contact', key: null },
] as const

const current = ref<string>('')
const menuOpen = ref(false)
const startBtn = ref<HTMLButtonElement | null>(null)
const menu = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

function label(task: (typeof tasks)[number]) {
  if (locale.value === 'en' || !task.key) return task.en
  return t.value.sections[task.key]
}

function closeMenu(focusStart = false) {
  menuOpen.value = false
  if (focusStart) startBtn.value?.focus()
}
function onDocClick(e: MouseEvent) {
  if (!menuOpen.value) return
  const target = e.target as Node
  if (!menu.value?.contains(target) && !startBtn.value?.contains(target)) closeMenu()
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) closeMenu(true)
}

onMounted(() => {
  startClock()
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
  if (typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) current.value = e.target.id
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const id of ['top', 'strengths', ...tasks.map((x) => x.id)]) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})
onBeforeUnmount(() => {
  observer?.disconnect()
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header class="taskbar" :aria-label="t.taskbar.aria">
    <TaskPet class="taskbar__pet" />

    <button
      ref="startBtn"
      type="button"
      class="start"
      :aria-expanded="menuOpen"
      aria-controls="start-menu"
      :aria-label="t.taskbar.menu"
      @click="menuOpen = !menuOpen"
    >
      <span class="start__logo">TL<span>/</span></span>
      <span class="start__text">{{ t.taskbar.start }}</span>
    </button>

    <div v-show="menuOpen" id="start-menu" ref="menu" class="menu">
      <p class="menu__side" aria-hidden="true">{{ content.profile.firstName }} {{ content.profile.lastName }}</p>
      <nav class="menu__list" :aria-label="t.nav.aria">
        <a href="#top" @click="closeMenu()"><PixelIcon name="web" :size="20" />{{ t.nav.top }}</a>
        <a v-for="task in tasks" :key="task.id" :href="`#${task.id}`" @click="closeMenu()">
          <PixelIcon :name="task.icon" :size="20" />{{ label(task) }}
        </a>
        <hr />
        <a :href="`mailto:${content.profile.email}`" @click="closeMenu()"><PixelIcon name="mail" :size="20" />{{ t.taskbar.email }}</a>
        <a :href="content.profile.github" target="_blank" rel="noopener" @click="closeMenu()"><PixelIcon name="source" :size="20" />GitHub ↗</a>
      </nav>
    </div>

    <nav class="tasks" :aria-label="t.nav.aria">
      <a
        v-for="task in tasks"
        :key="task.id"
        :href="`#${task.id}`"
        class="task"
        :class="{ on: current === task.id }"
        :aria-current="current === task.id ? 'location' : undefined"
        :title="label(task)"
      >
        <PixelIcon :name="task.icon" :size="16" /><span>{{ label(task) }}</span>
      </a>
    </nav>

    <div class="tray">
      <button
        type="button"
        class="lang"
        :aria-label="t.nav.switchAria"
        :lang="locale === 'zh' ? 'en' : 'zh-Hant'"
        @click="setLocale(locale === 'zh' ? 'en' : 'zh')"
      >
        {{ locale === 'zh' ? 'EN' : '中' }}
      </button>
      <a :href="content.profile.github" target="_blank" rel="noopener" class="gh" aria-label="GitHub">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </a>
      <time class="clock" :aria-label="t.taskbar.clock">{{ clockText }}</time>
    </div>
  </header>
</template>

<style scoped>
.taskbar {
  position: fixed;
  left: var(--frame);
  right: var(--frame);
  bottom: var(--frame);
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: var(--taskbar-h);
  padding: 0.35rem 0.5rem calc(0.35rem + env(safe-area-inset-bottom, 0px));
  border-top: var(--border);
  background: var(--paper);
  color: var(--ink);
}
.taskbar__pet {
  left: 0.5rem;
}

.start {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex: none;
  height: 100%;
  padding: 0 0.75rem;
  border: var(--border);
  border-radius: 6px;
  background: var(--white);
  box-shadow: 2px 2px 0 0 var(--ink);
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
}
.start:hover {
  background: var(--yellow);
}
.start[aria-expanded='true'] {
  background: var(--yellow);
  box-shadow: none;
  transform: translate(2px, 2px);
}
.start__logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: -0.02em;
}
.start__logo span {
  color: var(--accent);
}

/* ---- 開始選單 ---- */
.menu {
  position: absolute;
  left: 0.5rem;
  bottom: calc(100% + 0.5rem);
  display: flex;
  min-width: 15rem;
  border: var(--border);
  border-radius: 6px;
  background: var(--white);
  box-shadow: 5px 5px 0 0 var(--ink);
  overflow: hidden;
}
.menu__side {
  writing-mode: vertical-rl;
  rotate: 180deg;
  padding: 0.75rem 0.35rem;
  border-right: var(--border);
  background: var(--accent);
  color: var(--ink);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
}
.menu__list {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.35rem;
}
.menu__list a {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.45rem 0.75rem 0.45rem 0.5rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
}
.menu__list a:hover,
.menu__list a:focus-visible {
  background: var(--yellow);
  outline: none;
}
.menu__list hr {
  margin: 0.3rem 0.4rem;
  border: 0;
  border-top: 1.5px dashed var(--muted-dark);
}

/* ---- 區塊按鈕 ---- */
.tasks {
  display: flex;
  flex: 1;
  min-width: 0;
  gap: 0.35rem;
  height: 100%;
  overflow: hidden;
}
.task {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex: 0 1 9rem;
  min-width: 0;
  padding: 0 0.65rem;
  border: var(--bw) solid var(--ink);
  border-radius: 6px;
  background: var(--white);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  --tone: var(--yellow);
}
.task span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.task:hover {
  background: var(--paper-2);
}
/* 目前所在的區塊：像被按下的視窗按鈕，底紋用網點 */
.task.on {
  background: repeating-conic-gradient(var(--paper-2) 0 25%, var(--white) 0 50%) 0 0 / 4px 4px;
  font-weight: 700;
  box-shadow: inset 2px 2px 0 0 var(--ink);
}

/* ---- 系統匣 ---- */
.tray {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: none;
  height: 100%;
  padding-left: 0.6rem;
  border-left: 1.5px dashed var(--muted-dark);
}
.lang {
  min-width: 2.1rem;
  height: 1.75rem;
  padding: 0 0.4rem;
  border: var(--bw) solid var(--ink);
  border-radius: 4px;
  background: var(--white);
  font-family: 'Noto Sans TC', var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}
.lang:hover {
  background: var(--accent);
}
.gh {
  display: inline-flex;
}
.gh svg {
  width: 1.3rem;
  height: 1.3rem;
}
.clock {
  min-width: 3.1rem;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

@media (max-width: 1080px) {
  .task {
    flex: 0 0 auto;
    padding: 0 0.6rem;
  }
  .task span {
    display: none;
  }
  .task.on span {
    display: inline;
  }
}
@media (max-width: 560px) {
  .taskbar {
    gap: 0.35rem;
    padding-inline: 0.35rem;
  }
  .start {
    padding: 0 0.55rem;
  }
  .start__text,
  .gh {
    display: none;
  }
  .tasks {
    gap: 0.25rem;
  }
  .task {
    padding: 0 0.45rem;
  }
  .task.on span {
    display: none;
  }
  .tray {
    gap: 0.35rem;
    padding-left: 0.35rem;
  }
}
/* 很窄的手機：「技術能力」讓位，開始選單裡仍找得到 */
@media (max-width: 480px) {
  .task:nth-child(5) {
    display: none;
  }
}
</style>
