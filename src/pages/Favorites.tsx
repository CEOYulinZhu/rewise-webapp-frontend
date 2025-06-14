import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Heart,
    Calendar,
    Palette,
    Recycle,
    ShoppingBag,
    Image as ImageIcon,
    FileText,
    Filter,
    Grid3X3,
    List,
    Trash2,
    Check,
    X,
    Search,
    SortAsc,
    SortDesc,
    CheckSquare
} from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

// 收藏项数据类型
interface FavoriteItem {
    id: string;
    title: string;
    content?: string; // 文字内容
    image?: string; // 图片URL
    category: 'creative' | 'recycle' | 'trading'; // 处置路径
    contentType: 'image' | 'text' | 'both'; // 内容类型
    createdAt: string; // 收藏时间
    originalRoute: string; // 原始详情页路由
    state?: any; // 用于跳转时传递的状态
}

// 分类选项
const categoryOptions = [
    { id: 'all', name: '全部', icon: Grid3X3, color: 'from-gray-500 to-gray-600' },
    { id: 'creative', name: '创意改造', icon: Palette, color: 'from-purple-500 to-pink-500' },
    { id: 'recycle', name: '回收捐赠', icon: Recycle, color: 'from-green-500 to-emerald-500' },
    { id: 'trading', name: '二手交易', icon: ShoppingBag, color: 'from-blue-500 to-cyan-500' }
];

const contentTypeOptions = [
    { id: 'all', name: '全部内容', icon: Grid3X3 },
    { id: 'image', name: '仅图片', icon: ImageIcon },
    { id: 'text', name: '仅文字', icon: FileText },
    { id: 'both', name: '图文混合', icon: Grid3X3 }
];

const timeOptions = [
    { id: 'all', name: '全部时间' },
    { id: 'today', name: '今天' },
    { id: 'week', name: '本周' },
    { id: 'month', name: '本月' },
    { id: 'year', name: '今年' }
];

