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
      lab: '作品庫',
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
      more: '更多個人作品在下方的作品庫，原始碼都放在 GitHub：',
      shot: '畫面截圖',
      tech: '使用技術',
    },
    lab: {
      section: '作品庫',
      window: 'library',
      all: '全部作品',
      groups: { form: '形式', purpose: '用途', stack: '技術範圍', scale: '規模' },
      access: { all: '全部', live: '點開即用', download: '下載安裝', source: '原始碼' },
      accessAria: '依取得方式篩選',
      form: { web: '網站', extension: '擴充功能', desktop: '桌面應用', service: '後端服務' },
      purpose: { business: '商務', tool: '工具', fun: '娛樂', community: '社群' },
      stack: { client: '純前端', fullstack: '全端', backend: '後端' },
      scale: { large: '大型', small: '小型' },
      search: '搜尋作品或技術',
      sort: { featured: '精選優先', new: '最新優先' },
      sortAria: '排序',
      count: (n: number, total: number) => `${n} / ${total} 個項目`,
      empty: '這個條件下還沒有作品',
      clear: '清除篩選',
      filters: '篩選',
      open: '查看',
      wip: '開發中',
      featured: '精選',
      link: { live: '開啟網站', download: '下載安裝', source: '原始碼' },
      close: '關閉',
      prev: '上一個作品',
      next: '下一個作品',
      tech: '使用技術',
      install: '安裝方式',
      cats: '分類',
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
      lab: 'Works library',
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
      more: 'More personal projects are in the Works library below; all source code is on GitHub: ',
      shot: 'screenshot',
      tech: 'Tech used',
    },
    lab: {
      section: 'Works library',
      window: 'library',
      all: 'All works',
      groups: { form: 'Type', purpose: 'Purpose', stack: 'Stack', scale: 'Size' },
      access: { all: 'All', live: 'Try online', download: 'Download', source: 'Source' },
      accessAria: 'Filter by how to try it',
      form: { web: 'Websites', extension: 'Extensions', desktop: 'Desktop apps', service: 'Back-end services' },
      purpose: { business: 'Business', tool: 'Tools', fun: 'Fun', community: 'Community' },
      stack: { client: 'Client-only', fullstack: 'Full-stack', backend: 'Back-end' },
      scale: { large: 'Large', small: 'Small' },
      search: 'Search works or tech',
      sort: { featured: 'Featured first', new: 'Newest first' },
      sortAria: 'Sort',
      count: (n: number, total: number) => `${n} of ${total} items`,
      empty: 'Nothing here for these filters yet',
      clear: 'Clear filters',
      filters: 'Filters',
      open: 'Open',
      wip: 'In progress',
      featured: 'Featured',
      link: { live: 'Open site', download: 'Download', source: 'Source code' },
      close: 'Close',
      prev: 'Previous work',
      next: 'Next work',
      tech: 'Tech used',
      install: 'How to install',
      cats: 'Categories',
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
