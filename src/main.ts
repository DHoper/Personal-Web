import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { startClock } from './clock'
import './styles/main.css'

createApp(App).directive('reveal', reveal).mount('#app')
startClock()
