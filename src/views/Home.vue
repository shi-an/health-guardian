<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>AI驱动的个性化健康管理平台</h1>
            <p>健康守护利用先进的人工智能技术，为您提供个性化的饮食规划、科学运动建议和全天候心理陪伴，助您实现主动健康管理。</p>
            <el-button type="primary" size="large" @click="handleGetStarted">
              开始健康之旅
            </el-button>
          </div>
          <div class="hero-image">
            <div class="image-placeholder">
              AI健康管理可视化界面
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="section-title">核心功能</h2>
        <div class="features-grid">
          <el-card class="feature-card" shadow="hover">
            <div class="feature-icon">
              <i class="el-icon-tableware"></i>
            </div>
            <h3>智能饮食规划</h3>
            <p>基于您的身体状况、健康目标和饮食偏好，AI算法生成个性化营养餐单</p>
          </el-card>
          
          <el-card class="feature-card" shadow="hover">
            <div class="feature-icon">
              <i class="el-icon-bicycle"></i>
            </div>
            <h3>科学运动建议</h3>
            <p>根据您的体能水平、时间安排和健身目标，提供定制化的运动方案</p>
          </el-card>
          
          <el-card class="feature-card" shadow="hover">
            <div class="feature-icon">
              <i class="el-icon-chat-dot-round"></i>
            </div>
            <h3>心理陪伴助手</h3>
            <p>全天候AI心理陪伴，提供情绪支持、压力管理和正念练习</p>
          </el-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleGetStarted = () => {
  if (userStore.isAuthenticated) {
    router.push('/diet')
  } else {
    router.push('/login')
  }
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 60px);
}

.hero {
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-text p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.hero-image {
  display: flex;
  justify-content: center;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  backdrop-filter: blur(10px);
}

.features {
  padding: 80px 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: #303133;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  text-align: center;
  padding: 40px 30px;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: #ecf5ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon i {
  font-size: 2rem;
  color: #409eff;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #303133;
}

.feature-card p {
  color: #606266;
  line-height: 1.6;
}
</style>