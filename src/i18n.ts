// 語言切換：預設跟隨瀏覽器的第一順位語言（中文 → 中文，其他 → 英文），手動切換後記在 localStorage。
import { computed, ref, watch } from 'vue'

export type Locale = 'zh' | 'en'

const KEY = 'lang'

function detect(): Locale {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'zh' || saved === 'en') return saved
  } catch {
    /* 無法讀取時改用瀏覽器設定 */
  }
  const first = (navigator.languages && navigator.languages[0]) || navigator.language || 'en'
  return /^zh/i.test(first) ? 'zh' : 'en'
}

export const locale = ref<Locale>(detect())

export function setLocale(next: Locale) {
  locale.value = next
  try {
    localStorage.setItem(KEY, next)
  } catch {
    /* 忽略 */
  }
}

const ui = {
  zh: {
    title: '林廷一 Tingyi Lin｜系統分析・系統設計・開發交付',
    sections: {
      about: '關於我',
      strengths: '從需求到交付',
      career: '工作經歷',
      work: '代表專案',
      skills: '技術能力',
    },
    nav: { aria: '主要導覽', top: '回到頂端', switchTo: 'English', switchAria: 'Switch to English' },
    banner: { focusAria: '能力主線', viewWork: '查看作品', contact: '聯絡我', scrollAria: '往下捲動' },
    avatar: {
      q: 'Q 版',
      real: '本人',
      toggleAria: '切換 Q 版與真人照片',
      qSay: '嗨，我是廷一！',
      realSay: '這是本人，歡迎來信聊聊',
      altQ: '林廷一的 Q 版頭像',
      altReal: '林廷一的照片',
    },
    work: {
      aria: '代表專案',
      tabs: '選擇專案',
      prev: '上一個專案',
      next: '下一個專案',
      more: '個人作品與原始碼放在 GitHub：',
      shot: '畫面截圖',
      tech: '使用技術',
    },
    infoAria: '更多資訊',
    contactLead: '如果你的團隊需要一位能把需求理清楚、把系統設計好，並推動到如期交付的夥伴，歡迎來信聊聊。台中、北部或遠端都可以。',
  },
  en: {
    title: 'Tingyi Lin｜Systems Analysis · Design · Delivery',
    sections: {
      about: 'About me',
      strengths: 'From requirements to delivery',
      career: 'Career',
      work: 'Key projects',
      skills: 'Tech stack',
    },
    nav: { aria: 'Main navigation', top: 'Back to top', switchTo: '中文', switchAria: '切換為中文' },
    banner: { focusAria: 'What I do', viewWork: 'View work', contact: 'Contact me', scrollAria: 'Scroll down' },
    avatar: {
      q: 'Cartoon',
      real: 'Real me',
      toggleAria: 'Switch between the cartoon and the photo',
      qSay: "Hi, I'm Tingyi!",
      realSay: "That's me — say hello",
      altQ: 'Cartoon portrait of Tingyi Lin',
      altReal: 'Photo of Tingyi Lin',
    },
    work: {
      aria: 'Key projects',
      tabs: 'Choose a project',
      prev: 'Previous project',
      next: 'Next project',
      more: 'Personal projects and source code are on GitHub: ',
      shot: 'screenshot',
      tech: 'Tech used',
    },
    infoAria: 'More information',
    contactLead:
      'If your team needs someone who can get the requirements right, design the system well and see it through to delivery, I would love to hear from you. Based in Taichung; open to northern Taiwan or remote work.',
  },
} as const

export const t = computed(() => ui[locale.value])

watch(
  locale,
  (l) => {
    document.documentElement.lang = l === 'zh' ? 'zh-Hant' : 'en'
    document.title = ui[l].title
  },
  { immediate: true },
)
