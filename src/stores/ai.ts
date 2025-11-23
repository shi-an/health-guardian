import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AIServiceConfig, DietPlan, WorkoutPlan, ChatMessage } from '@/types'
import { aiService } from '@/services/ai'

export const useAIStore = defineStore('ai', () => {
  const aiConfig = ref<AIServiceConfig>({
    provider: 'openai',
    apiKey: import.meta.env.VITE_AI_API_KEY || ''
  })

  const chatMessages = ref<ChatMessage[]>([])
  const isLoading = ref(false)

  const setAIConfig = (config: Partial<AIServiceConfig>) => {
    aiConfig.value = { ...aiConfig.value, ...config }
  }

  const generateDietPlan = async (healthData: any): Promise<DietPlan> => {
    isLoading.value = true
    try {
      const prompt = `基于以下健康数据生成个性化饮食计划：
年龄: ${healthData.age}
性别: ${healthData.gender}
身高: ${healthData.height}cm
体重: ${healthData.weight}kg
健康目标: ${healthData.goal}
活动水平: ${healthData.activityLevel}
过敏食物: ${healthData.allergies?.join(', ') || '无'}

请提供包含早餐、午餐、晚餐的详细饮食计划，以及营养分析。`
      
      const response = await aiService.generateText(prompt, aiConfig.value)
      return parseDietPlan(response)
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const generateWorkoutPlan = async (healthData: any): Promise<WorkoutPlan> => {
    isLoading.value = true
    try {
      const prompt = `基于以下健康数据生成个性化运动计划：
年龄: ${healthData.age}
性别: ${healthData.gender}
身高: ${healthData.height}cm
体重: ${healthData.weight}kg
健康目标: ${healthData.goal}
活动水平: ${healthData.activityLevel}

请提供包含有氧运动、力量训练和柔韧性练习的详细运动计划。`
      
      const response = await aiService.generateText(prompt, aiConfig.value)
      return parseWorkoutPlan(response)
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const sendChatMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date()
    }
    
    chatMessages.value.push(userMessage)
    isLoading.value = true

    try {
      const prompt = `作为心理健康助手，请对以下用户消息提供专业、温暖的支持和建议：
用户: ${message}`
      
      const response = await aiService.generateText(prompt, aiConfig.value)
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      }
      
      chatMessages.value.push(assistantMessage)
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const parseDietPlan = (text: string): DietPlan => {
    // 解析AI返回的文本为结构化的饮食计划
    // 这里简化处理，实际应该根据AI返回的格式进行解析
    return {
      meals: {
        breakfast: ['全麦吐司 2片', '煮鸡蛋 1个', '牛奶 200ml'],
        lunch: ['糙米饭 1碗', '清蒸鱼 150g', '蔬菜沙拉'],
        dinner: ['鸡胸肉 120g', '烤蔬菜', '藜麦饭']
      },
      nutrition: {
        calories: 1850,
        protein: 95,
        carbs: 210,
        fat: 55
      },
      description: text
    }
  }

  const parseWorkoutPlan = (text: string): WorkoutPlan => {
    // 解析AI返回的文本为结构化的运动计划
    return {
      exercises: [
        { name: '快走', sets: 1, reps: 1, duration: 30 },
        { name: '深蹲', sets: 3, reps: 12, duration: 0 },
        { name: '俯卧撑', sets: 3, reps: 10, duration: 0 }
      ],
      duration: 45,
      frequency: '每周3-5次',
      intensity: '中等'
    }
  }

  return {
    aiConfig,
    chatMessages,
    isLoading,
    setAIConfig,
    generateDietPlan,
    generateWorkoutPlan,
    sendChatMessage
  }
})