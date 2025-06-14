import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw, Upload, Palette, Recycle, ShoppingBag, ChevronRight, Sparkles, Clock, TrendingUp, Lightbulb } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

interface LocationState {
    image: string;
    description: string;
}

const Overview: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, description } = (location.state as LocationState) || {};
    const [isLoaded, setIsLoaded] = useState(false);

    // 简化的动画效果控制
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // 模拟推荐数据
    const recommendations = [
        {
            id: 'creative',
            title: '创意改造',
            subtitle: '让旧物焕发新生命',
            percentage: 85,
            priority: 'highest',
            estimatedTime: '2-3天',
            difficulty: '简单',
            reasons: ['改造潜力大', '实用性强', '成本较低', '创意空间足'],
            icon: Palette,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
            shadowColor: 'shadow-purple-200/50',
            borderColor: 'border-purple-100',
            route: '/detail/creative'
        },
        {
            id: 'recycle',
            title: '回收捐赠',
            subtitle: '传递爱心，环保先行',
            percentage: 70,
            priority: 'high',
            estimatedTime: '当天',
            difficulty: '极简',
            reasons: ['环保价值高', '回收点便民', '公益意义大', '流程简单'],
            icon: Recycle,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50',
            shadowColor: 'shadow-green-200/50',
            borderColor: 'border-green-100',
            route: '/detail/recycle'
        },
        {
            id: 'trading',
            title: '二手平台交易',
            subtitle: '经济实惠，物尽其用',
            percentage: 60,
            priority: 'medium',
            estimatedTime: '5-7天',
            difficulty: '一般',
            reasons: ['市场需求稳定', '价格合理', '交易便捷', '回报可观'],
            icon: ShoppingBag,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
            shadowColor: 'shadow-blue-200/50',
            borderColor: 'border-blue-100',
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

    // 获取优先级标识
    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'highest':
                return { text: '强烈推荐', color: 'bg-gradient-to-r from-amber-400 to-orange-400 text-white', icon: Sparkles };
            case 'high':
                return { text: '推荐', color: 'bg-gradient-to-r from-green-400 to-emerald-400 text-white', icon: TrendingUp };
            case 'medium':
                return { text: '一般推荐', color: 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white', icon: Clock };
            default:
                return { text: '一般推荐', color: 'bg-gray-400 text-white', icon: Clock };
        }
    };

    const handleDetailClick = (route: string, recommendation: any) => {
        // 创建一个可序列化的推荐对象，移除React组件引用
        const serializableRecommendation = {
            id: recommendation.id,
            title: recommendation.title,
            subtitle: recommendation.subtitle,
            percentage: recommendation.percentage,
            priority: recommendation.priority,
            estimatedTime: recommendation.estimatedTime,
            difficulty: recommendation.difficulty,
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
            {/* 顶部导航 */}
            <NavigationBar
                title="处置建议"
                actionButtons={[
                    {
                        icon: Upload,
                        onClick: () => navigate('/'),
                        className: 'active:scale-95 transition-all duration-200'
                    },
                    {
                        icon: RefreshCw,
                        onClick: () => window.location.reload(),
                        className: 'active:scale-95 transition-all duration-200'
                    }
                ]}
                className=""
                backButtonClassName="active:scale-95 transition-all duration-200"
            />

            {/* 物品信息预览 */}
            {(image || description) && (
                <div className={`mx-4 mb-8 transition-all duration-300 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
                        <div className="flex items-center space-x-5">
                            {image ? (
                                <div className="relative">
                                    <img
                                        src={image}
                                        alt="上传的物品"
                                        className="w-20 h-20 object-cover rounded-2xl shadow-lg ring-2 ring-white/50"
                                    />
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-lg flex items-center justify-center ring-2 ring-white/50">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="text-lg font-bold text-gray-800">您的物品</h3>
                                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        已识别
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    {description || '基于文字描述的物品'}
                                </p>
                                <div className="mt-3 flex items-center text-xs text-gray-500">
                                    <Clock className="w-3 h-3 mr-1" />
                                    分析完成 • 已生成{recommendations.length}个处置方案
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 推荐卡片列表 */}
            <div className="px-4 space-y-5 pb-8">
                {recommendations.map((rec, index) => {
                    const Icon = rec.icon;
                    const priorityBadge = getPriorityBadge(rec.priority);
                    const PriorityIcon = priorityBadge.icon;

                    return (
                        <div
                            key={rec.id}
                            className={`transform transition-all duration-400 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                }`}
                            style={{ transitionDelay: `${50 + index * 100}ms` }}
                        >
                            <div className={`relative bg-gradient-to-br ${rec.bgGradient} rounded-3xl shadow-xl ${rec.shadowColor} border ${rec.borderColor} overflow-hidden`}>
                                {/* 背景装饰 */}
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                    <div className={`w-full h-full bg-gradient-to-br ${rec.gradient} rounded-full blur-2xl transform translate-x-8 -translate-y-8`} />
                                </div>

                                {/* 优先级徽章 */}
                                <div className="absolute top-4 right-4 z-10">
                                    <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold ${priorityBadge.color} shadow-lg backdrop-blur-sm`}>
                                        <PriorityIcon className="w-3 h-3" />
                                        <span>{priorityBadge.text}</span>
                                    </div>
                                </div>

                                <div className="relative p-6 pt-8">
                                    <div className="flex items-start space-x-5">
                                        {/* 图标和推荐度区域 */}
                                        <div className="flex-shrink-0">
                                            <div className={`relative w-18 h-18 bg-gradient-to-br ${rec.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                                                <Icon className="w-9 h-9 text-white drop-shadow-sm" />
                                                {/* 光环效果 */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${rec.gradient} rounded-2xl opacity-20 blur-md scale-110`} />
                                            </div>

                                            {/* 推荐度显示 */}
                                            <div className="mt-4 text-center">
                                                <div className={`text-2xl font-black bg-gradient-to-r ${rec.gradient} bg-clip-text text-transparent drop-shadow-sm`}>
                                                    {rec.percentage}%
                                                </div>
                                                <div className="text-xs text-gray-600 font-medium mt-1">推荐度</div>
                                            </div>
                                        </div>

                                        {/* 内容区域 */}
                                        <div className="flex-1 min-w-0">
                                            {/* 标题区域 */}
                                            <div className="mb-4">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                    {rec.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 font-medium">
                                                    {rec.subtitle}
                                                </p>
                                            </div>

                                            {/* 进度条 */}
                                            <div className="mb-5">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs text-gray-600 font-medium">推荐度</span>
                                                    <span className="text-xs text-gray-700 font-semibold">{rec.percentage}%</span>
                                                </div>
                                                <div className="relative h-2.5 bg-white/40 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full bg-gradient-to-r ${getProgressColor(rec.id)} transition-all duration-1000 ease-out shadow-sm relative`}
                                                        style={{ width: `${rec.percentage}%` }}
                                                    >
                                                        {/* 进度条光泽效果 */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 关键信息 */}
                                            <div className="mb-4 grid grid-cols-2 gap-3">
                                                <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                                                    <div className="text-xs text-gray-600 mb-1">预计耗时</div>
                                                    <div className="text-sm font-bold text-gray-800">{rec.estimatedTime}</div>
                                                </div>
                                                <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                                                    <div className="text-xs text-gray-600 mb-1">操作难度</div>
                                                    <div className="text-sm font-bold text-gray-800">{rec.difficulty}</div>
                                                </div>
                                            </div>

                                            {/* 推荐理由标签 */}
                                            <div className="mb-5">
                                                <div className="text-xs text-gray-600 font-medium mb-2">推荐理由</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {rec.reasons.map((reason, reasonIndex) => (
                                                        <span
                                                            key={reasonIndex}
                                                            className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-white/70 text-gray-700 rounded-full border border-white/50 backdrop-blur-sm shadow-sm"
                                                        >
                                                            {reason}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* 查看详情按钮 */}
                                            <button
                                                onClick={() => handleDetailClick(rec.route, rec)}
                                                className={`w-full bg-gradient-to-r ${rec.gradient} text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-200 active:scale-95 shadow-lg`}
                                            >
                                                <span>查看详细方案</span>
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 底部提示 */}
            <div className={`px-4 pb-8 transition-all duration-300 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
                    <div className="flex items-center justify-center space-x-2">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <p className="text-sm text-gray-700 font-medium">
                            建议优先选择推荐度较高的方案，获得更好的处置效果
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview; 