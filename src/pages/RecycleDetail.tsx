import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin, Phone, Globe, Clock, Navigation, Info, BarChart3, Map, Smartphone, Lightbulb, Star, Users, Leaf, Shield, DollarSign, Zap, Target, ChevronDown, ChevronUp } from 'lucide-react';

interface LocationState {
    image: string;
    description: string;
    recommendation: any;
}

// 标签页定义
const tabs = [
    { id: 'overview', name: '概览', icon: BarChart3 },
    { id: 'locations', name: '回收', icon: Map },
    { id: 'platforms', name: '平台', icon: Smartphone },
    { id: 'tips', name: '提示', icon: Lightbulb },
];

const RecycleDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, description } = (location.state as LocationState) || {};
    const [isFavorited, setIsFavorited] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [showDetailedTips, setShowDetailedTips] = useState(false);
    const [showSafety, setShowSafety] = useState(false);

    // 模拟回收点数据
    const recyclePoints = [
        {
            id: 1,
            name: '绿色环保回收站',
            type: '综合回收点',
            address: '北京市朝阳区望京SOHO T3 1层',
            distance: '1.2km',
            phone: '010-12345678',
            hours: '周一至周日 8:00-18:00',
            acceptTypes: ['电子产品', '家具', '衣物', '书籍'],
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop'
        },
        {
            id: 2,
            name: '爱心公益收集点',
            type: '慈善组织',
            address: '北京市海淀区中关村大街27号',
            distance: '2.1km',
            phone: '010-87654321',
            hours: '周一至周五 9:00-17:00',
            acceptTypes: ['衣物', '玩具', '书籍', '生活用品'],
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&h=200&fit=crop'
        },
        {
            id: 3,
            name: '智能回收柜',
            type: '自助回收',
            address: '北京市西城区复兴门内大街甲8号',
            distance: '3.5km',
            phone: '400-888-9999',
            hours: '24小时开放',
            acceptTypes: ['电子产品', '金属', '塑料'],
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop'
        }
    ];

    // 模拟在线平台数据
    const onlinePlatforms = [
        {
            id: 1,
            name: '闲鱼',
            description: '阿里巴巴旗下闲置交易社区',
            website: 'https://2.taobao.com',
            features: ['免费发布', '在线估价', '同城交易'],
            rating: 4.6,
            users: '6亿+',
            category: '综合平台',
            logo: 'https://gw.alicdn.com/imgextra/i1/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-83.svg',
            color: 'from-orange-400 to-red-500',
            bgColor: 'from-orange-50 to-red-50'
        },
        {
            id: 2,
            name: '爱回收',
            description: '专业数码回收平台',
            website: 'https://www.aihuishou.com',
            features: ['专业估价', '上门回收', '当天到账'],
            rating: 4.7,
            users: '5000万+',
            category: '数码回收',
            logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzI2Q0Y0RSIvPgo8cGF0aCBkPSJNMjAgMzJMMTIgMjRIMTZWMTZIMjRWMjRIMjhMMjAgMzJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
            color: 'from-green-400 to-emerald-500',
            bgColor: 'from-green-50 to-emerald-50'
        },
        {
            id: 3,
            name: '转转',
            description: '58同城旗下二手交易平台',
            website: 'https://www.zhuanzhuan.com',
            features: ['质量检测', '安全保障', '无忧售后'],
            rating: 4.5,
            users: '4亿+',
            category: '二手交易',
            logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0ZGNkEwMCIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHA6IG0xNiAyMGE0IDQgMCAwIDEgOCAwIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
            color: 'from-yellow-400 to-orange-500',
            bgColor: 'from-yellow-50 to-orange-50'
        }
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case '综合回收点': return 'bg-green-100 text-green-700';
            case '慈善组织': return 'bg-blue-100 text-blue-700';
            case '自助回收': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    const handleNavigation = (address: string) => {
        // 模拟导航功能
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://maps.baidu.com/search/${encodedAddress}`, '_blank');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: '回收捐赠方案',
                text: '发现一个很棒的回收捐赠方案！',
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('链接已复制到剪贴板！');
        }
    };

    // 概览内容
    const renderOverview = () => (
        <div className="space-y-6">
            {/* 项目概要 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-xl border border-green-100">
                <div className="text-center mb-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">项目概要</h3>
                    <p className="text-xs text-gray-500">全面了解这个回收项目</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-green-700">3</div>
                        <div className="text-xs text-green-600">回收点</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-blue-700">3</div>
                        <div className="text-xs text-blue-600">在线平台</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-purple-700">简单</div>
                        <div className="text-xs text-purple-600">操作难度</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-orange-700">立即</div>
                        <div className="text-xs text-orange-600">可执行</div>
                    </div>
                </div>

                {/* 推荐度指示器 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-gray-800 text-sm">推荐度评分</span>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">70%</div>
                            <div className="text-xs text-gray-600">综合评估</div>
                        </div>
                    </div>
                    <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out" style={{ width: '70%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );

    // 回收点内容
    const renderLocations = () => (
        <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-green-500 mr-2" />
                    附近回收点
                </h3>
                <div className="space-y-4">
                    {recyclePoints.map((point) => (
                        <div
                            key={point.id}
                            className="bg-gradient-to-r from-white to-green-50 rounded-2xl p-4 border border-green-100 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex space-x-4">
                                <img
                                    src={point.image}
                                    alt={point.name}
                                    className="w-16 h-16 object-cover rounded-xl shadow-md"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{point.name}</h4>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(point.type)}`}>
                                                    {point.type}
                                                </span>
                                                <span className="text-xs text-gray-600">{point.distance}</span>
                                                <div className="flex items-center text-xs text-yellow-600">
                                                    <span>⭐ {point.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-xs text-gray-600 mb-2">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        <span className="flex-1">{point.address}</span>
                                    </div>

                                    <div className="flex items-center text-xs text-gray-600 mb-3">
                                        <Clock className="w-3 h-3 mr-1" />
                                        <span>{point.hours}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {point.acceptTypes.map((type, idx) => (
                                            <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                                                {type}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleCall(point.phone)}
                                            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                                        >
                                            <Phone className="w-3 h-3" />
                                            <span>电话咨询</span>
                                        </button>
                                        <button
                                            onClick={() => handleNavigation(point.address)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                                        >
                                            <Navigation className="w-3 h-3" />
                                            <span>导航前往</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 在线平台内容
    const renderPlatforms = () => (
        <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <Globe className="w-5 h-5 text-green-500 mr-2" />
                    推荐回收平台
                </h3>
                <div className="space-y-3">
                    {onlinePlatforms.map((platform) => (
                        <div
                            key={platform.id}
                            className={`bg-gradient-to-r ${platform.bgColor} rounded-2xl p-4 border border-white/30 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
                            onClick={() => window.open(platform.website, '_blank')}
                        >
                            <div className="flex items-center space-x-4">
                                {/* 平台图标 */}
                                <div className="flex-shrink-0">
                                    <div className={`w-14 h-14 bg-gradient-to-r ${platform.color} rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow duration-300`}>
                                        <img
                                            src={platform.logo}
                                            alt={platform.name}
                                            className="w-7 h-7"
                                            onError={(e) => {
                                                const target = e.currentTarget as HTMLImageElement;
                                                target.style.display = 'none';
                                                const nextSibling = target.nextElementSibling as HTMLElement;
                                                if (nextSibling) {
                                                    nextSibling.style.display = 'block';
                                                }
                                            }}
                                        />
                                        <span className="text-white font-bold text-xl hidden">{platform.name[0]}</span>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0 overflow-hidden">
                                    {/* 平台名称行 */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                                            <h4 className="font-bold text-gray-800 text-lg truncate flex-shrink-0">{platform.name}</h4>
                                            <div className="flex items-center space-x-1 bg-white/80 px-2 py-1 rounded-lg flex-shrink-0">
                                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                <span className="text-xs font-medium text-gray-700">{platform.rating}</span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-lg flex-shrink-0 ml-2">
                                            {platform.users}
                                        </div>
                                    </div>

                                    {/* 平台描述 */}
                                    <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{platform.description}</p>

                                    {/* 特色功能标签 */}
                                    <div className="flex flex-wrap gap-2">
                                        {platform.features.map((feature, idx) => (
                                            <span key={idx} className="text-xs bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full text-gray-700 font-medium border border-white/50 flex-shrink-0">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* 右侧箭头指示器 */}
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

    // 提示内容
    const renderTips = () => (
        <div className="space-y-6">
            {/* 为什么选择回收捐赠 - 移至顶部 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-xl border border-green-100">
                <div className="text-center mb-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">为什么选择回收捐赠？</h3>
                    <p className="text-xs text-gray-500">发现旧物新价值</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-semibold text-green-700 text-sm mb-1">环保减废</div>
                        <div className="text-xs text-green-600">为地球贡献力量</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-semibold text-blue-700 text-sm mb-1">传递爱心</div>
                        <div className="text-xs text-blue-600">帮助有需要的人</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-semibold text-purple-700 text-sm mb-1">节省开支</div>
                        <div className="text-xs text-purple-600">变废为宝</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-semibold text-orange-700 text-sm mb-1">便民高效</div>
                        <div className="text-xs text-orange-600">轻松处理</div>
                    </div>
                </div>
            </div>

            {/* 折叠模块区域 - 紧凑间距 */}
            <div className="space-y-3">
                {/* 安全提醒 - 可折叠展开 */}
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-100 shadow-lg">
                    <button
                        onClick={() => setShowSafety(!showSafety)}
                        className="w-full p-4 flex items-center justify-between hover:bg-red-100/30 transition-colors rounded-t-2xl"
                    >
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-red-800">安全提醒</h4>
                                <p className="text-xs text-red-600">回收前必读</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">必读</span>
                            {showSafety ? (
                                <ChevronUp className="w-5 h-5 text-red-600" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-red-600" />
                            )}
                        </div>
                    </button>

                    {showSafety && (
                        <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                    <span className="text-sm text-red-700">选择正规平台</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                    <span className="text-sm text-red-700">保护隐私信息</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                    <span className="text-sm text-red-700">核实回收资质</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                    <span className="text-sm text-red-700">保留交易凭证</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 使用技巧 - 可折叠展开 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-lg">
                    <button
                        onClick={() => setShowDetailedTips(!showDetailedTips)}
                        className="w-full p-4 flex items-center justify-between hover:bg-green-50/50 transition-colors rounded-t-2xl"
                    >
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                <Target className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-gray-800">使用技巧指南</h4>
                                <p className="text-xs text-gray-500">让回收更高效便捷</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">推荐</span>
                            {showDetailedTips ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                        </div>
                    </button>

                    {showDetailedTips && (
                        <div className="px-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                    <h5 className="font-semibold text-green-800 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">1</div>
                                        准备阶段
                                    </h5>
                                    <div className="space-y-2 text-sm text-green-700">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                            <span>清洁整理物品</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                            <span>清除个人信息</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                                    <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">2</div>
                                        选择平台
                                    </h5>
                                    <div className="space-y-2 text-sm text-blue-700">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            <span>对比多个平台</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            <span>选择合适渠道</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // 渲染当前激活的标签页内容
    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'locations':
                return renderLocations();
            case 'platforms':
                return renderPlatforms();
            case 'tips':
                return renderTips();
            default:
                return renderOverview();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* 顶部导航 */}
            <div className="relative flex items-center p-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <ArrowLeft className="w-5 h-5 text-green-600" />
                </button>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-800">回收捐赠方案</h1>
                <div className="flex space-x-2 ml-auto">
                    <button
                        onClick={() => setIsFavorited(!isFavorited)}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Heart className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="px-4 pb-8">
                {/* 物品信息和推荐度 - 始终显示 */}
                {(image || description) && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100 mb-6">
                        <div className="flex items-center space-x-4 mb-4">
                            {image ? (
                                <img
                                    src={image}
                                    alt="物品图片"
                                    className="w-20 h-20 object-cover rounded-2xl shadow-lg"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-lg flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 mb-1">您的物品</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {description || '待处置物品'}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                                        70%
                                    </div>
                                    <span className="text-sm text-gray-600">回收推荐度</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
                                style={{ width: '70%' }}
                            />
                        </div>
                    </div>
                )}

                {/* 标签页导航 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-green-100 mb-6">
                    <div className="flex space-x-1">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                                        : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 标签页内容 */}
                <div>
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default RecycleDetail; 