// 后端API模拟 (实际项目中应替换为真实后端)
const API_BASE_URL = 'https://api.healthguard.com'; // 模拟API地址

// 用户认证状态管理
let currentUser = null;
let authToken = localStorage.getItem('authToken');

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查用户登录状态
    checkAuthStatus();
    
    // 页面切换逻辑
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新导航激活状态
            document.querySelectorAll('.nav-link').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // 显示对应页面
            const pageId = this.getAttribute('data-page');
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById(pageId).classList.add('active');
        });
    });
    
    // 模态框控制
    document.getElementById('login-btn').addEventListener('click', () => {
        document.getElementById('login-modal').style.display = 'flex';
    });
    
    document.getElementById('register-btn').addEventListener('click', () => {
        document.getElementById('register-modal').style.display = 'flex';
    });
    
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('register-modal').style.display = 'flex';
    });
    
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register-modal').style.display = 'none';
        document.getElementById('login-modal').style.display = 'flex';
    });
    
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // 登录表单提交
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        loginUser(email, password);
    });
    
    // 注册表单提交
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('两次输入的密码不一致');
            return;
        }
        
        registerUser(name, email, password);
    });
    
    // 退出登录
    document.getElementById('logout-btn').addEventListener('click', logoutUser);
    
    // 个人中心菜单切换
    document.querySelectorAll('.profile-menu li').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.profile-menu li').forEach(li => {
                li.classList.remove('active');
            });
            this.classList.add('active');
            
            const sectionId = this.getAttribute('data-section');
            document.querySelectorAll('.profile-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // 个人信息表单提交
    document.getElementById('personal-info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        savePersonalInfo();
    });
    
    // 饮食计划生成
    document.getElementById('generate-diet').addEventListener('click', function() {
        generateDietPlan();
    });
    
    // 心理陪伴聊天功能
    document.getElementById('send-btn').addEventListener('click', sendMessage);
    document.getElementById('user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 开始健康之旅按钮
    document.getElementById('get-started-btn').addEventListener('click', function() {
        if (!currentUser) {
            document.getElementById('register-modal').style.display = 'flex';
        } else {
            document.querySelector('.nav-link[data-page="diet"]').click();
        }
    });
});

// 检查用户认证状态
function checkAuthStatus() {
    if (authToken) {
        // 模拟API调用验证token
        fetchUserProfile();
    } else {
        showGuestUI();
    }
}

// 用户登录
function loginUser(email, password) {
    // 模拟API调用
    console.log('登录请求:', { email, password });
    
    // 模拟成功响应
    setTimeout(() => {
        const mockUser = {
            id: 1,
            name: '张伟',
            email: email,
            avatar: '张'
        };
        
        const mockToken = 'mock_jwt_token_' + Date.now();
        
        // 保存用户信息和token
        currentUser = mockUser;
        authToken = mockToken;
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // 更新UI
        showUserUI();
        
        // 关闭模态框
        document.getElementById('login-modal').style.display = 'none';
        
        alert('登录成功！');
    }, 1000);
}

// 用户注册
function registerUser(name, email, password) {
    // 模拟API调用
    console.log('注册请求:', { name, email, password });
    
    // 模拟成功响应
    setTimeout(() => {
        const mockUser = {
            id: Date.now(),
            name: name,
            email: email,
            avatar: name.charAt(0)
        };
        
        const mockToken = 'mock_jwt_token_' + Date.now();
        
        // 保存用户信息和token
        currentUser = mockUser;
        authToken = mockToken;
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // 更新UI
        showUserUI();
        
        // 关闭模态框
        document.getElementById('register-modal').style.display = 'none';
        
        alert('注册成功！');
    }, 1000);
}

// 获取用户资料
function fetchUserProfile() {
    // 模拟API调用
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        showUserUI();
    } else {
        showGuestUI();
    }
}

// 退出登录
function logoutUser() {
    currentUser = null;
    authToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    showGuestUI();
    
    // 跳转到首页
    document.querySelector('.nav-link[data-page="home"]').click();
}

