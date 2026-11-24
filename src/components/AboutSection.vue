<script setup lang="ts">
import SectionTitle from './SectionTitle.vue'
import { about } from '../data/profile'
</script>

<template>
  <section id="about" class="about">
    <div class="wrap">
      <SectionTitle index="01" en="About" zh="關於我" />
      <div class="grid">
        <p v-reveal class="statement">
          <template v-for="(seg, i) in about.statement" :key="i">
            <span v-if="seg.hl" class="hl">{{ seg.t }}</span>
            <template v-else>{{ seg.t }}</template>
          </template>
        </p>
        <div class="body">
          <p v-for="(p, i) in about.paragraphs" :key="i" v-reveal="120 + i * 100">{{ p }}</p>
          <dl v-reveal="450" class="facts">
            <div v-for="f in about.facts" :key="f.k">
              <dt class="eyebrow">{{ f.k }}</dt>
              <dd>{{ f.v }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding-block: clamp(4.5rem, 10vw, 8rem);
}
.grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;
}
.statement {
  font-size: clamp(1.6rem, 3.4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.01em;
}
/* 螢光筆在段落浮現後才「畫」上去 */
.statement .hl {
  background-size: 0% 100%;
  background-repeat: no-repeat;
  transition: background-size 0.9s cubic-bezier(0.7, 0, 0.2, 1);
}
.statement.in .hl {
  background-size: 100% 100%;
}
.statement.in .hl:nth-of-type(1) {
  transition-delay: 0.6s;
}
.statement.in .hl:nth-of-type(2) {
  transition-delay: 1.1s;
}
.body {
  display: grid;
  gap: 1.1rem;
  font-size: 1.02rem;
  color: #2b2a27;
}
.facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1rem;
  border: var(--border);
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
}
.facts > div {
  padding: 0.9rem 1rem;
}
.facts > div + div {
  border-left: var(--border);
}
.facts dt {
  color: var(--muted);
  font-size: 0.7rem;
}
.facts dd {
  margin-top: 0.15rem;
  font-weight: 700;
}

@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .facts {
    grid-template-columns: 1fr;
  }
  .facts > div + div {
    border-left: none;
    border-top: var(--border);
  }
}
</style>
