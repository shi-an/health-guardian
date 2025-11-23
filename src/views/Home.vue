<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg-shape"></div>
      <div class="hero-bg-gradient"></div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text animate-fade-in">
            <h1>AI驱动的个性化健康管理平台</h1>
            <p>健康守护利用先进的人工智能技术，为您提供个性化的饮食规划、科学运动建议和全天候心理陪伴，助您实现主动健康管理。</p>
            <el-button 
              type="primary" 
              size="large" 
              class="hero-btn" 
              @click="handleGetStarted"
              :loading="isLoading"
              :disabled="isLoading"
            >
              {{ isLoading ? '正在处理...' : '开始健康之旅' }}
              <i class="el-icon-arrow-right" v-if="!isLoading"></i>
            </el-button>
          </div>
          <div class="hero-image animate-slide-in">
            <div class="image-placeholder">
              <div class="image-icon"><i class="el-icon-medical-service"></i></div>
              <div class="image-title">AI健康管理可视化界面</div>
              <div class="image-features">
                <span class="feature-badge">智能分析</span>
                <span class="feature-badge">个性化建议</span>
                <span class="feature-badge">实时追踪</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="section-header text-center">
          <h2>我们的核心功能</h2>
          <p>全方位健康管理，从这里开始</p>
        </div>
        <div class="features-grid">
          <div class="feature-card feature-card-hover">
            <div class="feature-icon feature-icon-1">
              <i class="el-icon-tableware"></i>
            </div>
            <h3>智能饮食规划</h3>
            <p>基于您的身体数据、口味偏好和健康目标，AI为您定制个性化的饮食计划，确保营养均衡且美味可口。</p>
            <div class="feature-divider"></div>
            <div class="feature-badge">个性化定制</div>
          </div>
          <div class="feature-card feature-card-hover">
            <div class="feature-icon feature-icon-2">
              <i class="el-icon-bicycle"></i>
            </div>
            <h3>科学运动建议</h3>
            <p>根据您的体能水平和健身目标，制定循序渐进的运动方案，并实时调整强度，避免运动损伤。</p>
            <div class="feature-divider"></div>
            <div class="feature-badge">科学安全</div>
          </div>
          <div class="feature-card feature-card-hover">
            <div class="feature-icon feature-icon-3">
              <i class="el-icon-chat-dot-round"></i>
            </div>
            <h3>心理陪伴助手</h3>
            <p>提供专业的心理疏导和情绪管理建议，帮助您维持积极的心态，应对生活中的各种压力。</p>
            <div class="feature-divider"></div>
            <div class="feature-badge">全天候守护</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const isLoading = ref(false)

const handleGetStarted = async () => {
  try {
    isLoading.value = true
    // 模拟加载延迟，实际项目中可能有API请求
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (userStore.isAuthenticated) {
      router.push('/diet')
      ElMessage.success('正在前往您的个性化饮食规划...')
    } else {
      router.push('/login')
      ElMessage.info('请先登录以获取个性化服务')
    }
  } catch (error) {
    ElMessage.error('操作失败，请重试')
  } finally {
    isLoading.value = false
  }
}

// 页面滚动监听，添加元素进入视口时的动画
import { onMounted, onUnmounted } from 'vue'

const handleScroll = () => {
  const sections = document.querySelectorAll('.features')
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight * 0.8
    
    if (isVisible) {
      section.classList.add('animate-in')
    }
  })
}

onMounted(() => {
  handleScroll() // 初始加载时检查
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* CSS变量定义 - 与About.vue保持一致 */
:root {
  --primary: #4a9df7;
  --secondary: #6cdfcc;
  --accent: #ff7e5f;
  --light: #f8f9fa;
  --dark: #343a40;
  --dark-gray: #495057;
  --gray: #6c757d;
  --light-gray: #e9ecef;
  --lighter-gray: #f8f9fa;
  --success: #28a745;
  --warning: #ffc107;
  --danger: #dc3545;
  --white: #ffffff;
  --shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.1);
  --shadow-deep: 0 15px 30px rgba(0, 0, 0, 0.1);
  --radius: 10px;
  --radius-lg: 15px;
  --radius-xl: 25px;
  --radius-sm: 6px;
  --transition: all 0.3s ease;
  --transition-fast: all 0.2s ease;
  --transition-slow: all 0.5s ease;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --primary-rgb: 74, 157, 247;
  --secondary-rgb: 108, 223, 204;
  --accent-rgb: 255, 126, 95;
}

.home {
  min-height: calc(100vh - 60px);
}

.hero {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--white);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.hero-bg-shape {
  position: absolute;
  top: -20%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  filter: blur(40px);
  animation: float 8s ease-in-out infinite;
}

.hero-bg-gradient {
  position: absolute;
  bottom: -30%;
  left: -20%;
  width: 700px;
  height: 700px;
  background: rgba(var(--accent-rgb), 0.15);
  border-radius: 50%;
  filter: blur(60px);
  animation: float 10s ease-in-out infinite reverse;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 10;
}

.hero-text h1 {
  font-size: 2.8rem;
  margin-bottom: 15px;
  font-weight: var(--font-weight-bold);
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-text p {
  font-size: 1.3rem;
  margin-bottom: 30px;
  opacity: 0.95;
  line-height: 1.6;
}

.hero-btn {
  padding: 12px 30px !important;
  font-size: 1.1rem !important;
  border-radius: var(--radius-lg) !important;
  transition: var(--transition) !important;
  background: white !important;
  color: var(--primary) !important;
  border: none !important;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.25) !important;
  font-weight: var(--font-weight-medium) !important;
  position: relative;
  overflow: hidden;
}

.hero-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.hero-btn:hover::before {
  left: 100%;
}

.hero-btn:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4) !important;
}

