<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <i class="el-icon-first-aid-kit"></i>
          <span>健康守护</span>
        </div>
        
        <nav class="nav-links">
          <router-link to="/" class="nav-link">首页</router-link>
          <template v-if="userStore.isAuthenticated">
            <router-link to="/diet" class="nav-link">饮食规划</router-link>
            <router-link to="/workout" class="nav-link">运动建议</router-link>
            <router-link to="/mental" class="nav-link">心理陪伴</router-link>
            <router-link to="/profile" class="nav-link">个人中心</router-link>
          </template>
        </nav>

        <div class="user-actions">
          <template v-if="userStore.isAuthenticated">
            <div class="user-info">
              <el-avatar :size="32" :src="userStore.user?.avatar">
                {{ userStore.user?.name?.charAt(0) }}
              </el-avatar>
              <span class="username">{{ userStore.user?.name }}</span>
              <el-button type="primary" text @click="handleLogout">退出</el-button>
            </div>
          </template>
          <template v-else>
            <el-button type="primary" text @click="$router.push('/login')">登录</el-button>
            <el-button type="primary" @click="$router.push('/register')">注册</el-button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.app-header {
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  color: #409eff;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: #606266;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #409eff;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  font-weight: 500;
}
</style>