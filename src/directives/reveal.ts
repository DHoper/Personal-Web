import type { Directive } from 'vue'

// 捲動進場：元素進入畫面時加上 .in，由 main.css 的 keyframes 播放。
//   v-reveal            → 往上浮現
//   v-reveal:wipe       → 由左往右展開（用在大標題）
//   v-reveal="120"      → 延遲 120ms（做錯落效果）
// 用 animation 而不是 transition，才不會蓋掉元素自己的 hover transition。
// wipe 版本一開始被 clip-path 完全裁掉，Chrome 會判定它「看不見」而永遠不觸發，
// 所以改觀察它的父元素，進畫面後再替它加上 .in
const proxies = new WeakMap<Element, HTMLElement>()

const observer =
  typeof IntersectionObserver === 'undefined'
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const el = proxies.get(entry.target) ?? (entry.target as HTMLElement)
            el.classList.add('in')
            observer?.unobserve(entry.target)
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
      )

export const reveal: Directive<HTMLElement, number | undefined, string, 'wipe'> = {
  mounted(el, binding) {
    el.classList.add(binding.arg === 'wipe' ? 'reveal-wipe' : 'reveal')
    if (binding.value) el.style.setProperty('--d', `${binding.value}ms`)
    if (!observer) {
      el.classList.add('in')
      return
    }
    const target = binding.arg === 'wipe' && el.parentElement ? el.parentElement : el
    proxies.set(target, el)
    observer.observe(target)
  },
  unmounted(el, binding) {
    observer?.unobserve(binding.arg === 'wipe' && el.parentElement ? el.parentElement : el)
  },
}
