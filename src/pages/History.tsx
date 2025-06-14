import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Clock,
    Filter,
    Search,
    Calendar,
    Image as ImageIcon,
    Type,
    Camera,
    Recycle,
    Palette,
    ShoppingBag,
    ChevronDown,
    ChevronUp,
    Trash2,
    Check,
    X,
    CheckSquare
} from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import type { HistoryItem, DisposalPath, SortType, FilterType } from '../types/preferences';

const History: React.FC = () => {
    const navigate = useNavigate();

    // 状态管理
    const [searchQuery, setSearchQuery] = useState('');
    const [sortType, setSortType] = useState<SortType>('time');
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // 模拟历史数据
    const [historyData, setHistoryData] = useState<HistoryItem[]>([
        {
            id: '1',
            type: 'both',
            image: '/api/placeholder/300/200',
            text: '一把旧椅子，椅背有点松动但还能用',
            timestamp: new Date('2024-01-15T14:30:00'),
            category: 'creative',
            paths: [
                {
                    id: 'creative',
                    title: '创意改造',
                    subtitle: '变身新家具',
                    percentage: 85,
                    description: '修复椅背，重新上漆',
                    icon: Palette,
                    gradient: 'from-purple-500 to-pink-500',
                    route: '/detail/creative'
                },
                {
                    id: 'trading',
                    title: '二手交易',
                    subtitle: '转让给他人',
                    percentage: 70,
                    description: '在二手市场出售',
                    icon: ShoppingBag,
                    gradient: 'from-blue-500 to-cyan-500',
                    route: '/detail/trading'
                },
                {
                    id: 'recycle',
                    title: '捐赠回收',
                    subtitle: '分类回收处理',
                    percentage: 60,
                    description: '拆解后分类回收',
                    icon: Recycle,
                    gradient: 'from-green-500 to-emerald-500',
                    route: '/detail/recycle'
                }
            ]
        },
        {
            id: '2',
            type: 'image',
            image: '/api/placeholder/300/200',
            timestamp: new Date('2024-01-14T10:15:00'),
            category: 'recycle',
            paths: [
                {
                    id: 'recycle',
                    title: '捐赠回收',
                    subtitle: '分类回收处理',
                    percentage: 90,
                    description: '电子产品专业回收',
                    icon: Recycle,
                    gradient: 'from-green-500 to-emerald-500',
                    route: '/detail/recycle'
                },
                {
                    id: 'trading',
                    title: '二手交易',
                    subtitle: '转让给他人',
                    percentage: 65,
                    description: '如果功能正常可以转让',
                    icon: ShoppingBag,
                    gradient: 'from-blue-500 to-cyan-500',
                    route: '/detail/trading'
                },
                {
                    id: 'creative',
                    title: '创意改造',
                    subtitle: '变身新物品',
                    percentage: 40,
                    description: '拆解零件用于DIY',
                    icon: Palette,
                    gradient: 'from-purple-500 to-pink-500',
                    route: '/detail/creative'
                }
            ]
        },
        {
            id: '3',
            type: 'text',
            text: '几本旧教科书，内容还比较新',
            timestamp: new Date('2024-01-13T16:45:00'),
            category: 'trading',
            paths: [
                {
                    id: 'trading',
                    title: '二手交易',
                    subtitle: '转让给他人',
                    percentage: 95,
                    description: '学生很需要这类书籍',
                    icon: ShoppingBag,
                    gradient: 'from-blue-500 to-cyan-500',
                    route: '/detail/trading'
                },
                {
                    id: 'creative',
                    title: '创意改造',
                    subtitle: '变身新物品',
                    percentage: 55,
                    description: '制作手工艺品',
                    icon: Palette,
                    gradient: 'from-purple-500 to-pink-500',
                    route: '/detail/creative'
                },
                {
                    id: 'recycle',
                    title: '捐赠回收',
                    subtitle: '分类回收处理',
                    percentage: 50,
                    description: '纸张回收再利用',
                    icon: Recycle,
                    gradient: 'from-green-500 to-emerald-500',
                    route: '/detail/recycle'
                }
            ]
        },
        {
            id: '4',
            type: 'both',
            image: '/api/placeholder/300/200',
            text: '破损的花瓶，但图案很漂亮',
            timestamp: new Date('2024-01-12T09:20:00'),
            category: 'creative',
            paths: [
                {
                    id: 'creative',
                    title: '创意改造',
                    subtitle: '变身新物品',
                    percentage: 95,
                    description: '修复后或制作马赛克艺术品',
                    icon: Palette,
                    gradient: 'from-purple-500 to-pink-500',
                    route: '/detail/creative'
                },
                {
                    id: 'recycle',
                    title: '捐赠回收',
                    subtitle: '分类回收处理',
                    percentage: 70,
                    description: '陶瓷碎片回收利用',
                    icon: Recycle,
                    gradient: 'from-green-500 to-emerald-500',
                    route: '/detail/recycle'
                },
                {
                    id: 'trading',
                    title: '二手交易',
                    subtitle: '转让给他人',
                    percentage: 30,
                    description: '收藏爱好者可能感兴趣',
                    icon: ShoppingBag,
                    gradient: 'from-blue-500 to-cyan-500',
                    route: '/detail/trading'
                }
            ]
        },
        {
            id: '5',
            type: 'text',
            text: '旧手机充电器，接口有点松',
            timestamp: new Date('2024-01-10T11:30:00'),
            category: 'recycle',
            paths: [
                {
                    id: 'recycle',
                    title: '捐赠回收',
                    subtitle: '分类回收处理',
                    percentage: 85,
                    description: '电子废料专业回收',
                    icon: Recycle,
                    gradient: 'from-green-500 to-emerald-500',
                    route: '/detail/recycle'
                },
                {
                    id: 'creative',
                    title: '创意改造',
                    subtitle: '变身新物品',
                    percentage: 45,
                    description: '修理后继续使用',
                    icon: Palette,
                    gradient: 'from-purple-500 to-pink-500',
                    route: '/detail/creative'
                },
                {
                    id: 'trading',
                    title: '二手交易',
                    subtitle: '转让给他人',
                    percentage: 25,
                    description: '维修后可能有人需要',
                    icon: ShoppingBag,
                    gradient: 'from-blue-500 to-cyan-500',
                    route: '/detail/trading'
                }
            ]
        }
    ]);

    // 处理筛选和排序的数据
    const filteredAndSortedData = useMemo(() => {
        let filtered = historyData;

        // 搜索筛选
        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.text?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 分类筛选
        if (filterType !== 'all') {
            filtered = filtered.filter(item => item.category === filterType);
        }

        // 排序
        if (sortType === 'time') {
            filtered = [...filtered].sort((a, b) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
        } else if (sortType === 'category') {
            filtered = [...filtered].sort((a, b) => a.category.localeCompare(b.category));
        }

        return filtered;
    }, [historyData, searchQuery, filterType, sortType]);

    // 切换项目展开状态
    const toggleExpand = (itemId: string) => {
        setHistoryData(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, expanded: !item.expanded }
                : item
        ));
    };

    // 处理项目选择
    const toggleSelection = (itemId: string) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    // 全选/取消全选
    const toggleSelectAll = () => {
        if (selectedItems.size === filteredAndSortedData.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(filteredAndSortedData.map(item => item.id)));
        }
    };

    // 批量删除
    const deleteSelected = () => {
        setHistoryData(prev => prev.filter(item => !selectedItems.has(item.id)));
        setSelectedItems(new Set());
        setIsSelectionMode(false);
    };

    // 处理路径点击
    const handlePathClick = (path: DisposalPath, item: HistoryItem) => {
        navigate(path.route, {
            state: {
                image: item.image,
                description: item.text,
                fromHistory: true
            }
        });
    };

    // 格式化时间
    const formatDate = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '今天';
        if (diffDays === 2) return '昨天';
        if (diffDays <= 7) return `${diffDays - 1}天前`;

        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // 获取类型图标
    const getTypeIcon = (type: HistoryItem['type']) => {
        switch (type) {
            case 'image':
                return <ImageIcon className="w-4 h-4" />;
            case 'text':
                return <Type className="w-4 h-4" />;
            case 'both':
                return <Camera className="w-4 h-4" />;
            default:
                return <Camera className="w-4 h-4" />;
        }
    };

    // 获取分类颜色
    const getCategoryColor = (category: HistoryItem['category']) => {
        switch (category) {
            case 'creative':
                return 'from-purple-500 to-pink-500';
            case 'recycle':
                return 'from-green-500 to-emerald-500';
            case 'trading':
                return 'from-blue-500 to-cyan-500';
            default:
                return 'from-gray-500 to-slate-500';
        }
    };

    // 获取分类名称
    const getCategoryName = (category: HistoryItem['category']) => {
        switch (category) {
            case 'creative':
                return '创意改造';
            case 'recycle':
                return '捐赠回收';
            case 'trading':
                return '二手交易';
            default:
                return '通用';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* 顶部导航 */}
            <NavigationBar
                title="历史记录"
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
                className="hover:shadow-xl transition-all duration-300 hover:scale-105"
            />

            <div className="px-4 pb-8 space-y-4">
                {/* 搜索和筛选栏 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-green-100">
                    {/* 搜索框 */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="搜索历史记录..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-green-200 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-300 focus:shadow-xl transition-all duration-300"
                        />
                    </div>

                    {/* 筛选按钮 */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-xl transition-all duration-300"
                        >
                            <Filter className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">筛选</span>
                            {showFilters ? (
                                <ChevronUp className="w-4 h-4 text-green-600" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-green-600" />
                            )}
                        </button>

                        <div className="text-sm text-gray-500">
                            共 {filteredAndSortedData.length} 条记录
                        </div>
                    </div>

                    {/* 筛选选项 */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="space-y-3">
                                {/* 排序选项 */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">排序方式</h4>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setSortType('time')}
                                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${sortType === 'time'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            按时间
                                        </button>
                                        <button
                                            onClick={() => setSortType('category')}
                                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${sortType === 'category'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            按分类
                                        </button>
                                    </div>
                                </div>

                                {/* 分类筛选 */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">内容分类</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(['all', 'creative', 'recycle', 'trading'] as FilterType[]).map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setFilterType(category)}
                                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${filterType === category
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {category === 'all' ? '全部' : getCategoryName(category as any)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 批量操作栏 */}
                {isSelectionMode && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-green-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={toggleSelectAll}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-xl transition-all duration-300"
                                >
                                    <Check className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium text-green-600">
                                        {selectedItems.size === filteredAndSortedData.length ? '取消全选' : '全选'}
                                    </span>
                                </button>
                                <span className="text-sm text-gray-600">
                                    已选择 {selectedItems.size} 项
                                </span>
                            </div>
                            {selectedItems.size > 0 && (
                                <button
                                    onClick={deleteSelected}
                                    className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-xl transition-all duration-300"
                                >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                    <span className="text-sm font-medium text-red-600">删除</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* 历史记录列表 */}
                <div className="space-y-4">
                    {filteredAndSortedData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden"
                        >
                            {/* 主要内容 */}
                            <div className="p-4">
                                <div className="flex items-start space-x-3">
                                    {/* 选择框 */}
                                    {isSelectionMode && (
                                        <button
                                            onClick={() => toggleSelection(item.id)}
                                            className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${selectedItems.has(item.id)
                                                ? 'bg-green-500 border-green-500'
                                                : 'border-gray-300 hover:border-green-400'
                                                }`}
                                        >
                                            {selectedItems.has(item.id) && (
                                                <Check className="w-4 h-4 text-white" />
                                            )}
                                        </button>
                                    )}

                                    {/* 内容区域 */}
                                    <div className="flex-1">
                                        {/* 时间和类型标签 */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{formatDate(item.timestamp)}</span>
                                                </div>
                                                <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                    {getTypeIcon(item.type)}
                                                    <span>
                                                        {item.type === 'image' ? '图片' :
                                                            item.type === 'text' ? '文字' : '图文'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={`px-2 py-1 rounded-lg bg-gradient-to-r ${getCategoryColor(item.category)} text-white text-xs font-medium`}>
                                                {getCategoryName(item.category)}
                                            </div>
                                        </div>

                                        {/* 图片 */}
                                        {item.image && (
                                            <div className="mb-3">
                                                <img
                                                    src={item.image}
                                                    alt="历史记录"
                                                    className="w-full h-40 object-cover rounded-xl"
                                                />
                                            </div>
                                        )}

                                        {/* 文字内容 */}
                                        {item.text && (
                                            <div className="mb-3">
                                                <p className="text-gray-700 text-sm leading-relaxed">
                                                    {item.text}
                                                </p>
                                            </div>
                                        )}

                                        {/* 展开/收起按钮 */}
                                        <button
                                            onClick={() => toggleExpand(item.id)}
                                            className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-300"
                                        >
                                            <span className="text-sm font-medium">
                                                {item.expanded ? '收起处置方案' : '查看处置方案'}
                                            </span>
                                            {item.expanded ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 展开的处置路径 */}
                            {item.expanded && (
                                <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                                    <div className="space-y-3">
                                        {item.paths.map((path) => {
                                            const Icon = path.icon;
                                            return (
                                                <button
                                                    key={path.id}
                                                    onClick={() => handlePathClick(path, item)}
                                                    className="w-full flex items-center space-x-3 p-3 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 group"
                                                >
                                                    <div className={`w-10 h-10 bg-gradient-to-r ${path.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                                        <Icon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="flex items-center justify-between">
                                                            <h5 className="font-semibold text-gray-800 group-hover:text-gray-900">
                                                                {path.title}
                                                            </h5>
                                                            <span className="text-sm font-bold text-green-600">
                                                                {path.percentage}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 空状态 */}
                {filteredAndSortedData.length === 0 && (
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Calendar className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">暂无历史记录</h3>
                            <p className="text-sm text-gray-500">
                                {searchQuery || filterType !== 'all' ? '没有找到匹配的记录' : '开始使用闲置物语分析您的物品吧'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History; 