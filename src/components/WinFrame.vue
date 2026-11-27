<script setup lang="ts">
import PixelIcon from './PixelIcon.vue'

// 像素桌面風格的視窗：標題列（圖示＋標題＋細條紋＋按鈕）＋ 網點陰影。
// active：使用中的視窗，標題列換成主題色。
withDefaults(
  defineProps<{
    title: string
    sub?: string
    icon?: string
    tone?: string
    active?: boolean
    /** 標題列右側的裝飾按鈕；有 #actions 插槽時改用插槽內容 */
    controls?: boolean
    shadow?: boolean
  }>(),
  { controls: true, shadow: true },
)
</script>

<template>
  <div class="win" :class="{ 'win--active': active, 'win--flat': !shadow }" :style="tone ? { '--tone': tone } : undefined">
    <span v-if="shadow" class="win__shadow" aria-hidden="true"></span>
    <div class="win__frame">
      <div class="win__bar">
        <PixelIcon v-if="icon" :name="icon" :size="16" class="win__icon" />
        <p class="win__title">
          {{ title }}<span v-if="sub" class="win__sub">{{ sub }}</span>
        </p>
        <span class="win__stripes" aria-hidden="true"></span>
        <slot name="actions">
          <span v-if="controls" class="win__controls" aria-hidden="true"><i></i><i></i></span>
        </slot>
      </div>
      <div class="win__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.win {
  --win-off: 10px;
  position: relative;
  margin: 0 var(--win-off) var(--win-off) 0;
}
/* 網點陰影：2px 棋盤格，像老式點陣螢幕的半透明 */
.win__shadow {
  position: absolute;
  inset: 0;
  transform: translate(var(--win-off), var(--win-off));
  border-radius: var(--radius);
  background: repeating-conic-gradient(var(--ink) 0 25%, transparent 0 50%) 0 0 / 4px 4px;
  pointer-events: none;
}
.win--flat {
  margin: 0;
}
.win__frame {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: var(--border);
  border-radius: var(--radius);
  background: var(--white);
}
.win__bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 2.35rem;
  padding: 0.35rem 0.55rem 0.35rem 0.75rem;
  border-bottom: var(--border);
  border-radius: calc(var(--radius) - var(--bw)) calc(var(--radius) - var(--bw)) 0 0;
  background: var(--paper-2);
}
.win--active .win__bar {
  background: var(--tone, var(--accent));
}
.win__title {
  flex: none;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1.3;
}
.win--active .win__title {
  font-weight: 700;
}
.win__sub {
  margin-left: 0.6em;
  font-weight: 400;
  opacity: 0.65;
}
/* 經典視窗標題列的細橫紋 */
.win__stripes {
  flex: 1;
  min-width: 1rem;
  height: 0.75rem;
  background: repeating-linear-gradient(to bottom, var(--ink) 0 2px, transparent 2px 4px);
  opacity: 0.22;
}
.win--active .win__stripes {
  opacity: 0.85;
}
.win__controls {
  display: flex;
  gap: 0.35rem;
}
.win__controls i {
  width: 0.95rem;
  height: 0.95rem;
  border: var(--bw) solid var(--ink);
  border-radius: 2px;
  background: var(--white);
}
.win__body {
  flex: 1;
  min-height: 0;
  border-radius: 0 0 calc(var(--radius) - var(--bw)) calc(var(--radius) - var(--bw));
  overflow: hidden;
}

@media (max-width: 600px) {
  .win {
    --win-off: 6px;
  }
}
</style>
