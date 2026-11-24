<script setup lang="ts">
import SectionTitle from './SectionTitle.vue'
import { skillGroups } from '../data/profile'
</script>

<template>
  <section id="skills" class="skills" aria-labelledby="skills-title">
    <div class="wrap">
      <SectionTitle id="skills-title" index="05" en="Tech Stack" zh="技術能力" />
      <div v-reveal class="board">
        <div v-for="g in skillGroups" :key="g.title" class="group">
          <h3 class="eyebrow group__title">{{ g.title }}</h3>
          <ul class="items">
            <li v-for="s in g.items" :key="s.name" :class="{ core: s.level === 3 }">{{ s.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  padding-block: clamp(4.5rem, 10vw, 8rem);
}
.board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
  border: var(--border);
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.group {
  padding: 1.5rem;
  border-right: var(--border);
  margin-right: calc(var(--bw) * -1);
}
.group__title {
  margin-bottom: 1.1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed var(--ink);
  color: var(--muted);
}
.items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.items li {
  padding: 0.3em 0.8em;
  border: var(--border);
  border-radius: 6px;
  background: var(--white);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  transition:
    transform 0.15s,
    background-color 0.2s;
}
.items li:hover {
  transform: translateY(-2px);
  background: var(--yellow);
}
/* 核心技術：黑底實心，排在最前面當視覺重點 */
.items li.core {
  background: var(--ink);
  color: var(--paper);
  font-weight: 700;
}
.items li.core:hover {
  background: var(--accent);
  color: var(--ink);
}

@media (max-width: 680px) {
  .group {
    border-right: none;
    border-bottom: var(--border);
    margin: 0 0 calc(var(--bw) * -1);
  }
}
</style>
