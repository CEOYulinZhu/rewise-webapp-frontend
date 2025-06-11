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
  - 🌟 智能综合分析 - 图片+文字描述，精准的分析结果

### 💡 处置方案
1. **创意改造** 🎨

   - 难度评估和耗时预估
   - 详细的分步骤指导
   - 所需材料和工具清单
   - 提供相关DIY改造教程链接


2. **回收/捐赠** ♻️
   - 附近回收点地图定位
   - 公益组织捐赠渠道

3. **二手平台交易** 💰
   - 建议定价区间
   - 市场行情价格分析
   - 市场销量趋势分析
   - 市场竞争程度分析
   - 多平台多维度对比
   - 文案建议

### 📱 用户体系
1. **账户管理** 👤
   - 手机号注册登录
   - 个人信息管理
   - 头像上传和编辑
   - 密码安全设置

2. **个性化功能** ⚙️
   - 处置偏好设置

3. **记录管理** 📋
   - 分析历史记录
   - 收藏夹管理
   - 筛选和排序
   - 批量操作功能

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
├── public/                 # 静态资源目录（空）
├── src/                   # 源代码目录
│   ├── assets/            # 项目资源文件（空）
│   ├── pages/             # 页面组件 (13个页面)
│   │   ├── Index.tsx      # 首页 - 物品上传和描述 (292行)
│   │   ├── Overview.tsx   # 概览页 - 处置方案推荐 (229行)
│   │   ├── CreativeDetail.tsx    # 创意改造详情 (590行)
│   │   ├── RecycleDetail.tsx     # 回收捐赠详情 (637行)
│   │   ├── TradingDetail.tsx     # 二手交易详情 (677行)
│   │   ├── Profile.tsx    # 个人中心 (248行)
│   │   ├── Login.tsx      # 登录注册页 (472行)
│   │   ├── EditProfile.tsx # 编辑个人信息 (272行)
│   │   ├── Settings.tsx   # 应用设置 (297行)
│   │   ├── Favorites.tsx  # 收藏夹管理 (600行)
│   │   ├── History.tsx    # 历史记录 (664行)
│   │   ├── About.tsx      # 关于应用 (154行)
│   │   └── Feedback.tsx   # 用户反馈 (254行)
│   ├── types/             # TypeScript类型定义
│   │   └── preferences.ts # 应用核心类型定义 (54行)
│   ├── App.tsx            # 应用主组件和路由配置 (44行)
│   ├── main.tsx           # React应用入口点 (11行)
│   ├── index.css          # 全局样式和Tailwind导入 (11行)
│   └── vite-env.d.ts      # Vite环境类型定义 (2行)
├── dist/                  # 构建输出目录
├── docs/                  # 项目文档目录
├── node_modules/          # npm依赖包
├── .git/                  # Git版本控制
├── package.json           # 项目依赖和脚本配置
├── vite.config.ts         # Vite构建工具配置
├── tailwind.config.js     # Tailwind CSS框架配置
├── postcss.config.js      # PostCSS处理器配置
├── tsconfig.json          # TypeScript根配置
├── tsconfig.app.json      # 应用TypeScript配置
├── tsconfig.node.json     # Node.js TypeScript配置
├── eslint.config.js       # ESLint代码规范配置
├── index.html             # HTML入口模板
├── .gitignore             # Git忽略文件配置
├── .cursorignore          # Cursor编辑器忽略配置
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
cd rewise-webapp-frontend

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
| `/profile` | 个人中心 | 用户信息、设置和功能导航 |
| `/login` | 登录注册 | 用户账户登录和注册功能 |
| `/edit-profile` | 编辑资料 | 个人信息编辑和头像上传 |
| `/settings` | 应用设置 | 通知、隐私、偏好设置 |
| `/favorites` | 收藏夹 | 收藏的物品和方案管理 |
| `/history` | 历史记录 | 查看和管理分析历史 |
| `/about` | 关于应用 | 应用介绍、团队信息和联系方式 |
| `/feedback` | 用户反馈 | 问题反馈和建议提交 |

## 💻 开发指南

### 代码规范
项目使用ESLint进行代码质量检查：
```powershell
# 运行代码检查
npm run lint
```

### 环境配置
- **开发环境**：根路径为 `/`，运行在 `http://localhost:5173`
- **生产环境**：根路径为 `/rewise`，支持子目录部署

### TypeScript配置
项目采用多配置文件结构：
- `tsconfig.json` - 根配置，继承应用和Node配置
- `tsconfig.app.json` - 应用代码配置（ES2020，DOM环境）
- `tsconfig.node.json` - 构建工具配置（ES2022，Node环境）

### 样式系统
- **Tailwind CSS**：原子化CSS框架，支持自定义工具类
- **自定义工具类**：`.line-clamp-1/2/3` 文本截断
- **动画扩展**：`spin-slow` 慢速旋转动画
- **毛玻璃效果**：`backdrop-blur-xs` 增强视觉层次

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

## 📊 项目统计

### 代码规模
- **总代码行数**：约 5000+ 行
- **页面组件**：13个核心页面
- **类型定义**：完整的TypeScript接口
- **核心功能**：物品识别、智能推荐、用户管理

### 核心类型定义
```typescript
// 偏好设置和推荐项
export interface PreferenceItem {
    id: 'creative' | 'recycle' | 'trading';
    title: string;
    subtitle: string;
    icon: LucideIcon;
    gradient: string;
    enabled: boolean;
}

// 历史记录项
export interface HistoryItem {
    id: string;
    type: 'image' | 'text' | 'both';
    image?: string;
    text?: string;
    timestamp: Date;
    category: 'creative' | 'recycle' | 'trading' | 'general';
    paths: DisposalPath[];
}
```

## 📋 项目规范

### 代码质量
- **TypeScript**：严格模式，未使用变量和参数检查
- **ESLint**：React Hooks规则，组件刷新检查
- **模块化**：ES模块，支持TypeScript扩展导入
- **组件设计**：函数式组件，Hooks状态管理

### 构建优化
- **Vite**：快速热更新，优化的生产构建
- **代码分割**：自动按需加载，减少首屏时间
- **资源优化**：自动压缩，CSS和JS分离
- **缓存策略**：长期缓存静态资源

### 浏览器兼容
- **现代浏览器**：支持ES2020+特性
- **移动端优化**：触摸友好，响应式布局
- **PWA就绪**：可扩展为渐进式Web应用
- **无障碍支持**：语义化HTML，键盘导航

## 🎯 开发状态

### 已完成功能
- ✅ **完整的用户界面**：13个页面，共5000+行代码
- ✅ **路由系统**：完整的页面导航和状态传递
- ✅ **响应式设计**：移动端优先的适配布局
- ✅ **物品识别**：图片上传、文字输入、图文结合
- ✅ **智能推荐**：多维度评分和可视化展示
- ✅ **用户系统**：登录注册、个人资料、设置管理
- ✅ **历史记录**：完整的分析历史和管理功能
- ✅ **收藏系统**：多条件筛选和批量操作
- ✅ **反馈系统**：问题分类和用户建议收集
- ✅ **类型系统**：完整的TypeScript类型定义

### 待开发功能
- 🔄 **后端API集成**：真实数据接口
- 🔄 **AI图像识别**：机器学习模型集成
- 🔄 **数据持久化**：用户数据和历史记录存储
- 🔄 **地图服务**：回收点定位和导航
- 🔄 **社交功能**：用户社区和分享
- 🔄 **推送通知**：实时消息和提醒
- 🔄 **支付系统**：增值服务和交易功能

---

**让每一件闲置物品都找到最好的归宿** 🌱