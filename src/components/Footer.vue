<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-info">
        <h3>AI驱动的健康管理平台</h3>
        <p>智能健康管理，从这里开始</p>
      </div>
      <div class="footer-links">
        <router-link to="/about">关于我们</router-link>
        <router-link to="/terms">服务条款</router-link>
        <router-link to="/privacy">隐私政策</router-link>
        <router-link to="/contact">联系我们</router-link>
      </div>
      <div class="footer-copyright">
        <p>&copy; {{ new Date().getFullYear() }} 健康管理平台. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer组件逻辑
</script>

<style scoped>
.app-footer {
  background-color: #f5f5f5;
  padding: 20px 0;
  margin-top: 40px;
  border-top: 1px solid #e0e0e0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.footer-info h3 {
  color: #333;
  margin-bottom: 10px;
}

.footer-info p {
  color: #666;
  margin-bottom: 20px;
}

.footer-links {
  margin-bottom: 20px;
}

.footer-links a {
  color: #409eff;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #66b1ff;
}

.footer-copyright {
  color: #909399;
  font-size: 14px;
}
</style>