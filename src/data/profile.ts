// 網站上所有的文字內容都集中在這裡，之後要更新履歷只需要改這個檔案。

export interface Link {
  label: string
  href: string
}

export interface Strength {
  en: string
  title: string
  desc: string
  points: string[]
}

export interface Experience {
  hash: string
  period: string
  current?: boolean
  title: string
  company: string
  points: string[]
}

export type ProjectVisual =
  | { type: 'image'; src: string }
  | { type: 'terminal'; title: string; lines: string[] }
  | { type: 'notify'; items: { app: string; text: string }[] }
  | { type: 'chat'; messages: string[] }

export interface Project {
  category: '工作專案' | '個人作品'
  title: string
  subtitle: string
  summary: string
  highlights: string[]
  tags: string[]
  /** 卡片後方疊層與重點色 */
  color: string
  visual: ProjectVisual
  note?: string
  links: Link[]
}

export interface SkillGroup {
  title: string
  /** level 3 = 核心技術（黑底實心顯示）；1、2 一般顯示，網站上不標示等級 */
  items: { name: string; level: 1 | 2 | 3 }[]
}

export const profile = {
  nameZh: '林廷一',
  firstName: 'TINGYI',
  lastName: 'LIN',
  roleEn: 'Systems Analyst · Full-stack Engineer',
  pitch: '近 3 年系統建置經驗，從需求釐清、系統分析、架構設計到開發上線，把系統從需求一路帶到交付。',
  location: 'Taichung, TW',
  email: 'dhoper777@outlook.com',
  github: 'https://github.com/DHoper',
  focus: ['需求分析與系統規劃', '系統架構設計', '全端開發與交付', '開發流程與 AI 導入'],
}

export const about = {
  // hl: true 的片段會加上螢光筆效果
  statement: [
    { t: '我擅長把複雜的需求，拆解成' },
    { t: '清楚的架構', hl: true },
    { t: '，再落實為' },
    { t: '穩定、好維護的系統', hl: true },
    { t: '。' },
  ],
  paragraphs: [
    '我是林廷一。近 3 年參與 ERP、醫療系統與行動 App 的建置，工作範圍從需求釐清、系統分析與架構設計，一路延伸到開發、上線與維運。',
    '在富錦未來任職期間，我獨立負責公司的軟體開發，透過研讀 Odoo 原始碼掌握核心架構，主導 ERP 系統從需求釐清、規劃到正式上線。',
    '現任耐特資訊資深系統開發工程師，負責大型系統的架構設計與開發，並建置 CI/CD、源碼掃描與 AI Agent 自動化測試，推動團隊將生成式 AI 導入開發流程。',
    '生成式 AI 讓實作的成本快速下降，系統的成敗更取決於需求是否被正確理解、架構能否承受變化。因此除了開發，我希望在系統分析、專案規劃與團隊管理上承擔更多責任。',
  ],
  facts: [
    { k: 'Based in', v: '台中・可遠端' },
    { k: 'Experience', v: '近 3 年' },
    { k: 'Role', v: 'SA／PM／全端' },
  ],
}

export const strengths: Strength[] = [
  {
    en: 'Analysis',
    title: '需求與系統分析',
    desc: '從業務端的需求描述出發，釐清背後真正要解決的問題，整理成流程、需求規格與資料模型，讓開發團隊與需求方對「要做什麼」有一致的理解。',
    points: ['需求釐清與流程梳理', '需求規格與資料模型', '範圍界定與時程規劃'],
  },
  {
    en: 'Architecture',
    title: '系統架構與整合',
    desc: '以 C# / .NET Core 與 Node.js 設計模組化的服務，並整合醫療 PACS 儀器、既有系統與 ERP，讓資料在系統之間正確流通。',
    points: ['大型系統架構設計', '異質系統整合（PACS・ERP・LINE）', 'PostgreSQL・SQL Server'],
  },
  {
    en: 'Delivery',
    title: '全端開發與交付',
    desc: '從 Vue 3、Next.js 14 的前後台，到 API 與資料庫，能獨立完成開發並部署上線。',
    points: ['前後台與 API 開發', 'PWA・即時聊天・背景推播', '部署上線與維運'],
  },
  {
    en: 'Process × AI',
    title: '開發流程與團隊',
    desc: '建置 CI/CD、源碼掃描與 AI Agent 自動化測試，並推動團隊導入生成式 AI 的開發方式。',
    points: ['CI/CD 與源碼掃描', 'AI Agent 自動化測試', '推動團隊流程改善'],
  },
]

