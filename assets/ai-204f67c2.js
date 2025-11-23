import{v as i,x as w,g as p}from"./index-b96a8e1c.js";class h{async generateText(s,e){switch(e.provider){case"openai":return this.callOpenAI(s,e);case"wenxin":return this.callWenxin(s,e);case"tongyi":return this.callTongyi(s,e);case"zhipu":return this.callZhipu(s,e);default:throw new Error("Unsupported AI provider")}}async callOpenAI(s,e){return(await i.post(e.baseURL||"https://api.openai.com/v1/chat/completions",{model:"gpt-3.5-turbo",messages:[{role:"user",content:s}],max_tokens:1e3,temperature:.7},{headers:{Authorization:`Bearer ${e.apiKey}`,"Content-Type":"application/json"}})).data.choices[0].message.content}async callWenxin(s,e){return(await i.post(e.baseURL||"https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions",{messages:[{role:"user",content:s}],temperature:.7,max_tokens:1e3},{headers:{"Content-Type":"application/json"},params:{access_token:e.apiKey}})).data.result}async callTongyi(s,e){return(await i.post(e.baseURL||"https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",{model:"qwen-turbo",input:{messages:[{role:"user",content:s}]},parameters:{temperature:.7,max_tokens:1e3}},{headers:{Authorization:`Bearer ${e.apiKey}`,"Content-Type":"application/json"}})).data.output.text}async callZhipu(s,e){return(await i.post(e.baseURL||"https://open.bigmodel.cn/api/paas/v4/chat/completions",{model:"glm-4",messages:[{role:"user",content:s}],temperature:.7,max_tokens:1e3},{headers:{Authorization:`Bearer ${e.apiKey}`,"Content-Type":"application/json"}})).data.choices[0].message.content}}const u=new h,$=w("ai",()=>{const r=p({provider:"openai",apiKey:{}.VITE_AI_API_KEY||""}),s=p([]),e=p(!1),o=t=>{r.value={...r.value,...t}},l=async t=>{var a;e.value=!0;try{const n=`基于以下健康数据生成个性化饮食计划：
年龄: ${t.age}
性别: ${t.gender}
身高: ${t.height}cm
体重: ${t.weight}kg
健康目标: ${t.goal}
活动水平: ${t.activityLevel}
过敏食物: ${((a=t.allergies)==null?void 0:a.join(", "))||"无"}

请提供包含早餐、午餐、晚餐的详细饮食计划，以及营养分析。`,c=await u.generateText(n,r.value);return d(c)}catch(n){throw n}finally{e.value=!1}},m=async t=>{e.value=!0;try{const a=`基于以下健康数据生成个性化运动计划：
年龄: ${t.age}
性别: ${t.gender}
身高: ${t.height}cm
体重: ${t.weight}kg
健康目标: ${t.goal}
活动水平: ${t.activityLevel}

请提供包含有氧运动、力量训练和柔韧性练习的详细运动计划。`,n=await u.generateText(a,r.value);return y(n)}catch(a){throw a}finally{e.value=!1}},g=async t=>{const a={id:Date.now().toString(),content:t,role:"user",timestamp:new Date};s.value.push(a),e.value=!0;try{const n=`作为心理健康助手，请对以下用户消息提供专业、温暖的支持和建议：
用户: ${t}`,c=await u.generateText(n,r.value),v={id:(Date.now()+1).toString(),content:c,role:"assistant",timestamp:new Date};s.value.push(v)}catch(n){throw n}finally{e.value=!1}},d=t=>({meals:{breakfast:["全麦吐司 2片","煮鸡蛋 1个","牛奶 200ml"],lunch:["糙米饭 1碗","清蒸鱼 150g","蔬菜沙拉"],dinner:["鸡胸肉 120g","烤蔬菜","藜麦饭"]},nutrition:{calories:1850,protein:95,carbs:210,fat:55},description:t}),y=t=>({exercises:[{name:"快走",sets:1,reps:1,duration:30},{name:"深蹲",sets:3,reps:12,duration:0},{name:"俯卧撑",sets:3,reps:10,duration:0}],duration:45,frequency:"每周3-5次",intensity:"中等"});return{aiConfig:r,chatMessages:s,isLoading:e,setAIConfig:o,generateDietPlan:l,generateWorkoutPlan:m,sendChatMessage:g}});export{$ as u};
