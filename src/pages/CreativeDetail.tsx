import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ExternalLink, Star, Clock, Wrench, CheckCircle, BarChart3, Settings, BookOpen, Lightbulb } from 'lucide-react';

interface LocationState {
    image: string;
    description: string;
    recommendation: any;
}

const CreativeDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, description } = (location.state as LocationState) || {};
    const [isFavorited, setIsFavorited] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

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
            <div className="relative flex items-center p-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <ArrowLeft className="w-5 h-5 text-purple-600" />
                </button>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-800">创意改造方案</h1>
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
                            {/* 改造优势 */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                    为什么推荐创意改造？
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                                        <div className="text-2xl mb-2">🌱</div>
                                        <div className="font-semibold text-green-700">环保价值</div>
                                        <div className="text-xs text-green-600">减少废物产生</div>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                                        <div className="text-2xl mb-2">🎨</div>
                                        <div className="font-semibold text-blue-700">创意表达</div>
                                        <div className="text-xs text-blue-600">发挥想象力</div>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                                        <div className="text-2xl mb-2">💰</div>
                                        <div className="font-semibold text-purple-700">经济实惠</div>
                                        <div className="text-xs text-purple-600">节省购买成本</div>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                                        <div className="text-2xl mb-2">✨</div>
                                        <div className="font-semibold text-orange-700">独特性</div>
                                        <div className="text-xs text-orange-600">制作专属物品</div>
                                    </div>
                                </div>
                            </div>

                            {/* 快速预览 */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">改造预览</h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-4 bg-purple-50 rounded-2xl">
                                        <div className="text-2xl font-bold text-purple-700">4</div>
                                        <div className="text-sm text-purple-600">改造步骤</div>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-2xl">
                                        <div className="text-2xl font-bold text-blue-700">3-4小时</div>
                                        <div className="text-sm text-blue-600">预计耗时</div>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-2xl">
                                        <div className="text-2xl font-bold text-green-700">中等</div>
                                        <div className="text-sm text-green-600">难度等级</div>
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
                            <h3 className="text-lg font-bold text-gray-800 mb-4">
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
                            {/* 温馨提示 */}
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                                <h4 className="font-semibold text-yellow-800 mb-2">💡 温馨提示</h4>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• 改造前请确保有足够的时间和空间</li>
                                    <li>• 使用工具时注意安全，佩戴防护用品</li>
                                    <li>• 建议先在小范围测试，再进行整体改造</li>
                                    <li>• 可以邀请朋友一起，增加改造的乐趣</li>
                                </ul>
                            </div>

                            {/* 安全注意事项 */}
                            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4 border border-red-200">
                                <h4 className="font-semibold text-red-800 mb-2">⚠️ 安全注意事项</h4>
                                <ul className="text-sm text-red-700 space-y-1">
                                    <li>• 使用尖锐工具时务必小心，避免割伤</li>
                                    <li>• 使用化学材料时保持通风良好</li>
                                    <li>• 儿童操作时需成人陪同指导</li>
                                    <li>• 如有过敏史，请提前做皮肤测试</li>
                                </ul>
                            </div>

                            {/* 成本预估 */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-100">
                                <h4 className="font-semibold text-gray-800 mb-4">💰 成本预估</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                                        <span className="text-gray-700">基础材料</span>
                                        <span className="font-semibold text-purple-700">30-50元</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                                        <span className="text-gray-700">装饰用品</span>
                                        <span className="font-semibold text-blue-700">20-40元</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                                        <span className="text-gray-700">工具租借</span>
                                        <span className="font-semibold text-green-700">10-20元</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between items-center font-bold">
                                            <span className="text-gray-800">预计总成本</span>
                                            <span className="text-purple-700 text-lg">60-110元</span>
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
};

export default CreativeDetail; 