const Favorites: React.FC = () => {
    const navigate = useNavigate();

    // 模拟收藏数据
    const [favorites] = useState<FavoriteItem[]>([
        {
            id: '1',
            title: '旧书桌创意改造',
            content: '将废旧书桌改造成现代化的工作台，增加收纳功能',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
            category: 'creative',
            contentType: 'both',
            createdAt: '2024-01-15T10:30:00Z',
            originalRoute: '/detail/creative',
            state: {
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
                description: '将废旧书桌改造成现代化的工作台，增加收纳功能'
            }
        },
        {
            id: '2',
            title: '衣物回收捐赠点',
            content: '附近的爱心衣物捐赠点，可以将不需要的衣物捐赠给需要的人',
            category: 'recycle',
            contentType: 'text',
            createdAt: '2024-01-10T14:20:00Z',
            originalRoute: '/detail/recycle',
            state: { description: '附近的爱心衣物捐赠点，可以将不需要的衣物捐赠给需要的人' }
        },
        {
            id: '3',
            title: '电子产品交易方案',
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
            category: 'trading',
            contentType: 'image',
            createdAt: '2024-01-08T09:45:00Z',
            originalRoute: '/detail/trading',
            state: {
                image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
                description: '智能手机二手交易最佳方案'
            }
        },
        {
            id: '4',
            title: '古董家具拍卖图片',
            image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
            category: 'trading',
            contentType: 'image',
            createdAt: '2024-01-07T13:25:00Z',
            originalRoute: '/detail/trading',
            state: {
                image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
                description: '古董家具在线拍卖'
            }
        },
        {
            id: '5',
            title: '塑料瓶环保创意',
            content: '用废弃塑料瓶制作简易花盆和收纳盒',
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
            category: 'creative',
            contentType: 'both',
            createdAt: '2024-01-05T16:10:00Z',
            originalRoute: '/detail/creative',
            state: {
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
                description: '用废弃塑料瓶制作简易花盆和收纳盒'
            }
        },
        {
            id: '6',
            title: '图书捐赠活动',
            content: '社区图书捐赠活动，让知识传递爱心',
            category: 'recycle',
            contentType: 'text',
            createdAt: '2024-01-03T11:30:00Z',
            originalRoute: '/detail/recycle',
            state: { description: '社区图书捐赠活动，让知识传递爱心' }
        }
    ]);

    // 状态管理
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedContentType, setSelectedContentType] = useState<string>('all');
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // 筛选和排序逻辑
    const filteredFavorites = useMemo(() => {
        let filtered = favorites;

        // 按类别筛选
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // 按内容类型筛选
        if (selectedContentType !== 'all') {
            filtered = filtered.filter(item => item.contentType === selectedContentType);
        }

        // 按时间范围筛选
        if (selectedTimeRange !== 'all') {
            const now = new Date();

            filtered = filtered.filter(item => {
                const createdAt = new Date(item.createdAt);

                switch (selectedTimeRange) {
                    case 'today':
                        return createdAt.toDateString() === now.toDateString();
                    case 'week':
                        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                        return createdAt >= weekAgo;
                    case 'month':
                        return createdAt.getMonth() === now.getMonth() &&
                            createdAt.getFullYear() === now.getFullYear();
                    case 'year':
                        return createdAt.getFullYear() === now.getFullYear();
                    default:
                        return true;
                }
            });
        }

        // 按搜索关键词筛选
        if (searchQuery.trim()) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // 按时间排序
        filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
        });

        return filtered;
    }, [favorites, selectedCategory, selectedContentType, selectedTimeRange, searchQuery, sortOrder]);

    // 获取分类图标和颜色
    const getCategoryInfo = (category: string) => {
        const categoryMap = {
            creative: { icon: Palette, color: 'from-purple-500 to-pink-500', name: '创意改造' },
            recycle: { icon: Recycle, color: 'from-green-500 to-emerald-500', name: '回收捐赠' },
            trading: { icon: ShoppingBag, color: 'from-blue-500 to-cyan-500', name: '二手交易' }
        };
        return categoryMap[category as keyof typeof categoryMap];
    };

    // 格式化时间
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    };

    // 处理收藏项点击
    const handleItemClick = (item: FavoriteItem) => {
        if (isSelectionMode) {
            toggleItemSelection(item.id);
        } else {
            navigate(item.originalRoute, { state: item.state });
        }
    };

    // 切换选择状态
    const toggleItemSelection = (itemId: string) => {
        const newSelection = new Set(selectedItems);
        if (newSelection.has(itemId)) {
            newSelection.delete(itemId);
        } else {
            newSelection.add(itemId);
        }
        setSelectedItems(newSelection);
    };

    // 全选/取消全选
    const toggleSelectAll = () => {
        if (selectedItems.size === filteredFavorites.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(filteredFavorites.map(item => item.id)));
        }
    };

    // 批量删除
    const handleBatchDelete = () => {
        if (selectedItems.size > 0) {
            // 这里应该调用API删除选中的收藏项
            console.log('删除收藏项:', Array.from(selectedItems));
            setSelectedItems(new Set());
            setIsSelectionMode(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* 顶部导航 */}
            <NavigationBar
                title="我的收藏"
                centerContent={
                    <div className="flex items-center space-x-2">
                        <h1 className="text-lg font-semibold text-gray-800">我的收藏</h1>
                        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                            {favorites.length}
                        </span>
                    </div>
                }
                actionButtons={[
                    {
                        icon: isSelectionMode ? X : CheckSquare,
                        onClick: () => {
                            if (isSelectionMode) {
                                setIsSelectionMode(false);
                                setSelectedItems(new Set());
                            } else {
                                setIsSelectionMode(true);
                            }
                        },
                        className: "hover:shadow-xl transition-all duration-300"
                    }
                ]}
            />

            {/* 搜索栏 */}
            <div className="px-4 mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    <input
                        type="text"
                        placeholder="搜索收藏内容..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 bg-white border border-green-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-300 focus:shadow-xl transition-all duration-300"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            title="清除搜索"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                    )}
                </div>
            </div>

            {/* 筛选和视图切换 */}
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
                        <button
                            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                            className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-green-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {sortOrder === 'desc' ?
                                <SortDesc className="w-4 h-4 text-green-600" /> :
                                <SortAsc className="w-4 h-4 text-green-600" />
                            }
                            <span className="text-sm text-gray-700">时间</span>
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-white/90 text-gray-600 hover:bg-green-50'
                                }`}
                        >
                            <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-white/90 text-gray-600 hover:bg-green-50'
                                }`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* 筛选面板 */}
                {isFilterOpen && (
                    <div className="mt-4 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100">
                        {/* 按类别筛选 */}
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">处置类别</h3>
                            <div className="flex flex-wrap gap-2">
                                {categoryOptions.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => setSelectedCategory(option.id)}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 ${selectedCategory === option.id
                                                ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="text-sm">{option.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 按内容类型筛选 */}
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">内容类型</h3>
                            <div className="flex flex-wrap gap-2">
                                {contentTypeOptions.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => setSelectedContentType(option.id)}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 ${selectedContentType === option.id
                                                ? 'bg-blue-500 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="text-sm">{option.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 按时间筛选 */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">收藏时间</h3>
                            <div className="flex flex-wrap gap-2">
                                {timeOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setSelectedTimeRange(option.id)}
                                        className={`px-3 py-2 rounded-xl transition-all duration-300 ${selectedTimeRange === option.id
                                            ? 'bg-purple-500 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        <span className="text-sm">{option.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 批量操作工具栏 */}
            {isSelectionMode && (
                <div className="px-4 mb-4">
                    <div className="flex items-center justify-between p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={toggleSelectAll}
                                className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-xl"
                            >
                                <Check className="w-4 h-4" />
                                <span className="text-sm">
                                    {selectedItems.size === filteredFavorites.length ? '取消全选' : '全选'}
                                </span>
                            </button>
                            <span className="text-sm text-gray-600">
                                已选择 {selectedItems.size} 项
                            </span>
                        </div>
                        <button
                            onClick={handleBatchDelete}
                            disabled={selectedItems.size === 0}
                            className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">删除</span>
                        </button>
                    </div>
                </div>
            )}

            {/* 收藏列表 */}
            <div className="px-4 pb-8">
                {filteredFavorites.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">暂无收藏内容</h3>
                        <p className="text-gray-600 mb-6">收藏您感兴趣的处置方案，方便随时查看</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            去发现内容
                        </button>
                    </div>
                ) : (
                    <div className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                            : 'space-y-4'
                    }>
                        {filteredFavorites.map((item) => {
                            const categoryInfo = getCategoryInfo(item.category);
                            const CategoryIcon = categoryInfo?.icon;
                            const isSelected = selectedItems.has(item.id);

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    className={`relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border transition-all duration-300 cursor-pointer group ${isSelected
                                        ? 'border-green-500 ring-2 ring-green-200'
                                        : 'border-green-100 hover:border-green-200 hover:shadow-2xl'
                                        } ${viewMode === 'list' ? 'p-4' : 'p-4'
                                        }`}
                                >
                                    {/* 选择指示器 */}
                                    {isSelectionMode && (
                                        <div className={`absolute ${viewMode === 'list' ? 'top-2 right-2' : 'top-2 right-2'} w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${isSelected
                                            ? 'bg-green-500 border-green-500'
                                            : 'bg-white border-gray-300'
                                            }`}>
                                            {isSelected && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                    )}

                                    <div className={viewMode === 'list' ? 'flex items-center space-x-4' : ''}>
                                        {/* 图片区域 */}
                                        {item.image && (
                                            <div className={viewMode === 'list' ? 'w-16 h-16 flex-shrink-0' : 'w-full h-32 mb-3'}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            </div>
                                        )}

                                        {/* 内容区域 */}
                                        <div className="flex-1">
                                            {/* 标题和类别 */}
                                            <div className={`flex ${viewMode === 'list' ? 'items-start' : 'items-start'} ${isSelectionMode ? 'pr-8' : 'pr-0'}`}>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-300 mb-1">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                                {CategoryIcon && !isSelectionMode && (
                                                    <div className={`ml-3 ${viewMode === 'list' ? 'mt-[-9px]' : ''} p-2 rounded-lg bg-gradient-to-r ${categoryInfo.color} shadow-lg flex-shrink-0`}>
                                                        <CategoryIcon className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* 文字内容 */}
                                            {item.content && (
                                                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                                    {item.content}
                                                </p>
                                            )}

                                            {/* 底部信息 */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2 flex-wrap">
                                                    {/* 内容类型标签 */}
                                                    <span className={`text-xs px-2 py-1 rounded-full ${item.contentType === 'image' ? 'bg-blue-100 text-blue-700' :
                                                        item.contentType === 'text' ? 'bg-purple-100 text-purple-700' :
                                                            'bg-orange-100 text-orange-700'
                                                        }`}>
                                                        {item.contentType === 'image' ? '图片' :
                                                            item.contentType === 'text' ? '文字' : '图文'}
                                                    </span>

                                                    {/* 处置类别标签 */}
                                                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                                        {categoryInfo?.name}
                                                    </span>

                                                    {/* 选择模式下显示类别图标 */}
                                                    {CategoryIcon && isSelectionMode && (
                                                        <div className={`p-1 rounded-md bg-gradient-to-r ${categoryInfo.color} shadow-sm`}>
                                                            <CategoryIcon className="w-3 h-3 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* 收藏时间 */}
                                                <div className="flex items-center space-x-1 ml-2">
                                                    <Calendar className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                                        {formatDate(item.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>


        </div>
    );
};

export default Favorites;