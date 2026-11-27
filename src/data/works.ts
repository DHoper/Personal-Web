// 作品庫：個人作品與開源專案。新增作品只要在 WORKS 加一筆。
//
// 分類用「多個面向」而不是單一資料夾，一個作品同時屬於：
//   form    形式：網站 / 擴充功能 / 桌面應用 / 後端服務
//   purpose 用途：商務 / 工具 / 娛樂 / 社群
//   stack   技術範圍：純前端 / 全端 / 後端
//   scale   規模：大型（多模組、多服務或完整產品）/ 小型
//   access  取得方式：live 點開即用（已部署）/ download 下載安裝 / source 原始碼自行執行
//           一個作品可以同時有多種，例如網站可直接用、另有擴充功能可下載。
import { computed } from 'vue'
import { locale } from '../i18n'

export type Form = 'web' | 'extension' | 'desktop' | 'service'
export type Purpose = 'business' | 'tool' | 'fun' | 'community'
export type Stack = 'client' | 'fullstack' | 'backend'
export type Scale = 'large' | 'small'
export type Access = 'live' | 'download' | 'source'

export interface WorkLink {
  kind: Access
  href: string
  /** 同一種連結有多個時（例如前台、後台、API 三個 repo）用來區分 */
  label?: { zh: string; en: string }
}

interface Text {
  title: string
  tagline: string
  summary: string
  highlights: string[]
  /** 下載安裝等補充說明 */
  note?: string
}

interface WorkDef {
  id: string
  year: number
  featured?: boolean
  wip?: boolean
  form: Form
  purpose: Purpose
  stack: Stack
  scale: Scale
  access: Access[]
  tech: string[]
  /** 卡片主題色 */
  color: string
  /** public/works/ 底下的預覽圖；沒有的話用像素圖示當封面 */
  image?: string
  links: WorkLink[]
  zh: Text
  en: Text
}

export type Work = Omit<WorkDef, 'zh' | 'en'> & Text

const GH = 'https://github.com/DHoper/'

const EXT_NOTE = {
  zh: '上架 Chrome 線上應用程式商店前，下載 zip 解壓縮後，在 chrome://extensions 開啟「開發人員模式」並「載入未封裝項目」即可使用。',
  en: 'Until it is on the Chrome Web Store: unzip the download, open chrome://extensions, turn on Developer mode and choose “Load unpacked”.',
}

