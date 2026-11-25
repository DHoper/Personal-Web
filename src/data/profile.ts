// 網站上所有的文字內容都集中在這裡（中文 zh、英文 en 兩份，結構相同），之後要更新履歷只需要改這個檔案。
import { computed } from 'vue'
import { locale } from '../i18n'

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
  category: string
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

const shared = {
  nameZh: '林廷一',
  firstName: 'TINGYI',
  lastName: 'LIN',
  location: 'Taichung, TW',
  email: 'gxgemini777@gmail.com',
  github: 'https://github.com/DHoper',
}

const techGroups: SkillGroup[] = [
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
      { name: 'Docker', level: 2 },
      { name: 'WSL2', level: 2 },
      { name: 'Nginx', level: 1 },
      { name: 'MQTT', level: 1 },
    ],
  },
]

// ───────────────────────────── 中文 ─────────────────────────────
const zh = {
  profile: {
    ...shared,
    roleEn: 'Systems Analysis · Design · Delivery',
    pitch: '3 年系統建置經驗，專注把業務需求變成能穩定交付的系統：從需求釐清、系統分析與設計，一路做到開發與上線。',
    focus: ['需求分析', '系統設計', '開發實作', '交付推進'],
  },
  about: {
    // hl: true 的片段會加上螢光筆效果
    statement: [
      { t: '我擅長把複雜的需求，拆解成' },
      { t: '清楚的架構', hl: true },
      { t: '，再落實為' },
      { t: '穩定、好維護的系統', hl: true },
      { t: '。' },
    ],
    paragraphs: [
      '我是林廷一，專注於把業務需求變成能穩定交付的系統。3 年來參與 ERP、醫療系統、行動 App 與大型系統的建置，工作一路貫穿需求釐清、系統分析與設計、開發實作到上線推進。',
      '在富錦未來任職期間，我獨立負責公司的軟體開發，透過研讀 Odoo 原始碼掌握核心架構，主導 ERP 系統從需求釐清、規劃到正式上線。',
      '現任耐特資訊資深系統開發工程師，與 PM 協作把業務需求轉成系統規格，負責大型系統的架構設計與開發，並建置 CI/CD、源碼掃描與 AI Agent 自動化測試，推動團隊將生成式 AI 導入開發流程。',
      '生成式 AI 讓寫程式的成本快速下降，真正決定成敗的，是需求有沒有被理解正確、設計能不能承受變化、專案能不能如期交付。我希望在系統分析／設計、專案管理或研發的位置上，發揮這條從需求到交付的完整能力。',
    ],
    facts: [
      { k: 'Based in', v: '台中・可遠端' },
      { k: 'Experience', v: '3 年' },
      { k: 'Focus', v: '需求 → 交付' },
    ],
  },
  strengths: [
    {
      en: '01 · Analysis',
      title: '需求分析',
      desc: '從業務端的需求描述出發，釐清背後真正要解決的問題，整理成流程、需求規格與資料模型，讓開發團隊與需求方對「要做什麼」有一致的理解。',
      points: ['需求釐清與流程梳理', '需求規格與資料模型', '範圍界定與優先順序'],
    },
    {
      en: '02 · Design',
      title: '系統設計',
      desc: '以 C# / .NET Core 與 Node.js 設計模組化的架構與資料庫，並整合醫療 PACS 儀器、既有系統與 ERP，讓資料在系統之間正確流通。',
      points: ['大型系統架構設計', '資料庫與 API 規劃', '異質系統整合（PACS・ERP・LINE）'],
    },
    {
      en: '03 · Build',
      title: '開發實作',
      desc: '從 Vue 3、Next.js 的前後台到 API 與資料庫，能獨立完成開發並部署上線，對交付的程式品質負責。',
      points: ['前後台與 API 開發', 'PWA・即時聊天・背景推播', '部署上線與維運'],
    },
    {
      en: '04 · Delivery',
      title: '交付推進',
      desc: '建置 CI/CD、源碼掃描與 AI Agent 自動化測試，並推動團隊導入生成式 AI 開發流程，讓專案穩定、如期交付。',
      points: ['CI/CD 與源碼掃描', 'AI Agent 自動化測試', '團隊流程改善與 AI 導入'],
    },
  ] as Strength[],
  experiences: [
    {
      hash: 'a7e3f91',
      period: '2025.06 – 現在',
      current: true,
      title: '資深系統開發工程師',
      company: '耐特資訊',
      points: [
        '與 PM 協作，將業務需求轉化為系統規格與技術設計',
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
      points: [
        '依醫療院所需求規劃並開發新系統',
        '將舊有系統、PACS 醫療影像儀器與資料庫的資料整合到同一平台',
        '維護既有系統，依新需求擴充功能與修正錯誤',
      ],
    },
    {
      hash: 'e90b57c',
      period: '2023.12 – 2024.06',
      title: '軟體工程師',
      company: '富錦未來',
      points: [
        '獨立負責公司軟體開發，涵蓋需求釐清、系統規劃、開發到上線',
        '研讀 Odoo 原始碼，建置並客製公司專屬的 ERP 系統',
        '以 Next.js 開發補習班家長 App 與教務管理系統',
      ],
    },
  ] as Experience[],
  projects: [
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
        lines: ['$ git push origin main', '✓ build', '✓ source scan：0 issues', '✓ AI agent tests passed', '$ deploy --env production', '✓ released'],
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
        lines: ['$ connect --source PACS', '✓ 醫療影像資料接收完成', '$ sync --from legacy-db --to new-system', '✓ 舊系統資料整合完成', '$ deploy --env production', '✓ 新系統上線'],
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
        lines: ['$ git clone odoo --branch 17.0', '$ grep -rn "_inherit" addons/', '✓ 掌握核心模組架構', '$ odoo-bin -i company_erp', '✓ 公司專屬 ERP 上線'],
      },
      links: [{ label: 'GitHub', href: 'https://github.com/DHoper/odoo17' }],
    },
  ] as Project[],
  skillGroups: [
    {
      title: 'Analysis & Delivery',
      items: [
        { name: '需求分析', level: 3 },
        { name: '系統分析', level: 3 },
        { name: '系統設計', level: 3 },
        { name: '需求規格', level: 2 },
        { name: '流程圖・ERD', level: 2 },
        { name: '專案規劃', level: 2 },
        { name: '技術文件', level: 2 },
      ],
    },
    ...techGroups,
  ] as SkillGroup[],
  // 「更多資訊」折疊清單
  moreInfo: [
    {
      id: 'job',
      title: '求職條件',
      items: [
        '希望職務：系統分析／設計（SA／SD）、專案管理（PM）、軟體研發（RD）',
        '希望地點：台中、台北、新北、桃園、新竹',
        '工作型態：全職，可遠端',
        '可上班日：錄取後隨時可上班',
      ],
    },
    {
      id: 'basic',
      title: '基本資料',
      items: ['姓名：林廷一', '現居：台中市', '學歷：國立台中空中大學 資訊學系', '英文：TOEIC 多益 780'],
    },
  ],
}

