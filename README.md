# 闲置物语 (ReWise)

> 让闲置物品重获新生，智能化闲置物品处置建议平台

## 📖 项目简介

闲置物语是一个基于AI智能分析的闲置物品处置建议平台。用户只需上传物品照片或输入文字描述，即可获得专业的处置建议，包括创意改造、环保回收、二手交易等多种方案，让每一件闲置物品都能找到最适合的归宿。

## ✨ 功能特性

### 🎯 核心功能
- **智能识别分析**：支持图片上传、文字描述或图文结合的物品识别
- **多模式分析**：
  - 📸 图片识别分析 - AI智能识别物品特征
  - 📝 文字描述分析 - 基于详细描述的专业建议
  - 🌟 智能综合分析 - 图片+文字描述，最精准的分析结果

### 💡 处置方案
1. **创意改造** 🎨
   - 提供详细的DIY改造教程
   - 所需材料和工具清单
   - 分步骤图文指导
   - 难度评估和耗时预估

2. **回收/捐赠** ♻️
   - 附近回收点地图定位
   - 公益组织捐赠渠道
   - 环保积分奖励机制
   - 预约上门回收服务

3. **二手平台交易** 💰
   - 市场行情价格分析
   - 多平台发布建议
   - 拍照技巧指导
   - 交易安全提醒

### 📊 智能推荐
- 基于物品特征的推荐度评分
- 个性化处置方案排序
- 详细的可行性分析报告
- 经济效益和环保价值评估

## 🛠 技术栈

### 前端框架
- **React** `19.1.0` - 现代化前端框架
- **TypeScript** `5.8.3` - 类型安全的JavaScript
- **Vite** `6.3.5` - 快速构建工具

### 路由管理
- **React Router DOM** `7.6.2` - 单页应用路由管理

### UI & 样式
- **Tailwind CSS** `3.4.1` - 原子化CSS框架
- **Lucide React** `0.513.0` - 现代图标库
- **PostCSS** `8.5.4` - CSS后处理器

### 数据可视化
- **Recharts** `2.15.3` - React图表库

### 开发工具
- **ESLint** `9.25.0` - 代码质量检查
- **TypeScript ESLint** `8.30.1` - TypeScript代码规范
- **Autoprefixer** `10.4.21` - CSS兼容性处理

## 📁 项目结构

```
rewise-webapp-frontend/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 项目资源文件
│   ├── pages/             # 页面组件
│   │   ├── Index.tsx      # 首页 - 物品上传和描述
│   │   ├── Overview.tsx   # 概览页 - 处置方案推荐
│   │   ├── CreativeDetail.tsx    # 创意改造详情
│   │   ├── RecycleDetail.tsx     # 回收捐赠详情
│   │   ├── TradingDetail.tsx     # 二手交易详情
│   │   └── Profile.tsx    # 个人中心
│   ├── types/             # TypeScript类型定义
│   ├── App.tsx            # 应用主组件
│   ├── main.tsx           # 应用入口
│   ├── index.css          # 全局样式
│   └── vite-env.d.ts      # Vite环境类型定义
├── docs/                  # 项目文档
├── .git/                  # Git版本控制
├── package.json           # 项目依赖配置
├── vite.config.ts         # Vite构建配置
├── tailwind.config.js     # Tailwind CSS配置
├── postcss.config.js      # PostCSS配置
├── tsconfig.json          # TypeScript根配置
├── tsconfig.app.json      # 应用TypeScript配置
├── tsconfig.node.json     # Node.js TypeScript配置
├── eslint.config.js       # ESLint代码规范配置
├── index.html             # HTML入口文件
├── .gitignore             # Git忽略文件配置
├── .cursorignore          # Cursor编辑器忽略文件配置
└── README.md              # 项目说明文档
```

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖
```powershell
# 克隆项目
git clone [项目地址]
cd 闲置物语

# 安装依赖
npm install
```

### 开发环境运行
```powershell
# 启动开发服务器
npm run dev
```

项目将在 `http://localhost:5173` 启动

### 生产环境构建
```powershell
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

### 生产环境部署构建
```powershell
# 生产环境构建（带优化）
npm run build:prod
```

## 📱 页面路由

| 路径 | 页面 | 功能描述 |
|------|------|----------|
| `/` | 首页 | 物品上传、拍照、文字描述输入 |
| `/overview` | 概览页 | 智能分析结果和处置方案推荐 |
| `/detail/creative` | 创意改造 | 详细的DIY改造指南和教程 |
| `/detail/recycle` | 回收捐赠 | 回收点信息和捐赠渠道 |
| `/detail/trading` | 二手交易 | 交易平台推荐和价格分析 |
| `/profile` | 个人中心 | 用户信息和历史记录 |

## 💻 开发指南

### 代码规范
项目使用ESLint进行代码质量检查：
```powershell
# 运行代码检查
npm run lint
```

### 环境配置
- 开发环境：根路径为 `/`
- 生产环境：根路径为 `/rewise`

### 响应式设计
项目采用移动优先的响应式设计，支持多种设备尺寸。

## 🎨 设计特色

### 视觉设计
- **现代渐变色彩**：采用绿色系环保主题配色
- **毛玻璃效果**：backdrop-blur创造层次感
- **卡片化布局**：清晰的信息层级结构
- **微交互动画**：提升用户体验的细节动效

### 用户体验
- **零门槛使用**：图片或文字任选其一即可开始
- **智能引导**：清晰的操作步骤和提示信息
- **即时反馈**：实时显示分析类型和进度
- **一键操作**：简化的操作流程

## 🌟 特色亮点

1. **多模态输入**：支持拍照、相册选择、文字描述多种输入方式
2. **智能分析**：自动识别分析模式，提供个性化建议
3. **可视化展示**：直观的推荐度评分和进度条展示
4. **实用性强**：提供具体可执行的操作指南
5. **环保理念**：倡导可持续发展的物品处置方式



**让每一件闲置物品都找到最好的归宿** 🌱