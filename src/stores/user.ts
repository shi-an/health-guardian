import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { User, HealthData } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    try {
      // 完全使用模拟用户数据，避免任何实际API调用
      const mockUserData: User = {
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
      
      // 如果是测试账户，提供完整的模拟数据
      if (email === 'test@example.com') {
        mockUserData.username = '测试用户'
        mockUserData.healthData = {
          height: 175,
          weight: 70,
          age: 25,
          gender: 'male'
        }
      }
      
      user.value = mockUserData
      localStorage.setItem('token', mockUserData.token)
      
      // 在开发环境中存储模拟用户数据
      if (import.meta.env.DEV) {
        localStorage.setItem('mockUser', JSON.stringify(mockUserData))
      }
      
      return mockUserData
    } catch (error: any) {
      // 清理可能的部分登录状态
      logout()
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // 完全使用模拟用户数据，避免任何实际API调用
      const mockUserData: User = {
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
      
      user.value = mockUserData
      localStorage.setItem('token', mockUserData.token)
      
      // 在开发环境中存储模拟用户数据
      if (import.meta.env.DEV) {
        localStorage.setItem('mockUser', JSON.stringify(mockUserData))
      }
      
      return mockUserData
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
      // 直接更新本地用户数据，避免API调用
      user.value = {
        ...user.value,
        healthData: {
          ...user.value.healthData,
          ...healthData
        }
      }
      
      // 在开发环境中更新localStorage中的模拟数据
      if (import.meta.env.DEV) {
        const currentMockUser = localStorage.getItem('mockUser')
        if (currentMockUser) {
          const updatedUser = {
            ...JSON.parse(currentMockUser),
            healthData: {
              ...JSON.parse(currentMockUser).healthData,
              ...healthData
            }
          }
          localStorage.setItem('mockUser', JSON.stringify(updatedUser))
        }
      }
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
      // 完全使用模拟用户数据，无论环境如何
      let mockUserData = localStorage.getItem('mockUser')
      
      // 如果有mockUser数据，直接使用
      if (mockUserData) {
        const parsedUser = JSON.parse(mockUserData)
        // 确保有完整的数据结构
        parsedUser.username = parsedUser.username || '模拟用户'
        parsedUser.healthData = parsedUser.healthData || {
          height: 170,
          weight: 65,
          age: 30,
          gender: 'male'
        }
        console.log('使用模拟用户数据...')
        user.value = parsedUser
        return
      } else {
        // 如果没有mockUser数据但有token，创建一个临时的模拟用户
        console.log('创建临时模拟用户数据...')
        const tempMockUser = {
          id: Date.now(),
          username: '模拟用户',
          email: 'mock@example.com',
          token: token,
          createdAt: new Date().toISOString(),
          healthData: {
            height: 170,
            weight: 65,
            age: 30,
            gender: 'male'
          }
        }
        user.value = tempMockUser
        
        // 存储到localStorage
        localStorage.setItem('mockUser', JSON.stringify(tempMockUser))
        return
      }
    } catch (error) {
      console.warn('加载用户数据失败，创建默认模拟用户:', error)
      // 发生错误时，创建临时模拟用户保持登录状态
      const tempMockUser = {
        id: Date.now(),
        username: '模拟用户',
        email: 'mock@example.com',
        token: token,
        createdAt: new Date().toISOString(),
        healthData: {
          height: 170,
          weight: 65,
          age: 30,
          gender: 'male'
        }
      }
      user.value = tempMockUser
      
      // 存储到localStorage
      localStorage.setItem('mockUser', JSON.stringify(tempMockUser))
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