<template>
  <div class="contact-us">
    <section class="contact-header">
      <div class="container">
        <h1>联系我们</h1>
        <p>我们很乐意听取您的意见、问题和建议</p>
      </div>
    </section>
    
    <section class="contact-content">
      <div class="container">
        <div class="contact-wrapper">
          <div class="contact-info">
            <h2>联系信息</h2>
            <p>无论您有任何问题或建议，都可以通过以下方式与我们联系。我们的客服团队将在1-2个工作日内回复您。</p>
            
            <div class="info-items">
              <div class="info-item">
                <div class="info-icon">
                  <i class="el-icon-message"></i>
                </div>
                <div class="info-text">
                  <h3>电子邮件</h3>
                  <p>support@healthguardian.com</p>
                  <p>feedback@healthguardian.com</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="el-icon-phone"></i>
                </div>
                <div class="info-text">
                  <h3>电话</h3>
                  <p>400-123-4567</p>
                  <p>工作时间：周一至周五 9:00-18:00</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="el-icon-map-location"></i>
                </div>
                <div class="info-text">
                  <h3>地址</h3>
                  <p>北京市海淀区中关村科技园区123号健康大厦5层</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="el-icon-chat-line-square"></i>
                </div>
                <div class="info-text">
                  <h3>在线客服</h3>
                  <p>工作时间：周一至周日 8:00-22:00</p>
                  <button class="chat-btn" @click="openChat">立即咨询</button>
                </div>
              </div>
            </div>
            
            <div class="social-media">
              <h3>关注我们</h3>
              <div class="social-icons">
                <a href="#" class="social-icon">
                  <i class="el-icon-mobile-phone"></i>
                  <span>微信公众号</span>
                </a>
                <a href="#" class="social-icon">
                  <i class="el-icon-chat-dot-square"></i>
                  <span>微博</span>
                </a>
                <a href="#" class="social-icon">
                  <i class="el-icon-video-camera"></i>
                  <span>抖音</span>
                </a>
              </div>
            </div>
          </div>
          
          <div class="contact-form">
            <h2>发送消息</h2>
            <p>请填写以下表单，我们将尽快与您联系。*</p>为必填项
            
            <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
              <el-form-item label="姓名*" prop="name">
                <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
              </el-form-item>
              
              <el-form-item label="电子邮件*" prop="email">
                <el-input v-model="form.email" type="email" placeholder="请输入您的电子邮件"></el-input>
              </el-form-item>
              
              <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入您的电话号码"></el-input>
              </el-form-item>
              
              <el-form-item label="主题*" prop="subject">
                <el-select v-model="form.subject" placeholder="请选择消息主题">
                  <el-option label="功能咨询" value="功能咨询"></el-option>
                  <el-option label="问题反馈" value="问题反馈"></el-option>
                  <el-option label="建议改进" value="建议改进"></el-option>
                  <el-option label="合作洽谈" value="合作洽谈"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="消息内容*" prop="message">
                <el-input v-model="form.message" type="textarea" :rows="5" placeholder="请输入您的消息内容"></el-input>
              </el-form-item>
              
              <el-form-item label="附件" prop="attachment">
                <el-upload
                  class="upload-demo"
                  drag
                  action="#"
                  :auto-upload="false"
                  :on-change="handleFileChange"
                  :limit="1"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">拖拽文件到此处，或<em>点击上传</em></div>
                  <template #tip>
                    <div class="el-upload__tip">
                      支持上传PDF、Word、图片文件，单个文件不超过5MB
                    </div>
                  </template>
                </el-upload>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="submitForm" :loading="isSubmitting">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </section>
    
    <section class="faq-section">
      <div class="container">
        <h2>常见问题</h2>
        <p>查看以下常见问题，可能已经包含您想了解的信息</p>
        
        <el-collapse class="faq-collapse">
          <el-collapse-item title="如何注册账户？" name="1">
            <div class="faq-content">
              <p>您可以通过点击页面右上角的"注册"按钮，填写您的电子邮件地址、设置密码并完成验证，即可成功注册账户。我们也支持通过微信、手机号等方式快速注册。</p>
            </div>
          </el-collapse-item>
          
          <el-collapse-item title="如何修改我的个人信息？" name="2">
            <div class="faq-content">
              <p>登录后，点击页面右上角的头像，选择"个人中心"，在个人信息页面您可以修改头像、昵称、性别、身高、体重等个人信息。修改完成后点击"保存"按钮即可。</p>
            </div>
          </el-collapse-item>
          
          <el-collapse-item title="如何取消订阅推送通知？" name="3">
            <div class="faq-content">
              <p>您可以在"个人中心" -> "通知设置"中，管理您希望接收的通知类型。您也可以在应用设置中完全关闭通知推送。</p>
            </div>
          </el-collapse-item>
          
          <el-collapse-item title="我的健康数据安全吗？" name="4">
            <div class="faq-content">
              <p>是的，我们非常重视您的数据安全。我们采用行业领先的加密技术保护您的健康数据，并严格遵守相关隐私法规。未经您的明确许可，我们不会与第三方共享您的健康数据。</p>
            </div>
          </el-collapse-item>
          
          <el-collapse-item title="如何删除我的账户？" name="5">
            <div class="faq-content">
              <p>如果您希望删除账户，请在"个人中心" -> "账户设置"中找到"删除账户"选项。请注意，账户删除后，您的所有数据将无法恢复。</p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </section>
    
    <section class="map-section">
      <div class="container">
        <h2>我们的位置</h2>
        <div class="map-placeholder">
          <i class="el-icon-map"></i>
          <div class="map-text">地图加载中...</div>
          <p>北京市海淀区中关村科技园区123号健康大厦5层</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 确保页面加载时滚动到顶部
onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

const formRef = ref()
const isSubmitting = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  attachment: null
})

const rules = {
  name: [
    { required: true, message: '请输入您的姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入电子邮件', trigger: 'blur' },
    { type: 'email', message: '请输入正确的电子邮件地址', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  subject: [
    { required: true, message: '请选择消息主题', trigger: 'change' }
  ],
  message: [
    { required: true, message: '请输入消息内容', trigger: 'blur' },
    { min: 10, message: '消息内容至少10个字符', trigger: 'blur' }
  ]
}

const handleFileChange = (file) => {
  form.attachment = file.raw
}

const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    isSubmitting.value = true
    
    // 模拟提交
    setTimeout(() => {
      isSubmitting.value = false
      ElMessage.success('您的消息已成功提交，我们将尽快回复您！')
      resetForm()
    }, 2000)
  } catch (error) {
    console.log('表单验证失败', error)
  }
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  form.attachment = null
}

const openChat = () => {
  ElMessage.info('在线客服功能即将上线，敬请期待！')
}
</script>

<style scoped>
/* CSS变量定义 */
:root {
  --primary: #667eea;
  --primary-dark: #5a67d8;
  --secondary: #764ba2;
  --dark: #333;
  --dark-gray: #444;
  --gray: #666;
  --light-gray: #e0e0e0;
  --lighter-gray: #f8f9fa;
  --bg-hover: #f0f0f0;
  --white: #ffffff;
  --shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.1);
  --shadow-deep: 0 15px 30px rgba(0, 0, 0, 0.1);
  --radius: 10px;
  --radius-lg: 15px;
  --radius-sm: 6px;
  --transition: all 0.3s ease;
}

.contact-us {
  background-color: var(--lighter-gray);
  min-height: 100vh;
}

.contact-header {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--white);
  padding: 60px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 添加微妙的背景图案效果 */
.contact-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  z-index: 1;
}

.contact-header > div {
  position: relative;
  z-index: 2;
}

.contact-header h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.8s ease-out;
}

.contact-header p {
  font-size: 1.2rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out;
}

.contact-content {
  padding: 80px 0;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  transition: var(--transition);
}

.contact-info h2,
.contact-form h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--dark);
  position: relative;
  display: inline-block;
  font-weight: 700;
}

.contact-info h2::after,
.contact-form h2::after {
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

.contact-info h2:hover::after,
.contact-form h2:hover::after {
  width: 80px;
}

.contact-info > p,
.contact-form > p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--gray);
  margin-bottom: 30px;
}

.info-items {
  margin-bottom: 40px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  background: var(--white);
  padding: 20px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.info-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, var(--primary), var(--secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.info-item:hover::before {
  opacity: 1;
}

.info-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.5rem;
  margin-right: 20px;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s ease;
}

.info-item:hover .info-icon {
  transform: scale(1.05) rotate(5deg);
}

.info-text h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: var(--dark);
  font-weight: 600;
}

.info-text p {
  font-size: 0.95rem;
  color: var(--gray);
  margin-bottom: 5px;
  transition: color 0.2s ease;
}

.info-item:hover .info-text p {
  color: var(--dark-gray);
}

.chat-btn {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--white);
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 10px;
  transition: var(--transition);
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.chat-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--secondary) 100%);
}

.social-media {
  background: var(--white);
  padding: 25px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: box-shadow 0.3s ease;
}

.social-media:hover {
  box-shadow: var(--shadow-hover);
}

.social-media h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--dark);
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;
}

.social-media h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
}

.social-icons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.social-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: var(--lighter-gray);
  border-radius: 20px;
  color: var(--gray);
  text-decoration: none;
  transition: var(--transition);
  font-size: 0.9rem;
  border: 1px solid transparent;
}

.social-icon:hover {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--white);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  border-color: var(--primary);
}

.contact-form {
  background: var(--white);
  padding: 40px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.contact-form::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(30%, -30%);
}

