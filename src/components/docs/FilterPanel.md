# FilterPanel 筛选面板组件

一个可重复使用的筛选面板组件，支持多种筛选类型和灵活的配置选项。

## 功能特性

- ✅ 支持多个筛选组
- ✅ 三种按钮样式类型（默认、渐变、彩色）
- ✅ 可选图标支持
- ✅ 展开/收起动画
- ✅ 统一的绿色主题
- ✅ 毛玻璃背景效果
- ✅ 完全可定制的筛选选项

## 基础用法

### 1. 最简单的用法
```tsx
import FilterPanel, { FilterGroup } from '../components/FilterPanel';

const [isFilterOpen, setIsFilterOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState('all');

const filterGroups: FilterGroup[] = [
    {
        id: 'category',
        title: '分类',
        options: [
            { id: 'all', name: '全部' },
            { id: 'creative', name: '创意改造' },
            { id: 'recycle', name: '回收捐赠' },
            { id: 'trading', name: '二手交易' }
        ],
        selectedValue: selectedCategory,
        onSelect: setSelectedCategory
    }
];

<FilterPanel
    isOpen={isFilterOpen}
    onToggle={() => setIsFilterOpen(!isFilterOpen)}
    filterGroups={filterGroups}
/>
```

### 2. 带图标的筛选组
```tsx
import { Grid3X3, Palette, Recycle, ShoppingBag } from 'lucide-react';

const categoryFilterGroup: FilterGroup = {
    id: 'category',
    title: '处置类别',
    options: [
        { id: 'all', name: '全部', icon: Grid3X3, color: 'from-gray-500 to-gray-600' },
        { id: 'creative', name: '创意改造', icon: Palette, color: 'from-purple-500 to-pink-500' },
        { id: 'recycle', name: '回收捐赠', icon: Recycle, color: 'from-green-500 to-emerald-500' },
        { id: 'trading', name: '二手交易', icon: ShoppingBag, color: 'from-blue-500 to-cyan-500' }
    ],
    selectedValue: selectedCategory,
    onSelect: setSelectedCategory,
    type: 'gradient'
};
```

### 3. 多个筛选组
```tsx
const filterGroups: FilterGroup[] = [
    {
        id: 'category',
        title: '处置类别',
        options: categoryOptions,
        selectedValue: selectedCategory,
        onSelect: setSelectedCategory,
        type: 'gradient'
    },
    {
        id: 'contentType',
        title: '内容类型',
        options: contentTypeOptions,
        selectedValue: selectedContentType,
        onSelect: setSelectedContentType,
        type: 'colored'
    },
    {
        id: 'timeRange',
        title: '时间范围',
        options: timeOptions,
        selectedValue: selectedTimeRange,
        onSelect: setSelectedTimeRange,
        type: 'default'
    }
];
```

## API 参数

### FilterPanel Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `isOpen` | `boolean` | - | 筛选面板是否展开（必填） |
| `onToggle` | `() => void` | - | 切换展开状态的回调函数（必填） |
| `filterGroups` | `FilterGroup[]` | - | 筛选组配置数组（必填） |
| `className` | `string` | `""` | 额外的CSS类名 |
| `showAsDropdown` | `boolean` | `false` | 是否显示为下拉面板模式 |

### FilterGroup 接口

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string` | - | 筛选组唯一标识（必填） |
| `title` | `string` | - | 筛选组标题（必填） |
| `options` | `FilterOption[]` | - | 筛选选项数组（必填） |
| `selectedValue` | `string` | - | 当前选中的值（必填） |
| `onSelect` | `(value: string) => void` | - | 选择回调函数（必填） |
| `type` | `'default' \| 'gradient' \| 'colored'` | `'default'` | 按钮样式类型 |

### FilterOption 接口

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string` | - | 选项唯一标识（必填） |
| `name` | `string` | - | 选项显示名称（必填） |
| `icon` | `LucideIcon` | - | 选项图标（可选） |
| `color` | `string` | - | 渐变色类名（可选，仅在 type='gradient' 时使用） |

## 实际使用案例

