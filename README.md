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

所有文字內容（自我介紹、經歷、代表專案、技能、求職條件）都在
[`src/data/profile.ts`](src/data/profile.ts)，修改這個檔案即可，不需要動到元件。

### 新增作品到作品庫

作品庫的資料在 [`src/data/works.ts`](src/data/works.ts)，在 `WORKS` 陣列加一筆即可（中英文各一份文字）。
每個作品同時標上幾個面向，網站會自動產生篩選與數量：

| 欄位 | 意思 | 可用值 |
| --- | --- | --- |
| `form` | 形式（左側資料夾） | `web` 網站・`extension` 擴充功能・`desktop` 桌面應用・`service` 後端服務 |
| `purpose` | 用途 | `business` 商務・`tool` 工具・`fun` 娛樂・`community` 社群 |
| `stack` | 技術範圍 | `client` 純前端・`fullstack` 全端・`backend` 後端 |
| `scale` | 規模 | `large` 大型・`small` 小型 |
| `access` | 取得方式（可多選） | `live` 點開即用・`download` 下載安裝・`source` 原始碼 |

預覽圖放在 `public/works/`（建議 960×600 左右的 webp），填在 `image`；沒有預覽圖時會用像素圖示當封面。
`featured: true` 會排在前面並標上星號，`wip: true` 會顯示「開發中」。

## 結構

```
src/
├─ data/profile.ts            網站內容
├─ data/works.ts              作品庫資料
├─ clock.ts                   時鐘與時段（早上／中午／傍晚／晚上）
├─ components/
│  ├─ CustomCursor.vue        圓點 + 反色圓環游標、視窗外框
│  ├─ Taskbar.vue             像素桌面風格的工作列（開始選單、區塊按鈕、語言、時鐘）
│  ├─ TaskPet.vue             工作列上散步的小貓（網頁寵物的素材）
│  ├─ WinFrame.vue            視窗外框：標題列＋網點陰影
│  ├─ PixelIcon.vue           12×12 像素圖示
│  ├─ BannerSection.vue       console.log("HELLO!!") 開場
│  ├─ MarqueeBand.vue         跑馬燈
│  ├─ AboutSection.vue        關於我
│  ├─ StrengthsSection.vue    專長領域
│  ├─ ExperienceLog.vue       git log 風格的工作經歷
│  ├─ ProjectSlider.vue       作品切換（支援滑動、鍵盤）
│  ├─ ProjectCase.vue         作品案例卡（截圖／終端機／推播／對話視覺）
│  ├─ LibrarySection.vue      作品庫：檔案總管式的分類、篩選與搜尋
│  ├─ WorkDetail.vue          作品詳細視窗
│  ├─ DeskScene.vue           作品庫後方依時段換色的像素桌布
│  ├─ SkillsBoard.vue         技術能力
│  ├─ InfoAccordion.vue       求職條件等折疊清單
│  └─ ContactSection.vue      聯絡資訊
├─ styles/main.css            設計變數（配色、框線、陰影、字型）
└─ assets/                    圖片、SVG、字型
fonts-src/                    導覽列字型原檔（npm run fonts 裁切成 woff2）
public/works/                 作品庫預覽圖
```
