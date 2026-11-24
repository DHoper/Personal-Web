<script setup lang="ts">
import { profile } from '../data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <section id="contact" class="contact">
    <div class="wrap">
      <p class="eyebrow index">// 06 — Contact</p>
      <h2 class="headline">
        <span v-reveal:wipe class="headline__line">Let's build</span>
        <span v-reveal:wipe="200" class="headline__line">something <span class="outline">reliable.</span></span>
      </h2>
      <p v-reveal="300" class="lead">正在尋找全端／後端工程師的職缺，台中、北部皆可，對遠端工作有意願。歡迎來信洽談。</p>

      <div v-reveal="400" class="card">
        <span class="stamp" aria-hidden="true">{{ year }}</span>
        <a class="mail" :href="`mailto:${profile.email}`">
          <span class="eyebrow">Email</span>
          <span class="mail__addr">{{ profile.email }}</span>
          <span class="mail__arrow" aria-hidden="true">→</span>
        </a>
        <a class="mail" :href="profile.github" target="_blank" rel="noopener">
          <span class="eyebrow">GitHub</span>
          <span class="mail__addr">github.com/DHoper</span>
          <span class="mail__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>

    <footer class="footer wrap">
      <span>© {{ year }} {{ profile.nameZh }} Tingyi Lin</span>
      <span class="footer__code">console.log("THANKS!!");</span>
    </footer>
  </section>
</template>

<style scoped>
.contact {
  padding-top: clamp(4.5rem, 10vw, 8rem);
  background: var(--ink);
  color: var(--paper);
}
.index {
  color: var(--accent);
}
.headline {
  margin-top: 1rem;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.2rem, 7.5vw, 6.5rem);
  line-height: 1.05;
  text-transform: uppercase;
}
.headline__line {
  display: block;
}
.outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--paper);
}
.lead {
  margin-top: 1.5rem;
  max-width: 36rem;
  color: #cfcbc2;
  font-size: 1.05rem;
}

/* 聯絡卡：舊版的白卡 + 圓章，改成大型可點擊列 */
.card {
  position: relative;
  margin-top: clamp(2.5rem, 6vw, 4rem);
  border: var(--border);
  border-color: var(--paper);
  border-radius: var(--radius);
  background: var(--paper);
  color: var(--ink);
  box-shadow: 8px 8px 0 0 var(--accent);
}
.stamp {
  position: absolute;
  top: -1.6rem;
  right: 2rem;
  display: grid;
  place-items: center;
  width: 3.4rem;
  height: 3.4rem;
  border: var(--border);
  border-radius: 50%;
  background: var(--yellow);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.72rem;
  transform: rotate(-12deg);
}
.mail {
  display: grid;
  grid-template-columns: 6rem 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: clamp(1.1rem, 2.5vw, 1.6rem) clamp(1.1rem, 3vw, 2rem);
  text-decoration: none;
  transition: background-color 0.2s;
}
.mail + .mail {
  border-top: var(--border);
}
.mail:hover {
  background: var(--yellow);
}
.mail .eyebrow {
  color: var(--muted);
}
.mail__addr {
  font-size: clamp(1.05rem, 2.6vw, 1.75rem);
  font-weight: 700;
  word-break: break-all;
}
.mail__arrow {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  transition: transform 0.2s;
}
.mail:hover .mail__arrow {
  transform: translateX(4px);
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: clamp(4rem, 10vw, 6rem);
  padding-block: 1.5rem calc(1.5rem + var(--frame) + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid rgb(243 241 236 / 0.2);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--muted-dark);
}
.footer__code {
  color: var(--yellow);
}

@media (max-width: 560px) {
  .mail {
    grid-template-columns: 1fr auto;
  }
  .mail .eyebrow {
    grid-column: 1 / -1;
  }
}
</style>
