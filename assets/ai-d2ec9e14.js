import{v as m,g as a}from"./index-0cf1d0a8.js";const y=n=>new Promise(t=>setTimeout(t,n));class w{async generateText(t,r){return console.log("使用模拟AI服务生成文本，避免API调用..."),await y(1e3),t.includes("基于以下健康数据生成个性化饮食计划")?`这是一份为您定制的饮食计划：

早餐：全麦吐司2片，煮鸡蛋1个，牛奶200ml，蓝莓适量
午餐：糙米饭1碗，清蒸鱼150g，清炒菠菜，番茄蛋汤
晚餐：鸡胸肉120g，烤蔬菜拼盘，藜麦饭半小碗
加餐：希腊酸奶，坚果适量

营养分析：总热量约1850卡路里，蛋白质95克，碳水化合物210克，脂肪55克。这份计划适合您的健康目标，建议每天保持8杯水的摄入。`:t.includes("基于以下健康数据生成个性化运动计划")?`这是一份为您定制的运动计划：

周一：快走30分钟，深蹲3组×12次，平板支撑3组×30秒
周三：慢跑25分钟，俯卧撑3组×10次，弓步蹲3组×每侧10次
周五：游泳40分钟，卷腹3组×15次，拉伸10分钟

建议每周坚持3-5次锻炼，循序渐进地增加强度。运动前进行5-10分钟热身，运动后进行充分拉伸。`:t.includes("作为心理健康助手，请对以下用户消息提供专业")?"感谢您分享您的感受。我理解您现在可能感到压力或焦虑。建议您尝试深呼吸练习：缓慢吸气5秒，屏息2秒，然后缓慢呼气7秒，重复5次。同时，保持规律的作息和适当的运动也有助于缓解情绪。如果这种感受持续存在，建议考虑寻求专业心理咨询师的帮助。您并不孤单，很多人都会经历类似的情绪波动。":"这是一个模拟的AI响应，用于展示功能。在实际应用中，这里会调用AI API生成真实内容。"}}const c=new w,A=m("ai",()=>{const n=a({provider:"mock",apiKey:""}),t=a([]),r=a(!1),u=e=>{n.value={...n.value,...e}},l=async e=>{var o;r.value=!0;try{const s=`基于以下健康数据生成个性化饮食计划：
年龄: ${e.age}
性别: ${e.gender}
身高: ${e.height}cm
体重: ${e.weight}kg
健康目标: ${e.goal}
活动水平: ${e.activityLevel}
过敏食物: ${((o=e.allergies)==null?void 0:o.join(", "))||"无"}

请提供包含早餐、午餐、晚餐的详细饮食计划，以及营养分析。`,i=await c.generateText(s,n.value);return p(i)}catch(s){throw s}finally{r.value=!1}},g=async e=>{r.value=!0;try{const o=`基于以下健康数据生成个性化运动计划：
年龄: ${e.age}
性别: ${e.gender}
身高: ${e.height}cm
体重: ${e.weight}kg
健康目标: ${e.goal}
活动水平: ${e.activityLevel}

请提供包含有氧运动、力量训练和柔韧性练习的详细运动计划。`,s=await c.generateText(o,n.value);return f(s)}catch(o){throw o}finally{r.value=!1}},v=async e=>{const o={id:Date.now().toString(),content:e,role:"user",timestamp:new Date};t.value.push(o),r.value=!0;try{const s=`作为心理健康助手，请对以下用户消息提供专业、温暖的支持和建议：
用户: ${e}`,i=await c.generateText(s,n.value),d={id:(Date.now()+1).toString(),content:i,role:"assistant",timestamp:new Date};t.value.push(d)}catch(s){throw s}finally{r.value=!1}},p=e=>({meals:{breakfast:["全麦吐司 2片","煮鸡蛋 1个","牛奶 200ml"],lunch:["糙米饭 1碗","清蒸鱼 150g","蔬菜沙拉"],dinner:["鸡胸肉 120g","烤蔬菜","藜麦饭"]},nutrition:{calories:1850,protein:95,carbs:210,fat:55},description:e}),f=e=>({exercises:[{name:"快走",sets:1,reps:1,duration:30},{name:"深蹲",sets:3,reps:12,duration:0},{name:"俯卧撑",sets:3,reps:10,duration:0}],duration:45,frequency:"每周3-5次",intensity:"中等"});return{aiConfig:n,chatMessages:t,isLoading:r,setAIConfig:u,generateDietPlan:l,generateWorkoutPlan:g,sendChatMessage:v}});export{A as u};
