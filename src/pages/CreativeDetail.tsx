import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, Share2, ExternalLink, Star, Clock, Wrench, BarChart3, Settings, BookOpen, Lightbulb, DollarSign, Palette, Sparkles, Leaf, Shield, Target, Users, Music, Camera, ChevronDown, ChevronUp } from 'lucide-react';
import DetailPageLayout from '../components/DetailPageLayout';
import type { TabConfig } from '../components/DetailPageLayout';
import { creativeTheme } from '../config/detailPageThemes';
import { useGlobalState } from '../hooks/useGlobalState';

interface LocationState {
    image: string;
    description: string;
    recommendation: any;
}

const CreativeDetail: React.FC = () => {
    const location = useLocation();
    const { image, description } = (location.state as LocationState) || {};
    const { analysisResult, inputData } = useGlobalState();
    const [isFavorited, setIsFavorited] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [showDetailedTips, setShowDetailedTips] = useState(false);
    const [showExperience, setShowExperience] = useState(false);
    const [showSafety, setShowSafety] = useState(false);

    // 从API数据中获取创意解决方案数据
    const creativeData = analysisResult?.creative_solution;
    const renovationPlan = creativeData?.renovation_plan;
    const videos = creativeData?.videos || [];
    const creativeScore = analysisResult?.disposal_solution?.recommendations?.creative_renovation?.recommendation_score || 30;

    // 使用API数据的改造步骤
    const creativeSteps = renovationPlan?.steps?.map((step, index) => ({
        id: index + 1,
        title: step.title,
        description: step.description,
        time: `${step.estimated_time_minutes}分钟`,
        difficulty: step.difficulty,
        materials: [...(step.tools || []), ...(step.materials || [])]
    })) || [];

    // 使用API数据的教程视频
    const tutorials = videos.length > 0 ? videos.map((video, index) => ({
        id: index + 1,
        title: video.title,
        platform: 'B站',
        author: video.uploader,
        cover: video.cover_url,
        rating: video.score,
        views: video.play_count ? `${(video.play_count / 10000).toFixed(1)}万` : '未知',
        url: video.url,
        duration: video.duration
    })) : [];

    // 定义标签页
    const tabs: TabConfig[] = [
        { id: 'overview', name: '概览', icon: BarChart3 },
        { id: 'steps', name: '步骤', icon: Settings },
        { id: 'tutorials', name: '教程', icon: BookOpen },
        { id: 'tips', name: '提示', icon: Lightbulb }
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
        if (navigator.share) {
            navigator.share({
                title: '创意改造方案',
                text: '发现一个很棒的创意改造方案！',
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
                        <div className="text-xl font-bold text-purple-700">{renovationPlan?.summary?.total_steps || 0}</div>
                        <div className="text-xs text-purple-600">改造步骤</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-blue-700">{renovationPlan?.summary?.total_time_hours || 0}小时</div>
                        <div className="text-xs text-blue-600">预计耗时</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-green-700">{renovationPlan?.summary?.difficulty || '未知'}</div>
                        <div className="text-xs text-green-600">难度等级</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xl font-bold text-orange-700">{renovationPlan?.summary?.budget_range || '未知'}</div>
                        <div className="text-xs text-orange-600">预算范围</div>
                    </div>
                </div>


            </div>
        </div>
    );

    // 步骤内容
    const renderSteps = () => (
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
                                    <h4 className="font-semibold text-gray-800 flex-1 pr-3 min-w-0">{step.title}</h4>
                                    <div className="flex space-x-2 flex-shrink-0">
                                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getDifficultyColor(step.difficulty)}`}>
                                            {step.difficulty}
                                        </span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 flex items-center whitespace-nowrap">
                                            <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
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
    );

    // 教程内容
    const renderTutorials = () => (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 text-purple-500 mr-2" />
                相关教程推荐
            </h3>
            <div className="space-y-4">
                {tutorials.length > 0 ? tutorials.map((tutorial) => (
                    <div
                        key={tutorial.id}
                        className="bg-gradient-to-r from-white to-purple-50 rounded-2xl p-4 border border-purple-100"
                    >
                        <div className="flex space-x-4">
                            <img
                                src={tutorial.cover}
                                alt={tutorial.title}
                                className="w-20 h-16 object-cover rounded-xl shadow-md"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1 pr-2">
                                        {tutorial.title}
                                    </h4>
                                    <button
                                        onClick={() => window.open(tutorial.url, '_blank')}
                                        className="flex-shrink-0 p-1 text-purple-500 rounded-lg"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                        <span className={`text-xs px-2 py-1 rounded-full text-white flex-shrink-0 ${getPlatformColor(tutorial.platform)}`}>
                                            {tutorial.platform}
                                        </span>
                                        <span className="text-xs text-gray-600 truncate">{tutorial.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-xs text-gray-500 flex-shrink-0 ml-2">
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current flex-shrink-0" />
                                            <span className="whitespace-nowrap">{tutorial.rating}</span>
                                        </div>
                                        <span className="whitespace-nowrap">{tutorial.views}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-8">
                        <div className="text-gray-400 mb-2">
                            <BookOpen className="w-12 h-12 mx-auto mb-2" />
                        </div>
                        <p className="text-gray-500">暂无相关教程推荐</p>
                    </div>
                )}
            </div>
        </div>
    );

    // 提示内容
    const renderTips = () => (
        <div className="space-y-6">
            {/* 核心价值 - 始终显示 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-xl border border-purple-100">
                <div className="text-center mb-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">为什么选择创意改造？</h3>
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
                            <Palette className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-semibold text-blue-700 text-sm mb-1">创意表达</div>
                        <div className="text-xs text-blue-600">展现个人风格</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-semibold text-purple-700 text-sm mb-1">节省开支</div>
                        <div className="text-xs text-purple-600">性价比超高</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
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
                        className="w-full p-4 flex items-center justify-between rounded-t-2xl"
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
                        className="w-full p-4 flex items-center justify-between rounded-t-2xl"
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
                        className="w-full p-4 flex items-center justify-between rounded-t-2xl"
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
    );

    // 渲染当前激活的标签页内容
    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'steps':
                return renderSteps();
            case 'tutorials':
                return renderTutorials();
            case 'tips':
                return renderTips();
            default:
                return renderOverview();
        }
    };

    return (
        <DetailPageLayout
            title={renovationPlan?.summary?.title || "您的物品"}
            image={image || inputData?.image || undefined}
            description={description || inputData?.description || '待改造物品'}
            recommendationScore={creativeScore}
            recommendationLabel="改造推荐度"
            theme={creativeTheme}
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            renderTabContent={renderTabContent}
            navigationTitle="创意改造方案"
            navigationBackButtonColor="text-purple-600"
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

export default CreativeDetail; 