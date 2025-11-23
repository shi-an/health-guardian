<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="login-header">
          <span>用户登录</span>
        </div>
      </template>
      <!-- 测试账户信息 -->
      <div class="test-account-section">
        <el-alert title="测试账户" type="info" :closable="false" show-icon>
          <div class="test-account-info">
            <p><strong>邮箱：</strong>test@example.com</p>
            <p><strong>密码：</strong>123456</p>
            <el-button type="primary" size="small" @click="useTestAccount" style="margin-top: 8px;">
              使用测试账户登录
            </el-button>
          </div>
        </el-alert>
      </div>
      
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="80px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email" placeholder="请输入邮箱" prefix-icon="MessageFilled" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
          <el-link type="primary" :underline="false" class="reset-password">忘记密码？</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleLogin" style="width: 100%">登录</el-button>
        </el-form-item>
        <div class="register-link">
          <span>还没有账号？</span>
          <el-link type="primary" :underline="false" @click="goToRegister">立即注册</el-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)

// 初始化表单时检查是否有记住的邮箱
const rememberedEmail = localStorage.getItem('rememberedEmail') || ''

const loginForm = reactive({
  email: rememberedEmail,
  password: '',
  rememberMe: !!rememberedEmail
})

const loginRules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ]
})

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 在开发环境中完全使用模拟登录功能，避免任何实际API调用
        if (import.meta.env.DEV) {
          console.log('使用模拟登录功能...')
          // 模拟API延迟
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // 简单的模拟登录逻辑 - 任何非空的邮箱和密码都可以登录
          if (loginForm.email && loginForm.password) {
            // 实现记住我功能
            if (loginForm.rememberMe) {
              localStorage.setItem('rememberedEmail', loginForm.email)
            } else {
              localStorage.removeItem('rememberedEmail')
            }
            
            // 创建模拟用户数据
            const mockToken = 'mock-jwt-token-' + Date.now()
            let mockUser = {
              id: loginForm.email === 'test@example.com' ? 1001 : Date.now(),
              username: loginForm.email === 'test@example.com' ? '测试用户' : loginForm.email.split('@')[0],
              email: loginForm.email,
              createdAt: new Date().toISOString()
            }
            
            // 为测试账户提供更完整的用户数据
            if (loginForm.email === 'test@example.com') {
              mockUser = {
                ...mockUser,
                healthData: {
                  height: 175,
                  weight: 70,
                  age: 25,
                  gender: 'male',
                  activityLevel: 'moderate',
                  healthGoals: ['weightLoss', 'muscleBuilding']
                },
                preferences: {
                  preferredWorkoutTypes: ['cardio', 'strength'],
                  dietaryRestrictions: [],
                  notificationSettings: true
                }
              }
            }
            
            // 存储模拟的用户信息和token
            localStorage.setItem('token', mockToken)
            localStorage.setItem('mockUser', JSON.stringify(mockUser))
            
            // 手动更新userStore状态，避免调用userStore.loadUser()可能导致的API请求
            userStore.$patch({ user: mockUser })
            
            ElMessage.success('登录成功')
            // 延迟跳转，让用户看到成功提示
            setTimeout(() => {
              router.push('/')
            }, 1500)
          } else {
            throw new Error('邮箱和密码不能为空')
          }
        } else {
          // 生产环境使用真实API
          await userStore.login(loginForm.email, loginForm.password)
          
          // 实现记住我功能
          if (loginForm.rememberMe) {
            localStorage.setItem('rememberedEmail', loginForm.email)
          } else {
            localStorage.removeItem('rememberedEmail')
          }
          
          ElMessage.success('登录成功')
          router.push('/')
        }
      } catch (error: any) {
        console.error('登录失败:', error)
        // 提供更详细的错误信息
        let errorMessage = '登录失败，请检查邮箱和密码'
        if (error.response?.status === 401) {
          errorMessage = '邮箱或密码错误'
        } else if (error.response?.status === 500) {
          errorMessage = '服务器错误，请稍后重试'
        } else if (error.message) {
          errorMessage = error.message
        }
        ElMessage.error(errorMessage)
      } finally {
        loading.value = false
      }
    }
  })
}

const goToRegister = () => {
  router.push('/register')
}

// 测试账户一键登录功能
const useTestAccount = async () => {
  // 填充测试账户信息
  loginForm.email = 'test@example.com'
  loginForm.password = '123456'
  loginForm.rememberMe = true
  
  // 自动执行登录
  await handleLogin()
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.login-card {
  width: 400px;
  max-width: 100%;
}

.login-header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.reset-password {
  float: right;
}

.register-link {
  text-align: center;
  margin-top: 10px;
}

.test-account-section {
  margin-bottom: 20px;
}

.test-account-info {
  font-size: 14px;
  line-height: 1.6;
}
</style>