.hero-image {
  display: flex;
  justify-content: center;
}

.image-placeholder {
  width: 100%;
  max-width: 400px;
  height: 300px;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-placeholder:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.image-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
}

.image-icon {
  font-size: 5rem;
  color: rgba(255, 255, 255, 0.9);
  animation: pulse 3s ease-in-out infinite;
}

.image-title {
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  text-align: center;
  padding: 0 30px;
}

.image-features {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 20px;
}

.feature-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  transition: var(--transition);
}

.feature-badge:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

/* 动画效果 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-in {
  animation: slideIn 1.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 新添加的动画 */
@keyframes textGlow {
  from {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  to {
    text-shadow: 0 2px 15px rgba(255, 255, 255, 0.3);
  }
}

@keyframes cardHover {
  0% {
    transform: translateY(-10px) scale(1.02) rotateY(5deg);
  }
  50% {
    transform: translateY(-10px) scale(1.02) rotateY(-5deg);
  }
  100% {
    transform: translateY(-10px) scale(1.02) rotateY(5deg);
  }
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1.1) rotateX(15deg) rotateY(15deg);
  }
  50% {
    transform: scale(1.15) rotateX(15deg) rotateY(15deg);
  }
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 按钮加载状态样式增强 */
.el-button--loading {
  background-color: rgba(255, 255, 255, 0.8) !important;
  color: rgba(102, 126, 234, 0.8) !important;
  transition: var(--transition) !important;
}

/* 骨架屏效果基础样式 */
.skeleton {
  position: relative;
  overflow: hidden;
  background-color: #ecf0f1;
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* 交互反馈增强 */
* {
  box-sizing: border-box;
}

/* 鼠标悬停时的通用反馈 */
a, button, .clickable {
  transition: var(--transition);
}

/* 页面加载时的过渡效果 */
.home {
  animation: pageLoad 0.5s ease-out;
}

@keyframes pageLoad {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 避免动画在页面打印时显示 */
@media print {
  * {
    animation: none !important;
    transition: none !important;
  }
}

.features {
  padding: 100px 0;
  background-color: var(--lighter-gray);
  position: relative;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;
}

.features.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* 添加背景装饰 */
.features::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
}

.section-header {
  margin-bottom: 80px;
}

.section-header h2 {
  font-size: 2.4rem;
  margin-bottom: 20px;
  color: var(--dark);
  position: relative;
  display: inline-block;
  font-weight: var(--font-weight-bold);
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 1.5px;
}

.section-header h2:hover::after {
  width: 120px;
}

.section-header p {
  font-size: 1.3rem;
  color: var(--gray);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
  position: relative;
}

/* 添加网格背景装饰 */
.features-grid::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(var(--primary-rgb), 0.03) 2px, transparent 0),
    radial-gradient(circle at 75% 75%, rgba(var(--primary-rgb), 0.03) 2px, transparent 0);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: -1;
}

.feature-card {
  background: var(--white);
  padding: 40px;
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  border-top: 3px solid transparent;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.feature-card-hover {
  transform: translateY(0);
}

.feature-card-hover:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-top-color: var(--primary);
}

/* 为每个卡片添加独特的渐变背景 */
.feature-card-hover:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, var(--card-gradient-start), var(--card-gradient-end));
}

.feature-card:nth-child(1) {
  --card-gradient-start: var(--primary);
  --card-gradient-end: var(--secondary);
}

.feature-card:nth-child(2) {
  --card-gradient-start: #f093fb;
  --card-gradient-end: #f5576c;
}

.feature-card:nth-child(3) {
  --card-gradient-start: #4facfe;
  --card-gradient-end: #00f2fe;
}

