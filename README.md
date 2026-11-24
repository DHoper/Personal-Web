# Personal Web — 林廷一 Tingyi Lin

個人作品集網站，使用 Vue 3 + TypeScript + Vite 建置。

## 開發

```bash
npm install
npm run dev      # 本機開發 http://localhost:5173
npm run build    # 型別檢查 + 打包到 dist/
npm run preview  # 預覽打包結果
```

## 更新內容

所有文字內容（自我介紹、經歷、作品、技能、求職條件）都在
[`src/data/profile.ts`](src/data/profile.ts)，修改這個檔案即可，不需要動到元件。

## 結構

```
src/
├─ data/profile.ts            網站內容
├─ components/
│  ├─ CustomCursor.vue        圓點 + 反色圓環游標、視窗外框
│  ├─ SiteNav.vue             捲動時自動收起的導覽列
│  ├─ BannerSection.vue       console.log("HELLO!!") 開場
│  ├─ MarqueeBand.vue         跑馬燈
│  ├─ AboutSection.vue        關於我
│  ├─ StrengthsSection.vue    專長領域
│  ├─ ExperienceLog.vue       git log 風格的工作經歷
│  ├─ ProjectSlider.vue       作品切換（支援滑動、鍵盤）
│  ├─ ProjectCase.vue         作品案例卡（截圖／終端機／推播／對話視覺）
│  ├─ SkillsBoard.vue         技術能力
│  ├─ InfoAccordion.vue       求職條件等折疊清單
│  └─ ContactSection.vue      聯絡資訊
├─ styles/main.css            設計變數（配色、框線、陰影、字型）
└─ assets/                    圖片、SVG、字型
fonts-src/                    導覽列字型原檔（npm run fonts 裁切成 woff2）
public/files/                 作品簡介 PDF
```
