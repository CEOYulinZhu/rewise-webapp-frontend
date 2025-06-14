# RecommendationCard 推荐方案卡片组件

一个可折叠的推荐方案卡片组件，用于展示物品处置建议，支持展开/收起详细信息，具有美观的渐变设计和交互效果。

## 功能特性

- ✅ 折叠式设计（基础信息始终显示，详细信息可展开/收起）
- ✅ 优先级徽章显示（强烈推荐、推荐、一般推荐）
- ✅ 渐变背景和主题色系统
- ✅ 推荐度进度条可视化
- ✅ 关键信息展示（预计耗时、操作难度）
- ✅ 推荐理由标签云
- ✅ 完整的交互反馈
- ✅ 无障碍访问支持
- ✅ 移动端优化

## 基础用法

### 1. 基本使用
```tsx
import RecommendationCard from '../components/RecommendationCard';
import { Palette } from 'lucide-react';

const recommendation = {
    id: 'creative',
    title: '创意改造',
    subtitle: '让旧物焕发新生命',
    percentage: 85,
    priority: 'highest',
    estimatedTime: '2-3天',
    difficulty: '简单',
    reasons: ['改造潜力大', '实用性强', '成本较低', '创意空间足'],
    icon: Palette,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    shadowColor: 'shadow-purple-200/50',
    borderColor: 'border-purple-100',
    route: '/detail/creative'
};

const priorityBadge = {
    text: '强烈推荐',
    color: 'bg-gradient-to-r from-amber-400 to-orange-400 text-white',
    icon: Sparkles
};

<RecommendationCard
    recommendation={recommendation}
    isExpanded={false}
    onToggle={() => console.log('切换展开状态')}
    onDetailClick={() => console.log('查看详情')}
    priorityBadge={priorityBadge}
    progressColor="from-purple-400 to-pink-400"
/>
```

### 2. 在Overview页面中的实际使用
```tsx
// Overview.tsx 中的使用示例
{recommendations.map((rec) => (
    <RecommendationCard
        key={rec.id}
        recommendation={rec}
        isExpanded={expandedCards.has(rec.id)}
        onToggle={() => toggleCard(rec.id)}
        onDetailClick={() => handleDetailClick(rec.route, rec)}
        priorityBadge={getPriorityBadge(rec.priority)}
        progressColor={getProgressColor(rec.id)}
    />
))}
```

### 3. 状态管理示例
```tsx
const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
        newExpanded.delete(cardId);
    } else {
        newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
};
```

## API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `recommendation` | `RecommendationData` | - | 推荐方案数据（必填） |
| `isExpanded` | `boolean` | - | 是否展开详细信息（必填） |
| `onToggle` | `() => void` | - | 展开/收起切换回调（必填） |
| `onDetailClick` | `() => void` | - | 查看详情按钮点击回调（必填） |
| `priorityBadge` | `PriorityBadge` | - | 优先级徽章配置（必填） |
| `progressColor` | `string` | - | 进度条颜色类名（必填） |

## 数据接口

### RecommendationData 接口
```tsx
interface RecommendationData {
    id: string;                 // 唯一标识符
    title: string;              // 方案标题
    subtitle: string;           // 方案副标题
    percentage: number;         // 推荐度百分比 (0-100)
    priority: string;           // 优先级 ('highest' | 'high' | 'medium')
    estimatedTime: string;      // 预计耗时
    difficulty: string;         // 操作难度
    reasons: string[];          // 推荐理由数组
    icon: LucideIcon;          // 图标组件
    gradient: string;          // 主渐变色类名
    bgGradient: string;        // 背景渐变色类名
    shadowColor: string;       // 阴影颜色类名
    borderColor: string;       // 边框颜色类名
    route: string;             // 详情页路由
}
```

### PriorityBadge 接口
```tsx
interface PriorityBadge {
    text: string;              // 徽章文本
    color: string;             // 徽章颜色类名
    icon: LucideIcon;         // 徽章图标
}
```

