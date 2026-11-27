<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { content } from '../data/profile'
import { locale, setLocale, t } from '../i18n'

const links = [
  { href: '#about', label: 'About' },
  { href: '#career', label: 'Career' },
  { href: '#work', label: 'Work' },
  { href: '#lab', label: 'Library' },
  { href: '#contact', label: 'Contact' },
]

// 往下捲動時收起、往上捲動時出現；離開頂端後換成米白底
const hidden = ref(false)
const solid = ref(false)
let lastY = 0

function onScroll() {
  const y = window.scrollY
  hidden.value = y > lastY && y > 120
  solid.value = y > window.innerHeight * 0.85
  lastY = y
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'nav--hidden': hidden, 'nav--solid': solid }">
    <nav class="nav__inner" :aria-label="t.nav.aria">
      <a href="#top" class="logo" :aria-label="t.nav.top">TL<span>/</span></a>
      <ul class="links">
        <li v-for="(link, i) in links" :key="link.href">
          <a :href="link.href"><sup>0{{ i + 1 }}</sup>{{ link.label }}</a>
        </li>
      </ul>
      <button
        type="button"
        class="lang"
        :aria-label="t.nav.switchAria"
        :lang="locale === 'zh' ? 'en' : 'zh-Hant'"
        @click="setLocale(locale === 'zh' ? 'en' : 'zh')"
      >
        <span class="lang__full">{{ t.nav.switchTo }}</span>
        <span class="lang__short" aria-hidden="true">{{ locale === 'zh' ? 'EN' : '中' }}</span>
      </button>
      <a :href="content.profile.github" target="_blank" rel="noopener" class="gh" aria-label="GitHub">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </a>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  padding: env(safe-area-inset-top, 0px) var(--frame) 0;
  color: var(--paper);
  border-bottom: var(--bw) solid transparent;
  transition:
    transform 0.5s cubic-bezier(0.7, 0, 0.3, 1),
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;
}
.nav--solid {
  background: var(--paper);
  color: var(--ink);
  border-bottom-color: var(--ink);
}
.nav--hidden {
  transform: translateY(-105%);
}
.nav__inner {
  height: var(--nav-h);
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  padding-inline: clamp(1rem, 3vw, 2.5rem);
}
.logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.2rem;
  text-decoration: none;
}
.logo span {
  color: var(--accent);
}
.links {
  display: flex;
  gap: clamp(0.9rem, 3vw, 2.25rem);
  margin-left: auto;
}
.links a {
  position: relative;
  font-family: var(--font-nav);
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
  text-transform: uppercase;
  text-decoration: none;
}
.links sup {
  margin-right: 0.25em;
  font-family: var(--font-mono);
  font-size: 0.6em;
  color: var(--accent);
}
.links a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}
.links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
.lang {
  padding: 0.25rem 0.7rem;
  border: var(--bw) solid currentColor;
  border-radius: 999px;
  background: none;
  color: inherit;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
}
.lang:hover,
.lang:focus-visible {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--ink);
  outline: none;
}
.gh {
  display: inline-flex;
}
.gh svg {
  width: 1.5rem;
  height: 1.5rem;
}

.lang__short {
  display: none;
  font-family: 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif;
}

@media (max-width: 560px) {
  .nav__inner {
    gap: 0.75rem;
    padding-inline: 0.75rem;
  }
  .links sup {
    display: none;
  }
  .logo {
    display: none;
  }
  .links {
    margin-left: 0;
    gap: clamp(0.55rem, 3.2vw, 1rem);
    min-width: 0;
  }
  .links a {
    font-size: clamp(0.78rem, 3.6vw, 0.95rem);
  }
  .lang {
    flex: none;
    margin-left: auto;
    min-width: 2.25rem;
    padding: 0.2rem 0.55rem;
  }
  .lang__full {
    display: none;
  }
  .lang__short {
    display: inline;
  }
  .gh {
    flex: none;
  }
}
/* 很窄的手機：GitHub 圖示讓位（聯絡區已有 GitHub 連結） */
@media (max-width: 400px) {
  .gh {
    display: none;
  }
}
</style>
