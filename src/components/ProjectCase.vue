<script setup lang="ts">
import type { Project } from '../data/profile'
import { t } from '../i18n'

// 舊版雙層卡片的進化：後方保留一張彩色疊層，正面直接攤開「視覺 + 說明」，不必翻面才看得到內容。
// live：這張卡在畫面上時才播放視覺動畫
defineProps<{ project: Project; live?: boolean }>()
</script>

<template>
  <article class="case" :class="{ 'is-live': live }" :style="{ '--tone': project.color }">
    <div class="visual">
      <img
        v-if="project.visual.type === 'image'"
        class="shot"
        :src="project.visual.src"
        :alt="`${project.title} ${t.work.shot}`"
        loading="lazy"
      />

      <div v-else-if="project.visual.type === 'terminal'" class="term" aria-hidden="true">
        <div class="term__bar">
          <span class="term__lights"><i></i><i></i><i></i></span>{{ project.visual.title }}
        </div>
        <div class="term__body">
          <p
            v-for="(line, i) in project.visual.lines"
            :key="i"
            class="line"
            :class="{ ok: line.startsWith('✓') }"
            :style="{ animationDelay: `${0.15 + i * 0.3}s` }"
          >
            {{ line }}
          </p>
          <p class="line" :style="{ animationDelay: `${0.15 + project.visual.lines.length * 0.3}s` }">
            $ <span class="caret"></span>
          </p>
        </div>
      </div>

      <div v-else-if="project.visual.type === 'notify'" class="phone" aria-hidden="true">
        <div class="phone__notch"></div>
        <p class="phone__time">18:55</p>
        <div
          v-for="(n, i) in project.visual.items"
          :key="i"
          class="line notice"
          :style="{ animationDelay: `${0.15 + i * 0.35}s` }"
        >
          <span class="notice__icon"></span>
          <div>
            <p class="notice__app">{{ n.app }}</p>
            <p class="notice__text">{{ n.text }}</p>
          </div>
        </div>
      </div>

      <div v-else class="chat" aria-hidden="true">
        <p
          v-for="(m, i) in project.visual.messages"
          :key="i"
          class="line bubble"
          :class="i % 2 ? 'bubble--me' : 'bubble--bot'"
          :style="{ animationDelay: `${0.15 + i * 0.3}s` }"
        >
          {{ m }}
        </p>
      </div>
    </div>

    <div class="info">
      <p class="eyebrow cat"><span class="cat__dot"></span>{{ project.category }}</p>
      <h3 class="title">{{ project.title }}</h3>
      <p class="subtitle">{{ project.subtitle }}</p>
      <p class="summary">{{ project.summary }}</p>
      <ul class="highlights">
        <li v-for="h in project.highlights" :key="h">{{ h }}</li>
      </ul>
      <ul class="tags" :aria-label="t.work.tech">
        <li v-for="t in project.tags" :key="t">{{ t }}</li>
      </ul>
      <p v-if="project.note" class="note">{{ project.note }}</p>
      <div v-if="project.links.length" class="links">
        <a
          v-for="l in project.links"
          :key="l.href"
          class="btn btn--sm"
          :href="l.href"
          target="_blank"
          rel="noopener"
          >{{ l.label }} <span class="arrow">↗</span></a
        >
      </div>
    </div>
  </article>
</template>

<style scoped>
.case {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  border: var(--border);
  border-radius: var(--radius);
  background: var(--white);
  margin: 0 14px 14px 0;
}
/* 後方的彩色疊層（舊版雙層卡片） */
.case::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  transform: translate(14px, 14px);
  border: var(--border);
  border-radius: var(--radius);
  background: var(--tone);
  transition: transform 0.35s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.case:hover::before {
  transform: translate(18px, 18px);
}

/* ---- 左：視覺 ---- */
.visual {
  display: grid;
  place-items: center;
  min-height: 22rem;
  padding: clamp(1.25rem, 3vw, 2.5rem);
  border-right: var(--border);
  border-radius: var(--radius) 0 0 var(--radius);
  background:
    radial-gradient(circle, rgb(17 17 17 / 0.14) 1px, transparent 1.2px) 0 0 / 16px 16px,
    var(--paper);
}
/* 輪到這張卡時，各行依序出現 */
.line {
  animation: rise 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
}
.case:not(.is-live) .line {
  opacity: 0;
  animation: none;
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}

