<template>
  <div class="about">
    <section class="about-header">
      <div class="container">
        <h1>关于我们</h1>
        <p>了解健康守护平台的使命、愿景和价值观</p>
      </div>
    </section>
    
    <section class="about-intro">
      <div class="container">
        <div class="intro-content">
          <div class="intro-text">
            <h2>我们的使命</h2>
            <p>健康守护平台致力于通过先进的人工智能技术，为每个人提供个性化的健康管理解决方案，让健康管理变得简单、科学、有效。</p>
            <p>我们相信，每个人都有权获得专业的健康指导和支持，无论他们身在何处，收入如何。通过技术创新，我们正在打破健康服务的地域和经济限制。</p>
          </div>
          <div class="intro-image">
            <div class="image-placeholder">
              <i class="el-icon-medical-service"></i>
              <div class="image-text">AI驱动健康管理</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="our-vision">
      <div class="container">
        <h2>我们的愿景</h2>
        <p>成为全球领先的AI健康管理平台，赋能每个人实现健康生活方式，降低慢性疾病风险，提高生活质量。</p>
        
        <div class="vision-cards">
          <div class="vision-card">
            <div class="vision-icon">
              <i class="el-icon-data-line"></i>
            </div>
            <h3>数据驱动</h3>
            <p>利用人工智能和大数据分析，为用户提供基于证据的健康建议。</p>
          </div>
          <div class="vision-card">
            <div class="vision-icon">
              <i class="el-icon-user-solid"></i>
            </div>
            <h3>个性化服务</h3>
            <p>根据用户独特的身体状况、偏好和目标，定制专属健康方案。</p>
          </div>
          <div class="vision-card">
            <div class="vision-icon">
              <i class="el-icon-shield"></i>
            </div>
            <h3>专业可信</h3>
            <p>与医疗专家合作，确保我们的建议科学、安全、有效。</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="our-team">
      <div class="container">
        <h2>我们的团队</h2>
        <p>由医学专家、数据科学家和技术工程师组成的跨学科团队，致力于改变健康管理方式。</p>
        
        <div class="team-members">
          <div class="team-member">
            <div class="member-avatar">
              <i class="el-icon-user"></i>
            </div>
            <h3>张明</h3>
            <p>创始人 & CEO</p>
            <p>前谷歌AI研究员，拥有10年健康科技领域经验</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <i class="el-icon-user"></i>
            </div>
            <h3>李华</h3>
            <p>医学总监</p>
            <p>营养学博士，曾在多家三甲医院担任营养师</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <i class="el-icon-user"></i>
            </div>
            <h3>王强</h3>
            <p>CTO</p>
            <p>前阿里技术专家，负责平台技术架构设计</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <i class="el-icon-user"></i>
            </div>
            <h3>赵婷</h3>
            <p>产品总监</p>
            <p>健康科技产品设计专家，注重用户体验</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="our-story">
      <div class="container">
        <h2>我们的故事</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-date">2020年</div>
            <div class="timeline-content">
              <h3>公司成立</h3>
              <p>由一群热爱健康科技的专业人士创立，旨在利用AI技术改变健康管理方式。</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">2021年</div>
            <div class="timeline-content">
              <h3>平台上线</h3>
              <p>首个版本正式上线，提供基础的饮食规划和运动建议功能。</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">2022年</div>
            <div class="timeline-content">
              <h3>心理陪伴功能上线</h3>
              <p>引入AI心理陪伴助手，提供情绪管理和压力缓解建议。</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">2023年</div>
            <div class="timeline-content">
              <h3>用户突破100万</h3>
              <p>平台用户突破100万，获得行业广泛认可。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// 确保页面加载时滚动到顶部
onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>

<style scoped>
/* 全局颜色变量 - 使用与main.css一致的变量 */
:root {
  --primary: #4a9df7;
  --secondary: #6cdfcc;
  --accent: #ff7e5f;
  --light: #f8f9fa;
  --dark: #343a40;
  --success: #28a745;
  --warning: #ffc107;
  --danger: #dc3545;
}

/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 容器样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 头部样式 */
.about-header {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.about-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.05)"/></svg>');
  background-size: cover;
}

.about-header h1 {
  font-size: 2.8rem;
  margin-bottom: 15px;
  font-weight: 700;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.about-header p {
  font-size: 1.3rem;
  opacity: 0.95;
  position: relative;
  z-index: 1;
}

/* 介绍部分 */
.about-intro {
  padding: 80px 0;
  background-color: white;
}

.intro-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.intro-text h2 {
  font-size: 2.2rem;
  margin-bottom: 25px;
  color: var(--dark);
  position: relative;
  display: inline-block;
  font-weight: 700;
}

.intro-text h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 1.5px;
  transition: width 0.3s ease;
}

.intro-text h2:hover::after {
  width: 80px;
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 20px;
}

