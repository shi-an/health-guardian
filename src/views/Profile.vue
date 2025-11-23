<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <template #header>
        <div class="profile-header">
          <span>个人资料</span>
        </div>
      </template>
      
      <div class="profile-content">
        <div class="profile-avatar">
          <div class="avatar-wrapper">
            <el-avatar :size="100" :src="userInfo.avatar || defaultAvatar" fit="cover">
              {{ user.username?.charAt(0) || 'U' }}
            </el-avatar>
            <div class="avatar-mask">
              <i class="el-icon-camera"></i>
            </div>
            <input
              ref="avatarInput"
              type="file"
              accept="image/*"
              class="avatar-input"
              @change="handleAvatarUpload"
            />
          </div>
          <el-button 
            type="primary" 
            size="small" 
            class="avatar-upload-btn"
            @click="triggerAvatarUpload"
            :loading="uploadingAvatar"
          >
            {{ uploadingAvatar ? '上传中...' : '更换头像' }}
          </el-button>
        </div>
        
        <div class="profile-form">
          <el-form :model="userInfo" :rules="profileRules" ref="profileFormRef" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userInfo.username" placeholder="请输入用户名" />
            </el-form-item>
            
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userInfo.email" placeholder="请输入邮箱" disabled />
            </el-form-item>
            
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="userInfo.gender">
                <el-radio label="male">男</el-radio>
                <el-radio label="female">女</el-radio>
                <el-radio label="other">其他</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="年龄" prop="age">
              <el-input-number v-model="userInfo.age" :min="1" :max="150" placeholder="请输入年龄" />
            </el-form-item>
            
            <el-form-item label="身高(cm)" prop="height">
              <el-input-number v-model="userInfo.height" :min="50" :max="250" placeholder="请输入身高" />
            </el-form-item>
            
            <el-form-item label="体重(kg)" prop="weight">
              <el-input-number v-model="userInfo.weight" :min="10" :max="300" placeholder="请输入体重" />
            </el-form-item>
            
            <el-form-item label="健康目标" prop="healthGoal">
              <el-input v-model="userInfo.healthGoal" type="textarea" :rows="2" placeholder="请输入您的健康目标" />
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" :loading="saving" @click="saveProfile">保存资料</el-button>
              <el-button @click="resetProfile">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    
    <el-card class="security-card">
      <template #header>
        <div class="security-header">
          <span>账户安全</span>
        </div>
      </template>
      
      <el-descriptions :column="1" border>
        <el-descriptions-item label="修改密码">
          <el-button type="primary" @click="openChangePasswordDialog">修改密码</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="绑定手机">
          <span v-if="userInfo.phone">已绑定: {{ userInfo.phone }}</span>
          <el-button v-else type="primary">绑定手机</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
  
  <!-- 修改密码对话框 -->
  <el-dialog v-model="changePasswordVisible" title="修改密码" width="400px">
    <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="100px">
      <el-form-item label="当前密码" prop="currentPassword">
        <el-input v-model="passwordForm.currentPassword" type="password" placeholder="请输入当前密码" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" show-password />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="请确认新密码" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="changePasswordVisible = false">取消</el-button>
      <el-button type="primary" :loading="changingPassword" @click="changePassword">确认修改</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const profileFormRef = ref<FormInstance>()
const passwordFormRef = ref<FormInstance>()
const avatarInput = ref<HTMLInputElement>()
const saving = ref(false)
const changingPassword = ref(false)
const uploadingAvatar = ref(false)
const changePasswordVisible = ref(false)
const defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

const userInfo = reactive({
  username: '',
  email: '',
  avatar: '',
  gender: '',
  age: null as number | null,
  height: null as number | null,
  weight: null as number | null,
  healthGoal: '',
  phone: ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const profileRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  age: [
    { required: false, type: 'number', message: '请输入有效的年龄', trigger: 'blur' }
  ],
  height: [
    { required: false, type: 'number', message: '请输入有效的身高', trigger: 'blur' }
  ],
  weight: [
    { required: false, type: 'number', message: '请输入有效的体重', trigger: 'blur' }
  ]
})

