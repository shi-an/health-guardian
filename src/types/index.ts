// 用户相关类型
export interface User {
  id: number
  name: string
  email: string
  avatar: string
  healthData?: HealthData
}

export interface HealthData {
  age?: number
  gender?: 'male' | 'female'
  height?: number
  weight?: number
  goal?: 'weight-loss' | 'maintain' | 'muscle-gain'
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
  allergies?: string[]
}

// AI服务相关类型
export interface AIServiceConfig {
  provider: 'openai' | 'wenxin' | 'tongyi' | 'zhipu'
  apiKey: string
  baseURL?: string
}

export interface DietPlan {
  meals: {
    breakfast: string[]
    lunch: string[]
    dinner: string[]
    snacks?: string[]
  }
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  description: string
}

export interface WorkoutPlan {
  exercises: Exercise[]
  duration: number
  frequency: string
  intensity: string
}

export interface Exercise {
  name: string
  sets: number
  reps: number
  duration?: number
}

// 聊天相关类型
export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}