## 主题色系统

### 创意改造主题（紫色系）
```tsx
{
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    shadowColor: 'shadow-purple-200/50',
    borderColor: 'border-purple-100',
    progressColor: 'from-purple-400 to-pink-400'
}
```

### 回收捐赠主题（绿色系）
```tsx
{
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    shadowColor: 'shadow-green-200/50',
    borderColor: 'border-green-100',
    progressColor: 'from-green-400 to-emerald-400'
}
```

### 二手交易主题（蓝色系）
```tsx
{
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    shadowColor: 'shadow-blue-200/50',
    borderColor: 'border-blue-100',
    progressColor: 'from-blue-400 to-cyan-400'
}
```

## 优先级配置

### 强烈推荐 (highest)
```tsx
{
    text: '强烈推荐',
    color: 'bg-gradient-to-r from-amber-400 to-orange-400 text-white',
    icon: Sparkles
}
```

### 推荐 (high)
```tsx
{
    text: '推荐',
    color: 'bg-gradient-to-r from-green-400 to-emerald-400 text-white',
    icon: TrendingUp
}
```

### 一般推荐 (medium)
```tsx
{
    text: '一般推荐',
    color: 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white',
    icon: Clock
}
```

## 组件结构

### 基础信息区域（始终显示）
- 方案图标（带光环效果）
- 方案标题和副标题
- 推荐度百分比
- 展开/收起按钮

### 详细信息区域（可折叠）
- 推荐度进度条（带光泽动画）
- 关键信息卡片（预计耗时、操作难度）
- 推荐理由标签云

### 操作区域（始终显示）
- 查看详细方案按钮

## 交互设计

### 展开/收起动画
- 使用 `max-height` 和 `opacity` 实现平滑过渡
- 动画时长：300ms
- 缓动函数：`ease-in-out`

### 按钮反馈
- 展开按钮：`active:scale-95`
- 详情按钮：`active:scale-95`
- 过渡时长：200ms

### 进度条动画
- 宽度动画：1000ms `ease-out`
- 光泽效果：`animate-pulse`

## 无障碍支持

### ARIA 标签
```tsx
// 展开按钮
aria-label={isExpanded ? '收起详细信息' : '展开详细信息'}

// 详情按钮
aria-label={`查看${rec.title}详细方案`}
```

### 键盘导航
- 所有按钮支持键盘焦点
- Tab 键顺序合理
- Enter/Space 键激活

## 性能优化

### 条件渲染
- 详细信息区域使用条件渲染
- 避免不必要的DOM节点

### CSS优化
- 使用 `transform` 代替位置变化
- 利用 `backdrop-blur` 实现毛玻璃效果
- 合理使用 `transition` 属性

## 设计原则

1. **渐进式信息展示**：重要信息优先显示，详细信息按需展开
2. **视觉层次清晰**：通过颜色、大小、间距建立信息层次
3. **交互反馈及时**：所有交互都有明确的视觉反馈
4. **主题色一致性**：每个方案都有独立但协调的配色系统
5. **移动端优化**：专为触摸交互设计，无悬浮效果

## 注意事项

1. **图标依赖**：需要安装 `lucide-react` 图标库
2. **Tailwind CSS**：依赖 Tailwind CSS 的工具类
3. **状态管理**：组件本身不管理展开状态，需要父组件传入
4. **数据完整性**：确保传入的 `recommendation` 数据完整
5. **颜色类名**：确保传入的颜色类名在 Tailwind 配置中存在
6. **单一职责**：组件专注于展示，不处理数据获取和路由跳转逻辑

## 使用场景

- ✅ 物品处置建议展示
- ✅ 方案对比和选择
- ✅ 信息密集型卡片展示
- ✅ 需要折叠功能的内容卡片
- ❌ 简单的信息展示（过于复杂）
- ❌ 非推荐类型的内容展示 