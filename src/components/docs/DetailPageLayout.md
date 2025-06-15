# DetailPageLayout 详情页面布局组件

一个可重复使用的详情页面布局组件，专为三个详情页面（二手交易、回收捐赠、创意改造）设计，提供统一的结构和主题化支持。

## 功能特性

- ✅ 统一的页面布局结构（物品信息卡片 + 标签页导航 + 内容区域）
- ✅ 主题化设计系统（支持不同颜色方案）
- ✅ 推荐度进度条展示
- ✅ 标签页导航系统（支持图标和文字）
- ✅ 物品图片展示（支持默认图标占位）
- ✅ 完全可定制的内容渲染
- ✅ 集成NavigationBar导航栏
- ✅ 响应式设计
- ✅ TypeScript类型安全

## 基础用法

### 1. 最简单的用法
```tsx
import DetailPageLayout from '../components/DetailPageLayout';
import { tradingTheme } from '../config/detailPageThemes';

const tabs = [
    { id: 'overview', name: '概览', icon: BarChart3 }
];

<DetailPageLayout
    title="我的物品"
    recommendationScore={85}
    recommendationLabel="推荐度"
    theme={tradingTheme}
    tabs={tabs}
    activeTab="overview"
    onTabChange={setActiveTab}
    renderTabContent={() => <div>内容区域</div>}
    navigationTitle="详情页面"
/>
```

### 2. 完整配置用法
```tsx
import { Heart, Share2, BarChart3, Settings } from 'lucide-react';
import DetailPageLayout from '../components/DetailPageLayout';
import { creativeTheme } from '../config/detailPageThemes';

const tabs = [
    { id: 'overview', name: '概览', icon: BarChart3 },
    { id: 'steps', name: '步骤', icon: Settings }
];

<DetailPageLayout
    title="创意改造物品"
    image="https://example.com/image.jpg"
    description="这是一个待改造的物品"
    recommendationScore={85}
    recommendationLabel="改造推荐度"
    theme={creativeTheme}
    tabs={tabs}
    activeTab={activeTab}
    onTabChange={setActiveTab}
    renderTabContent={renderTabContent}
    navigationTitle="创意改造方案"
    navigationBackButtonColor="text-purple-600"
    navigationActionButtons={[
        {
            icon: Heart,
            onClick: () => setIsFavorited(!isFavorited),
            isActive: isFavorited,
            activeColor: 'text-red-500 fill-current'
        },
        {
            icon: Share2,
            onClick: handleShare
        }
    ]}
/>
```

### 3. 自定义标签页内容渲染
```tsx
const renderTabContent = () => {
    switch (activeTab) {
        case 'overview':
            return (
                <div className="bg-white rounded-xl p-6">
                    <h3>概览内容</h3>
                    <p>这里是概览页面的内容</p>
                </div>
            );
        case 'details':
            return (
                <div className="bg-white rounded-xl p-6">
                    <h3>详细信息</h3>
                    <p>这里是详细信息页面的内容</p>
                </div>
            );
        default:
            return <div>默认内容</div>;
    }
};
```

### 4. 使用预定义主题
```tsx
import { tradingTheme, recycleTheme, creativeTheme } from '../config/detailPageThemes';

// 二手交易主题（蓝色系）
<DetailPageLayout theme={tradingTheme} ... />

// 回收捐赠主题（绿色系）
<DetailPageLayout theme={recycleTheme} ... />

// 创意改造主题（紫色系）
<DetailPageLayout theme={creativeTheme} ... />
```

### 5. 自定义主题
```tsx
const customTheme = {
    backgroundGradient: 'from-pink-50 via-rose-50 to-red-50',
    cardBorderColor: 'border-pink-100',
    recommendationGradient: 'from-pink-500 to-rose-500',
    progressBgColor: 'bg-pink-100',
    progressGradient: 'from-pink-400 to-rose-500',
    tabActiveGradient: 'from-pink-500 to-rose-600',
    tabHoverBgColor: 'bg-pink-50',
    tabHoverTextColor: 'text-pink-600',
    defaultIconGradient: 'from-pink-400 to-rose-500'
};

<DetailPageLayout theme={customTheme} ... />
```

