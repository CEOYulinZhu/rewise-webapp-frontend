import React from 'react';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface RecommendationData {
    id: string;
    title: string;
    subtitle: string;
    percentage: number;
    priority: string;
    estimatedTime: string;
    difficulty: string;
    reasons: string[];
    icon: LucideIcon;
    gradient: string;
    bgGradient: string;
    shadowColor: string;
    borderColor: string;
    route: string;
}

interface PriorityBadge {
    text: string;
    color: string;
    icon: LucideIcon;
}

interface RecommendationCardProps {
    recommendation: RecommendationData;
    isExpanded: boolean;
    onToggle: () => void;
    onDetailClick: () => void;
    priorityBadge: PriorityBadge;
    progressColor: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
    recommendation: rec,
    isExpanded,
    onToggle,
    onDetailClick,
    priorityBadge,
    progressColor
}) => {
    const Icon = rec.icon;
    const PriorityIcon = priorityBadge.icon;

    return (
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
                {/* 基础信息区域 - 始终显示 */}
                <div className="flex items-center space-x-4 mb-4">
                    {/* 图标和推荐度 */}
                    <div className="flex-shrink-0">
                        <div className={`relative w-16 h-16 bg-gradient-to-br ${rec.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                            <Icon className="w-8 h-8 text-white drop-shadow-sm" />
                            {/* 光环效果 */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${rec.gradient} rounded-2xl opacity-20 blur-md scale-110`} />
                        </div>
                    </div>

                    {/* 标题和基本信息 */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {rec.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium mb-2">
                            {rec.subtitle}
                        </p>

                        {/* 推荐度显示 */}
                        <div className="flex items-center space-x-3">
                            <div className={`text-xl font-black bg-gradient-to-r ${rec.gradient} bg-clip-text text-transparent`}>
                                {rec.percentage}%
                            </div>
                            <span className="text-xs text-gray-600 font-medium">推荐度</span>
                        </div>
                    </div>

                    {/* 展开/收起按钮 */}
                    <button
                        onClick={onToggle}
                        className="p-2 rounded-full bg-white/60 backdrop-blur-sm shadow-md active:scale-95 transition-all duration-200"
                        aria-label={isExpanded ? '收起详细信息' : '展开详细信息'}
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        )}
                    </button>
                </div>

                {/* 详细信息区域 - 可折叠 */}
                <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                    <div className="space-y-4 pt-2">
                        {/* 进度条 */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-gray-600 font-medium">推荐度</span>
                                <span className="text-xs text-gray-700 font-semibold">{rec.percentage}%</span>
                            </div>
                            <div className="relative h-2.5 bg-white/40 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${progressColor} transition-all duration-1000 ease-out shadow-sm relative`}
                                    style={{ width: `${rec.percentage}%` }}
                                >
                                    {/* 进度条光泽效果 */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* 关键信息 */}
                        <div className="grid grid-cols-2 gap-3">
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
                        <div>
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
                    </div>
                </div>

                {/* 查看详情按钮 - 始终显示 */}
                <div className="mt-4">
                    <button
                        onClick={onDetailClick}
                        className={`w-full bg-gradient-to-r ${rec.gradient} text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-200 active:scale-95 shadow-lg`}
                        aria-label={`查看${rec.title}详细方案`}
                    >
                        <span>查看详细方案</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard; 