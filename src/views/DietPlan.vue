<template>
  <div class="diet-plan">
    <div class="container">
      <h1 class="page-title">个性化饮食规划</h1>
      
      <el-card class="diet-form">
        <template #header>
          <h2>请输入您的健康信息</h2>
        </template>
        
        <el-form :model="healthData" :rules="rules" ref="formRef" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="年龄" prop="age">
                <el-input-number v-model="healthData.age" :min="1" :max="120" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="gender">
                <el-select v-model="healthData.gender" placeholder="请选择性别">
                  <el-option label="男性" value="male" />
                  <el-option label="女性" value="female" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="身高 (cm)" prop="height">
                <el-input-number v-model="healthData.height" :min="50" :max="250" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="体重 (kg)" prop="weight">
                <el-input-number v-model="healthData.weight" :min="20" :max="200" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="健康目标" prop="goal">
                <el-select v-model="healthData.goal" placeholder="请选择目标">
                  <el-option label="减重" value="weight-loss" />
                  <el-option label="维持体重" value="maintain" />
                  <el-option label="增肌" value="muscle-gain" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动水平" prop="activityLevel">
                <el-select v-model="healthData.activityLevel" placeholder="请选择活动水平">
                  <el-option label="久坐" value="sedentary" />
                  <el-option label="轻度活动" value="light" />
                  <el-option label="中度活动" value="moderate" />
                  <el-option label="活跃" value="active" />
                  <el-option label="非常活跃" value="very-active" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="过敏食物">
            <el-input
              v-model="healthData.allergies"
              placeholder="例如：海鲜、花生等（多个用逗号分隔）"
            />
          </el-form-item>

          <el-form-item>
            <el-button 
              type="primary" 
              @click="generateDietPlan"
              :loading="aiStore.isLoading"
            >
              生成饮食计划
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="diet-result" v-if="dietPlan">
        <template #header>
          <h2>您的个性化饮食计划</h2>
        </template>
        
        <div class="meal-plan">
          <div class="meal-card" v-for="(meal, key) in dietPlan.meals" :key="key">
            <div class="meal-header">{{ getMealName(key) }}</div>
            <div class="meal-content">
              <ul>
                <li v-for="(item, index) in meal" :key="index">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="nutrition-analysis">
          <h3>营养分析</h3>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="总热量">
              {{ dietPlan.nutrition.calories }} kcal
            </el-descriptions-item>
            <el-descriptions-item label="蛋白质">
              {{ dietPlan.nutrition.protein }}g
            </el-descriptions-item>
            <el-descriptions-item label="碳水化合物">
              {{ dietPlan.nutrition.carbs }}g
            </el-descriptions-item>
            <el-descriptions-item label="脂肪">
              {{ dietPlan.nutrition.fat }}g
            </el-descriptions-item>
          </el-descriptions>
          <p class="description">{{ dietPlan.description }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { HealthData, DietPlan } from '@/types'
import { useAIStore } from '@/stores/ai'
import { useUserStore } from '@/stores/user'

const formRef = ref<FormInstance>()
const aiStore = useAIStore()
const userStore = useUserStore()

const healthData = reactive<Partial<HealthData>>({
  age: undefined,
  gender: undefined,
  height: undefined,
  weight: undefined,
  goal: undefined,
  activityLevel: undefined,
  allergies: ''
})

const dietPlan = ref<DietPlan | null>(null)

const rules: FormRules = {
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  height: [{ required: true, message: '请输入身高', trigger: 'blur' }],
  weight: [{ required: true, message: '请输入体重', trigger: 'blur' }],
  goal: [{ required: true, message: '请选择健康目标', trigger: 'change' }],
  activityLevel: [{ required: true, message: '请选择活动水平', trigger: 'change' }]
}

onMounted(() => {
  if (userStore.user?.healthData) {
    Object.assign(healthData, userStore.user.healthData)
  }
})

const generateDietPlan = async () => {
  if (!formRef.value) return
  
  const valid = await formRef.value.validate()
  if (!valid) return

  try {
    const plan = await aiStore.generateDietPlan(healthData)
    dietPlan.value = plan
    
    // 保存健康数据
    if (userStore.isAuthenticated) {
      await userStore.updateHealthData(healthData)
    }
  } catch (error) {
    ElMessage.error('生成饮食计划失败，请稍后重试')
  }
}

const getMealName = (key: string) => {
  const names: { [key: string]: string } = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snacks: '加餐'
  }
  return names[key] || key
}
</script>

<style scoped>
.diet-plan {
  padding: 40px 0;
}

.page-title {
  text-align: center;
  margin-bottom: 40px;
  color: #303133;
}

.diet-form {
  margin-bottom: 40px;
}

.diet-result {
  margin-top: 40px;
}

.meal-plan {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.meal-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
}

.meal-header {
  background: #409eff;
  color: white;
  padding: 15px;
  text-align: center;
  font-weight: 600;
}

.meal-content {
  padding: 15px;
}

.meal-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.meal-content li {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.meal-content li:last-child {
  border-bottom: none;
}

.nutrition-analysis {
  margin-top: 30px;
}

.nutrition-analysis h3 {
  margin-bottom: 15px;
  color: #303133;
}

.description {
  margin-top: 15px;
  color: #606266;
  line-height: 1.6;
}
</style>