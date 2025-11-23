<template>
  <div class="mental-container">
    <el-card class="mental-card">
      <template #header>
        <div class="mental-header">
          <span>AI心理健康支持</span>
        </div>
      </template>
      
      <div class="mental-intro">
        <p>欢迎使用AI心理健康支持服务。请描述您当前的情绪状态或心理困扰，我们的AI助手将为您提供专业的建议和支持。</p>
      </div>
      
      <div class="chat-container">
        <div class="chat-messages" ref="chatMessagesRef">
          <div class="system-message">
            <div class="message-avatar">AI</div>
            <div class="message-content">
              <p>你好！我是AI心理健康助手。请告诉我你现在的感受，我会尽力帮助你。</p>
            </div>
          </div>
          
          <div v-for="(message, index) in chatMessages" :key="index" :class="message.role === 'user' ? 'user-message' : 'ai-message'">
            <div class="message-avatar">{{ message.role === 'user' ? '我' : 'AI' }}</div>
            <div class="message-content">
              <p>{{ message.content }}</p>
            </div>
          </div>
          
          <div v-if="loading" class="ai-message typing">
            <div class="message-avatar">AI</div>
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chat-input-container">
          <el-input
            v-model="inputMessage"
            type="textarea"
            :rows="2"
            placeholder="请输入您的想法或问题..."
            @keyup.enter.ctrl="sendMessage"
          />
          <el-button type="primary" :loading="loading" @click="sendMessage" class="send-button">发送</el-button>
        </div>
      </div>
      
      <div class="mental-resources">
        <h3>专业心理资源</h3>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="24">
            <el-alert
              title="重要提示"
              type="warning"
              description="AI助手提供的建议不能替代专业心理咨询师的诊断和治疗。如果您正在经历严重的心理困扰，请及时寻求专业心理健康服务。"
              show-icon
            />
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>心理咨询热线</span>
                </div>
              </template>
              <p>国家心理危机干预热线：400-161-9995</p>
              <p>北京心理援助热线：010-82951332</p>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>建议阅读</span>
                </div>
              </template>
              <ul>
                <li>《情绪急救》</li>
                <li>《被讨厌的勇气》</li>
                <li>《非暴力沟通》</li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { useAiStore } from '@/stores/ai'

interface ChatMessage {
  role: 'user' | 'ai'
  content: string
}

const aiStore = useAiStore()
const chatMessagesRef = ref<HTMLElement>()
const loading = ref(false)
const inputMessage = ref('')
const chatMessages = reactive<ChatMessage[]>([])

const sendMessage = async () => {
  const message = inputMessage.value.trim()
  if (!message || loading.value) return
  
  // 添加用户消息
  chatMessages.push({ role: 'user', content: message })
  inputMessage.value = ''
  
  // 滚动到底部
  await nextTick()
  scrollToBottom()
  
  loading.value = true
  try {
    // 调用AI服务获取回复
    const aiResponse = await aiStore.getMentalHealthSupport(message)
    
    // 添加AI回复
    chatMessages.push({ role: 'ai', content: aiResponse })
  } catch (error) {
    ElMessage.error('获取回复失败，请稍后重试')
    console.error('Get mental health support error:', error)
  } finally {
    loading.value = false
    
    // 再次滚动到底部
    await nextTick()
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  if (chatMessagesRef.value) {
    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
  }
}
</script>

<style scoped>
.mental-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.mental-card {
  margin-bottom: 20px;
}

.mental-header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.mental-intro {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f0f9ff;
  border-radius: 8px;
  border-left: 4px solid #409eff;
}

.chat-container {
  margin-bottom: 30px;
}

.chat-messages {
  height: 400px;
  overflow-y: auto;
  padding: 15px;
  background-color: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  margin-bottom: 15px;
}

.system-message,
.user-message,
.ai-message {
  display: flex;
  margin-bottom: 15px;
  animation: fadeIn 0.3s ease-in-out;
}

.user-message {
  justify-content: flex-end;
}

.user-message .message-content {
  background-color: #409eff;
  color: white;
  text-align: left;
  margin-left: auto;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #909399;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 0 10px;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background-color: #409eff;
}

.ai-message .message-avatar {
  background-color: #67c23a;
}

.system-message .message-avatar {
  background-color: #e6a23c;
}

.message-content {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chat-input-container {
  display: flex;
  gap: 10px;
}

.send-button {
  align-self: flex-end;
  padding: 0 20px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 5px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: #909399;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

.mental-resources h3 {
  margin-bottom: 15px;
  color: #333;
}

.card-header {
  font-weight: bold;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>