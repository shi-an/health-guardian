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
          </template>
        </nav>

        <div class="user-actions">
          <template v-if="userStore.isAuthenticated">
            <div class="user-info">
              <div class="avatar-container">
                <el-avatar :size="32" :src="userStore.user?.avatar" class="user-avatar">
                  {{ userStore.user?.name?.charAt(0) }}
                </el-avatar>
                <div class="user-dropdown">
                  <router-link to="/profile" class="user-center-btn">
                    <i class="el-icon-setting"></i>
                    <span class="user-name">{{ userStore.user?.name }}</span>
                  </router-link>
                </div>
              </div>
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
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: var(--gray);
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary);
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

.avatar-container {
    position: relative;
    display: inline-block;
  }

  .user-avatar {
    transition: transform 0.3s ease;
    cursor: pointer;
    z-index: 2;
    position: relative;
  }

  .user-avatar:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(74, 157, 247, 0.3);
  }

  .user-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
    margin-top: 8px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .avatar-container:hover .user-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }

  .user-center-btn {
    padding: 10px 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(74, 157, 247, 0.2);
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--dark);
    text-decoration: none;
    white-space: nowrap;
    min-width: 120px;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .user-center-btn:hover {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 157, 247, 0.3);
  }

@media (max-width: 768px) {
  .header-content {
    height: auto;
    padding: 10px 0;
    flex-wrap: wrap;
    gap: 10px;
  }
  .nav-links {
    gap: 16px;
    flex-wrap: wrap;
  }
}

  .user-name {
    font-weight: 500;
  }

  /* 添加下拉三角形指示 */
  .user-dropdown::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
  }

  .user-dropdown::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid rgba(74, 157, 247, 0.2);
    margin-bottom: -1px;
  }
</style>
