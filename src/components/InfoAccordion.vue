<script setup lang="ts">
import { reactive } from 'vue'
import { content } from '../data/profile'
import { t } from '../i18n'
import plusIcon from '../assets/svg/plus.svg'

// 舊版的折疊清單：點擊展開，+ 號轉成 ×，展開區為黃底
const open = reactive<Record<string, boolean>>({ job: true })
</script>

<template>
  <section class="more" :aria-label="t.infoAria">
    <div class="wrap">
      <div v-reveal class="list">
        <div v-for="(block, i) in content.moreInfo" :key="block.id" class="block" :class="{ 'is-open': open[block.id] }">
          <h3>
            <button
              type="button"
              class="head"
              :aria-expanded="!!open[block.id]"
              :aria-controls="`panel-${block.id}`"
              @click="open[block.id] = !open[block.id]"
            >
              <span class="eyebrow head__no">0{{ i + 1 }}</span>
              <span class="head__title">{{ block.title }}</span>
              <img :src="plusIcon" alt="" class="head__icon" width="18" height="18" />
            </button>
          </h3>
          <div :id="`panel-${block.id}`" class="panel" role="region" :aria-label="block.title">
            <div class="panel__clip">
              <ul class="panel__body">
                <li v-for="item in block.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.more {
  padding-bottom: clamp(4.5rem, 10vw, 8rem);
}
.list {
  border: var(--border);
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.block + .block {
  border-top: var(--border);
}
.head {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  padding: 1.15rem 1.5rem;
  border: none;
  background: var(--white);
  text-align: left;
  transition: background-color 0.2s;
}
.head:hover {
  background: var(--paper);
}
.head__no {
  color: var(--accent);
}
.head__title {
  flex: 1;
  font-size: 1.15rem;
  font-weight: 700;
}
.head__icon {
  width: 1.1rem;
  height: 1.1rem;
  transition: transform 0.5s cubic-bezier(0.7, 0, 0.3, 1);
}
.is-open .head__icon {
  transform: rotate(135deg);
}
/* 0fr → 1fr 讓高度可以平滑過渡 */
.panel {
  display: grid;
  grid-template-rows: 0fr;
  background: var(--yellow);
  transition: grid-template-rows 0.5s cubic-bezier(0.7, 0, 0.3, 1);
}
.is-open .panel {
  grid-template-rows: 1fr;
}
.panel__clip {
  overflow: hidden;
  min-height: 0;
}
.panel__body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  gap: 0.45rem 2.5rem;
  padding: 1.25rem 1.5rem 1.5rem calc(1.5rem + 2.6rem);
  border-top: var(--border);
}
.panel__body li {
  display: flex;
  gap: 0.6rem;
}
.panel__body li::before {
  content: '✦';
  font-size: 0.75em;
  line-height: 2.3;
}

@media (max-width: 560px) {
  .panel__body {
    padding-left: 1.5rem;
  }
}
</style>
