<template>
  <div class="workout-container">
    <el-card class="workout-card">
      <template #header>
        <div class="workout-header">
          <span>AI健身建议</span>
        </div>
      </template>
      
      <el-form :model="workoutForm" :rules="workoutRules" ref="workoutFormRef" label-width="120px">
        <el-form-item label="锻炼目标" prop="goal">
          <el-select v-model="workoutForm.goal" placeholder="请选择您的锻炼目标">
            <el-option label="增肌" value="muscle_gain" />
            <el-option label="减脂" value="fat_loss" />
            <el-option label="增强耐力" value="endurance" />
            <el-option label="改善灵活性" value="flexibility" />
            <el-option label="整体健康" value="overall_health" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="每周锻炼次数" prop="frequency">
          <el-input-number v-model="workoutForm.frequency" :min="1" :max="7" placeholder="请输入每周锻炼次数" />
        </el-form-item>
        
        <el-form-item label="每次锻炼时长(分钟)" prop="duration">
          <el-input-number v-model="workoutForm.duration" :min="15" :max="180" placeholder="请输入每次锻炼时长" />
        </el-form-item>
        
        <el-form-item label="健身经验" prop="experience">
          <el-radio-group v-model="workoutForm.experience">
            <el-radio label="初学者" />
            <el-radio label="中级" />
            <el-radio label="高级" />
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="身体状况" prop="healthCondition">
          <el-input v-model="workoutForm.healthCondition" type="textarea" :rows="3" placeholder="请简要描述您的身体状况，如有伤病史请说明" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="generateWorkoutPlan" style="width: 100%">生成健身计划</el-button>
        </el-form-item>
      </el-form>
      
      <div v-if="workoutPlan" class="workout-plan-result">
        <h3>AI生成的健身计划</h3>
        <el-divider />
        <div v-html="formatWorkoutPlan(workoutPlan)"></div>
        <el-button type="success" icon="Download" @click="downloadWorkoutPlan" class="download-button">下载计划</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useAiStore } from '@/stores/ai'

const aiStore = useAiStore()
const workoutFormRef = ref<FormInstance>()
const loading = ref(false)
const workoutPlan = ref<string>('')

const workoutForm = reactive({
  goal: '',
  frequency: 3,
  duration: 60,
  experience: '初学者',
  healthCondition: ''
})

const workoutRules = reactive<FormRules>({
  goal: [
    { required: true, message: '请选择锻炼目标', trigger: 'change' }
  ],
  frequency: [
    { required: true, message: '请输入每周锻炼次数', trigger: 'blur' }
  ],
  duration: [
    { required: true, message: '请输入每次锻炼时长', trigger: 'blur' }
  ],
  experience: [
    { required: true, message: '请选择健身经验', trigger: 'change' }
  ]
})

const generateWorkoutPlan = async () => {
  if (!workoutFormRef.value) return
  
  await workoutFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 调用AI服务生成健身计划
        const plan = await aiStore.generateWorkoutPlan(workoutForm)
        workoutPlan.value = plan
        ElMessage.success('健身计划生成成功')
      } catch (error) {
        ElMessage.error('生成失败，请稍后重试')
        console.error('Generate workout plan error:', error)
      } finally {
        loading.value = false
      }
    }
  })
}

const formatWorkoutPlan = (plan: string) => {
  // 将纯文本转换为HTML格式显示
  return plan
    .replace(/\n/g, '<br>')
    .replace(/### (.*?)(?=<br>|$)/g, '<h4>$1</h4>')
    .replace(/## (.*?)(?=<br>|$)/g, '<h3>$1</h3>')
}

const downloadWorkoutPlan = () => {
  // 创建一个Blob对象
  const blob = new Blob([workoutPlan.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  
  // 设置下载属性
  link.href = url
  link.download = `健身计划_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.txt`
  
  // 触发下载
  document.body.appendChild(link)
  link.click()
  
  // 清理
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  ElMessage.success('计划已下载')
}
</script>

<style scoped>
.workout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.workout-card {
  margin-bottom: 20px;
}

.workout-header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.workout-plan-result {
  margin-top: 20px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
}

.workout-plan-result h3 {
  margin-bottom: 10px;
  color: #333;
}

.workout-plan-result h4 {
  margin-top: 15px;
  margin-bottom: 8px;
  color: #409eff;
}

.download-button {
  margin-top: 20px;
}
</style>