## API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 物品标题（必填） |
| `image` | `string` | - | 物品图片URL（可选） |
| `description` | `string` | - | 物品描述（可选） |
| `recommendationScore` | `number` | - | 推荐度分数 0-100（必填） |
| `recommendationLabel` | `string` | - | 推荐度标签文字（必填） |
| `theme` | `ThemeConfig` | - | 主题配置对象（必填） |
| `tabs` | `TabConfig[]` | - | 标签页配置数组（必填） |
| `activeTab` | `string` | - | 当前激活的标签页ID（必填） |
| `onTabChange` | `(tabId: string) => void` | - | 标签页切换回调（必填） |
| `renderTabContent` | `() => ReactNode` | - | 标签页内容渲染函数（必填） |
| `navigationTitle` | `string` | - | 导航栏标题（必填） |
| `navigationBackButtonColor` | `string` | - | 导航栏返回按钮颜色（可选） |
| `navigationActionButtons` | `ActionButton[]` | - | 导航栏操作按钮数组（可选） |
| `children` | `ReactNode` | - | 额外的子组件内容（可选） |

## 接口定义

### ThemeConfig 主题配置
```tsx
interface ThemeConfig {
    backgroundGradient: string;        // 背景渐变类名
    cardBorderColor: string;           // 卡片边框颜色类名
    recommendationGradient: string;    // 推荐度文字渐变类名
    progressBgColor: string;           // 进度条背景色类名
    progressGradient: string;          // 进度条渐变类名
    tabActiveGradient: string;         // 标签页激活状态渐变类名
    tabHoverBgColor: string;           // 标签页悬停背景色类名
    tabHoverTextColor: string;         // 标签页悬停文字颜色类名
    defaultIconGradient: string;       // 默认图标渐变类名
}
```

### TabConfig 标签页配置
```tsx
interface TabConfig {
    id: string;                        // 标签页唯一标识
    name: string;                      // 标签页显示名称
    icon: LucideIcon;                  // 标签页图标组件
}
```

### ActionButton 操作按钮配置
```tsx
interface ActionButton {
    icon: LucideIcon;                  // 按钮图标
    onClick: () => void;               // 点击事件
    isActive?: boolean;                // 是否激活状态
    activeColor?: string;              // 激活状态颜色
}
```

## 实际使用案例

### 二手交易页面（TradingDetail.tsx）
```tsx
import { Heart, Share2, BarChart3, LineChart, Zap, FileText } from 'lucide-react';
import DetailPageLayout from '../components/DetailPageLayout';
import { tradingTheme } from '../config/detailPageThemes';

const tabs = [
    { id: 'overview', name: '概览', icon: BarChart3 },
    { id: 'market', name: '分析', icon: LineChart },
    { id: 'platforms', name: '对比', icon: Zap },
    { id: 'tools', name: '文案', icon: FileText },
];

<DetailPageLayout
    title="您的物品"
    image={image}
    description={description || '待出售物品'}
    recommendationScore={90}
    recommendationLabel="交易推荐度"
    theme={tradingTheme}
    tabs={tabs}
    activeTab={activeTab}
    onTabChange={setActiveTab}
    renderTabContent={renderTabContent}
    navigationTitle="二手交易方案"
    navigationBackButtonColor="text-blue-600"
    navigationActionButtons={[
        {
            icon: Heart,
            onClick: () => setIsFavorited(!isFavorited),
            isActive: isFavorited,
            activeColor: 'text-red-500 fill-current'
        },
        {
            icon: Share2,
            onClick: handleShare
        }
    ]}
/>
```