const passwordRules = reactive<FormRules>({
  currentPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const saveProfile = async () => {
  if (!profileFormRef.value) return
  
  await profileFormRef.value.validate(async (valid) => {
    if (valid) {
      saving.value = true
      try {
        await userStore.updateProfile(userInfo)
        ElMessage.success('资料保存成功')
      } catch (error) {
        ElMessage.error('保存失败，请稍后重试')
        console.error('Save profile error:', error)
      } finally {
        saving.value = false
      }
    }
  })
}

const resetProfile = () => {
  if (profileFormRef.value) {
    profileFormRef.value.resetFields()
    loadUserInfo()
  }
}

const openChangePasswordDialog = () => {
  if (passwordFormRef.value) {
    passwordFormRef.value.resetFields()
  }
  changePasswordVisible.value = true
}

const changePassword = async () => {
  if (!passwordFormRef.value) return
  
  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      changingPassword.value = true
      try {
        await userStore.changePassword(passwordForm.currentPassword, passwordForm.newPassword)
        ElMessage.success('密码修改成功')
        changePasswordVisible.value = false
      } catch (error) {
        ElMessage.error('密码修改失败，请检查当前密码是否正确')
        console.error('Change password error:', error)
      } finally {
        changingPassword.value = false
      }
    }
  })
}

const loadUserInfo = () => {
  const user = userStore.user
  if (user) {
    userInfo.username = user.username || ''
    userInfo.email = user.email || ''
    userInfo.avatar = user.avatar || ''
    userInfo.gender = user.gender || ''
    userInfo.age = user.age || null
    userInfo.height = user.height || null
    userInfo.weight = user.weight || null
    userInfo.healthGoal = user.healthGoal || ''
    userInfo.phone = user.phone || ''
  }
}

const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return
  
  // 检查文件类型
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请选择图片文件')
    return
  }
  
  // 检查文件大小（5MB限制）
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过5MB')
    return
  }
  
  uploadingAvatar.value = true
  
  try {
    // 在实际项目中，这里应该上传文件到服务器
    // 这里使用模拟的方式，直接读取为DataURL
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const avatarUrl = e.target?.result as string
        userInfo.avatar = avatarUrl
        
        // 模拟更新用户信息
        await userStore.updateProfile({
          ...userInfo,
          avatar: avatarUrl
        })
        
        ElMessage.success('头像上传成功')
      } catch (error) {
        ElMessage.error('头像上传失败，请稍后重试')
        console.error('Upload avatar error:', error)
      } finally {
        uploadingAvatar.value = false
        // 清空input，允许重复选择同一文件
        if (input) {
          input.value = ''
        }
      }
    }
    reader.readAsDataURL(file)
  } catch (error) {
    ElMessage.error('头像上传失败，请稍后重试')
    console.error('Upload avatar error:', error)
    uploadingAvatar.value = false
  }
}

onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-card,
.security-card {
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.profile-card:hover,
.security-card:hover {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
}

.profile-header,
.security-header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-avatar {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.avatar-wrapper {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar-wrapper:hover {
  transform: scale(1.05);
}

.avatar-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 24px;
}

.avatar-wrapper:hover .avatar-mask {
  opacity: 1;
}

.avatar-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.profile-form {
  width: 100%;
}

.avatar-upload-btn {
  margin-top: 10px;
  transition: all 0.3s ease;
}

.avatar-upload-btn:hover {
  transform: translateY(-2px);
}

/* 表单元素增强样式 */
.el-form-item {
  margin-bottom: 24px;
}

.el-form-item__label {
  font-weight: 500;
  color: #606266;
}

.el-button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
}

.el-button--primary:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .profile-container {
    padding: 15px;
  }
  
  .profile-header,
  .security-header {
    font-size: 18px;
  }
  
  .el-form-item__label {
    font-size: 14px;
  }
}
</style>