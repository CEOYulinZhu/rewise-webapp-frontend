import React from 'react';
import { ChevronDown, ChevronUp, ChevronRight, Star, Clock, Zap } from 'lucide-react';
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

    // 获取难度对应的星级
    const getDifficultyStars = (difficulty: string) => {
        const difficultyMap: { [key: string]: number } = {
            '极简': 1,
            '简单': 2,
            '一般': 3,
            '较难': 4,
            '困难': 5
        };
        return difficultyMap[difficulty] || 3;
    };

    // 渲染星级图标
    const renderStars = (level: number, total: number = 5) => {
        return Array.from({ length: total }, (_, i) => (
            <Star
                key={i}
                className={`w-3 h-3 ${i < level ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const difficultyStars = getDifficultyStars(rec.difficulty);

    return (
        <div className={`relative bg-gradient-to-br ${rec.bgGradient} rounded-3xl shadow-xl ${rec.shadowColor} border ${rec.borderColor} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
            {/* 背景装饰 */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <div className={`w-full h-full bg-gradient-to-br ${rec.gradient} rounded-full blur-2xl transform translate-x-8 -translate-y-8`} />
            </div>

            {/* 优先级徽章 - 添加动态效果 */}
            <div className="absolute top-4 right-4 z-10">
                <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold ${priorityBadge.color} shadow-lg backdrop-blur-sm ${rec.priority === 'highest' ? 'animate-pulse' : ''
                    }`}>
                    <PriorityIcon className={`w-3 h-3 ${rec.priority === 'highest' ? 'animate-bounce' : ''}`} />
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

                    {/* 标题和基本信息 - 信息层级重构 */}
                    <div className="flex-1 min-w-0">
                        {/* 强化标题 - 加大字号+加粗 */}
                        <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                            {rec.title}
                        </h3>
                        {/* 弱化标语 - 换行对齐，浅色处理 */}
                        <p className="text-sm text-gray-500 font-normal mb-3 leading-relaxed">
                            {rec.subtitle}
                        </p>

                        {/* 推荐度显示 - 数据可视化升级 */}
                        <div className="flex items-center space-x-3">
                            <div className={`text-2xl font-black bg-gradient-to-r ${rec.gradient} bg-clip-text text-transparent`}>
                                {rec.percentage}%
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-500 font-medium mb-1">推荐度</div>
                                {/* 渐变信任条 */}
                                <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${progressColor} transition-all duration-1000 ease-out shadow-sm relative`}
                                        style={{ width: `${rec.percentage}%` }}
                                    >
                                        {/* 进度条光泽效果 */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 展开/收起按钮 */}
                    <button
                        onClick={onToggle}
                        className="p-2 rounded-full bg-white/60 backdrop-blur-sm shadow-md active:scale-95 transition-all duration-200 hover:bg-white/80"
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
                        {/* 关键信息 - 模块统一性增强 */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* 预计耗时模块 */}
                            <div className="bg-white/60 rounded-2xl p-4 backdrop-blur-sm border border-white/50 shadow-sm">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Clock className="w-4 h-4 text-blue-500" />
                                    <div className="text-xs text-gray-600 font-medium">预计耗时</div>
                                </div>
                                <div className="text-sm font-bold text-gray-800">{rec.estimatedTime}</div>
                            </div>

                            {/* 操作难度模块 - 星级图标替代纯文字 */}
                            <div className="bg-white/60 rounded-2xl p-4 backdrop-blur-sm border border-white/50 shadow-sm">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    <div className="text-xs text-gray-600 font-medium">操作难度</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        {renderStars(difficultyStars)}
                                    </div>
                                    <span className="text-xs text-gray-600 font-medium">({rec.difficulty})</span>
                                </div>
                            </div>
                        </div>

                        {/* 推荐理由标签 */}
                        <div>
                            <div className="text-xs text-gray-600 font-medium mb-3">推荐理由</div>
                            <div className="flex flex-wrap gap-2">
                                {rec.reasons.map((reason, reasonIndex) => (
                                    <span
                                        key={reasonIndex}
                                        className="inline-flex items-center px-3 py-2 text-xs font-semibold bg-white/70 text-gray-700 rounded-xl border border-white/50 backdrop-blur-sm shadow-sm hover:bg-white/80 transition-colors duration-200"
                                    >
                                        {reason}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 查看详情按钮 - 按钮磁吸感设计 */}
                <div className="mt-6">
                    <button
                        onClick={onDetailClick}
                        className={`group w-full bg-gradient-to-r ${rec.gradient} text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl hover:scale-[1.02] relative overflow-hidden`}
                        aria-label={`查看${rec.title}详细方案`}
                    >
                        {/* 按钮背景光泽效果 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                        <span className="relative">立即试试</span>
                        <ChevronRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform duration-200" />

                        {/* 立即试试提示 */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            立即试试
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard; 