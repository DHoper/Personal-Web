<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SectionTitle from './SectionTitle.vue'
import WinFrame from './WinFrame.vue'
import { content } from '../data/profile'
import { t } from '../i18n'

// 捲動時，git graph 的線逐段被描成朱紅色，經過的節點會亮起
const log = ref<HTMLElement | null>(null)
let raf = 0

function paint() {
  raf = 0
  const trigger = window.innerHeight * 0.6
  for (const li of (log.value?.children ?? []) as HTMLCollectionOf<HTMLElement>) {
    const r = li.getBoundingClientRect()
    const fill = Math.max(0, Math.min(1, (trigger - r.top - 16) / r.height))
    li.style.setProperty('--fill', fill.toFixed(3))
    li.classList.toggle('lit', trigger > r.top + 10)
  }
}
function onScroll() {
  if (!raf) raf = requestAnimationFrame(paint)
}

onMounted(() => {
  paint()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <section id="career" class="career">
    <div class="wrap">
      <SectionTitle index="03" en="Career" :zh="t.sections.career" />

      <WinFrame v-reveal title="~/career" sub="git log --graph" icon="branch" tone="var(--accent)" active>

        <ol ref="log" class="log">
          <li v-for="job in content.experiences" :key="job.hash" class="commit" :class="{ 'commit--head': job.current }">
            <span class="node" aria-hidden="true"></span>
            <div class="commit__side">
              <p class="period">{{ job.period }}</p>
              <p class="hash" aria-hidden="true">
                {{ job.hash }}<span v-if="job.current" class="head">HEAD</span>
              </p>
            </div>
            <div class="commit__main">
              <h3 class="commit__title">{{ job.title }}</h3>
              <p class="commit__company">{{ job.company }}</p>
              <ul class="commit__points">
                <li v-for="p in job.points" :key="p">{{ p }}</li>
              </ul>
            </div>
          </li>
        </ol>
      </WinFrame>
    </div>
  </section>
</template>

<style scoped>
.career {
  padding-block: clamp(4.5rem, 10vw, 8rem);
}
.log {
  position: relative;
  padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 4vw, 3rem);
}
.commit {
  --rail: 1.5rem;
  position: relative;
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: 1.5rem;
  padding: 0 0 2.25rem var(--rail);
}
.commit:last-child {
  padding-bottom: 0;
}
/* git graph 的線與節點 */
.commit::before {
  content: '';
  position: absolute;
  left: 0.42rem;
  top: 1.1rem;
  bottom: -0.3rem;
  border-left: 2px solid var(--ink);
}
/* 描線：疊在黑線上，依 --fill 往下長 */
.commit::after {
  content: '';
  position: absolute;
  left: 0.42rem;
  top: 1.1rem;
  bottom: -0.3rem;
  width: 2px;
  background: var(--accent);
  transform: scaleY(var(--fill, 0));
  transform-origin: top;
}
.commit:last-child::before,
.commit:last-child::after {
  display: none;
}
.node {
  z-index: 1;
  transition:
    background-color 0.3s,
    transform 0.3s cubic-bezier(0.3, 1.8, 0.5, 1);
}
.commit.lit .node {
  background: var(--accent);
  transform: scale(1.15);
}
.node {
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: var(--white);
}
.commit--head .node {
  background: var(--accent);
}
.period {
  font-weight: 700;
  font-size: 0.95rem;
}
.hash {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--muted);
}
.head {
  margin-left: 0.5rem;
  padding: 0 0.45em;
  border: 1.5px solid var(--ink);
  border-radius: 4px;
  background: var(--yellow);
  color: var(--ink);
  font-size: 0.7rem;
}
.commit__title {
  font-size: clamp(1.15rem, 2.2vw, 1.4rem);
  line-height: 1.4;
}
.commit__company {
  color: var(--muted);
  font-size: 0.95rem;
}
.commit__points {
  display: grid;
  gap: 0.3rem;
  margin-top: 0.75rem;
}
.commit__points li {
  display: flex;
  gap: 0.6rem;
}
.commit__points li::before {
  content: '+';
  font-family: var(--font-mono);
  font-weight: 700;
  color: #1f9d55;
}

@media (max-width: 680px) {
  .commit {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
}
</style>
