import axios from 'axios'
import type { User, HealthData } from '@/types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
})

// 请求拦截器
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const userService = {
  async login(email: string, password: string): Promise<User & { token: string }> {
    return api.post('/auth/login', { email, password })
  },

  async register(name: string, email: string, password: string): Promise<User & { token: string }> {
    // 将name参数映射为username，与表单字段保持一致
    return api.post('/auth/register', { username: name, email, password })
  },

  async getProfile(): Promise<User> {
    return api.get('/user/profile')
  },

  async updateHealthData(userId: number, healthData: Partial<HealthData>): Promise<User> {
    return api.put(`/user/${userId}/health-data`, healthData)
  }
}

export const healthService = {
  async saveDietPlan(plan: any) {
    return api.post('/health/diet-plans', plan)
  },

  async getDietPlans() {
    return api.get('/health/diet-plans')
  },

  async saveWorkoutPlan(plan: any) {
    return api.post('/health/workout-plans', plan)
  },

  async getWorkoutPlans() {
    return api.get('/health/workout-plans')
  }
}