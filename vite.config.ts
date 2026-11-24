import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 使用相對路徑，部署到 GitHub Pages 子路徑也能正常運作
  base: './',
  plugins: [vue()],
})
