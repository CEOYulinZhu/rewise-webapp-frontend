import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, Share2, ExternalLink, Star, Clock, Wrench, BarChart3, Settings, BookOpen, Lightbulb, DollarSign, Palette, Sparkles, Leaf, Shield, Target, Users, Music, Camera, ChevronDown, ChevronUp } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

interface LocationState {
    image: string;
    description: string;
    recommendation: any;
}

const CreativeDetail: React.FC = () => {
    const location = useLocation();
    const { image, description } = (location.state as LocationState) || {};
    const [isFavorited, setIsFavorited] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [showDetailedTips, setShowDetailedTips] = useState(false);
    const [showExperience, setShowExperience] = useState(false);
    const [showSafety, setShowSafety] = useState(false);

    // 模拟改造步骤数据
    const creativeSteps = [
        {
            id: 1,
            title: '清洁和准备',
            description: '彻底清洁物品表面，去除污渍和灰尘，为后续改造做好准备。',
            time: '30分钟',
            difficulty: '简单',
            materials: ['清洁剂', '抹布', '刷子']
        },
        {
            id: 2,
            title: '设计规划',
            description: '根据物品特点设计改造方案，确定颜色搭配和装饰元素。',
            time: '1小时',
            difficulty: '中等',
            materials: ['画笔', '颜料', '装饰材料']
        },
        {
            id: 3,
            title: '执行改造',
            description: '按照设计方案进行改造，注意细节处理和质量把控。',
            time: '2-3小时',
            difficulty: '中等',
            materials: ['工具', '胶水', '装饰品']
        },
        {
            id: 4,
            title: '完善细节',
            description: '进行最后的修饰和完善，确保改造效果达到预期。',
            time: '30分钟',
            difficulty: '简单',
            materials: ['细砂纸', '保护涂层']
        }
    ];

    // 模拟教程数据
    const tutorials = [
        {
            id: 1,
            title: '旧家具变身北欧风收纳柜',
            platform: '小红书',
            author: '家居达人小美',
            cover: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
            rating: 4.8,
            views: '12.3万',
            url: 'https://xiaohongshu.com'
        },
        {
            id: 2,
            title: '废物利用DIY创意收纳盒制作教程',
            platform: 'B站',
            author: '手工小课堂',
            cover: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
            rating: 4.9,
            views: '8.7万',
            url: 'https://bilibili.com'
        },
        {
            id: 3,
            title: '环保改造：让旧物重获新生',
            platform: '专业网站',
            author: '绿色生活网',
            cover: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
            rating: 4.7,
            views: '5.2万',
            url: 'https://example.com'
        }
    ];

    // 定义标签页
    const tabs = [
        { id: 'overview', label: '概览', icon: BarChart3 },
        { id: 'steps', label: '步骤', icon: Settings },
        { id: 'tutorials', label: '教程', icon: BookOpen },
        { id: 'tips', label: '提示', icon: Lightbulb }
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case '简单': return 'text-green-600 bg-green-100';
            case '中等': return 'text-yellow-600 bg-yellow-100';
            case '困难': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case '小红书': return 'bg-red-500';
            case 'B站': return 'bg-pink-500';
            case '专业网站': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    const handleShare = () => {
        // 模拟分享功能
        if (navigator.share) {
            navigator.share({
                title: '创意改造方案',
                text: '发现一个很棒的创意改造方案！',
                url: window.location.href,
            });
        } else {
            // 降级处理
            navigator.clipboard.writeText(window.location.href);
            alert('链接已复制到剪贴板！');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
            {/* 顶部导航 */}
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

            <div className="px-4 pb-8">
                {/* 物品信息和推荐度 - 始终显示 */}
                {(image || description) && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-100 mb-6">
                        <div className="flex items-center space-x-4 mb-4">
                            {image ? (
                                <img
                                    src={image}
                                    alt="物品图片"
                                    className="w-20 h-20 object-cover rounded-2xl shadow-lg"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 mb-1">您的物品</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {description || '待改造物品'}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                        85%
                                    </div>
                                    <span className="text-sm text-gray-600">改造推荐度</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-1000 ease-out"
                                style={{ width: '85%' }}
                            />
                        </div>
                    </div>
                )}

                {/* 标签页导航 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-purple-100 mb-6">
                    <div className="flex space-x-1">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-purple-50'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 标签页内容 */}
                <div className="space-y-6">
                    {/* 概览标签页 */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* 项目概要 */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-xl border border-purple-100">
                                <div className="text-center mb-5">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">项目概要</h3>
                                    <p className="text-xs text-gray-500">全面了解这个改造项目</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                            <Settings className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="text-xl font-bold text-purple-700">4</div>
                                        <div className="text-xs text-purple-600">改造步骤</div>
                                    </div>
                                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="text-xl font-bold text-blue-700">3-4小时</div>
                                        <div className="text-xs text-blue-600">预计耗时</div>
                                    </div>
                                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                            <Target className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="text-xl font-bold text-green-700">中等</div>
                                        <div className="text-xs text-green-600">难度等级</div>
                                    </div>
                                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="text-xl font-bold text-orange-700">60-110元</div>
                                        <div className="text-xs text-orange-600">预算范围</div>
                                    </div>
                                </div>

                                {/* 推荐度指示器 */}
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="font-semibold text-gray-800 text-sm">推荐度评分</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">85%</div>
                                            <div className="text-xs text-gray-600">综合评估</div>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-1000 ease-out" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 步骤标签页 */}
                    {activeTab === 'steps' && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <Wrench className="w-5 h-5 text-purple-500 mr-2" />
                                改造步骤指南
                            </h3>
                            <div className="space-y-4">
                                {creativeSteps.map((step, index) => (
                                    <div key={step.id} className="relative">
                                        {index < creativeSteps.length - 1 && (
                                            <div className="absolute left-6 top-12 w-0.5 h-16 bg-purple-200"></div>
                                        )}
                                        <div className="flex space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                                {step.id}
                                            </div>
                                            <div className="flex-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-semibold text-gray-800">{step.title}</h4>
                                                    <div className="flex space-x-2">
                                                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(step.difficulty)}`}>
                                                            {step.difficulty}
                                                        </span>
                                                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 flex items-center">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {step.time}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {step.materials.map((material, idx) => (
                                                        <span key={idx} className="text-xs bg-white/70 px-2 py-1 rounded-lg text-gray-600">
                                                            {material}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 教程标签页 */}
                    {activeTab === 'tutorials' && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <BookOpen className="w-5 h-5 text-purple-500 mr-2" />
                                相关教程推荐
                            </h3>
                            <div className="space-y-4">
                                {tutorials.map((tutorial) => (
                                    <div
                                        key={tutorial.id}
                                        className="bg-gradient-to-r from-white to-purple-50 rounded-2xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex space-x-4">
                                            <img
                                                src={tutorial.cover}
                                                alt={tutorial.title}
                                                className="w-20 h-16 object-cover rounded-xl shadow-md"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">
                                                        {tutorial.title}
                                                    </h4>
                                                    <button
                                                        onClick={() => window.open(tutorial.url, '_blank')}
                                                        className="flex-shrink-0 p-1 text-purple-500 hover:bg-purple-100 rounded-lg transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`text-xs px-2 py-1 rounded-full text-white ${getPlatformColor(tutorial.platform)}`}>
                                                            {tutorial.platform}
                                                        </span>
                                                        <span className="text-xs text-gray-600">{tutorial.author}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                                                        <div className="flex items-center space-x-1">
                                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                            <span>{tutorial.rating}</span>
                                                        </div>
                                                        <span>{tutorial.views}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 提示标签页 */}
                    {activeTab === 'tips' && (
                        <div className="space-y-6">
                            {/* 核心价值 - 始终显示 */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-xl border border-purple-100">
                                <div className="text-center mb-5">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">为什么选择创意改造？</h3>
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
                                            <Palette className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="font-semibold text-blue-700 text-sm mb-1">创意表达</div>
                                        <div className="text-xs text-blue-600">展现个人风格</div>
                                    </div>
                                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all duration-300">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="font-semibold text-purple-700 text-sm mb-1">节省开支</div>
                                        <div className="text-xs text-purple-600">性价比超高</div>
                                    </div>
                                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:shadow-md transition-all duration-300">
                                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="font-semibold text-orange-700 text-sm mb-1">独一无二</div>
                                        <div className="text-xs text-orange-600">专属定制感</div>
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
                                                <h4 className="font-bold text-red-800">安全第一</h4>
                                                <p className="text-xs text-red-600">改造前必读</p>
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
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                                    <span className="text-sm text-red-700">佩戴防护用品</span>
                                                </div>
                                                <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                                    <span className="text-sm text-red-700">保持环境通风</span>
                                                </div>
                                                <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                                    <span className="text-sm text-red-700">儿童需大人陪同</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* 更多提示 - 可折叠展开 */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg">
                                    <button
                                        onClick={() => setShowDetailedTips(!showDetailedTips)}
                                        className="w-full p-4 flex items-center justify-between hover:bg-purple-50/50 transition-colors rounded-t-2xl"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                                                <Target className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="font-bold text-gray-800">成功技巧指南</h4>
                                                <p className="text-xs text-gray-500">让改造更加专业高效</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">推荐</span>
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
                                                        前期准备
                                                    </h5>
                                                    <div className="space-y-2 text-sm text-green-700">
                                                        <div className="flex items-center space-x-2">
                                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                            <span>先测试再全面改造</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                            <span>预留充足时间</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                                                    <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">2</div>
                                                        执行要点
                                                    </h5>
                                                    <div className="space-y-2 text-sm text-blue-700">
                                                        <div className="flex items-center space-x-2">
                                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                                            <span>记录改造过程</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                                            <span>分步骤完成</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* 体验提升 - 可折叠展开 */}
                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                                    <button
                                        onClick={() => setShowExperience(!showExperience)}
                                        className="w-full p-4 flex items-center justify-between hover:bg-yellow-100/30 transition-colors rounded-t-2xl"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                                                <Heart className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="font-bold text-yellow-800">体验加分</h4>
                                                <p className="text-xs text-yellow-600">让改造过程更愉快</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">选做</span>
                                            {showExperience ? (
                                                <ChevronUp className="w-5 h-5 text-yellow-600" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-yellow-600" />
                                            )}
                                        </div>
                                    </button>

                                    {showExperience && (
                                        <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
                                            <div className="flex flex-wrap gap-3">
                                                <div className="flex items-center space-x-2 bg-white/50 rounded-lg px-3 py-2 text-sm text-yellow-700">
                                                    <Users className="w-4 h-4 text-yellow-600" />
                                                    <span>邀请朋友</span>
                                                </div>
                                                <div className="flex items-center space-x-2 bg-white/50 rounded-lg px-3 py-2 text-sm text-yellow-700">
                                                    <Music className="w-4 h-4 text-yellow-600" />
                                                    <span>播放音乐</span>
                                                </div>
                                                <div className="flex items-center space-x-2 bg-white/50 rounded-lg px-3 py-2 text-sm text-yellow-700">
                                                    <Camera className="w-4 h-4 text-yellow-600" />
                                                    <span>记录时光</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreativeDetail; 