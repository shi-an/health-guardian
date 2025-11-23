import axios from 'axios'
import type { AIServiceConfig } from '@/types'

class AIService {
  async generateText(prompt: string, config: AIServiceConfig): Promise<string> {
    switch (config.provider) {
      case 'openai':
        return this.callOpenAI(prompt, config)
      case 'wenxin':
        return this.callWenxin(prompt, config)
      case 'tongyi':
        return this.callTongyi(prompt, config)
      case 'zhipu':
        return this.callZhipu(prompt, config)
      default:
        throw new Error('Unsupported AI provider')
    }
  }

  private async callOpenAI(prompt: string, config: AIServiceConfig): Promise<string> {
    const response = await axios.post(
      config.baseURL || 'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data.choices[0].message.content
  }

  private async callWenxin(prompt: string, config: AIServiceConfig): Promise<string> {
    // 文心一言API调用
    const response = await axios.post(
      config.baseURL || 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
      {
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          access_token: config.apiKey
        }
      }
    )
    return response.data.result
  }

  private async callTongyi(prompt: string, config: AIServiceConfig): Promise<string> {
    // 通义千问API调用
    const response = await axios.post(
      config.baseURL || 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      {
        model: 'qwen-turbo',
        input: {
          messages: [{ role: 'user', content: prompt }]
        },
        parameters: {
          temperature: 0.7,
          max_tokens: 1000
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data.output.text
  }

  private async callZhipu(prompt: string, config: AIServiceConfig): Promise<string> {
    // 智谱AI API调用
    const response = await axios.post(
      config.baseURL || 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      {
        model: 'glm-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data.choices[0].message.content
  }
}

export const aiService = new AIService()