// ───────────────────────────── English ─────────────────────────────
const en: typeof zh = {
  profile: {
    ...shared,
    roleEn: 'Systems Analysis · Design · Delivery',
    pitch: '3 years of building systems, focused on turning business needs into software that ships reliably — from requirements and system design through development and release.',
    focus: ['Requirements', 'System design', 'Development', 'Delivery'],
  },
  about: {
    statement: [
      { t: 'I turn complex requirements into ' },
      { t: 'a clear architecture', hl: true },
      { t: ', then build it into ' },
      { t: 'a reliable, maintainable system', hl: true },
      { t: '.' },
    ],
    paragraphs: [
      "I'm Tingyi Lin. My focus is turning business needs into systems that ship reliably. Over the past 3 years I have built ERP, healthcare, mobile and large-scale enterprise systems, covering the whole path from clarifying requirements and system design to development and release.",
      "At 富錦未來, I owned the company's software development on my own. I studied the Odoo source code to understand its core architecture and led the ERP project from requirements to go-live.",
      'Now a Senior Systems Developer at 耐特資訊, I work with PMs to turn business requirements into system specs, design and build a large-scale system, and set up CI/CD, code scanning and AI-agent test automation while leading the team\'s move to AI-assisted development.',
      'As AI makes code cheaper to write, what decides a project is whether the requirements are understood correctly, whether the design can absorb change and whether the team delivers on time. That is the full path I want to own, in systems analysis and design, project management or software development roles.',
    ],
    facts: [
      { k: 'Based in', v: 'Taichung · Remote OK' },
      { k: 'Experience', v: '3 years' },
      { k: 'Focus', v: 'Requirements → Delivery' },
    ],
  },
  strengths: [
    {
      en: '01 · Analysis',
      title: 'Requirements analysis',
      desc: 'I start from how the business describes its needs, find the problem actually worth solving, and write it down as process flows, requirement specs and data models so developers and stakeholders agree on what will be built.',
      points: ['Clarifying requirements and workflows', 'Requirement specs and data models', 'Scope and priorities'],
    },
    {
      en: '02 · Design',
      title: 'System design',
      desc: 'I design modular architectures and databases with C# / .NET Core and Node.js, and integrate PACS medical devices, legacy systems and ERP so data flows correctly between them.',
      points: ['Large-scale system architecture', 'Database and API design', 'Integration (PACS · ERP · LINE)'],
    },
    {
      en: '03 · Build',
      title: 'Development',
      desc: 'From Vue 3 and Next.js front ends to APIs and databases, I can build and ship on my own, and I take responsibility for the quality of what I deliver.',
      points: ['Front end, back office and APIs', 'PWA · real-time chat · push notifications', 'Deployment and operations'],
    },
    {
      en: '04 · Delivery',
      title: 'Delivery',
      desc: 'I set up CI/CD, code scanning and AI-agent test automation, and lead the adoption of AI-assisted development so projects ship steadily and on time.',
      points: ['CI/CD and code scanning', 'AI-agent test automation', 'Process improvement and AI adoption'],
    },
  ],
  experiences: [
    {
      hash: 'a7e3f91',
      period: '2025.06 – Present',
      current: true,
      title: 'Senior Systems Developer',
      company: '耐特資訊',
      points: [
        'Work with PMs to turn business requirements into system specs and technical designs',
        'Design and build the architecture and core of a large-scale system',
        'Set up CI/CD, code scanning and AI-agent test automation to ship faster with better quality',
        'Lead the team\'s adoption of AI-assisted development and new ways of working',
      ],
    },
    {
      hash: '4c1d8b2',
      period: '2024.08 – 2025.04',
      title: 'Full-stack Web Engineer',
      company: '雄互聯科技',
      points: [
        'Planned and built new systems for healthcare clients',
        'Consolidated data from legacy systems, PACS imaging equipment and databases into one platform',
        'Maintained existing systems with new features and fixes',
      ],
    },
    {
      hash: 'e90b57c',
      period: '2023.12 – 2024.06',
      title: 'Software Engineer',
      company: '富錦未來',
      points: [
        'Owned the company\'s software development end to end, from requirements to release',
        'Studied the Odoo source code to build and customise the company ERP',
        'Built a parent app and an admin system for a tutoring school with Next.js',
      ],
    },
  ],
  projects: [
    {
      ...zh.projects[0]!,
      category: 'Work project',
      title: 'Large-scale System',
      subtitle: 'Architecture × delivery pipeline × AI adoption',
      summary: 'Designed and built the core of a large-scale system, set up the team\'s automated delivery pipeline and brought generative AI into everyday development.',
      highlights: ['Architecture and core development', 'CI/CD, code scanning and AI-agent tests', 'Team adoption of AI-assisted development'],
      tags: ['Architecture', 'CI/CD', 'AI Agent', 'Process'],
    },
    {
      ...zh.projects[1]!,
      category: 'Work project',
      title: 'Healthcare Integration',
      subtitle: 'New system × PACS device integration',
      summary: 'Built a new system for a healthcare provider and consolidated data from legacy systems, PACS imaging equipment and databases into one platform.',
      highlights: ['Requirements and system planning', 'PACS device data integration', 'Legacy data consolidation and migration'],
      tags: ['C#', '.NET Core', 'SQL Server', 'Integration'],
      visual: {
        type: 'terminal',
        title: 'integration.log',
        lines: ['$ connect --source PACS', '✓ imaging data received', '$ sync --from legacy-db --to new-system', '✓ legacy data merged', '$ deploy --env production', '✓ new system live'],
      },
    },
    {
      ...zh.projects[2]!,
      category: 'Work project',
      title: 'Tutoring School App',
      subtitle: 'Parent PWA × school admin system',
      summary: 'A parent app and an admin system that keep teachers, parents and staff in touch on one platform.',
      highlights: ['Real-time chat and push notifications', 'Attendance and timetables', 'Class, course and admin back office'],
      visual: {
        type: 'notify',
        items: [
          { app: 'Check-in', text: 'Ming checked in at 18:52' },
          { app: 'Teacher', text: "Today's homework is in the class book" },
          { app: 'Timetable', text: 'Maths class tomorrow at 19:00' },
        ],
      },
    },
    {
      ...zh.projects[3]!,
      category: 'Work project',
      title: 'Odoo ERP Rollout',
      subtitle: 'Company ERP setup and customisation',
      summary: 'Studied the Odoo source code to learn its core architecture, then set up, customised and launched the company ERP on my own.',
      highlights: ['Learned the core from the source code', 'Custom modules and UI', 'Python ORM + PostgreSQL'],
      visual: {
        type: 'terminal',
        title: 'odoo — zsh',
        lines: ['$ git clone odoo --branch 17.0', '$ grep -rn "_inherit" addons/', '✓ core modules mapped', '$ odoo-bin -i company_erp', '✓ company ERP live'],
      },
    },
  ],
  skillGroups: [
    {
      title: 'Analysis & Delivery',
      items: [
        { name: 'Requirements analysis', level: 3 },
        { name: 'Systems analysis', level: 3 },
        { name: 'System design', level: 3 },
        { name: 'Requirement specs', level: 2 },
        { name: 'Flowcharts · ERD', level: 2 },
        { name: 'Project planning', level: 2 },
        { name: 'Technical writing', level: 2 },
      ],
    },
    ...techGroups,
  ],
  moreInfo: [
    {
      id: 'job',
      title: 'What I\'m looking for',
      items: [
        'Roles: Systems Analyst / Designer (SA / SD), Project Manager (PM), Software Engineer (RD)',
        'Location: Taichung, Taipei, New Taipei, Taoyuan, Hsinchu',
        'Type: full-time, remote OK',
        'Availability: immediately',
      ],
    },
    {
      id: 'basic',
      title: 'About',
      items: ['Name: Tingyi Lin', 'Based in: Taichung, Taiwan', 'Education: National Open University, Information Science', 'English: TOEIC 780'],
    },
  ],
}

/** 目前語言的內容；在 template 中直接用 content.xxx，在 script 中用 content.value.xxx */
export const content = computed(() => (locale.value === 'en' ? en : zh))