### 回收捐赠页面（RecycleDetail.tsx）
```tsx
import { Heart, Share2, BarChart3, Map, Smartphone, Lightbulb } from 'lucide-react';
import DetailPageLayout from '../components/DetailPageLayout';
import { recycleTheme } from '../config/detailPageThemes';

const tabs = [
    { id: 'overview', name: '概览', icon: BarChart3 },
    { id: 'locations', name: '回收', icon: Map },
    { id: 'platforms', name: '平台', icon: Smartphone },
    { id: 'tips', name: '提示', icon: Lightbulb },
];

<DetailPageLayout
    title="您的物品"
    image={image}
    description={description || '待处置物品'}
    recommendationScore={70}
    recommendationLabel="回收推荐度"
    theme={recycleTheme}
    tabs={tabs}
    activeTab={activeTab}
    onTabChange={setActiveTab}
    renderTabContent={renderTabContent}
    navigationTitle="回收捐赠方案"
    navigationActionButtons={[
        {
            icon: Heart,
            onClick: () => setIsFavorited(!isFavorited),
            isActive: isFavorited,
            activeColor: 'text-red-500 fill-current'
        },
        {
            icon: Share2,
            onClick: handleShare
        }
    ]}
/>
```

### 创意改造页面（CreativeDetail.tsx）
```tsx
import { Heart, Share2, BarChart3, Settings, BookOpen, Lightbulb } from 'lucide-react';
import DetailPageLayout from '../components/DetailPageLayout';
import { creativeTheme } from '../config/detailPageThemes';

const tabs = [
    { id: 'overview', name: '概览', icon: BarChart3 },
    { id: 'steps', name: '步骤', icon: Settings },
    { id: 'tutorials', name: '教程', icon: BookOpen },
    { id: 'tips', name: '提示', icon: Lightbulb }
];

<DetailPageLayout
    title="您的物品"
    image={image}
    description={description || '待改造物品'}
    recommendationScore={85}
    recommendationLabel="改造推荐度"
    theme={creativeTheme}
    tabs={tabs}
    activeTab={activeTab}
    onTabChange={setActiveTab}
    renderTabContent={renderTabContent}
    navigationTitle="创意改造方案"
    navigationBackButtonColor="text-purple-600"
    navigationActionButtons={[
        {
            icon: Heart,
            onClick: () => setIsFavorited(!isFavorited),
            isActive: isFavorited,
            activeColor: 'text-red-500 fill-current'
        },
        {
            icon: Share2,
            onClick: handleShare
        }
    ]}
/>
```

## 设计原则

1. **统一性**：为所有详情页面提供一致的布局结构和交互体验
2. **主题化**：通过主题系统支持不同页面的视觉差异化
3. **可扩展性**：支持灵活的内容渲染和自定义配置
4. **复用性**：减少重复代码，提高开发效率
5. **类型安全**：完整的TypeScript类型定义
6. **响应式**：适配不同屏幕尺寸

## 主题系统

组件使用主题系统来支持不同页面的视觉风格：

### 预定义主题
- **tradingTheme**：蓝色系，适用于二手交易页面
- **recycleTheme**：绿色系，适用于回收捐赠页面  
- **creativeTheme**：紫色系，适用于创意改造页面

### 主题配置说明
- `backgroundGradient`：页面背景渐变
- `cardBorderColor`：卡片边框颜色
- `recommendationGradient`：推荐度文字渐变
- `progressBgColor`：进度条背景色
- `progressGradient`：进度条填充渐变
- `tabActiveGradient`：激活标签页的背景渐变
- `tabHoverBgColor`：标签页悬停背景色
- `tabHoverTextColor`：标签页悬停文字颜色
- `defaultIconGradient`：默认图标渐变（无图片时）

## 注意事项

1. **必填参数**：确保传入所有必填参数，特别是主题配置和标签页配置
2. **标签页ID**：`activeTab` 必须与 `tabs` 数组中的某个 `id` 匹配
3. **内容渲染**：`renderTabContent` 函数负责根据 `activeTab` 渲染对应内容
4. **主题一致性**：建议使用预定义主题以保持视觉一致性
5. **图标库**：所有图标都使用 Lucide React 图标库
6. **推荐度范围**：推荐度分数应在 0-100 之间
7. **响应式考虑**：内容渲染时需要考虑不同屏幕尺寸的适配

## 相关组件

- **NavigationBar**：集成的导航栏组件
- **主题配置文件**：`src/config/detailPageThemes.ts`
- **使用页面**：`TradingDetail.tsx`、`RecycleDetail.tsx`、`CreativeDetail.tsx` 