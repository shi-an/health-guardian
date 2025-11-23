import type { AIServiceConfig } from '@/types'

// 模拟延迟函数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

class AIService {
  async generateText(prompt: string, config: AIServiceConfig): Promise<string> {
    console.log('使用模拟AI服务生成文本，避免API调用...')
    
    // 模拟API延迟
    await delay(1000)
    
    // 根据提示内容返回不同的模拟响应
    if (prompt.includes('基于以下健康数据生成个性化饮食计划')) {
      return '这是一份为您定制的饮食计划：\n\n早餐：全麦吐司2片，煮鸡蛋1个，牛奶200ml，蓝莓适量\n午餐：糙米饭1碗，清蒸鱼150g，清炒菠菜，番茄蛋汤\n晚餐：鸡胸肉120g，烤蔬菜拼盘，藜麦饭半小碗\n加餐：希腊酸奶，坚果适量\n\n营养分析：总热量约1850卡路里，蛋白质95克，碳水化合物210克，脂肪55克。这份计划适合您的健康目标，建议每天保持8杯水的摄入。'
    } else if (prompt.includes('基于以下健康数据生成个性化运动计划')) {
      return '这是一份为您定制的运动计划：\n\n周一：快走30分钟，深蹲3组×12次，平板支撑3组×30秒\n周三：慢跑25分钟，俯卧撑3组×10次，弓步蹲3组×每侧10次\n周五：游泳40分钟，卷腹3组×15次，拉伸10分钟\n\n建议每周坚持3-5次锻炼，循序渐进地增加强度。运动前进行5-10分钟热身，运动后进行充分拉伸。'
    } else if (prompt.includes('作为心理健康助手，请对以下用户消息提供专业')) {
      return '感谢您分享您的感受。我理解您现在可能感到压力或焦虑。建议您尝试深呼吸练习：缓慢吸气5秒，屏息2秒，然后缓慢呼气7秒，重复5次。同时，保持规律的作息和适当的运动也有助于缓解情绪。如果这种感受持续存在，建议考虑寻求专业心理咨询师的帮助。您并不孤单，很多人都会经历类似的情绪波动。'
    }
    
    // 默认响应
    return '这是一个模拟的AI响应，用于展示功能。在实际应用中，这里会调用AI API生成真实内容。'
  }
}

export const aiService = new AIService()