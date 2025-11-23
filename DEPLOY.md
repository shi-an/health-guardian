# GitHub Pages 部署指南

由于环境限制，以下是手动部署到GitHub Pages的步骤：

## 准备工作

1. 确保您的本地环境已安装 Node.js 和 npm
2. 确保您的代码已推送到GitHub仓库

## 部署步骤

### 方法一：使用gh-pages自动部署（推荐）

1. **安装Node.js环境**
   前往 [Node.js官网](https://nodejs.org/) 下载并安装最新版本

2. **安装依赖并构建项目**
   ```bash
   # 安装项目依赖
   npm install
   
   # 构建项目
   npm run build
   ```

3. **安装gh-pages并部署**
   ```bash
   # 安装gh-pages
   npm install --save-dev gh-pages
   
   # 将以下脚本添加到package.json的scripts部分
   # "deploy": "gh-pages -d dist"
   
   # 执行部署
   npx gh-pages -d dist
   ```

### 方法二：手动部署

1. **构建项目**
   在有Node.js环境的电脑上运行：
   ```bash
   npm install
   npm run build
   ```

2. **创建gh-pages分支**
   ```bash
   # 创建并切换到gh-pages分支
   git checkout -b gh-pages
   
   # 删除除dist目录外的所有文件
   git rm -rf --cached .
   git clean -df
   
   # 将dist目录中的文件移动到根目录
   mv dist/* .
   rm -rf dist
   ```

3. **提交并推送**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

## 配置GitHub Pages

1. 登录GitHub，进入您的仓库
2. 点击「Settings」→「Pages」
3. 在「Source」部分：
   - 选择「Deploy from a branch」
   - 分支选择「gh-pages」
   - 目录选择「/(root)」
4. 点击「Save」

## 验证部署

部署成功后，GitHub Pages URL 会显示在设置页面上（通常为 `https://<username>.github.io/<repository-name>/`）

## 注意事项

- 部署可能需要几分钟时间生效
- 确保vite.config.ts中的base配置为'./'以支持相对路径
- 如果页面资源加载失败，检查路径是否正确

## 后续更新部署

每次更新代码后，重复上述部署步骤以更新GitHub Pages