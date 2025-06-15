# SearchBox 搜索框组件

一个可重复使用的搜索框组件，提供统一的搜索体验和样式。

## 功能特性

- ✅ 统一的搜索图标样式（绿色主题）
- ✅ 自动清除按钮（当有输入内容时显示）
- ✅ 可自定义占位符文本
- ✅ 响应式设计
- ✅ 焦点状态视觉反馈
- ✅ 平滑的动画过渡效果

## 基础用法

### 1. 最简单的用法
```tsx
import SearchBox from '../components/SearchBox';

const [searchQuery, setSearchQuery] = useState('');

<SearchBox
    value={searchQuery}
    onChange={setSearchQuery}
/>
```

### 2. 自定义占位符
```tsx
<SearchBox
    value={searchQuery}
    onChange={setSearchQuery}
    placeholder="搜索收藏内容..."
/>
```

### 3. 自定义样式
```tsx
<SearchBox
    value={searchQuery}
    onChange={setSearchQuery}
    placeholder="搜索历史记录..."
    className="mb-6"
/>
```

## API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string` | - | 搜索框的值（必填） |
| `onChange` | `(value: string) => void` | - | 值变化时的回调函数（必填） |
| `placeholder` | `string` | `"搜索内容..."` | 占位符文本 |
| `className` | `string` | `""` | 额外的CSS类名 |

## 实际使用案例

### 收藏页面（Favorites.tsx）
```tsx
<SearchBox
    value={searchQuery}
    onChange={setSearchQuery}
    placeholder="搜索收藏内容..."
/>
```

### 历史记录页面（History.tsx）
```tsx
<SearchBox
    value={searchQuery}
    onChange={setSearchQuery}
    placeholder="搜索历史记录..."
/>
```

## 设计特点

1. **一致的视觉风格**：使用绿色主题的搜索图标，与应用整体风格保持一致
2. **用户友好**：提供清除按钮，方便用户快速清空搜索内容
3. **响应式交互**：焦点状态有明显的视觉反馈，包括阴影和边框变化
4. **平滑动画**：所有状态变化都有平滑的过渡效果

## 样式说明

- **搜索图标**：使用 `text-green-500` 颜色，位于输入框左侧
- **输入框**：圆角设计（`rounded-2xl`），带有阴影效果
- **清除按钮**：仅在有输入内容时显示，悬停时有背景色变化
- **焦点状态**：绿色边框和阴影，提供清晰的视觉反馈

## 注意事项

1. 组件使用受控模式，需要外部管理 `value` 状态
2. 搜索图标颜色固定为绿色主题，保持应用一致性
3. 清除按钮会自动显示/隐藏，无需手动控制
4. 组件已包含外边距样式，使用时注意布局间距 