// 显示用户UI
function showUserUI() {
    document.getElementById('user-info').classList.remove('hidden');
    document.getElementById('guest-actions').classList.add('hidden');
    
    document.getElementById('user-avatar').textContent = currentUser.avatar;
    document.getElementById('username').textContent = currentUser.name;
    
    // 更新个人中心信息
    document.getElementById('profile-avatar').textContent = currentUser.avatar;
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-fullname').value = currentUser.name;
    document.getElementById('profile-email').value = currentUser.email;
}

// 显示访客UI
function showGuestUI() {
    document.getElementById('user-info').classList.add('hidden');
    document.getElementById('guest-actions').classList.remove('hidden');
}

// 保存个人信息
function savePersonalInfo() {
    const name = document.getElementById('profile-fullname').value;
    const age = document.getElementById('profile-age').value;
    const gender = document.getElementById('profile-gender').value;
    const height = document.getElementById('profile-height').value;
    const weight = document.getElementById('profile-weight').value;
    
    // 模拟API调用保存个人信息
    console.log('保存个人信息:', { name, age, gender, height, weight });
    
    // 更新当前用户信息
    if (currentUser) {
        currentUser.name = name;
        localStorage.setItem('user', JSON.stringify(currentUser));
        document.getElementById('username').textContent = name;
        document.getElementById('profile-name').textContent = name;
        document.getElementById('user-avatar').textContent = name.charAt(0);
        document.getElementById('profile-avatar').textContent = name.charAt(0);
    }
    
    // 计算并更新健康指标
    if (height && weight) {
        updateHealthMetrics(height, weight, age, gender);
    }
    
    alert('个人信息已保存！');
}

// 更新健康指标
function updateHealthMetrics(height, weight, age, gender) {
    // 计算BMI
    const heightInMeter = height / 100;
    const bmi = (weight / (heightInMeter * heightInMeter)).toFixed(1);
    document.getElementById('bmi-value').textContent = bmi;
    
    // 计算基础代谢率 (BMR)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    document.getElementById('bmr-value').textContent = Math.round(bmr);
    
    // 计算每日总能量消耗 (TDEE) - 假设中等活动水平
    const tdee = Math.round(bmr * 1.55);
    document.getElementById('tdee-value').textContent = tdee;
}

// 生成饮食计划
function generateDietPlan() {
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    
    if (!age || !height || !weight) {
        alert('请填写完整的健康信息');
        return;
    }
    
    // 显示加载动画
    document.getElementById('diet-loader').classList.remove('hidden');
    
    // 模拟AI API调用
    setTimeout(() => {
        // 隐藏加载动画
        document.getElementById('diet-loader').classList.add('hidden');
        
        // 显示结果
        document.getElementById('diet-result').classList.add('active');
        
        // 模拟保存到用户历史
        if (currentUser) {
            console.log('保存饮食计划到用户历史');
        }
    }, 2000);
}

// 发送聊天消息
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // 添加用户消息
    addMessage(message, 'user');
    userInput.value = '';
    
    // 模拟AI回复
    setTimeout(() => {
        let botResponse = '';
        
        if (message.includes('压力') || message.includes('焦虑')) {
            botResponse = '感受到压力是正常的。尝试深呼吸练习：吸气4秒，屏息4秒，呼气6秒，重复几次。也可以尝试将您的担忧写下来，这有助于理清思路。';
        } else if (message.includes('不开心') || message.includes('沮丧')) {
            botResponse = '很抱歉您现在感到不开心。情绪像波浪一样，有高有低。尝试做一些您喜欢的小事，或者与信任的人聊聊。记住，您的感受是有效的，也是暂时的。';
        } else if (message.includes('睡眠') || message.includes('失眠')) {
            botResponse = '改善睡眠质量很重要。尝试建立规律的睡眠时间，睡前避免使用电子设备，可以尝试阅读或听轻音乐放松。保持卧室安静、黑暗和凉爽也有助于睡眠。';
        } else {
            botResponse = '感谢您分享您的感受。记住，关注自己的心理健康是自我关爱的重要部分。如果您需要更多支持，我们的平台还提供正念练习和情绪追踪工具。';
        }
        
        addMessage(botResponse, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 模拟后端API调用函数
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}