# NavigationBar 导航栏组件

一个可重复使用的顶部导航栏组件，支持左边返回按钮、中间标题、右边操作按钮的灵活配置。

## 功能特性

- ✅ 左侧返回按钮（可自定义返回逻辑）
- ✅ 中间标题显示（支持自定义内容）
- ✅ 右侧操作按钮组（支持多个按钮）
- ✅ 按钮状态管理（激活状态、颜色变化）
- ✅ 完全可定制的样式
- ✅ 响应式设计
- ✅ 无障碍访问支持

## 基础用法

### 1. 最简单的用法
```tsx
import NavigationBar from '../components/NavigationBar';

<NavigationBar title="页面标题" />
```

### 2. 带操作按钮的用法
```tsx
import { Heart, Share2 } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

<NavigationBar
    title="详情页面"
    actionButtons={[
        {
            icon: Heart,
            onClick: () => console.log('收藏'),
        },
        {
            icon: Share2,
            onClick: () => console.log('分享'),
        }
    ]}
/>
```

### 3. 自定义返回逻辑
```tsx
<NavigationBar
    title="特殊页面"
    onBack={() => {
        // 自定义返回逻辑
        if (hasUnsavedChanges) {
            showConfirmDialog();
        } else {
            navigate(-1);
        }
    }}
/>
```

### 4. 带状态的操作按钮
```tsx
const [isFavorited, setIsFavorited] = useState(false);

<NavigationBar
    title="收藏页面"
    actionButtons={[
        {
            icon: Heart,
            onClick: () => setIsFavorited(!isFavorited),
            isActive: isFavorited,
            activeColor: 'text-red-500 fill-current'
        }
    ]}
/>
```

### 5. 自定义样式
```tsx
<NavigationBar
    title="自定义页面"
    className="bg-gradient-to-r from-purple-50 to-pink-50"
    titleClassName="text-purple-800 font-bold"
    backButtonColor="text-purple-600"
    backButtonClassName="hover:bg-purple-100"
/>
```

### 6. 自定义中间内容
```tsx
<NavigationBar
    title="" // 传空字符串
    centerContent={
        <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-lg">品牌名称</span>
        </div>
    }
/>
```

### 7. 隐藏返回按钮
```tsx
<NavigationBar
    title="首页"
    showBackButton={false}
    actionButtons={[
        {
            icon: Settings,
            onClick: () => navigate('/settings'),
        }
    ]}
/>
```

## API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 导航栏标题（必填） |
| `onBack` | `() => void` | `navigate(-1)` | 自定义返回逻辑 |
| `showBackButton` | `boolean` | `true` | 是否显示返回按钮 |
| `actionButtons` | `ActionButton[]` | `[]` | 右侧操作按钮数组 |
| `className` | `string` | `''` | 导航栏容器自定义样式 |
| `titleClassName` | `string` | `''` | 标题自定义样式 |
| `backButtonClassName` | `string` | `''` | 返回按钮自定义样式 |
| `backButtonColor` | `string` | `'text-green-600'` | 返回按钮图标颜色 |
| `centerContent` | `React.ReactNode` | - | 中间自定义内容（会替换标题） |

## ActionButton 接口

```tsx
interface ActionButton {
    icon: LucideIcon;           // 图标组件
    onClick: () => void;        // 点击事件
    className?: string;         // 自定义样式
    isActive?: boolean;         // 是否激活状态
    activeColor?: string;       // 激活状态颜色
}
```

## 实际使用案例

### 概览页面（Overview.tsx）
```tsx
<NavigationBar
    title="处置建议"
    actionButtons={[
        {
            icon: Upload,
            onClick: () => navigate('/'),
            className: 'active:scale-95 transition-all duration-200'
        },
        {
            icon: RefreshCw,
            onClick: () => window.location.reload(),
            className: 'active:scale-95 transition-all duration-200'
        }
    ]}
    backButtonClassName="active:scale-95 transition-all duration-200"
/>
```

### 详情页面（RecycleDetail.tsx）
```tsx
<NavigationBar
    title="回收捐赠方案"
    actionButtons={[
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
<NavigationBar
    title="创意改造方案"
    backButtonColor="text-purple-600"
    actionButtons={[
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

1. **一致性**：所有页面使用统一的导航栏样式和交互
2. **灵活性**：支持多种配置方式，适应不同页面需求
3. **可访问性**：支持键盘导航和屏幕阅读器
4. **响应式**：在不同屏幕尺寸下都能正常工作
5. **性能优化**：避免不必要的重渲染

## 注意事项

1. 如果不传 `actionButtons` 且显示返回按钮，会自动添加占位符保持标题居中
2. `centerContent` 会完全替换标题，使用时需要自己处理样式
3. 所有图标都使用 Lucide React 图标库
4. 默认的返回逻辑是 `navigate(-1)`，可以通过 `onBack` 自定义
5. 按钮的激活状态需要手动管理，组件不会自动处理状态 