import type { Directive } from 'vue'

// 捲動進場：元素進入畫面時加上 .in，由 main.css 的 keyframes 播放。
//   v-reveal            → 往上浮現
//   v-reveal:wipe       → 由左往右展開（用在大標題）
//   v-reveal="120"      → 延遲 120ms（做錯落效果）
// 用 animation 而不是 transition，才不會蓋掉元素自己的 hover transition。
const observer =
  typeof IntersectionObserver === 'undefined'
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('in')
            observer?.unobserve(entry.target)
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
      )

export const reveal: Directive<HTMLElement, number | undefined, string, 'wipe'> = {
  mounted(el, binding) {
    el.classList.add(binding.arg === 'wipe' ? 'reveal-wipe' : 'reveal')
    if (binding.value) el.style.setProperty('--d', `${binding.value}ms`)
    if (observer) observer.observe(el)
    else el.classList.add('in')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
