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
      // 在开发环境中，优先从localStorage读取模拟用户数据
      if (import.meta.env.DEV) {
        const mockUserData = localStorage.getItem('mockUser')
        if (mockUserData) {
          console.log('使用模拟用户数据...')
          user.value = JSON.parse(mockUserData)
          return
        }
      }
      
      // 生产环境或没有模拟数据时，使用真实API
      const userData = await userService.getProfile()
      if (!userData) {
        throw new Error('无效的用户数据')
      }
      user.value = userData
    } catch (error) {
      // 只在非开发环境或有明确错误时清理状态
      if (!import.meta.env.DEV || (error instanceof Error && !error.message.includes('Network Error'))) {
        logout()
        console.warn('用户认证失败，已清理登录状态:', error)
      } else {
        // 在开发环境中，尝试保留模拟用户数据
        const mockUserData = localStorage.getItem('mockUser')
        if (mockUserData) {
          console.log('使用缓存的模拟用户数据...')
          user.value = JSON.parse(mockUserData)
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