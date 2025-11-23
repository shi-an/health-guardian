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
      user.value = userData
      localStorage.setItem('token', userData.token)
      return userData
    } catch (error) {
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const userData = await userService.register(name, email, password)
      user.value = userData
      localStorage.setItem('token', userData.token)
      return userData
    } catch (error) {
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
    if (token) {
      try {
        user.value = await userService.getProfile()
      } catch (error) {
        localStorage.removeItem('token')
      }
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