.shot {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
  border: var(--border);
  border-radius: 6px;
  box-shadow: var(--shadow);
  background: var(--white);
}

.term {
  width: min(100%, 30rem);
  border: var(--border);
  border-radius: 8px;
  background: var(--ink);
  box-shadow: var(--shadow);
  font-family: var(--font-mono);
  font-size: clamp(0.75rem, 1.4vw, 0.88rem);
  color: #e9e6df;
  overflow: hidden;
}
.term__bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.8rem;
  border-bottom: 1px solid #2c2c2c;
  font-size: 0.75rem;
  color: #8b877f;
}
.term__lights {
  display: flex;
  gap: 0.35rem;
}
.term__lights i {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #3a3a3a;
}
.term__lights i:first-child {
  background: var(--accent);
}
.term__body {
  padding: 1rem 1.1rem 1.25rem;
  line-height: 1.95;
}
.term__body .line {
  white-space: pre-wrap;
  word-break: break-word;
}
.term__body .ok {
  color: #7be0a0;
}
.caret {
  display: inline-block;
  width: 0.55em;
  height: 1.05em;
  vertical-align: text-bottom;
  background: #e9e6df;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.phone {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  width: min(100%, 19rem);
  padding: 2.25rem 0.85rem 1.5rem;
  border: var(--border);
  border-radius: 2rem;
  background: var(--ink);
  box-shadow: var(--shadow);
}
.phone__notch {
  position: absolute;
  top: 0.6rem;
  left: 50%;
  width: 4.5rem;
  height: 0.9rem;
  border-radius: 1rem;
  background: #2a2a2a;
  transform: translateX(-50%);
}
.phone__time {
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: var(--font-display);
  font-size: 2.2rem;
  line-height: 1.1;
  color: var(--paper);
}
.notice {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.7rem;
  border-radius: 0.85rem;
  background: rgb(243 241 236 / 0.95);
}
.notice__icon {
  flex: none;
  width: 1.9rem;
  height: 1.9rem;
  border: 1.5px solid var(--ink);
  border-radius: 0.5rem;
  background: var(--tone);
}
.notice__app {
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--muted);
}
.notice__text {
  font-size: 0.85rem;
  line-height: 1.4;
}

.chat {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  width: min(100%, 22rem);
  padding: 1.1rem;
  border: var(--border);
  border-radius: 1rem;
  background: #dfe7ef;
  box-shadow: var(--shadow);
}
.bubble {
  max-width: 82%;
  padding: 0.45em 0.9em;
  border-radius: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
}
.bubble--bot {
  align-self: flex-start;
  border: 1.5px solid var(--ink);
  border-bottom-left-radius: 0.25rem;
  background: var(--white);
}
.bubble--me {
  align-self: flex-end;
  border: 1.5px solid var(--ink);
  border-bottom-right-radius: 0.25rem;
  background: #06c755;
  color: var(--white);
}

/* ---- 右：說明 ---- */
.info {
  display: flex;
  flex-direction: column;
  padding: clamp(1.5rem, 3.5vw, 2.75rem);
}
.cat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted);
}
.cat__dot {
  width: 0.65rem;
  height: 0.65rem;
  border: 1.5px solid var(--ink);
  border-radius: 50%;
  background: var(--tone);
}
.title {
  margin-top: 0.75rem;
  font-size: clamp(1.7rem, 3.4vw, 2.4rem);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: 0.01em;
}
.subtitle {
  margin-top: 0.2rem;
  font-weight: 500;
  color: var(--muted);
}
.summary {
  margin-top: 1rem;
}
.highlights {
  display: grid;
  gap: 0.35rem;
  margin-top: 1rem;
  font-size: 0.93rem;
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
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.25rem;
}
.tags li {
  padding: 0.1em 0.65em;
  border: 1.5px solid var(--ink);
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.7;
}
.note {
  margin-top: 1rem;
  padding: 0.35em 0.75em;
  border-left: 3px solid var(--yellow);
  background: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1.5rem;
}

@media (max-width: 860px) {
  .case {
    grid-template-columns: 1fr;
    margin: 0 10px 10px 0;
  }
  .case::before {
    transform: translate(10px, 10px);
  }
  .visual {
    min-height: 16rem;
    border-right: none;
    border-bottom: var(--border);
    border-radius: var(--radius) var(--radius) 0 0;
  }
}
</style>
