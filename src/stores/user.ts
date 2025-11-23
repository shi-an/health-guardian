import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { User, HealthData } from '@/types'
import { userService } from '@/services/api'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    try {
      const userData = await userService.login(email, password)
      if (!userData || !userData.token) {
        throw new Error('登录失败：无效的响应数据')
      }
      user.value = userData
      // 安全地存储token
      localStorage.setItem('token', userData.token)
      return userData
    } catch (error: any) {
      // 清理可能的部分登录状态
      logout()
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const userData = await userService.register(name, email, password)
      if (!userData || !userData.token) {
        throw new Error('注册失败：无效的响应数据')
      }
      user.value = userData
      // 安全地存储token
      localStorage.setItem('token', userData.token)
      return userData
    } catch (error: any) {
      // 清理可能的部分注册状态
      logout()
      throw error
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('token')
    // 清理模拟用户数据
    if (import.meta.env.DEV) {
      localStorage.removeItem('mockUser')
    }
  }

  const updateHealthData = async (healthData: Partial<HealthData>) => {
    if (!user.value) return
    
    try {
      const updatedUser = await userService.updateHealthData(user.value.id, healthData)
      user.value = { ...user.value, ...updatedUser }
    } catch (error) {
      throw error
    }
  }

  const loadUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      user.value = null
      return
    }
    
    try {
      // 在开发环境中，完全使用模拟用户数据
      if (import.meta.env.DEV) {
        let mockUserData = localStorage.getItem('mockUser')
        
        // 如果有mockUser数据，直接使用
        if (mockUserData) {
          const parsedUser = JSON.parse(mockUserData)
          // 如果是测试账户，确保有完整的数据结构
          if (parsedUser.email === 'test@example.com') {
            parsedUser.username = '测试用户'
            parsedUser.healthData = parsedUser.healthData || {
              height: 175,
              weight: 70,
              age: 25,
              gender: 'male'
            }
            // 更新localStorage中的数据
            mockUserData = JSON.stringify(parsedUser)
            localStorage.setItem('mockUser', mockUserData)
          }
          console.log('使用模拟用户数据...')
          user.value = parsedUser
          return
        } else {
          // 如果没有mockUser数据但有token，创建一个临时的模拟用户
          // 这样可以避免调用真实API，同时保持用户已登录的状态
          console.log('创建临时模拟用户数据...')
          const tempMockUser = {
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
          user.value = tempMockUser
          return
        }
      }
      
      // 生产环境使用真实API
      const userData = await userService.getProfile()
      if (!userData) {
        throw new Error('无效的用户数据')
      }
      user.value = userData
    } catch (error) {
      // 只在非开发环境清理状态
      if (!import.meta.env.DEV) {
        logout()
        console.warn('用户认证失败，已清理登录状态:', error)
      } else {
        // 在开发环境中，即使发生错误也尽量保留用户状态
        // 如果用户值为null但有token，创建一个临时模拟用户
        if (!user.value) {
          console.log('发生错误，创建临时模拟用户以保持登录状态...')
          const tempMockUser = {
            id: Date.now(),
            username: '模拟用户',
            email: 'mock@example.com',
            createdAt: new Date().toISOString(),
          }
          user.value = tempMockUser
        }
      }
    }
  }
  
  // 监听localStorage中的模拟用户数据变化
  if (import.meta.env.DEV) {
    watch(() => localStorage.getItem('mockUser'), (newMockUser) => {
      if (newMockUser) {
        user.value = JSON.parse(newMockUser)
      }
    })
  }
  
  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateHealthData,
    loadUser
  }
})