.contact-form:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.el-form {
  margin-top: 20px;
  position: relative;
  z-index: 1;
}

.el-form-item {
  margin-bottom: 25px;
  transition: var(--transition);
}

/* 表单元素聚焦效果增强 */
.el-input__wrapper:focus-within,
.el-select__wrapper:focus-within {
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2) !important;
  border-color: var(--primary) !important;
}

.upload-demo {
  margin-bottom: 10px;
  border: 2px dashed var(--light-gray);
  border-radius: var(--radius-sm);
  transition: border-color 0.3s ease;
}

.upload-demo:hover {
  border-color: var(--primary);
}

.faq-section {
  padding: 80px 0;
  background: var(--white);
  position: relative;
  overflow: hidden;
}

.faq-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 60%;
  background: var(--lighter-gray);
  transform: translateY(-50%) skewY(-3deg);
  z-index: 0;
}

.faq-section > div {
  position: relative;
  z-index: 1;
}

.faq-section h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 20px;
  color: var(--dark);
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
}

.faq-section h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 1.5px;
  transition: width 0.3s ease;
}

.faq-section h2:hover::after {
  width: 100px;
}

.faq-section > p {
  text-align: center;
  font-size: 1.1rem;
  color: var(--gray);
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.faq-collapse {
  max-width: 800px;
  margin: 0 auto;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.faq-collapse .el-collapse-item__header {
  font-size: 1.1rem;
  color: var(--dark);
  border-bottom: 1px solid var(--light-gray);
  transition: background-color 0.3s ease, padding-left 0.3s ease;
  padding-left: 25px;
}

.faq-collapse .el-collapse-item__header:hover {
  background-color: var(--lighter-gray);
  padding-left: 30px;
}

.faq-collapse .el-collapse-item__header.is-active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.faq-collapse .el-collapse-item__content {
  padding: 20px;
  background-color: rgba(102, 126, 234, 0.03);
}

.faq-content p {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--gray);
  margin: 0;
}

.map-section {
  padding: 80px 0;
  background: var(--lighter-gray);
}

.map-section h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 40px;
  color: var(--dark);
  font-weight: 700;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 15px;
}

.map-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 3px;
}

.map-placeholder {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--white);
  box-shadow: var(--shadow-deep);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.map-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  z-index: 1;
}

.map-placeholder > * {
  position: relative;
  z-index: 2;
}

.map-placeholder:hover {
  transform: translateY(-5px);
}

.map-placeholder i {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: pulse 3s ease-in-out infinite;
}

.map-text {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.map-placeholder p {
  font-size: 1rem;
  text-align: center;
  opacity: 0.9;
  max-width: 80%;
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
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .contact-wrapper {
    gap: 40px;
  }
}

@media (max-width: 992px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .info-item {
    flex-direction: column;
    text-align: center;
  }
  
  .info-icon {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .faq-section::before {
    height: 50%;
  }
}

@media (max-width: 768px) {
  .contact-header {
    padding: 40px 0;
  }
  
  .contact-header h1 {
    font-size: 2rem;
  }
  
  .contact-content,
  .faq-section,
  .map-section {
    padding: 60px 0;
  }
  
  .contact-info h2,
  .contact-form h2,
  .faq-section h2,
  .map-section h2 {
    font-size: 1.8rem;
  }
  
  .contact-form {
    padding: 30px;
  }
  
  .social-icons {
    flex-direction: column;
  }
  
  .map-placeholder {
    height: 300px;
  }
  
  .map-placeholder i {
    font-size: 3rem;
  }
}

@media (max-width: 576px) {
  .contact-header h1 {
    font-size: 1.8rem;
  }
  
  .contact-header p {
    font-size: 1rem;
  }
  
  .contact-content,
  .faq-section,
  .map-section {
    padding: 40px 0;
  }
  
  .contact-info h2,
  .contact-form h2,
  .faq-section h2,
  .map-section h2 {
    font-size: 1.6rem;
  }
  
  .contact-form {
    padding: 20px;
    border-radius: 8px;
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .map-placeholder {
    height: 250px;
    border-radius: 10px;
  }
  
  .map-placeholder p {
    max-width: 95%;
    font-size: 0.9rem;
  }
}

/* 打印样式 */
@media print {
  .contact-form,
  .social-media,
  .info-item,
  .faq-collapse {
    box-shadow: none !important;
  }
  
  .contact-header,
  .map-placeholder {
    background: var(--dark) !important;
    color: var(--white) !important;
  }
  
  .contact-form::before,
  .contact-header::before,
  .map-placeholder::before {
    display: none;
  }
  
  .chat-btn {
    background: var(--primary-dark) !important;
    color: var(--white) !important;
  }
  
  /* 添加页码 */
  @page {
    margin: 1.5cm;
  }
  
  body {
    font-size: 12pt;
  }
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}
</style>