.intro-image {
  display: flex;
  justify-content: center;
}

.image-placeholder {
  width: 100%;
  max-width: 400px;
  height: 300px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-placeholder:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.image-placeholder i {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: pulse 3s ease-in-out infinite;
}

.image-text {
  font-size: 1.3rem;
  font-weight: 600;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

/* 愿景部分 */
.our-vision {
  padding: 80px 0;
  background-color: var(--light);
  text-align: center;
}

.our-vision h2 {
  font-size: 2.4rem;
  margin-bottom: 20px;
  color: var(--dark);
  position: relative;
  display: inline-block;
  font-weight: 700;
}

.our-vision h2::after {
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

.our-vision > p {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.8;
}

.vision-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.vision-card {
  background: white;
  padding: 40px;
  border-radius: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-top: 3px solid transparent;
}

.vision-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-top-color: var(--primary);
}

.vision-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  color: white;
  font-size: 2rem;
  transition: transform 0.3s ease;
}

.vision-card:hover .vision-icon {
  transform: scale(1.1);
}

.vision-card h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--dark);
  font-weight: 600;
}

.vision-card p {
  color: #666;
  line-height: 1.7;
}

/* 团队部分 */
.our-team {
  padding: 80px 0;
  background-color: white;
  text-align: center;
}

.our-team h2 {
  font-size: 2.4rem;
  margin-bottom: 20px;
  color: var(--dark);
  position: relative;
  display: inline-block;
  font-weight: 700;
}

.our-team h2::after {
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

.our-team > p {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.8;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.team-member {
  background: var(--light);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  background: white;
}

.member-avatar {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 2rem;
  transition: transform 0.3s ease;
}

.team-member:hover .member-avatar {
  transform: scale(1.1);
}

.team-member h3 {
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: var(--dark);
  font-weight: 600;
}

.team-member p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 5px;
}

/* 故事部分 */
.our-story {
  padding: 80px 0;
  background-color: var(--light);
}

.our-story h2 {
  font-size: 2.4rem;
  margin-bottom: 60px;
  color: var(--dark);
  text-align: center;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
}

.our-story h2::after {
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

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  width: 3px;
  background: linear-gradient(to bottom, var(--primary), var(--secondary));
}

.timeline-item {
  position: relative;
  padding-left: 60px;
  margin-bottom: 40px;
  animation: fadeInUp 0.6s ease-out;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-date {
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  z-index: 1;
  transition: transform 0.3s ease;
}

.timeline-item:hover .timeline-date {
  transform: scale(1.2);
}

.timeline-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-left: 3px solid var(--primary);
}

.timeline-content:hover {
  transform: translateX(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.timeline-content h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--dark);
  font-weight: 600;
}

.timeline-content p {
  color: #666;
  line-height: 1.7;
  font-size: 1rem;
}

/* 响应式设计优化 */
@media (max-width: 992px) {
  .intro-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .intro-image {
    order: -1;
  }
  
  .vision-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .team-members {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .about-header {
    padding: 60px 0;
  }
  
  .about-header h1 {
    font-size: 2.2rem;
  }
  
  .about-header p {
    font-size: 1.1rem;
  }
  
  .about-intro,
  .our-vision,
  .our-team,
  .our-story {
    padding: 60px 0;
  }
  
  .intro-text h2,
  .our-vision h2,
  .our-team h2,
  .our-story h2 {
    font-size: 2rem;
  }
  
  .vision-cards {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .team-members {
    grid-template-columns: 1fr;
  }
  
  .timeline::before {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .timeline-item {
    padding-left: 0;
    padding-right: 0;
    text-align: center;
  }
  
  .timeline-date {
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 20px;
  }
  
  .timeline-content {
    position: relative;
    margin-top: 20px;
    border-left: none;
    border-top: 3px solid var(--primary);
  }
  
  .timeline-content:hover {
    transform: translateX(0);
    transform: translateY(-5px);
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 15px;
  }
  
  .about-header h1 {
    font-size: 1.8rem;
  }
  
  .intro-text h2,
  .our-vision h2,
  .our-team h2,
  .our-story h2 {
    font-size: 1.8rem;
  }
  
  .image-placeholder {
    max-width: 300px;
    height: 250px;
  }
  
  .image-placeholder i {
    font-size: 3rem;
  }
  
  .vision-card,
  .team-member {
    padding: 25px;
  }
  
  .timeline-content {
    padding: 20px;
  }
}

/* 打印样式 */
@media print {
  .about-header,
  .vision-icon,
  .member-avatar,
  .timeline-date {
    background: gray !important;
    color: black !important;
  }
  
  .timeline::before,
  h2::after {
    background: black !important;
  }
  
  .vision-card,
  .team-member,
  .timeline-content {
    box-shadow: none !important;
    border: 1px solid #ddd !important;
  }
}
</style>