/* 图标样式 */
.feature-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--icon-bg-start), var(--icon-bg-end));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  color: var(--white);
  font-size: 2rem;
  transition: transform 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background: linear-gradient(135deg, var(--icon-bg-start), var(--icon-bg-end));
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card-hover:hover .feature-icon {
  transform: scale(1.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.feature-card-hover:hover .feature-icon::before {
  opacity: 1;
}

.feature-icon-1 {
  --icon-bg-start: var(--primary);
  --icon-bg-end: var(--secondary);
}

.feature-icon-2 {
  --icon-bg-start: #f093fb;
  --icon-bg-end: #f5576c;
}

.feature-icon-3 {
  --icon-bg-start: #4facfe;
  --icon-bg-end: #00f2fe;
}

.feature-card h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--dark);
  font-weight: var(--font-weight-semibold);
  transition: color 0.3s ease;
}

.feature-card:hover h3 {
  color: var(--primary);
}

.feature-card p {
  color: var(--gray);
  line-height: 1.7;
  font-size: 1rem;
  margin-bottom: 20px;
  transition: color 0.3s ease;
}

.feature-card:hover p {
  color: var(--dark-gray);
}

.feature-divider {
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, var(--card-gradient-start), var(--card-gradient-end));
  margin: 0 auto 20px;
  border-radius: 1.5px;
  transition: width 0.3s ease;
}

.feature-card-hover:hover .feature-divider {
  width: 80px;
}

.feature-badge {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, var(--card-gradient-start), var(--card-gradient-end));
  color: var(--white);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease 0.1s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.feature-card-hover:hover .feature-badge {
  opacity: 1;
  transform: translateY(0);
}

/* 滚动进度指示器 */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  z-index: 1000;
  width: 0%;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .hero-content {
    gap: 60px;
  }
  
  .hero-text h1 {
    font-size: 2.8rem;
  }
  
  .image-placeholder {
    max-width: 400px;
    height: 400px;
  }
  
  .features-grid {
    gap: 30px;
  }
}

@media (max-width: 992px) {
  .hero {
    padding: 80px 0;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
  
  .hero-text h1 {
    font-size: 2.5rem;
  }
  
  .hero-text p {
    font-size: 1.1rem;
  }
  
  .hero-image {
    order: -1;
  }
  
  .image-placeholder {
    max-width: 350px;
    height: 350px;
    margin: 0 auto;
  }
  
  .features {
    padding: 80px 0;
  }
  
  .section-header h2 {
    font-size: 2.4rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .feature-card {
    padding: 35px;
  }
}

@media (max-width: 768px) {
  .hero-bg-shape,
  .hero-bg-gradient {
    transform: scale(0.8);
  }
  
  .hero-text h1 {
    font-size: 2.2rem;
  }
  
  .hero-btn {
    padding: 10px 25px !important;
    font-size: 1rem !important;
  }
  
  .image-placeholder {
    max-width: 300px;
    height: 300px;
  }
  
  .image-icon {
    font-size: 4rem;
  }
  
  .section-header h2 {
    font-size: 2.2rem;
  }
  
  .section-header p {
    font-size: 1.1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .feature-card {
    padding: 30px;
    border-radius: 15px;
  }
  
  .feature-icon {
    width: 80px;
    height: 80px;
    font-size: 2.2rem;
  }
  
  .feature-card h3 {
    font-size: 1.6rem;
  }
}

@media (max-width: 576px) {
  .hero {
    padding: 60px 0;
  }
  
  .hero-text h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .hero-text p {
    font-size: 1rem;
    margin-bottom: 30px;
  }
  
  .image-placeholder {
    max-width: 250px;
    height: 250px;
    border-radius: 20px;
  }
  
  .image-icon {
    font-size: 3rem;
  }
  
  .image-title {
    font-size: 1.2rem;
  }
  
  .feature-badge {
    font-size: 0.85rem;
    padding: 6px 15px;
  }
  
  .features {
    padding: 60px 0;
  }
  
  .features::before {
    height: 150px;
  }
  
  .section-header {
    margin-bottom: 60px;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .section-header p {
    font-size: 1rem;
  }
  
  .feature-card {
    padding: 25px;
    border-radius: 12px;
  }
  
  .feature-icon {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  
  .feature-card h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
  }
  
  .feature-card p {
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

@media (max-width: 400px) {
  .hero-text h1 {
    font-size: 1.8rem;
  }
  
  .feature-icon {
    width: 60px;
    height: 60px;
    font-size: 1.6rem;
  }
  
  .feature-card h3 {
    font-size: 1.3rem;
  }
}

/* 打印样式 */
@media print {
  .hero,
  .features::before {
    background: var(--dark) !important;
    color: var(--white) !important;
  }
  
  .feature-card,
  .image-placeholder {
    box-shadow: none !important;
    border: 1px solid var(--light-gray);
  }
  
  /* 添加页码 */
  @page {
    margin: 1.5cm;
  }
  
  body {
    font-size: 12pt;
  }
}
</style>