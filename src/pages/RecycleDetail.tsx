import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, Share2, MapPin, Phone, Globe, Clock, Navigation, BarChart3, Map, Smartphone, Lightbulb, Star, Leaf, Shield, DollarSign, Zap, Target, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import DetailPageLayout from '../components/DetailPageLayout';
import type { TabConfig } from '../components/DetailPageLayout';
import { recycleTheme } from '../config/detailPageThemes';
import { useGlobalState } from '../hooks/useGlobalState';

interface LocationState {
    image: string;
    description: string;
    recommendation: any;
}

// 标签页定义
const tabs: TabConfig[] = [
    { id: 'overview', name: '概览', icon: BarChart3 },
    { id: 'locations', name: '回收', icon: Map },
    { id: 'platforms', name: '平台', icon: Smartphone },
    { id: 'tips', name: '提示', icon: Lightbulb },
];

const RecycleDetail: React.FC = () => {
    const location = useLocation();
    const { image, description } = (location.state as LocationState) || {};
    const [isFavorited, setIsFavorited] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [showDetailedTips, setShowDetailedTips] = useState(false);
    const [showSafety, setShowSafety] = useState(false);

    // 获取全局状态中的分析结果
    const { analysisResult } = useGlobalState();

    // 获取回收方案数据
    const recyclingSolution = analysisResult?.recycling_solution;
    const processingData = recyclingSolution?.processing_summary;
    const locationData = recyclingSolution?.location_recommendation;
    const platformData = recyclingSolution?.platform_recommendation;
    const disposalSolution = analysisResult?.disposal_solution;

    // 获取推荐度分数 - 使用 disposal_solution 中的 recycling_donation 分数
    const getRecommendationScore = () => {
        if (disposalSolution?.recommendations?.recycling_donation?.recommendation_score) {
            return disposalSolution.recommendations.recycling_donation.recommendation_score;
        }
        return 70; // 默认值
    };

    const getTypeColor = (type: string) => {
        if (type.includes('维修')) return 'bg-green-100 text-green-700';
        if (type.includes('服务')) return 'bg-blue-100 text-blue-700';
        if (type.includes('回收')) return 'bg-purple-100 text-purple-700';
        return 'bg-gray-100 text-gray-700';
    };

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    const handleNavigation = (address: string) => {
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
                        <div className="text-xl font-bold text-green-700">{locationData?.locations_count || 0}</div>
                        <div className="text-xs text-green-600">回收点</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-blue-700">{processingData?.platform_count || 0}</div>
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

                {locationData?.locations && locationData.locations.length > 0 ? (
                    <div className="space-y-4">
                        {locationData.locations.map((location: any) => (
                            <div
                                key={location.id}
                                className="bg-gradient-to-r from-white to-green-50 rounded-2xl p-4 border border-green-100"
                            >
                                <div className="flex space-x-4">
                                    {/* 使用第一张照片作为展示图片 */}
                                    <img
                                        src={location.photos?.[0]?.url || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop'}
                                        alt={location.name}
                                        className="w-16 h-16 object-cover rounded-xl shadow-md"
                                        onError={(e) => {
                                            const target = e.currentTarget as HTMLImageElement;
                                            target.src = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop';
                                        }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 text-sm">{location.name}</h4>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(location.type)}`}>
                                                        {location.type.split(';')[0] || '回收点'}
                                                    </span>
                                                    <span className="text-xs text-gray-600">{location.distance_formatted}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-xs text-gray-600 mb-2">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            <span className="flex-1">{location.address}</span>
                                        </div>

                                        <div className="flex items-center text-xs text-gray-600 mb-3">
                                            <Clock className="w-3 h-3 mr-1" />
                                            <span>{location.opentime_week || location.opentime_today || '营业时间请致电咨询'}</span>
                                        </div>

                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleCall(location.tel)}
                                                className="flex-1 bg-green-500 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1"
                                            >
                                                <Phone className="w-3 h-3" />
                                                <span>电话咨询</span>
                                            </button>
                                            <button
                                                onClick={() => handleNavigation(location.address)}
                                                className="flex-1 bg-blue-500 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1"
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
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>暂无附近回收点信息</p>
                    </div>
                )}
            </div>
        </div>
    );

    // 在线平台内容 - 重新设计布局
    const renderPlatforms = () => {
        // 添加展开状态管理
        const [expandedPlatforms, setExpandedPlatforms] = useState<{ [key: number]: boolean }>({});

        // 切换展开状态
        const toggleExpanded = (index: number) => {
            setExpandedPlatforms(prev => ({
                ...prev,
                [index]: !prev[index]
            }));
        };

        // 获取平台差异化描述
        const getPlatformHighlight = (name: string) => {
            switch (name) {
                case '闲鱼':
                    return '3亿用户选择的二手生活圈';
                case '转转':
                    return '合并京东拍拍后的二手新生态';
                case '爱回收':
                    return '专业数码回收领军品牌';
                default:
                    return '专业回收服务平台';
            }
        };



        return (
            <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                        <Globe className="w-5 h-5 text-green-500 mr-2" />
                        推荐回收平台
                    </h3>

                    {platformData?.platform_details && platformData.platform_details.length > 0 ? (
                        <div className="space-y-3">
                            {platformData.platform_details.map((platform: any, index: number) => {
                                // 获取对应的AI推荐信息
                                const aiRecommendation = platformData.ai_recommendations?.recommendations?.find(
                                    (rec: any) => rec.platform_name === platform.platform_name
                                );

                                // 根据平台名称设置颜色主题 - 精简配色
                                const getColorTheme = (name: string) => {
                                    switch (name) {
                                        case '爱回收':
                                            return {
                                                primary: 'text-green-700',
                                                bg: 'bg-gray-50',
                                                border: 'border-gray-200',
                                                button: 'border-green-500 text-green-600 hover:bg-green-50 active:bg-green-100 active:animate-pulse',
                                                accent: 'bg-green-500 text-white',
                                                star: 'text-green-500',
                                                brand: 'green'
                                            };
                                        case '闲鱼':
                                            return {
                                                primary: 'text-yellow-700',
                                                bg: 'bg-gray-50',
                                                border: 'border-gray-200',
                                                button: 'border-yellow-500 text-yellow-600 hover:bg-yellow-50 active:bg-yellow-100 active:animate-pulse',
                                                accent: 'bg-yellow-500 text-white',
                                                star: 'text-yellow-500',
                                                brand: 'yellow'
                                            };
                                        case '转转':
                                            return {
                                                primary: 'text-orange-700',
                                                bg: 'bg-gray-50',
                                                border: 'border-gray-200',
                                                button: 'border-orange-500 text-orange-600 hover:bg-orange-50 active:bg-orange-100 active:animate-pulse',
                                                accent: 'bg-orange-500 text-white',
                                                star: 'text-orange-500',
                                                brand: 'orange'
                                            };
                                        default:
                                            return {
                                                primary: 'text-blue-700',
                                                bg: 'bg-gray-50',
                                                border: 'border-gray-200',
                                                button: 'border-blue-500 text-blue-600 hover:bg-blue-50 active:bg-blue-100 active:animate-pulse',
                                                accent: 'bg-blue-500 text-white',
                                                star: 'text-blue-500',
                                                brand: 'blue'
                                            };
                                    }
                                };

                                const theme = getColorTheme(platform.platform_name);
                                const isExpanded = expandedPlatforms[index];

                                return (
                                    <div
                                        key={index}
                                        className={`${theme.bg} ${theme.border} border rounded-lg transition-all duration-300 hover:shadow-sm hover:shadow-gray-200/50`}
                                    >
                                        {/* 精简的标题区域 */}
                                        <div className="flex items-center justify-between p-3 pb-2">
                                            <div className="flex items-center space-x-3 flex-1">
                                                {/* 平台图标 - 缩小 */}
                                                <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                                                    <img
                                                        src={platform.platform_icon}
                                                        alt={platform.platform_name}
                                                        className="w-5 h-5"
                                                        onError={(e) => {
                                                            const target = e.currentTarget as HTMLImageElement;
                                                            target.style.display = 'none';
                                                            const nextSibling = target.nextElementSibling as HTMLElement;
                                                            if (nextSibling) {
                                                                nextSibling.style.display = 'block';
                                                            }
                                                        }}
                                                    />
                                                    <span className="text-gray-600 font-bold text-xs hidden">{platform.platform_name[0]}</span>
                                                </div>

                                                {/* 平台名称和信息 */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        {/* 主标题 - 加大字号 */}
                                                        <h4 className={`font-semibold text-base ${theme.primary}`}>{platform.platform_name}</h4>
                                                        {/* 评分 - 星星与分数合并 */}
                                                        {aiRecommendation?.suitability_score && (
                                                            <div className="flex items-center space-x-0.5">
                                                                <Star className={`w-3 h-3 ${theme.star} fill-current`} />
                                                                <span className={`text-xs font-medium ${theme.star}`}>
                                                                    {aiRecommendation.suitability_score}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* 副标题 - 缩小字号，浅灰色 */}
                                                    <p className="text-xs text-gray-500 leading-tight">
                                                        {getPlatformHighlight(platform.platform_name)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* 幽灵按钮 - 缩小尺寸 */}
                                            <button
                                                onClick={() => {
                                                    const urls: { [key: string]: string } = {
                                                        '爱回收': 'https://www.aihuishou.com',
                                                        '闲鱼': 'https://2.taobao.com',
                                                        '转转': 'https://www.zhuanzhuan.com'
                                                    };
                                                    window.open(urls[platform.platform_name] || '#', '_blank');
                                                }}
                                                className={`${theme.button} border px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 flex items-center space-x-1`}
                                                title="一键跳转官网"
                                                style={{ width: '90px', height: '28px' }}
                                            >
                                                <span>访问平台</span>
                                                <ExternalLink className="w-2.5 h-2.5" />
                                            </button>
                                        </div>

                                        {/* 默认显示的核心优势 - 压缩间距 */}
                                        <div className="px-3 pb-2">
                                            {aiRecommendation && aiRecommendation.pros && aiRecommendation.pros.length > 0 && (
                                                <div className="flex items-center space-x-2">
                                                    {/* 彩色小标签 - 品牌色 */}
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${theme.accent}`} style={{ fontSize: '10px' }}>
                                                        核心优势
                                                    </span>
                                                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                                                        <span>{aiRecommendation.pros[0]}</span>
                                                    </div>
                                                    {aiRecommendation.pros[1] && (
                                                        <>
                                                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                                            <div className="flex items-center space-x-1 text-xs text-gray-600">
                                                                <span>{aiRecommendation.pros[1]}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* 展开/收起按钮 - 压缩间距 */}
                                        <div className="px-3 pb-2">
                                            <button
                                                onClick={() => toggleExpanded(index)}
                                                className="w-full flex items-center justify-center space-x-2 text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 py-1.5 rounded-lg hover:bg-white/50"
                                            >
                                                <span>{isExpanded ? '收起详情' : '展开详情'}</span>
                                                {isExpanded ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </button>
                                        </div>

                                        {/* 可折叠的详细内容 - 压缩间距 */}
                                        {isExpanded && (
                                            <div className="px-3 pb-3 space-y-2 animate-in slide-in-from-top-2 duration-300 border-t border-gray-200/50">
                                                {/* 平台详细描述 */}
                                                <div className="pt-2">
                                                    <p className="text-sm text-gray-600 leading-relaxed">
                                                        {platform.description}
                                                    </p>
                                                </div>

                                                {/* 详细优势和注意事项 - 卡片式分组 */}
                                                {aiRecommendation && (
                                                    <div className="space-y-3">
                                                        {/* 全部优势卡片 */}
                                                        <div className="bg-green-50/50 border border-green-100 rounded-lg p-3">
                                                            <div className="flex items-center space-x-2 mb-2">
                                                                <Star className="w-4 h-4 text-green-600" />
                                                                <h5 className="text-sm font-semibold text-green-800">全部优势</h5>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {aiRecommendation.pros.map((pro: string, idx: number) => (
                                                                    <div key={idx} className="text-xs text-gray-700 bg-white/80 px-2.5 py-1 rounded-md border border-green-200/50">
                                                                        <span>{pro}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* 注意事项卡片 */}
                                                        <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-3">
                                                            <div className="flex items-center space-x-2 mb-2">
                                                                <Shield className="w-4 h-4 text-orange-600" />
                                                                <h5 className="text-sm font-semibold text-orange-800">注意事项</h5>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {aiRecommendation.cons.map((con: string, idx: number) => (
                                                                    <div key={idx} className="text-xs text-gray-700 bg-white/80 px-2.5 py-1 rounded-md border border-orange-200/50">
                                                                        <span>{con}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 功能标签卡片 */}
                                                {platform.tags && platform.tags.length > 0 && (
                                                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <Globe className="w-4 h-4 text-blue-600" />
                                                            <h5 className="text-sm font-semibold text-blue-800">功能特色</h5>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {platform.tags.map((tag: string, idx: number) => (
                                                                <span
                                                                    key={idx}
                                                                    className="bg-white/80 text-gray-700 text-xs px-2.5 py-1 rounded-md border border-blue-200/50"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <Smartphone className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>暂无推荐平台信息</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

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
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-semibold text-green-700 text-sm mb-1">环保减废</div>
                        <div className="text-xs text-green-600">为地球贡献力量</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-semibold text-blue-700 text-sm mb-1">传递爱心</div>
                        <div className="text-xs text-blue-600">帮助有需要的人</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-semibold text-purple-700 text-sm mb-1">节省开支</div>
                        <div className="text-xs text-purple-600">变废为宝</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
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
                        className="w-full p-4 flex items-center justify-between rounded-t-2xl"
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
                        className="w-full p-4 flex items-center justify-between rounded-t-2xl"
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
        <DetailPageLayout
            title="您的物品"
            image={image}
            description={description || '待处置物品'}
            recommendationScore={getRecommendationScore()}
            recommendationLabel="回收推荐度"
            theme={recycleTheme}
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            renderTabContent={renderTabContent}
            navigationTitle="回收捐赠方案"
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

export default RecycleDetail; 