import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/styles/main.css'

import App from './App.vue'
import router from './router'
import { useUserStore } from '@/stores/user'

const app = createApp(App)
const pinia = createPinia()

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 应用先挂载，确保页面立即渲染
app.mount('#app')

// 挂载后异步加载用户认证状态，不阻塞页面显示
const userStore = useUserStore()
Promise.resolve().then(() => {
  userStore.loadUser().catch(error => {
    console.log('用户数据加载失败，但不影响页面显示:', error)
  })
})