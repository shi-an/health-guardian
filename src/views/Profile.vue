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
          <el-avatar :size="100" :src="user.avatar || defaultAvatar">
            {{ user.username?.charAt(0) || 'U' }}
          </el-avatar>
          <el-button type="primary" size="small" class="avatar-upload-btn">上传头像</el-button>
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
const saving = ref(false)
const changingPassword = ref(false)
const changePasswordVisible = ref(false)
const defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

const userInfo = reactive({
  username: '',
  email: '',
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
    userInfo.gender = user.gender || ''
    userInfo.age = user.age || null
    userInfo.height = user.height || null
    userInfo.weight = user.weight || null
    userInfo.healthGoal = user.healthGoal || ''
    userInfo.phone = user.phone || ''
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
}

.profile-header,
.security-header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
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

.profile-form {
  width: 100%;
}

.avatar-upload-btn {
  margin-top: 10px;
}
</style>