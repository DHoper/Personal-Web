// 全站共用的時鐘：工作列顯示時間，桌布依時段（早上／中午／傍晚／晚上）換色。
import { computed, ref } from 'vue'

export type Phase = 'morning' | 'noon' | 'evening' | 'night'

export const now = ref(new Date())

function phaseOf(h: number): Phase {
  if (h >= 5 && h < 11) return 'morning'
  if (h >= 11 && h < 17) return 'noon'
  if (h >= 17 && h < 20) return 'evening'
  return 'night'
}

export const phase = computed(() => phaseOf(now.value.getHours()))

export const clockText = computed(() => {
  const d = now.value
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
})

let started = false
export function startClock() {
  if (started) return
  started = true
  const tick = () => {
    now.value = new Date()
    document.documentElement.dataset.phase = phase.value
  }
  tick()
  // 對齊到下一個整分鐘，之後每分鐘更新一次
  window.setTimeout(
    () => {
      tick()
      window.setInterval(tick, 60_000)
    },
    (60 - new Date().getSeconds()) * 1000,
  )
}
