<script setup lang="ts">
withDefaults(defineProps<{ index: string; en: string; zh: string; tone?: 'light' | 'dark' }>(), {
  tone: 'light',
})
</script>

<template>
  <header class="title" :class="`title--${tone}`">
    <p class="eyebrow title__index">// {{ index }}</p>
    <h2 v-reveal:wipe class="title__en">{{ en }}</h2>
    <p v-if="zh.toLowerCase() !== en.toLowerCase()" v-reveal="350" class="title__zh">{{ zh }}</p>
  </header>
</template>

<style scoped>
.title {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 0.25rem 1.5rem;
  padding-bottom: 1.25rem;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
  border-bottom: var(--border);
}
.title--dark {
  border-bottom-color: rgb(243 241 236 / 0.25);
}
.title__index {
  grid-column: 1 / -1;
  color: var(--accent);
}
.title__en {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2rem, 6vw, 4.75rem);
  line-height: 1;
  text-transform: uppercase;
}
.title__zh {
  font-weight: 500;
  color: var(--muted);
  padding-bottom: 0.3rem;
}
.title--dark .title__zh {
  color: var(--muted-dark);
}
@media (max-width: 480px) {
  .title {
    grid-template-columns: minmax(0, 1fr);
  }
  .title__en {
    overflow-wrap: anywhere;
  }
}
</style>
