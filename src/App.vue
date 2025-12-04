<template>
  <el-config-provider :locale="zhCn">
    <div id="app">
      <Header />
      <main>
        <router-view />
      </main>
      <Footer />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(() => {
  // 异步加载用户数据，但不阻塞页面渲染
  Promise.resolve().then(() => {
    userStore.loadUser().catch(error => {
      console.log('用户数据加载失败，但不影响首页显示:', error)
    })
  })
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #4a9df7;
  --secondary: #6cdfcc;
  --accent: #ff7e5f;
  --dark: #343a40;
  --dark-gray: #495057;
  --gray: #6c757d;
  --light-gray: #e9ecef;
  --lighter-gray: #f8f9fa;
  --white: #ffffff;
  --radius: 10px;
  --radius-lg: 16px;
  --radius-sm: 6px;
  --shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

main {
  flex: 1;
  background-color: #f5f7fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

html, body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  color: var(--dark-gray);
}
</style>
