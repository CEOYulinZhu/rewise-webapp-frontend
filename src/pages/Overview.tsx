import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Upload, Palette, Recycle, ShoppingBag, ChevronRight } from 'lucide-react';

interface LocationState {
    image: string;
    description: string;
}

const Overview: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, description } = (location.state as LocationState) || {};

    // 模拟推荐数据
    const recommendations = [
        {
            id: 'creative',
            title: '创意改造',
            subtitle: '让旧物焕发新生命',
            percentage: 85,
            description: '根据您的物品特征，我们推荐进行创意改造。这件物品具有很好的改造潜力，可以制作成实用的家居用品。',
            icon: Palette,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
            route: '/detail/creative'
        },
        {
            id: 'recycle',
            title: '回收/捐赠',
            subtitle: '传递爱心，环保先行',
            percentage: 70,
            description: '该物品适合进行环保回收或爱心捐赠，我们为您找到了多个便民回收点和公益组织。',
            icon: Recycle,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50',
            route: '/detail/recycle'
        },
        {
            id: 'trading',
            title: '二手平台交易',
            subtitle: '经济实惠，物尽其用',
            percentage: 60,
            description: '通过二手平台出售能获得不错的经济回报，我们分析了市场行情为您提供最优策略。',
            icon: ShoppingBag,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
            route: '/detail/trading'
        }
    ];

    const getProgressColor = (percentage: number) => {
        if (percentage >= 80) return 'from-green-400 to-emerald-500';
        if (percentage >= 60) return 'from-yellow-400 to-orange-500';
        return 'from-red-400 to-pink-500';
    };

    const handleDetailClick = (route: string, recommendation: any) => {
        // 创建一个可序列化的推荐对象，移除React组件引用
        const serializableRecommendation = {
            id: recommendation.id,
            title: recommendation.title,
            subtitle: recommendation.subtitle,
            percentage: recommendation.percentage,
            description: recommendation.description,
            gradient: recommendation.gradient,
            bgGradient: recommendation.bgGradient,
            route: recommendation.route
        };

        navigate(route, {
            state: {
                image,
                description,
                recommendation: serializableRecommendation
            }
        });
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
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-800">处置建议</h1>
                <div className="flex space-x-2 ml-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Upload className="w-4 h-4 text-green-600" />
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <RefreshCw className="w-4 h-4 text-green-600" />
                    </button>
                </div>
            </div>

            {/* 物品信息预览 */}
            {image && (
                <div className="mx-4 mb-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                        <div className="flex items-center space-x-4">
                            <img
                                src={image}
                                alt="上传的物品"
                                className="w-16 h-16 object-cover rounded-xl shadow-md"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 mb-1">您的物品</h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {description || '暂无描述'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 推荐卡片列表 */}
            <div className="px-4 space-y-4 pb-8">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        为您推荐以下处置方案
                    </h2>
                    <p className="text-gray-600 text-sm">
                        点击查看详细建议和具体操作指南
                    </p>
                </div>

                {recommendations.map((rec, index) => {
                    const Icon = rec.icon;
                    return (
                        <div
                            key={rec.id}
                            className={`bg-gradient-to-r ${rec.bgGradient} p-6 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]`}
                        >
                            <div className="flex items-start space-x-4">
                                {/* 图标和推荐度 */}
                                <div className="flex-shrink-0">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${rec.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="mt-3 text-center">
                                        <div className={`text-2xl font-bold bg-gradient-to-r ${rec.gradient} bg-clip-text text-transparent`}>
                                            {rec.percentage}%
                                        </div>
                                        <div className="text-xs text-gray-600">推荐度</div>
                                    </div>
                                </div>

                                {/* 内容区域 */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {rec.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {rec.subtitle}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-xs bg-white/70 px-2 py-1 rounded-full text-gray-600">
                                                #{index + 1}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 进度条 */}
                                    <div className="mb-4">
                                        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${getProgressColor(rec.percentage)} transition-all duration-1000 ease-out`}
                                                style={{ width: `${rec.percentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* 描述 */}
                                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                                        {rec.description}
                                    </p>

                                    {/* 查看详情按钮 */}
                                    <button
                                        onClick={() => handleDetailClick(rec.route, rec)}
                                        className="w-full bg-white/80 hover:bg-white text-gray-800 font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-md"
                                    >
                                        <span>查看详细方案</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 底部提示 */}
            <div className="px-4 pb-8">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-green-100">
                    <p className="text-sm text-gray-600">
                        💡 建议结合多种方式处置，让闲置物品发挥最大价值
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Overview; 