export const experiences: Experience[] = [
  {
    hash: 'a7e3f91',
    period: '2025.06 – 現在',
    current: true,
    title: '資深系統開發工程師',
    company: '耐特資訊',
    points: [
      '負責大型系統的架構設計與核心開發',
      '建置 CI/CD、源碼掃描與 AI Agent 自動化測試，提升交付速度與品質',
      '推動團隊導入生成式 AI 開發方式，建立新的協作流程',
    ],
  },
  {
    hash: '4c1d8b2',
    period: '2024.08 – 2025.04',
    title: '網頁工程師（全端）',
    company: '雄互聯科技',
    points: ['負責產品的前後端開發、功能擴充與維運'],
  },
  {
    hash: 'e90b57c',
    period: '2023.12 – 2024.06',
    title: '軟體工程師',
    company: '富錦未來',
    points: [
      '獨立負責公司軟體開發，涵蓋需求釐清、系統規劃、開發到上線',
      '研讀 Odoo 原始碼，建置並客製公司專屬的 ERP 系統',
      '職責由前端擴展至前後端全端開發',
    ],
  },
]

export const projects: Project[] = [
  {
    category: '工作專案',
    title: '大型系統開發',
    subtitle: '架構設計 × 交付流程 × AI 導入',
    summary: '負責大型系統的架構設計與核心開發，並建立團隊的自動化交付流程，推動生成式 AI 融入日常開發。',
    highlights: ['大型系統架構設計與核心開發', 'CI/CD、源碼掃描與 AI Agent 自動化測試', '推動團隊導入生成式 AI 開發流程'],
    tags: ['架構設計', 'CI/CD', 'AI Agent', '流程改善'],
    color: '#ff9ecf',
    visual: {
      type: 'terminal',
      title: 'pipeline.log',
      lines: [
        '$ git push origin main',
        '✓ build',
        '✓ source scan：0 issues',
        '✓ AI agent tests passed',
        '$ deploy --env production',
        '✓ released',
      ],
    },
    links: [],
  },
  {
    category: '工作專案',
    title: '醫療系統介接',
    subtitle: '新系統建置 × PACS 儀器整合',
    summary: '依醫療院所需求建置新系統，並將既有系統、PACS 醫療影像儀器與資料庫的資料整合至同一平台。',
    highlights: ['需求分析與系統規劃', 'PACS 醫療儀器資料介接', '舊系統資料整合與移轉'],
    tags: ['C#', '.NET Core', 'SQL Server', '系統整合'],
    color: '#7fdcf5',
    visual: {
      type: 'terminal',
      title: 'integration.log',
      lines: [
        '$ connect --source PACS',
        '✓ 醫療影像資料接收完成',
        '$ sync --from legacy-db --to new-system',
        '✓ 舊系統資料整合完成',
        '$ deploy --env production',
        '✓ 新系統上線',
      ],
    },
    links: [],
  },
  {
    category: '工作專案',
    title: '補習班 App',
    subtitle: '家長 PWA × 教務管理系統',
    summary: '為補習班打造家長端 App 與教務管理系統，讓老師、家長與行政人員在同一平台即時溝通。',
    highlights: ['即時聊天與背景推播通知', '出缺席紀錄、課表查詢', '班級、課程與行政管理後台'],
    tags: ['Next.js 14', 'PWA', 'Web Push', 'TypeScript'],
    color: '#ffcb46',
    visual: {
      type: 'notify',
      items: [
        { app: '到班通知', text: '小明已於 18:52 到班簽到' },
        { app: '老師訊息', text: '今日作業已上傳至聯絡簿' },
        { app: '課表提醒', text: '明天 19:00 數學課' },
      ],
    },
    links: [],
  },
  {
    category: '工作專案',
    title: 'Odoo ERP 導入',
    subtitle: '公司專屬 ERP 建置與客製',
    summary: '研讀 Odoo 原始碼掌握核心架構，獨立完成公司 ERP 的架設、模組客製與上線。',
    highlights: ['研讀原始碼掌握核心架構', '客製模組與前端介面', 'Python ORM + PostgreSQL'],
    tags: ['Odoo 17', 'Python', 'PostgreSQL'],
    color: '#b69cff',
    visual: {
      type: 'terminal',
      title: 'odoo — zsh',
      lines: [
        '$ git clone odoo --branch 17.0',
        '$ grep -rn "_inherit" addons/',
        '✓ 掌握核心模組架構',
        '$ odoo-bin -i company_erp',
        '✓ 公司專屬 ERP 上線',
      ],
    },
    links: [{ label: 'GitHub', href: 'https://github.com/DHoper/odoo17' }],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Analysis & Delivery',
    items: [
      { name: '需求分析', level: 3 },
      { name: '系統分析', level: 3 },
      { name: '架構設計', level: 3 },
      { name: '需求規格', level: 2 },
      { name: '流程圖・ERD', level: 2 },
      { name: '專案規劃', level: 2 },
      { name: '技術文件', level: 2 },
    ],
  },
  {
    title: 'Back-end',
    items: [
      { name: 'C#', level: 3 },
      { name: '.NET Core', level: 3 },
      { name: 'Node.js', level: 3 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'SQL Server', level: 2 },
      { name: 'Python', level: 2 },
      { name: 'Odoo 17', level: 2 },
      { name: 'Express', level: 2 },
      { name: 'Prisma ORM', level: 2 },
      { name: 'MongoDB', level: 2 },
      { name: 'IIS', level: 1 },
    ],
  },
  {
    title: 'Front-end',
    items: [
      { name: 'TypeScript', level: 3 },
      { name: 'Vue 3', level: 3 },
      { name: 'Next.js 14', level: 3 },
      { name: 'React', level: 2 },
      { name: 'Pinia', level: 2 },
      { name: 'Tailwind', level: 2 },
      { name: 'PWA', level: 2 },
      { name: 'Socket.io', level: 2 },
      { name: 'Sass', level: 1 },
    ],
  },
  {
    title: 'DevOps × AI',
    items: [
      { name: 'AI Agent', level: 3 },
      { name: 'CI/CD', level: 3 },
      { name: 'Git', level: 3 },
      { name: 'Linux', level: 2 },
      { name: '源碼掃描', level: 2 },
      { name: 'WSL2', level: 2 },
      { name: 'Docker', level: 1 },
      { name: 'Nginx', level: 1 },
      { name: 'MQTT', level: 1 },
    ],
  },
]

// 「更多資訊」折疊清單
export const moreInfo = [
  {
    id: 'job',
    title: '求職條件',
    items: [
      '希望職稱：系統分析師（SA）、專案經理（PM）、全端／後端工程師',
      '希望地點：台中、台北、新北、桃園、新竹',
      '工作型態：全職，對遠端工作有意願',
      '可上班日：錄取後隨時可上班',
    ],
  },
  {
    id: 'basic',
    title: '基本資料',
    items: ['姓名：林廷一', '現居：台中市', '學歷：國立台中空中大學 資訊學系'],
  },
  {
    id: 'certs',
    title: '語言與證照',
    items: [
      '英文：TOEIC 多益 780，聽說讀寫中等',
      '台語：中等',
      'Google：Technical Support Fundamentals',
      'MongoDB University：MongoDB Basics',
    ],
  },
]
