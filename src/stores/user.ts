import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
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
      const userData = await userService.getProfile()
      if (!userData) {
        throw new Error('无效的用户数据')
      }
      user.value = userData
    } catch (error) {
      // Token可能已过期或无效，清理存储
      logout()
      console.warn('用户认证失败，已清理登录状态:', error)
    }
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