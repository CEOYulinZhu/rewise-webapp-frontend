import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, Share2, TrendingUp, DollarSign, Users, Copy, Star, Info, BarChart3, LineChart as LineChartIcon, Zap, FileText, Target, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Check, ExternalLink, MapPin, ShoppingCart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DetailPageLayout from '../components/DetailPageLayout';
import type { TabConfig } from '../components/DetailPageLayout';
import { tradingTheme } from '../config/detailPageThemes';
import { useGlobalState } from '../hooks/useGlobalState';

interface LocationState {
    image: string;
    description: string;
    recommendation: any;
}

// 标签页定义
const tabs: TabConfig[] = [
    { id: 'overview', name: '概览', icon: BarChart3 },
    { id: 'market', name: '市场', icon: LineChartIcon },
    { id: 'platforms', name: '对比', icon: Zap },
    { id: 'tools', name: '文案', icon: FileText },
];

const TradingDetail: React.FC = () => {
    const location = useLocation();
    const { image, description } = (location.state as LocationState) || {};
    const [isFavorited, setIsFavorited] = useState(false);

    const [activeTab, setActiveTab] = useState('overview');
    const [showPriceChart, setShowPriceChart] = useState(true);
    const [showProductList, setShowProductList] = useState(false);
    const [showPlatformStats, setShowPlatformStats] = useState(false);
    const [copiedItems, setCopiedItems] = useState<{ [key: number]: boolean }>({});

    // 获取全局状态中的分析结果
    const { analysisResult } = useGlobalState();

    // 获取二手交易方案数据
    const secondhandSolution = analysisResult?.secondhand_solution;
    const searchResult = secondhandSolution?.search_result?.result;
    const contentResult = secondhandSolution?.content_result?.content_result;
    const disposalSolution = analysisResult?.disposal_solution;

    // 调试信息 - 输出数据结构
    useEffect(() => {
        console.log('TradingDetail Debug Info:', {
            analysisResult: !!analysisResult,
            secondhandSolution: !!secondhandSolution,
            searchResult: !!searchResult,
            platformStats: searchResult?.platform_stats,
            contentResult: !!contentResult,
            disposalSolution: !!disposalSolution
        });
    }, [analysisResult, secondhandSolution, searchResult, contentResult, disposalSolution]);

    // 获取推荐度分数
    const getRecommendationScore = () => {
        if (disposalSolution?.recommendations?.secondhand_trading?.recommendation_score) {
            return disposalSolution.recommendations.secondhand_trading.recommendation_score;
        }
        return 80; // 默认值
    };



    // 处理价格数据用于图表展示
    const getPriceChartData = () => {
        if (!searchResult?.platform_stats) return [];

        const stats = searchResult.platform_stats;
        const chartData = [];

        if (stats.xianyu?.price_stats) {
            chartData.push({
                name: '闲鱼',
                最低价: stats.xianyu.price_stats.min_price || 0,
                最高价: stats.xianyu.price_stats.max_price || 0,
                平均价: Math.round(stats.xianyu.price_stats.average_price || 0),
                商品数量: stats.xianyu.price_stats.product_count || 0
            });
        }

        if (stats.aihuishou?.price_stats) {
            chartData.push({
                name: '爱回收',
                最低价: stats.aihuishou.price_stats.min_price || 0,
                最高价: stats.aihuishou.price_stats.max_price || 0,
                平均价: Math.round(stats.aihuishou.price_stats.average_price || 0),
                商品数量: stats.aihuishou.price_stats.product_count || 0
            });
        }

        return chartData;
    };

    // 获取平台统计数据
    const getPlatformStats = () => {
        if (!searchResult?.platform_stats) return [];

        const stats = searchResult.platform_stats;
        const platformData = [];

        if (stats.xianyu?.price_stats) {
            platformData.push({
                name: '闲鱼',
                value: stats.xianyu.product_count || 0,
                color: '#FF6B35',
                avgPrice: Math.round(stats.xianyu.price_stats.average_price || 0),
                priceRange: stats.xianyu.price_stats.price_range || '暂无数据'
            });
        }

        if (stats.aihuishou?.price_stats) {
            platformData.push({
                name: '爱回收',
                value: stats.aihuishou.product_count || 0,
                color: '#4F9CF9',
                avgPrice: Math.round(stats.aihuishou.price_stats.average_price || 0),
                priceRange: stats.aihuishou.price_stats.price_range || '暂无数据'
            });
        }

        return platformData;
    };

    // 获取建议定价
    const getSuggestedPrice = () => {
        if (!searchResult?.platform_stats) return '暂无数据';

        const stats = searchResult.platform_stats;
        let totalAvg = 0;
        let count = 0;

        if (stats.xianyu?.price_stats?.average_price) {
            totalAvg += stats.xianyu.price_stats.average_price;
            count++;
        }

        if (stats.aihuishou?.price_stats?.average_price) {
            totalAvg += stats.aihuishou.price_stats.average_price;
            count++;
        }

        if (count > 0) {
            return `${Math.round(totalAvg / count)}元`;
        }

        return '暂无数据';
    };

    // 获取总商品数量
    const getTotalProducts = () => {
        return searchResult?.total_products || 0;
    };

    const handleCopyText = (text: string, itemId: number) => {
        navigator.clipboard.writeText(text);
        setCopiedItems(prev => ({ ...prev, [itemId]: true }));

        setTimeout(() => {
            setCopiedItems(prev => ({ ...prev, [itemId]: false }));
        }, 2000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: '二手交易方案',
                text: '发现一个很棒的二手交易方案！',
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('链接已复制到剪贴板！');
        }
    };

    // 概览内容 - 使用真实数据
    const renderOverview = () => (
        <div className="space-y-6">
            {/* 项目概要 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-xl border border-blue-100">
                <div className="text-center mb-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">交易概要</h3>
                    <p className="text-xs text-gray-500">基于真实市场数据的分析</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-green-700">{getSuggestedPrice()}</div>
                        <div className="text-xs text-green-600">建议定价</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-blue-700">{getTotalProducts()}</div>
                        <div className="text-xs text-blue-600">在售商品</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-purple-700">{getPlatformStats().length}</div>
                        <div className="text-xs text-purple-600">推荐交易平台</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-orange-700">高</div>
                        <div className="text-xs text-orange-600">市场活跃度</div>
                    </div>
                </div>


            </div>
        </div>
    );

    // 市场分析内容 - 使用真实数据
    const renderMarket = () => (
        <div className="space-y-4">
            {/* 价格分析图表 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100">
                <button
                    onClick={() => setShowPriceChart(!showPriceChart)}
                    className="w-full p-6 flex items-center justify-between rounded-t-3xl"
                >
                    <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-blue-500 mr-2" />
                        <h3 className="text-lg font-bold text-gray-800">平台价格对比</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">实时数据</span>
                        {showPriceChart ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </div>
                </button>

                {showPriceChart && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                        {getPriceChartData().length > 0 ? (
                            <>
                                <div className="h-64 mb-3">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={getPriceChartData()}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="最低价" fill="#10B981" />
                                            <Bar dataKey="平均价" fill="#3B82F6" />
                                            <Bar dataKey="最高价" fill="#EF4444" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-xl">
                                    <div className="flex items-center space-x-2">
                                        <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                        <p className="text-sm text-blue-700">
                                            基于{getTotalProducts()}个真实在售商品的价格分析
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                <p>暂无价格数据</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 平台商品分布 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100">
                <button
                    onClick={() => setShowPlatformStats(!showPlatformStats)}
                    className="w-full p-6 flex items-center justify-between rounded-t-3xl"
                >
                    <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                        <h3 className="text-lg font-bold text-gray-800">平台商品分布</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">分析</span>
                        {showPlatformStats ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </div>
                </button>

                {showPlatformStats && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                        {getPlatformStats().length > 0 ? (
                            <>
                                <div className="flex items-center space-x-6 mb-4">
                                    <div className="h-48 w-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={getPlatformStats()}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={40}
                                                    outerRadius={80}
                                                    dataKey="value"
                                                >
                                                    {getPlatformStats().map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        {getPlatformStats().map((item) => (
                                            <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-4 h-4 rounded-full"
                                                        style={{ backgroundColor: item.color }}
                                                    />
                                                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-bold text-gray-800">{item.value}个</div>
                                                    <div className="text-xs text-gray-600">均价{item.avgPrice}元</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-xl">
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                                        <p className="text-sm text-green-700">
                                            建议选择商品数量多的平台，竞争激烈但流量更大
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                <p>暂无平台分布数据</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 真实商品展示 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100">
                <button
                    onClick={() => setShowProductList(!showProductList)}
                    className="w-full p-6 flex items-center justify-between rounded-t-3xl"
                >
                    <div className="flex items-center">
                        <ShoppingCart className="w-5 h-5 text-blue-500 mr-2" />
                        <h3 className="text-lg font-bold text-gray-800">同类商品参考</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">参考</span>
                        {showProductList ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </div>
                </button>

                {showProductList && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                        {searchResult?.products && searchResult.products.length > 0 ? (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {searchResult.products.slice(0, 6).map((product: any, index: number) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <img
                                            src={product.image_url}
                                            alt={product.title}
                                            className="w-12 h-12 object-cover rounded-lg"
                                            onError={(e) => {
                                                const target = e.currentTarget as HTMLImageElement;
                                                target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop';
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                                    {product.platform}
                                                </span>
                                                <span className="text-lg font-bold text-green-600">
                                                    ¥{product.price}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-800 truncate" title={product.title}>
                                                {product.title}
                                            </p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-xs text-gray-500">
                                                    <MapPin className="w-3 h-3 inline mr-1" />
                                                    {product.location}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {product.seller}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                <p>暂无商品数据</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    // 平台对比内容 - 使用真实数据
    const renderPlatforms = () => (
        <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <Zap className="w-5 h-5 text-blue-500 mr-2" />
                    平台数据对比
                </h3>
                <div className="space-y-4">
                    {getPlatformStats().map((platform) => (
                        <div
                            key={platform.name}
                            className="group bg-white rounded-2xl p-5 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-xl"
                                        style={{ backgroundColor: platform.color }}
                                    >
                                        {platform.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-800 mb-1">{platform.name}</h4>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">{platform.value}个在售商品</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600">
                                        ¥{platform.avgPrice}
                                    </div>
                                    <div className="text-xs text-gray-500">平均价格</div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-gray-700">价格区间</div>
                                        <div className="text-lg font-bold text-gray-800">{platform.priceRange}</div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const urls: { [key: string]: string } = {
                                                '闲鱼': 'https://2.taobao.com',
                                                '爱回收': 'https://www.aihuishou.com'
                                            };
                                            window.open(urls[platform.name] || '#', '_blank');
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                                    >
                                        <span>访问平台</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 文案工具内容 - 使用真实数据
    const renderTools = () => (
        <div className="space-y-6">
            {/* 生成的文案模板 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 mr-2" />
                    AI生成文案
                </h3>
                <div className="space-y-4">
                    {contentResult && (
                        <>
                            <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl p-4 border border-blue-100">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Target className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-800">商品标题</h4>
                                            <button
                                                onClick={() => handleCopyText(contentResult.title, 1)}
                                                className={`flex items-center space-x-1 text-sm px-3 py-1 rounded-lg ${copiedItems[1]
                                                    ? 'text-green-600 bg-green-50 border border-green-200'
                                                    : 'text-blue-600 bg-blue-50'
                                                    }`}
                                            >
                                                {copiedItems[1] ? (
                                                    <>
                                                        <Check className="w-3 h-3" />
                                                        <span>已复制</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3 h-3" />
                                                        <span>复制</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {contentResult.title}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-white to-green-50 rounded-2xl p-4 border border-green-100">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-800">商品描述</h4>
                                            <button
                                                onClick={() => handleCopyText(contentResult.description, 2)}
                                                className={`flex items-center space-x-1 text-sm px-3 py-1 rounded-lg ${copiedItems[2]
                                                    ? 'text-green-600 bg-green-50 border border-green-200'
                                                    : 'text-green-600 bg-green-50'
                                                    }`}
                                            >
                                                {copiedItems[2] ? (
                                                    <>
                                                        <Check className="w-3 h-3" />
                                                        <span>已复制</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3 h-3" />
                                                        <span>复制</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {contentResult.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* 发布技巧 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200 shadow-lg">
                <h4 className="font-bold text-green-800 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    发布技巧
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                            <AlertCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">参考同类商品定价</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">拍摄高质量照片</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                            <Star className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">突出商品亮点</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">价格略低于均价</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // 渲染当前激活的标签页内容
    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'market':
                return renderMarket();
            case 'platforms':
                return renderPlatforms();
            case 'tools':
                return renderTools();
            default:
                return renderOverview();
        }
    };

    return (
        <DetailPageLayout
            title="您的物品"
            image={image}
            description={description || '待出售物品'}
            recommendationScore={getRecommendationScore()}
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
    );
};

export default TradingDetail; 