### 收藏页面（Favorites.tsx）- 标准模式
```tsx
import FilterPanel, { FilterGroup } from '../components/FilterPanel';
import { Grid3X3, Palette, Recycle, ShoppingBag, ImageIcon, FileText } from 'lucide-react';

const filterGroups: FilterGroup[] = [
    {
        id: 'category',
        title: '处置类别',
        options: [
            { id: 'all', name: '全部', icon: Grid3X3, color: 'from-gray-500 to-gray-600' },
            { id: 'creative', name: '创意改造', icon: Palette, color: 'from-purple-500 to-pink-500' },
            { id: 'recycle', name: '回收捐赠', icon: Recycle, color: 'from-green-500 to-emerald-500' },
            { id: 'trading', name: '二手交易', icon: ShoppingBag, color: 'from-blue-500 to-cyan-500' }
        ],
        selectedValue: selectedCategory,
        onSelect: setSelectedCategory,
        type: 'gradient'
    },
    {
        id: 'contentType',
        title: '内容类型',
        options: [
            { id: 'all', name: '全部内容', icon: Grid3X3 },
            { id: 'image', name: '仅图片', icon: ImageIcon },
            { id: 'text', name: '仅文字', icon: FileText },
            { id: 'both', name: '图文混合', icon: Grid3X3 }
        ],
        selectedValue: selectedContentType,
        onSelect: setSelectedContentType,
        type: 'colored'
    },
    {
        id: 'timeRange',
        title: '收藏时间',
        options: [
            { id: 'all', name: '全部时间' },
            { id: 'today', name: '今天' },
            { id: 'week', name: '本周' },
            { id: 'month', name: '本月' },
            { id: 'year', name: '今年' }
        ],
        selectedValue: selectedTimeRange,
        onSelect: setSelectedTimeRange,
        type: 'default'
    }
];

// 使用标准模式，外部控制筛选按钮
<div className="px-4 mb-6">
    <div className="flex items-center justify-between">
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
    </div>
</div>

<FilterPanel
    isOpen={isFilterOpen}
    onToggle={() => setIsFilterOpen(!isFilterOpen)}
    filterGroups={filterGroups}
    showAsDropdown={false}
/>
```

### 历史记录页面（History.tsx）- 标准模式
```tsx
const filterGroups: FilterGroup[] = [
    {
        id: 'category',
        title: '内容分类',
        options: [
            { id: 'all', name: '全部', icon: Calendar, color: 'from-gray-500 to-gray-600' },
            { id: 'creative', name: '创意改造', icon: Palette, color: 'from-purple-500 to-pink-500' },
            { id: 'recycle', name: '捐赠回收', icon: Recycle, color: 'from-green-500 to-emerald-500' },
            { id: 'trading', name: '二手交易', icon: ShoppingBag, color: 'from-blue-500 to-cyan-500' }
        ],
        selectedValue: filterType,
        onSelect: (value) => setFilterType(value as FilterType),
        type: 'gradient'
    }
];

// 使用标准模式，外部控制筛选按钮和排序按钮
<div className="px-4 mb-6">
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-green-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <Filter className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">筛选</span>
            </button>
            <TimeSortButton
                sortOrder={timeSortOrder}
                onToggle={() => setTimeSortOrder(timeSortOrder === 'desc' ? 'asc' : 'desc')}
            />
            <button
                onClick={() => setSortType(sortType === 'time' ? 'category' : 'time')}
                className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-green-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
                {sortType === 'time' ? 
                    <Clock className="w-4 h-4 text-green-600" /> : 
                    <Tags className="w-4 h-4 text-green-600" />
                }
                <span className="text-sm text-gray-700">{sortType === 'time' ? '时间' : '分类'}</span>
            </button>
        </div>
    </div>
</div>

<FilterPanel
    isOpen={showFilters}
    onToggle={() => setShowFilters(!showFilters)}
    filterGroups={filterGroups}
    showAsDropdown={false}
/>
```

## 按钮样式类型

### 1. default（默认样式）
- 选中：紫色背景 (`bg-purple-500`)
- 未选中：灰色背景 (`bg-gray-100`)

### 2. gradient（渐变样式）
- 选中：使用 `option.color` 指定的渐变背景
- 未选中：灰色背景 (`bg-gray-100`)
- 适用于有品牌色彩的分类选项

### 3. colored（彩色样式）
- 选中：蓝色背景 (`bg-blue-500`)
- 未选中：灰色背景 (`bg-gray-100`)

## 显示模式

### 1. 标准模式（showAsDropdown=false）
- 只显示筛选面板内容，不包含筛选按钮
- 面板展开时占用完整宽度
- 适用于需要外部控制筛选按钮的页面

### 2. 下拉模式（showAsDropdown=true）
- 筛选面板以下拉菜单形式显示
- 面板绝对定位，不影响页面布局
- 适用于需要与其他按钮并排显示的场景

## 设计特点

1. **层次清晰**：筛选按钮和面板有明确的视觉层次
2. **一致的主题**：绿色图标配色，与应用整体风格保持一致
3. **毛玻璃效果**：面板使用半透明背景和毛玻璃效果
4. **灵活配置**：支持多种按钮样式和图标配置
5. **双重模式**：支持标准模式和下拉模式，适应不同布局需求

## 样式说明

- **筛选按钮**：绿色主题，与 TimeSortButton 样式保持一致
- **面板背景**：半透明白色 + 毛玻璃效果
- **选项按钮**：根据 type 类型应用不同的选中样式
- **动画效果**：展开/收起有平滑的过渡动画

## 注意事项

1. 所有状态都需要外部管理，组件为完全受控组件
2. `FilterGroup` 的 `type` 属性决定按钮的选中样式
3. 渐变样式需要在 `FilterOption` 中提供 `color` 属性
4. 标准模式包含外边距样式，下拉模式不包含
5. 下拉模式的面板宽度为 `min-w-80`，确保有足够的显示空间
6. 下拉面板使用 `z-10` 层级，确保在其他元素之上显示 