const WORKS: WorkDef[] = [
  {
    id: 'oracle-tarot',
    year: 2026,
    featured: true,
    form: 'web',
    purpose: 'fun',
    stack: 'client',
    scale: 'large',
    access: ['live', 'source'],
    tech: ['JavaScript', 'ES Modules', 'CSS', 'Cloudflare Workers', 'DeepSeek API'],
    color: '#d8b45a',
    image: 'oracle-tarot.webp',
    links: [
      { kind: 'live', href: 'https://dhoper.github.io/delphi-oracle/' },
      { kind: 'source', href: GH + 'delphi-oracle' },
    ],
    zh: {
      title: '神諭塔羅',
      tagline: '走進德爾菲神殿，抽一副希臘神話塔羅',
      summary:
        '以德爾菲神殿為舞台的塔羅占卜網站。撥開帷幕進殿、在火盆前選問題、選牌陣、洗牌翻牌到解讀，整段流程都做成有儀式感的互動。解讀由規則引擎產生，想再多問時才交給 AI。',
      highlights: [
        '規則式解讀引擎，不靠 AI 也能給完整解讀',
        '正位、逆位各有一張牌面，翻牌有專屬轉場',
        '以手機為主設計，桌機版同樣完整',
        '選用的 AI「叩問」經 Cloudflare Worker 呼叫 DeepSeek',
      ],
    },
    en: {
      title: 'Oracle Tarot',
      tagline: 'Draw a Greek-myth tarot inside the temple at Delphi',
      summary:
        'A tarot site staged in the temple at Delphi. Parting the curtain, choosing a question at the brazier, picking a spread, shuffling, turning cards and reading them are all built as one ritual. Readings come from a rule engine; AI is only used when you want to ask more.',
      highlights: [
        'Rule-based reading engine that works without AI',
        'Separate artwork for upright and reversed cards, with its own flip transition',
        'Designed for phones first, complete on desktop too',
        'Optional AI follow-up through a Cloudflare Worker and DeepSeek',
      ],
    },
  },
  {
    id: 'wenmingtang',
    year: 2026,
    featured: true,
    form: 'web',
    purpose: 'fun',
    stack: 'client',
    scale: 'large',
    access: ['live', 'source'],
    tech: ['JavaScript', 'CSS', 'Cloudflare Workers', 'DeepSeek API'],
    color: '#e0533d',
    image: 'wenmingtang.webp',
    links: [
      { kind: 'live', href: 'https://dhoper.github.io/wenmingtang/' },
      { kind: 'source', href: GH + 'wenmingtang' },
    ],
    zh: {
      title: '問名堂',
      tagline: '廟口算命攤風格的姓名解讀',
      summary:
        '輸入姓名就能看名字解讀，也能替孩子取名；生辰可填可不填，填了解得更深。所有計算都在瀏覽器完成，老師傅的口吻照真正的廟口算命攤來寫，想聽細說時才接 DeepSeek。',
      highlights: [
        '姓名學規則引擎，有生辰時解讀更深入',
        '取名模式：竹籤候選名、兩名對照',
        '手繪風格素材，搭配音效與轉場',
        '解讀結果可以分享',
      ],
    },
    en: {
      title: 'Wen Ming Tang',
      tagline: 'Name readings from a Taiwanese temple-side fortune stall',
      summary:
        'Enter a name for a reading, or get name ideas for a child. Birth date and time are optional and make the reading deeper. Everything runs in the browser; the old master talks like a real fortune teller outside a temple, and DeepSeek is only called when you ask him to say more.',
      highlights: [
        'Rule engine for Chinese name analysis, deeper with a birth time',
        'Naming mode with bamboo-slip candidates and side-by-side comparison',
        'Hand-painted art with sound and transitions',
        'Shareable results',
      ],
    },
  },
  {
    id: 'vidscope',
    year: 2026,
    featured: true,
    form: 'web',
    purpose: 'tool',
    stack: 'fullstack',
    scale: 'large',
    access: ['live', 'download', 'source'],
    tech: ['JavaScript', 'GitHub Actions', 'Chrome Extension', 'Node.js', 'SearXNG'],
    color: '#6fa8dc',
    links: [
      { kind: 'live', href: 'https://dhoper.github.io/vidscope/' },
      { kind: 'download', href: GH + 'vidscope/raw/main/dist/vidscope-extension.zip', label: { zh: '全網搜尋擴充功能', en: 'Web-wide search extension' } },
      { kind: 'source', href: GH + 'vidscope' },
    ],
    zh: {
      title: 'Vidscope',
      tagline: '一個搜尋框，搜遍各平台的影片',
      summary:
        '把 YouTube、Vimeo、Internet Archive、Wikimedia Commons、Pexels、Pixabay、Dailymotion 等來源的影片放在同一個地方搜尋、篩選、播放。網站是純前端，爬蟲排程跑在 GitHub Actions；裝上擴充功能後，還能即時搜 YouTube 和整個網路。',
      highlights: [
        '每個平台是一個 adapter，新增來源只要寫一個檔案',
        'GitHub Actions 每 3 小時自動爬取一次',
        '擴充功能補上 YouTube 與全網即時搜尋',
        '只在來源允許時才顯示下載',
      ],
      note: EXT_NOTE.zh,
    },
    en: {
      title: 'Vidscope',
      tagline: 'One search box for videos across platforms',
      summary:
        'Search, filter and play videos from YouTube, Vimeo, Internet Archive, Wikimedia Commons, Pexels, Pixabay, Dailymotion and more in one place. The site is pure front end with a crawler scheduled on GitHub Actions; install the extension to search YouTube and the whole web live.',
      highlights: [
        'Each platform is an adapter — one file adds a new source',
        'Crawler runs on GitHub Actions every 3 hours',
        'Extension adds live YouTube and web-wide search',
        'Download buttons only when the source allows it',
      ],
      note: EXT_NOTE.en,
    },
  },
  {
    id: 'jobfit',
    year: 2026,
    form: 'extension',
    purpose: 'tool',
    stack: 'fullstack',
    scale: 'small',
    access: ['download', 'source'],
    tech: ['Chrome Extension', 'JavaScript', 'Cloudflare Workers', 'DeepSeek API'],
    color: '#ffcb46',
    links: [
      { kind: 'download', href: GH + 'jobfit/raw/main/dist/jobfit-extension.zip' },
      { kind: 'source', href: GH + 'jobfit' },
    ],
    zh: {
      title: '投準',
      tagline: '在職缺頁按一下，看這份工作值不值得投',
      summary:
        'Chrome 擴充功能。對照你的經歷評估職缺，標出責任制、薪資面議、派遣等台灣職缺常見的地雷，並建議面試該問什麼、履歷該強調什麼。個人資料只存在自己的瀏覽器裡。',
      highlights: [
        '104 職缺頁自動出現評估按鈕，1111、Cake、LinkedIn 等也能用',
        '地雷偵測，碰到自訂底線條件直接建議跳過',
        '評估紀錄保留下來方便比較',
        'AI 金鑰由 Cloudflare Worker 代管，使用者不用申請',
      ],
      note: EXT_NOTE.zh,
    },
    en: {
      title: 'JobFit',
      tagline: 'Is this job worth applying to? One click on the listing',
      summary:
        'A Chrome extension that scores a job listing against your experience, flags common red flags in Taiwanese job ads (unpaid overtime, “negotiable” pay, agency work…) and suggests what to ask in the interview and what to stress in your CV. Your profile stays in your own browser.',
      highlights: [
        'Evaluate button on 104 listings; works on 1111, Cake, LinkedIn and more',
        'Red-flag detection and personal deal-breakers',
        'Keeps a history for comparing jobs',
        'AI key held by a Cloudflare Worker — users need no API key',
      ],
      note: EXT_NOTE.en,
    },
  },
  {
    id: 'webpet',
    year: 2026,
    form: 'extension',
    purpose: 'fun',
    stack: 'client',
    scale: 'small',
    access: ['download', 'source'],
    tech: ['Chrome Extension', 'JavaScript', 'Pixel art (PixelLab)'],
    color: '#ff9ecf',
    image: 'webpet.webp',
    links: [
      { kind: 'download', href: GH + 'webpet/raw/main/dist/webpet-extension.zip' },
      { kind: 'source', href: GH + 'webpet' },
    ],
    zh: {
      title: '網頁寵物',
      tagline: '一隻小動物在你瀏覽的網頁底部散步',
      summary:
        '小橘貓、柴柴、馬來貘、卡皮巴拉四選一，每隻個性不同。點牠會跳起來冒出愛心，按住可以拖到別處，全螢幕看影片時會自己躲起來。（這個網站工作列上的小貓就是牠。）',
      highlights: ['像素逐格動畫', '點擊互動與親密度', '拖曳、全螢幕時自動隱藏', '可調大小、指定網站不顯示'],
      note: EXT_NOTE.zh,
    },
    en: {
      title: 'WebPet',
      tagline: 'A little pet strolling along the bottom of every page',
      summary:
        'Pick a ginger cat, a Shiba, a Malayan tapir or a capybara — each with its own personality. Click it and it hops with a heart, drag it somewhere else, and it hides by itself when you watch videos full screen. (The cat on this site’s taskbar is one of them.)',
      highlights: ['Frame-by-frame pixel animation', 'Click interactions and affection', 'Drag, auto-hide in full screen', 'Adjustable size, per-site hiding'],
      note: EXT_NOTE.en,
    },
  },
  {
    id: 'workhelper',
    year: 2026,
    form: 'desktop',
    purpose: 'tool',
    stack: 'client',
    scale: 'small',
    access: ['source'],
    tech: ['Electron', 'React 18', 'TypeScript', 'Tailwind', 'Google Calendar API', 'Whisper'],
    color: '#88bbdd',
    links: [{ kind: 'source', href: GH + 'WorkHelper' }],
    zh: {
      title: 'WorkHelper',
      tagline: '護眼、上下班、待辦、會議錄音的桌面小幫手',
      summary:
        'Electron 桌面應用。同步 Google 日曆提醒會議、定時提醒休息、記錄上下班時間、管理待辦事項，還能錄下會議，用 Whisper 轉成文字並產生摘要。',
      highlights: ['Google 日曆同步，依關鍵字提醒會議', '護眼與下班提醒、工時統計', '任務分類與優先級', '會議錄音＋Whisper 轉錄與 AI 摘要'],
    },
    en: {
      title: 'WorkHelper',
      tagline: 'Eye breaks, work hours, to-dos and meeting notes on your desktop',
      summary:
        'An Electron desktop app that syncs Google Calendar for meeting reminders, nudges you to rest your eyes, logs your working hours, manages to-dos, and records meetings with Whisper transcription and AI summaries.',
      highlights: ['Google Calendar sync with keyword reminders', 'Eye-break and clock-out reminders, hour stats', 'Task categories and priorities', 'Meeting recording, Whisper transcripts, AI summaries'],
    },
  },
  {
    id: 'wildlens',
    year: 2026,
    featured: true,
    form: 'web',
    purpose: 'community',
    stack: 'fullstack',
    scale: 'large',
    access: ['source'],
    tech: ['Vue 3', 'TypeScript', 'Tailwind 4', 'MapLibre', 'Express 5', 'Prisma', 'PostgreSQL', 'Next.js 14', 'Docker'],
    color: '#99bb77',
    links: [
      { kind: 'source', href: GH + 'WildLen-website', label: { zh: '前台網站', en: 'Website' } },
      { kind: 'source', href: GH + 'WildLen-backend', label: { zh: '後端 API', en: 'API' } },
      { kind: 'source', href: GH + 'WildLen-admin', label: { zh: '管理後台', en: 'Admin' } },
      { kind: 'source', href: GH + 'Forum-FrontEnd', label: { zh: '2023 初版', en: '2023 first version' } },
    ],
    zh: {
      title: 'WildLens',
      tagline: '野生動物攝影 × 觀察紀錄社群',
      summary:
        '由前台、後台、API 三個 repo 組成的社群平台：照片牆、物種圖鑑、探索地圖、文章與社區討論。上傳照片時自動讀取 EXIF，並在瀏覽器裡先移除 GPS，敏感物種的位置一律模糊。2023 年做了第一版，2026 年整套重寫。',
      highlights: [
        'MapLibre 探索地圖：集群、依物種與月份篩選',
        '位置隱私：瀏覽器內移除 EXIF，可選精確／模糊／不公開',
        'Express 5 + Prisma + PostgreSQL，JWT 搭配 Refresh Token',
        '整合測試自動啟動臨時 PostgreSQL',
      ],
    },
    en: {
      title: 'WildLens',
      tagline: 'A community for wildlife photos and sightings',
      summary:
        'A community platform split into a website, an admin back office and an API: photo wall, species guide, explore map, articles and discussions. Uploads read EXIF and strip GPS in the browser first, and locations of sensitive species are always blurred. First built in 2023, rewritten end to end in 2026.',
      highlights: [
        'MapLibre explore map with clustering and species / month filters',
        'Location privacy: EXIF stripped in the browser; exact, blurred or hidden',
        'Express 5 + Prisma + PostgreSQL, JWT with refresh tokens',
        'Integration tests spin up a throwaway PostgreSQL',
      ],
    },
  },
  {
    id: 'lineconsole',
    year: 2025,
    wip: true,
    form: 'web',
    purpose: 'business',
    stack: 'fullstack',
    scale: 'large',
    access: ['source'],
    tech: ['ASP.NET Core 8', 'Clean Architecture', 'EF Core', 'SQL Server', 'Vue 3', 'TypeScript', 'LINE Messaging API'],
    color: '#5fd38d',
    links: [{ kind: 'source', href: GH + 'LineConsole' }],
    zh: {
      title: 'LineConsole',
      tagline: '一次管理多個 LINE 官方帳號的後台',
      summary:
        '讓品牌綁定並管理多個 LINE 官方帳號，處理推播、圖文選單與行銷活動。後端用 .NET 8 Clean Architecture 分層，前端 Vue 3。仍在開發中。',
      highlights: ['註冊登入、多帳號綁定與切換', 'Rich Menu 圖文選單 CRUD', '規劃中：排程推播、預約、集點與抽獎', 'ASP.NET Identity + JWT'],
    },
    en: {
      title: 'LineConsole',
      tagline: 'One back office for several LINE Official Accounts',
      summary:
        'Lets a brand connect and run several LINE Official Accounts — broadcasts, rich menus and campaigns. .NET 8 back end in Clean Architecture layers, Vue 3 front end. Still in progress.',
      highlights: ['Sign-up, multi-account linking and switching', 'Rich menu CRUD', 'Planned: scheduled broadcasts, bookings, stamp cards, lucky draws', 'ASP.NET Identity + JWT'],
    },
  },
  {
    id: 'ai-chatbot',
    year: 2025,
    form: 'web',
    purpose: 'tool',
    stack: 'fullstack',
    scale: 'small',
    access: ['source'],
    tech: ['React 19', 'Tailwind', 'FastAPI', 'Python', 'OpenAI', 'Docker', 'AWS'],
    color: '#b69cff',
    links: [{ kind: 'source', href: GH + 'ai_chatbot' }],
    zh: {
      title: 'AI 語音聊天機器人',
      tagline: '用說的跟 AI 聊天，它也會用說的回你',
      summary: '語音轉文字、交給 OpenAI 回覆、再把回覆念出來。前端 React 19，後端 FastAPI，附 Docker Compose 與 AWS 部署設定。',
      highlights: ['語音 → 文字 → GPT → 語音的對話流程', 'Prompt 設定可替換', 'Docker Compose 一鍵啟動', 'AWS 部署範本'],
    },
    en: {
      title: 'AI Voice Chatbot',
      tagline: 'Talk to the AI and it talks back',
      summary: 'Speech to text, a reply from OpenAI, then text to speech. React 19 front end and a FastAPI back end, with Docker Compose and an AWS deployment template.',
      highlights: ['Speech → text → GPT → speech loop', 'Swappable prompt settings', 'One-command Docker Compose', 'AWS deployment template'],
    },
  },
  {
    id: 'shopping-cart',
    year: 2025,
    form: 'service',
    purpose: 'business',
    stack: 'backend',
    scale: 'small',
    access: ['source'],
    tech: ['C#', 'ASP.NET Core', 'xUnit', 'Swagger'],
    color: '#7fdcf5',
    links: [{ kind: 'source', href: GH + 'ShoppingCartExam' }],
    zh: {
      title: '購物車結帳 API',
      tagline: '促銷、優惠券都算進去的結帳金額計算',
      summary: '解析文字格式的購物車（商品、促銷日、優惠券）並計算結帳金額的 ASP.NET Core Web API，以 xUnit 測試解析與計算邏輯。',
      highlights: ['促銷折扣與優惠券規則', '輸入解析與結帳邏輯分層', 'xUnit 單元測試', 'Swagger 測試介面'],
    },
    en: {
      title: 'Checkout API',
      tagline: 'Checkout totals with promotions and coupons',
      summary: 'An ASP.NET Core Web API that parses a plain-text cart (items, promotion dates, coupons) and returns the total, with xUnit tests for parsing and pricing.',
      highlights: ['Promotion and coupon rules', 'Parsing separated from pricing logic', 'xUnit unit tests', 'Swagger UI'],
    },
  },
  {
    id: 'odoo-erp',
    year: 2024,
    form: 'web',
    purpose: 'business',
    stack: 'backend',
    scale: 'large',
    access: ['source'],
    tech: ['Odoo 17', 'Python', 'PostgreSQL'],
    color: '#c3a6ff',
    links: [{ kind: 'source', href: GH + 'odoo17' }],
    zh: {
      title: 'Odoo 17 公司 ERP',
      tagline: '讀原始碼，把開源 ERP 改成公司要的樣子',
      summary: '研讀 Odoo 原始碼掌握核心架構後，架設公司 ERP，並在 custom-addons 裡客製模組與介面。',
      highlights: ['從原始碼掌握模組繼承機制', '客製模組與前端介面', 'Python ORM + PostgreSQL'],
    },
    en: {
      title: 'Odoo 17 Company ERP',
      tagline: 'Reading the source to bend an open-source ERP to the business',
      summary: 'After studying the Odoo source to learn its core, I set up the company ERP and built custom modules and UI in custom-addons.',
      highlights: ['Module inheritance learned from the source', 'Custom modules and UI', 'Python ORM + PostgreSQL'],
    },
  },
  {
    id: 'erp-dashboard',
    year: 2024,
    form: 'web',
    purpose: 'business',
    stack: 'client',
    scale: 'small',
    access: ['source'],
    tech: ['Next.js', 'React', 'TypeScript', 'MUI'],
    color: '#ffd59e',
    links: [{ kind: 'source', href: GH + 'ERP-System' }],
    zh: {
      title: 'ERP 管理介面',
      tagline: '會員、讀卡機與資料表的管理後台介面',
      summary: '以 Next.js 與 MUI 開源版型為基礎，做出會員管理、讀卡機裝置、表單與資料表等 ERP 後台頁面。',
      highlights: ['會員與使用者管理頁', '讀卡機裝置管理', '表單、資料表與儀表板元件'],
    },
    en: {
      title: 'ERP Admin UI',
      tagline: 'Back-office screens for members, card readers and tables',
      summary: 'ERP back-office pages — member management, card reading, forms and data tables — built with Next.js on an open-source MUI template.',
      highlights: ['Member and user management', 'Card-reader device management', 'Forms, tables and dashboard widgets'],
    },
  },
  {
    id: 'monolock',
    year: 2023,
    form: 'service',
    purpose: 'business',
    stack: 'backend',
    scale: 'small',
    access: ['source'],
    tech: ['PHP', 'Laravel', 'MySQL', 'REST API'],
    color: '#e0a07a',
    links: [{ kind: 'source', href: GH + 'MonoLock' }],
    zh: {
      title: 'MonoLock 智慧置物櫃',
      tagline: '置物櫃、使用者與開關紀錄的後端 API',
      summary: '管理置物櫃、使用者與開關紀錄的 Laravel API，包含管理員權限、開鎖驗證，以及裝置離線時的資料同步。',
      highlights: ['root 管理員與一般使用者的權限分層', '開鎖驗證中介層', '裝置離線資料同步紀錄', '多語系錯誤訊息'],
    },
    en: {
      title: 'MonoLock Smart Lockers',
      tagline: 'Back-end API for lockers, users and access logs',
      summary: 'A Laravel API for lockers, users and open/close records, with admin roles, unlock checks and syncing data recorded while a device was offline.',
      highlights: ['Root admin vs. user permissions', 'Unlock verification middleware', 'Offline data sync logs', 'Localised error messages'],
    },
  },
  {
    id: 'ecommerce',
    year: 2023,
    form: 'web',
    purpose: 'business',
    stack: 'fullstack',
    scale: 'small',
    access: ['source'],
    tech: ['Vue 3', 'Vite', 'Express', 'MongoDB', 'Cloudinary'],
    color: '#ffb38a',
    links: [{ kind: 'source', href: GH + 'ecommerce-website' }],
    zh: {
      title: '電商網站',
      tagline: '前台逛商品、後台上架的小型電商',
      summary: '早期的全端練習：Vue 3 前台搭配 Express 與 MongoDB，有商品列表、分類與商品頁，以及上架商品的後台，圖片存在 Cloudinary。',
      highlights: ['商品列表、分類與商品頁', '上架商品的後台頁面', 'Express + MongoDB 商品 API，圖片存 Cloudinary'],
    },
    en: {
      title: 'E-commerce Site',
      tagline: 'A small shop with a storefront and a back office',
      summary: 'An early full-stack project: a Vue 3 storefront with product list, categories and product pages, a back office for adding products, and an Express + MongoDB API with images on Cloudinary.',
      highlights: ['Product list, categories and product pages', 'Back office for adding products', 'Express + MongoDB API, images on Cloudinary'],
    },
  },
]

export const works = computed<Work[]>(() =>
  WORKS.map(({ zh, en, ...rest }) => ({ ...rest, ...(locale.value === 'en' ? en : zh) })),
)

export const FORMS: Form[] = ['web', 'extension', 'desktop', 'service']
export const PURPOSES: Purpose[] = ['business', 'tool', 'fun', 'community']
export const STACKS: Stack[] = ['client', 'fullstack', 'backend']
export const SCALES: Scale[] = ['large', 'small']
export const ACCESSES: Access[] = ['live', 'download', 'source']
