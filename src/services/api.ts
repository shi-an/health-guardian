import type { User, HealthData } from '@/types'

// 模拟延迟，更真实地模拟网络请求
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const userService = {
  async login(email: string, password: string): Promise<User & { token: string }> {
    // 模拟网络延迟
    await delay(500)
    
    // 返回模拟用户数据
    return {
      id: Date.now(),
      username: email.split('@')[0],
      email: email,
      token: 'mock-token-' + Date.now(),
      createdAt: new Date().toISOString(),
      healthData: {
        height: 170,
        weight: 65,
        age: 30,
        gender: 'male'
      }
    }
  },

  async register(name: string, email: string, password: string): Promise<User & { token: string }> {
    // 模拟网络延迟
    await delay(500)
    
    // 返回模拟用户数据
    return {
      id: Date.now(),
      username: name,
      email: email,
      token: 'mock-token-' + Date.now(),
      createdAt: new Date().toISOString(),
      healthData: {
        height: 170,
        weight: 65,
        age: 30,
        gender: 'male'
      }
    }
  },

  async getProfile(): Promise<User> {
    // 模拟网络延迟
    await delay(300)
    
    // 从localStorage获取模拟用户数据，如果没有则创建默认用户
    const mockUserStr = localStorage.getItem('mockUser')
    if (mockUserStr) {
      return JSON.parse(mockUserStr)
    }
    
    // 返回默认模拟用户数据
    return {
      id: Date.now(),
      username: '模拟用户',
      email: 'mock@example.com',
      createdAt: new Date().toISOString(),
      healthData: {
        height: 170,
        weight: 65,
        age: 30,
        gender: 'male'
      }
    }
  },

  async updateHealthData(userId: number, healthData: Partial<HealthData>): Promise<User> {
    // 模拟网络延迟
    await delay(400)
    
    // 获取当前用户数据
    const mockUserStr = localStorage.getItem('mockUser')
    const currentUser = mockUserStr ? JSON.parse(mockUserStr) : {
      id: userId,
      username: '模拟用户',
      email: 'mock@example.com',
      createdAt: new Date().toISOString(),
      healthData: {
        height: 170,
        weight: 65,
        age: 30,
        gender: 'male'
      }
    }
    
    // 更新健康数据
    const updatedUser = {
      ...currentUser,
      healthData: {
        ...currentUser.healthData,
        ...healthData
      }
    }
    
    // 更新localStorage
    localStorage.setItem('mockUser', JSON.stringify(updatedUser))
    
    return updatedUser
  }
}

export const healthService = {
  async saveDietPlan(plan: any) {
    // 模拟网络延迟
    await delay(500)
    
    // 从localStorage获取现有计划
    const dietPlansStr = localStorage.getItem('mockDietPlans')
    const dietPlans = dietPlansStr ? JSON.parse(dietPlansStr) : []
    
    // 添加新计划
    const newPlan = {
      id: Date.now(),
      ...plan,
      createdAt: new Date().toISOString()
    }
    dietPlans.push(newPlan)
    
    // 保存回localStorage
    localStorage.setItem('mockDietPlans', JSON.stringify(dietPlans))
    
    return newPlan
  },

  async getDietPlans() {
    // 模拟网络延迟
    await delay(300)
    
    // 返回模拟的饮食计划数据
    return [
      {
        id: 1,
        name: '健康减脂计划',
        description: '为期一周的减脂饮食计划',
        meals: [
          { name: '早餐', food: '燕麦粥、鸡蛋、水果' },
          { name: '午餐', food: '鸡胸肉沙拉、糙米' },
          { name: '晚餐', food: '清蒸鱼、蔬菜' }
        ],
        createdAt: new Date().toISOString()
      }
    ]
  },

  async saveWorkoutPlan(plan: any) {
    // 模拟网络延迟
    await delay(500)
    
    // 从localStorage获取现有计划
    const workoutPlansStr = localStorage.getItem('mockWorkoutPlans')
    const workoutPlans = workoutPlansStr ? JSON.parse(workoutPlansStr) : []
    
    // 添加新计划
    const newPlan = {
      id: Date.now(),
      ...plan,
      createdAt: new Date().toISOString()
    }
    workoutPlans.push(newPlan)
    
    // 保存回localStorage
    localStorage.setItem('mockWorkoutPlans', JSON.stringify(workoutPlans))
    
    return newPlan
  },

  async getWorkoutPlans() {
    // 模拟网络延迟
    await delay(300)
    
    // 返回模拟的锻炼计划数据
    return [
      {
        id: 1,
        name: '全身塑形计划',
        description: '每周三次的全身锻炼',
        exercises: [
          { name: '俯卧撑', sets: 3, reps: 15 },
          { name: '深蹲', sets: 3, reps: 20 },
          { name: '平板支撑', sets: 3, duration: '60秒' }
        ],
        createdAt: new Date().toISOString()
      }
    ]
  }
}