# TimeSortButton 时间排序按钮组件

一个可重复使用的时间排序按钮组件，提供升序和降序切换功能。

## 功能特性

- ✅ 升序/降序图标自动切换
- ✅ 统一的绿色主题样式
- ✅ 毛玻璃背景效果
- ✅ 悬停状态阴影增强
- ✅ 平滑的动画过渡效果
- ✅ 可自定义样式

## 基础用法

### 1. 最简单的用法
```tsx
import TimeSortButton from '../components/TimeSortButton';

const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

<TimeSortButton
    sortOrder={sortOrder}
    onToggle={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
/>
```

### 2. 自定义样式
```tsx
<TimeSortButton
    sortOrder={sortOrder}
    onToggle={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
    className="ml-2"
/>
```

### 3. 与其他按钮组合使用
```tsx
<div className="flex items-center space-x-2">
    <FilterButton onClick={toggleFilter} />
    <TimeSortButton
        sortOrder={sortOrder}
        onToggle={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
    />
</div>
```

## API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sortOrder` | `'asc' \| 'desc'` | - | 当前排序方向（必填） |
| `onToggle` | `() => void` | - | 点击切换时的回调函数（必填） |
| `className` | `string` | `""` | 额外的CSS类名 |

## 实际使用案例

### 收藏页面（Favorites.tsx）
```tsx
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

<div className="flex items-center space-x-2">
    <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-green-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
        <Filter className="w-4 h-4 text-green-600" />
        <span className="text-sm text-gray-700">筛选</span>
    </button>
    <TimeSortButton
        sortOrder={sortOrder}
        onToggle={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
    />
</div>
```

### 历史记录页面（History.tsx）
```tsx
// 可以与其他排序选项结合使用
const [sortType, setSortType] = useState<'time' | 'category'>('time');
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

{sortType === 'time' && (
    <TimeSortButton
        sortOrder={sortOrder}
        onToggle={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
    />
)}
```

## 设计特点

1. **直观的图标**：使用 `SortDesc` 和 `SortAsc` 图标清晰表示排序方向
2. **一致的主题**：绿色图标配色，与应用整体风格保持一致
3. **毛玻璃效果**：使用 `backdrop-blur-sm` 创建现代化的视觉效果
4. **交互反馈**：悬停时阴影增强，提供良好的用户体验

## 样式说明

- **背景**：半透明白色背景 (`bg-white/90`) + 毛玻璃效果
- **边框**：淡绿色边框 (`border-green-100`)
- **图标**：绿色主题 (`text-green-600`)
- **圆角**：中等圆角 (`rounded-xl`)
- **阴影**：基础阴影，悬停时增强 (`shadow-lg hover:shadow-xl`)

## 图标说明

- **降序 (desc)**：显示 `SortDesc` 图标（箭头向下）
- **升序 (asc)**：显示 `SortAsc` 图标（箭头向上）

## 注意事项

1. 组件使用受控模式，需要外部管理 `sortOrder` 状态
2. 图标颜色固定为绿色主题，保持应用一致性
3. 按钮样式与筛选按钮保持一致，适合组合使用
4. 点击事件需要外部处理排序逻辑 