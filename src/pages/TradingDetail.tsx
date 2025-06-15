import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, Share2, TrendingUp, DollarSign, Users, Copy, Star, Info, BarChart3, LineChart as LineChartIcon, Zap, FileText, Target, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Check } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DetailPageLayout from '../components/DetailPageLayout';
import type { TabConfig } from '../components/DetailPageLayout';
import { tradingTheme } from '../config/detailPageThemes';

interface LocationState {
    image: string;
    description: string;
    recommendation: any;
}

// 标签页定义
const tabs: TabConfig[] = [
    { id: 'overview', name: '概览', icon: BarChart3 },
    { id: 'market', name: '分析', icon: LineChartIcon },
    { id: 'platforms', name: '对比', icon: Zap },
    { id: 'tools', name: '文案', icon: FileText },
];

const TradingDetail: React.FC = () => {
    const location = useLocation();
    const { image, description } = (location.state as LocationState) || {};
    const [isFavorited, setIsFavorited] = useState(false);

    const [activeTab, setActiveTab] = useState('overview');
    const [showPriceChart, setShowPriceChart] = useState(true); // 默认展开第一个卡片
    const [showSalesChart, setShowSalesChart] = useState(false);
    const [showCompetitionChart, setShowCompetitionChart] = useState(false);
    const [copiedItems, setCopiedItems] = useState<{ [key: number]: boolean }>({});

    // 模拟价格分析数据
    const priceData = [
        { name: '50-100元', 闲鱼: 15, 转转: 12, 拍拍: 8 },
        { name: '100-200元', 闲鱼: 25, 转转: 20, 拍拍: 15 },
        { name: '200-300元', 闲鱼: 30, 转转: 25, 拍拍: 20 },
        { name: '300-400元', 闲鱼: 20, 转转: 18, 拍拍: 25 },
        { name: '400+元', 闲鱼: 10, 转转: 15, 拍拍: 32 }
    ];

    // 模拟销量趋势数据
    const salesData = [
        { month: '1月', sales: 120 },
        { month: '2月', sales: 98 },
        { month: '3月', sales: 145 },
        { month: '4月', sales: 178 },
        { month: '5月', sales: 156 },
        { month: '6月', sales: 192 }
    ];

    // 模拟竞争分析数据
    const competitionData = [
        { name: '低竞争', value: 30, color: '#10B981' },
        { name: '中等竞争', value: 45, color: '#F59E0B' },
        { name: '高竞争', value: 25, color: '#EF4444' }
    ];

    // 平台数据
    const platforms = [
        {
            id: 'xianyu',
            name: '闲鱼',
            logoUrl: 'https://placeholder-logo-url/xianyu.png', // 闲鱼图标占位符
            recommendation: 85,
            userBase: '5亿+',
            avgPrice: '180-220',
            competition: '中等',
            timeToSell: '3-7天',
            color: 'from-orange-500 to-red-500',
            bgColor: 'from-orange-50 to-red-50',
            borderColor: 'border-orange-200',
            url: 'https://2.taobao.com'
        },
        {
            id: 'zhuanzhuan',
            name: '转转',
            logoUrl: 'https://placeholder-logo-url/zhuanzhuan.png', // 转转图标占位符
            recommendation: 75,
            userBase: '2亿+',
            avgPrice: '200-250',
            competition: '较低',
            timeToSell: '5-10天',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'from-blue-50 to-cyan-50',
            borderColor: 'border-blue-200',
            url: 'https://www.zhuanzhuan.com'
        },
        {
            id: 'paipai',
            name: '拍拍',
            logoUrl: 'https://placeholder-logo-url/paipai.png', // 拍拍图标占位符
            recommendation: 65,
            userBase: '1亿+',
            avgPrice: '250-300',
            competition: '较高',
            timeToSell: '7-14天',
            color: 'from-red-500 to-pink-500',
            bgColor: 'from-red-50 to-pink-50',
            borderColor: 'border-red-200',
            url: 'https://www.paipai.com'
        }
    ];

    // 文案模板
    const copyTemplates = [
        {
            id: 1,
            title: '标题模板',
            content: '【9成新】高品质闲置物品转让，原价XXX，现价XXX包邮',
            category: 'title',
            icon: Target
        },
        {
            id: 2,
            title: '描述模板',
            content: '物品状况良好，使用次数不多，因搬家/升级等原因转让。支持当面交易，验货满意再付款。诚心要的私聊，非诚勿扰。',
            category: 'description',
            icon: FileText
        }
    ];

    const handleCopyText = (text: string, itemId: number) => {
        navigator.clipboard.writeText(text);
        setCopiedItems(prev => ({ ...prev, [itemId]: true }));

        // 2秒后重置状态
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

    // 概览内容 - 参考RecycleDetail的设计
    const renderOverview = () => (
        <div className="space-y-6">
            {/* 项目概要 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-xl border border-blue-100">
                <div className="text-center mb-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">交易概要</h3>
                    <p className="text-xs text-gray-500">全面了解这个交易方案</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-green-700">200元</div>
                        <div className="text-xs text-green-600">建议定价</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-blue-700">5-8天</div>
                        <div className="text-xs text-blue-600">成交时间</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-purple-700">中等</div>
                        <div className="text-xs text-purple-600">竞争程度</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-orange-700">78%</div>
                        <div className="text-xs text-orange-600">成交概率</div>
                    </div>
                </div>

                {/* 推荐度指示器 */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-gray-800 text-sm">交易推荐度</span>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">60%</div>
                            <div className="text-xs text-gray-600">综合评估</div>
                        </div>
                    </div>
                    <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 transition-all duration-1000 ease-out" style={{ width: '60%' }}></div>
                    </div>
                </div>
            </div>


        </div>
    );

    // 市场分析内容 - 优化为可折叠展开
    const renderMarket = () => (
        <div className="space-y-4">
            {/* 价格分析图表 - 可折叠 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100">
                <button
                    onClick={() => setShowPriceChart(!showPriceChart)}
                    className="w-full p-6 flex items-center justify-between hover:bg-blue-50/50 transition-colors rounded-t-3xl"
                >
                    <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-blue-500 mr-2" />
                        <h3 className="text-lg font-bold text-gray-800">价格分布分析</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">重要</span>
                        {showPriceChart ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </div>
                </button>

                {showPriceChart && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                        <div className="h-64 mb-3">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={priceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="闲鱼" fill="#FF6B35" />
                                    <Bar dataKey="转转" fill="#4F9CF9" />
                                    <Bar dataKey="拍拍" fill="#E74C3C" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-xl">
                            <div className="flex items-center space-x-2">
                                <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <p className="text-sm text-blue-700">大部分同类商品在200-300元价格区间成交量最高</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 销量趋势 - 可折叠 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100">
                <button
                    onClick={() => setShowSalesChart(!showSalesChart)}
                    className="w-full p-6 flex items-center justify-between hover:bg-blue-50/50 transition-colors rounded-t-3xl"
                >
                    <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                        <h3 className="text-lg font-bold text-gray-800">销量趋势分析</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">推荐</span>
                        {showSalesChart ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </div>
                </button>

                {showSalesChart && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                        <div className="h-64 mb-3">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="sales" stroke="#4F9CF9" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-green-50 p-3 rounded-xl">
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <p className="text-sm text-green-700">6月是销售旺季，建议在此时段发布商品</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 竞争分析 - 可折叠 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100">
                <button
                    onClick={() => setShowCompetitionChart(!showCompetitionChart)}
                    className="w-full p-6 flex items-center justify-between hover:bg-blue-50/50 transition-colors rounded-t-3xl"
                >
                    <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-500 mr-2" />
                        <h3 className="text-lg font-bold text-gray-800">竞争程度分析</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">参考</span>
                        {showCompetitionChart ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </div>
                </button>

                {showCompetitionChart && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center space-x-6 mb-4">
                            <div className="h-48 w-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={competitionData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            {competitionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex-1 space-y-3">
                                {competitionData.map((item) => (
                                    <div key={item.name} className="flex items-center space-x-3">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                        <span className="text-sm text-gray-600">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-xl">
                            <div className="flex items-center space-x-2">
                                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <p className="text-sm text-blue-700">您的商品处于中等竞争环境，建议突出产品亮点和性价比优势</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // 平台跳转处理
    const handlePlatformClick = (url: string) => {
        window.open(url, '_blank');
    };

    // 平台对比内容 - 优化卡片设计
    const renderPlatforms = () => (
        <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <Zap className="w-5 h-5 text-blue-500 mr-2" />
                    推荐平台对比
                </h3>
                <div className="space-y-4">
                    {platforms.map((platform) => (
                        <div
                            key={platform.id}
                            className={`group bg-white rounded-2xl p-5 border-2 ${platform.borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden`}
                            onClick={() => handlePlatformClick(platform.url)}
                        >
                            {/* 背景装饰 */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${platform.bgColor} rounded-full transform translate-x-16 -translate-y-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    {/* 左侧：图标和基本信息 */}
                                    <div className="flex items-center space-x-4">
                                        {/* 平台图标容器 */}
                                        <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                                            <img
                                                src={platform.logoUrl}
                                                alt={`${platform.name} logo`}
                                                className="w-10 h-10 object-contain"
                                                onError={(e) => {
                                                    // 图标加载失败时显示平台名称首字母
                                                    const target = e.currentTarget as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    const fallback = target.nextElementSibling as HTMLElement;
                                                    if (fallback) {
                                                        fallback.style.display = 'flex';
                                                    }
                                                }}
                                            />
                                            <div className="w-10 h-10 hidden items-center justify-center text-white font-bold text-xl">
                                                {platform.name[0]}
                                            </div>
                                        </div>

                                        {/* 平台名称和推荐度 */}
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-800 mb-1">{platform.name}</h4>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm font-semibold text-yellow-700">{platform.recommendation}%</span>
                                                </div>
                                                <span className="text-sm text-gray-500">{platform.userBase}用户</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 右侧：跳转指示器 */}
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* 核心信息展示区域 */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors duration-300">
                                        <div className="flex items-center justify-center mb-2">
                                            <DollarSign className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div className="text-base font-bold text-gray-800 leading-tight whitespace-nowrap">{platform.avgPrice}</div>
                                        <div className="text-xs text-gray-500">平均价格</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors duration-300">
                                        <div className="flex items-center justify-center mb-2">
                                            <TrendingUp className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="text-base font-bold text-gray-800 leading-tight whitespace-nowrap">{platform.timeToSell}</div>
                                        <div className="text-xs text-gray-500">成交时间</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors duration-300">
                                        <div className="flex items-center justify-center mb-2">
                                            <Users className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div className="text-base font-bold text-gray-800 leading-tight whitespace-nowrap">{platform.competition}</div>
                                        <div className="text-xs text-gray-500">竞争程度</div>
                                    </div>
                                </div>

                                {/* 操作提示 */}
                                <div className="mt-4 pt-3 border-t border-gray-100">
                                    <div className="flex items-center justify-center text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                                        <span>点击访问平台</span>
                                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 文案工具内容 - 简化并优化
    const renderTools = () => (
        <div className="space-y-6">
            {/* 文案模板 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 mr-2" />
                    文案模板
                </h3>
                <div className="space-y-4">
                    {copyTemplates.map((template) => {
                        const IconComponent = template.icon;
                        return (
                            <div key={template.id} className="bg-gradient-to-r from-white to-blue-50 rounded-2xl p-4 border border-blue-100 hover:shadow-md transition-all duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <IconComponent className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-800">{template.title}</h4>
                                            <button
                                                onClick={() => handleCopyText(template.content, template.id)}
                                                className={`flex items-center space-x-1 text-sm px-3 py-1 rounded-lg transition-all duration-300 ${copiedItems[template.id]
                                                    ? 'text-green-600 bg-green-50 border border-green-200'
                                                    : 'text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100'
                                                    }`}
                                            >
                                                {copiedItems[template.id] ? (
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
                                        <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                                            {template.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
                            <span className="text-sm text-green-700">选择最佳发布时间</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">拍摄高质量照片</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                            <Star className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">详细描述商品状况</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">合理定价策略</span>
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
            recommendationScore={60}
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