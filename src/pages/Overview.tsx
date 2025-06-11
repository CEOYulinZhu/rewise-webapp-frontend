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
            reasons: ['改造潜力大', '实用性强', '成本较低', '创意空间足'],
            icon: Palette,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
            route: '/detail/creative'
        },
        {
            id: 'recycle',
            title: '回收捐赠',
            subtitle: '传递爱心，环保先行',
            percentage: 70,
            reasons: ['环保价值高', '回收点便民', '公益意义大', '流程简单'],
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
            reasons: ['市场需求稳定', '价格合理', '交易便捷', '回报可观'],
            icon: ShoppingBag,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
            route: '/detail/trading'
        }
    ];

    // 统一的进度条颜色，与各方案的主题色保持一致
    const getProgressColor = (id: string) => {
        switch (id) {
            case 'creative':
                return 'from-purple-400 to-pink-400';
            case 'recycle':
                return 'from-green-400 to-emerald-400';
            case 'trading':
                return 'from-blue-400 to-cyan-400';
            default:
                return 'from-gray-400 to-gray-500';
        }
    };

    const handleDetailClick = (route: string, recommendation: any) => {
        // 创建一个可序列化的推荐对象，移除React组件引用
        const serializableRecommendation = {
            id: recommendation.id,
            title: recommendation.title,
            subtitle: recommendation.subtitle,
            percentage: recommendation.percentage,
            reasons: recommendation.reasons,
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
            {(image || description) && (
                <div className="mx-4 mb-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                        <div className="flex items-center space-x-4">
                            {image ? (
                                <img
                                    src={image}
                                    alt="上传的物品"
                                    className="w-16 h-16 object-cover rounded-xl shadow-md"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl shadow-md flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 mb-1">您的物品</h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {description || '基于文字描述的物品'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 推荐卡片列表 */}
            <div className="px-4 space-y-4 pb-8">
        

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
                                        <div className="h-2 bg-white/40 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${getProgressColor(rec.id)} transition-all duration-1000 ease-out shadow-sm`}
                                                style={{ width: `${rec.percentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* 推荐理由标签 */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-2">
                                            {rec.reasons.map((reason, reasonIndex) => (
                                                <span
                                                    key={reasonIndex}
                                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-white/60 text-gray-700 rounded-full border border-white/40 backdrop-blur-sm"
                                                >
                                                    {reason}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 查看详情按钮 */}
                                    <button
                                        onClick={() => handleDetailClick(rec.route, rec)}
                                        className={`w-full bg-gradient-to-r ${rec.gradient} hover:shadow-lg text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.02] shadow-md`}
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
        </div>
    );
};

export default Overview; 