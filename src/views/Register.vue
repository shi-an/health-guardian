<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <div class="register-header">
          <span>用户注册</span>
        </div>
      </template>
      <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef" label-width="80px">
        <!-- 注册要求提示 -->
        <div class="register-tips">
          <el-alert title="注册须知" type="info" :closable="false" show-icon>
            <div class="tips-content">
              <p>• 邮箱必须为有效的电子邮件地址</p>
              <p>• 用户名长度在2-20个字符之间</p>
              <p>• 密码长度至少6位，建议包含字母和数字</p>
            </div>
          </el-alert>
        </div>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入有效的邮箱地址" prefix-icon="MessageFilled" show-word-limit :maxlength="50" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入2-20个字符的用户名" prefix-icon="UserFilled" show-word-limit :maxlength="20" />
          <div class="form-tip">用户名长度在2-20个字符之间</div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入至少6位密码" prefix-icon="Lock" show-password />
          <div class="form-tip">密码长度至少6位，建议包含字母和数字</div>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleRegister" style="width: 100%">注册</el-button>
        </el-form-item>
        <div class="login-link">
          <span>已有账号？</span>
          <el-link type="primary" :underline="false" @click="goToLogin">立即登录</el-link>
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
const registerFormRef = ref<FormInstance>()
const loading = ref(false)

const registerForm = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const registerRules = reactive<FormRules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  await registerFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 完全使用模拟注册功能，避免任何实际API调用
        console.log('使用模拟注册功能...')
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 简单的客户端验证逻辑
        if (registerForm.username.length < 2 || registerForm.username.length > 20) {
          throw new Error('用户名长度必须在2-20个字符之间')
        }
        if (registerForm.password.length < 6) {
          throw new Error('密码长度必须至少为6位')
        }
        
        // 创建模拟用户数据
        const mockUser = {
          id: Date.now(), // 生成唯一ID
          username: registerForm.username,
          email: registerForm.email,
          createdAt: new Date().toISOString(),
          // 添加一些默认用户属性
          healthData: {
            height: null,
            weight: null,
            age: null,
            gender: null
          }
        }
        
        // 创建模拟token
        const mockToken = 'mock_token_' + Date.now()
        
        // 存储到localStorage
        localStorage.setItem('mockUser', JSON.stringify(mockUser))
        localStorage.setItem('token', mockToken)
        
        // 更新用户状态
        userStore.user = mockUser
        
        ElMessage.success('注册成功，正在为您自动登录...')
        // 直接跳转到首页，无需再次登录
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } catch (error: any) {
        // 提供更详细的错误信息和日志
        console.error('注册失败:', error)
        console.error('错误详情:', {
          message: error.message,
          response: error.response,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config
        })
        
        // 根据错误类型提供更具体的提示
        let errorMessage = '注册失败，请稍后重试'
        if (error.response?.status === 400) {
          errorMessage = error.response.data?.message || '输入信息有误，请检查'
        } else if (error.response?.status === 409) {
          errorMessage = '该邮箱或用户名已被注册'
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

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.register-card {
  width: 400px;
  max-width: 100%;
}

.register-header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.login-link {
    text-align: center;
    margin-top: 10px;
  }
  
  .register-tips {
    margin-bottom: 20px;
  }
  
  .tips-content {
    font-size: 12px;
    line-height: 1.6;
  }
  
  .form-tip {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
  }
</style>