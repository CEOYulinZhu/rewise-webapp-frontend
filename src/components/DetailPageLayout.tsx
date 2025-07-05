import React from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import NavigationBar from './NavigationBar';

// 主题配置类型
export interface ThemeConfig {
    // 背景渐变
    backgroundGradient: string;
    // 卡片边框颜色
    cardBorderColor: string;
    // 推荐度文字渐变
    recommendationGradient: string;
    // 进度条背景色
    progressBgColor: string;
    // 进度条渐变
    progressGradient: string;
    // 标签页激活状态渐变
    tabActiveGradient: string;
    // 标签页悬停背景色
    tabHoverBgColor: string;
    // 标签页悬停文字颜色
    tabHoverTextColor: string;
    // 默认图标渐变（当没有图片时）
    defaultIconGradient: string;
}

// 标签页配置类型
export interface TabConfig {
    id: string;
    name: string;
    icon: LucideIcon;
}

// 组件属性类型
interface DetailPageLayoutProps {
    // 基础信息
    title: string;
    image?: string;
    description?: string;

    // 推荐度信息
    recommendationScore: number;
    recommendationLabel: string;

    // 主题配置
    theme: ThemeConfig;

    // 标签页配置
    tabs: TabConfig[];
    activeTab: string;
    onTabChange: (tabId: string) => void;

    // 标签页内容渲染函数
    renderTabContent: () => ReactNode;

    // 导航栏配置
    navigationTitle: string;
    navigationBackButtonColor?: string;
    navigationActionButtons?: Array<{
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
        activeColor?: string;
    }>;

    // 子组件
    children?: ReactNode;
}

const DetailPageLayout: React.FC<DetailPageLayoutProps> = ({
    title,
    image,
    description,
    recommendationScore,
    recommendationLabel,
    theme,
    tabs,
    activeTab,
    onTabChange,
    renderTabContent,
    navigationTitle,
    navigationBackButtonColor,
    navigationActionButtons,
    children
}) => {
    return (
        <div className={`min-h-screen bg-gradient-to-br ${theme.backgroundGradient}`}>
            {/* 顶部导航 */}
            <NavigationBar
                title={navigationTitle}
                backButtonColor={navigationBackButtonColor}
                actionButtons={navigationActionButtons}
            />

            <div className="px-4 pb-8">
                {/* 物品信息和推荐度卡片 */}
                {(image || description) && (
                    <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200 ${theme.cardBorderColor} mb-6`}>
                        {/* 物品基础信息区域 */}
                        <div className="flex items-start space-x-3 mb-5">
                            {/* 物品图片或默认图标 - 增大20% */}
                            {image ? (
                                <img
                                    src={image}
                                    alt="物品图片"
                                    className="w-24 h-24 object-cover rounded-2xl shadow-lg flex-shrink-0"
                                />
                            ) : (
                                <div className={`w-24 h-24 bg-gradient-to-r ${theme.defaultIconGradient} rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0`}>
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            )}

                            {/* 物品信息 - 增加右侧留白 */}
                            <div className="flex-1 min-w-0 ml-3">
                                {/* 标题 - 16-18px 中粗体 */}
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                                    {title}
                                </h3>
                                {/* 详情 - 14px 常规体 */}
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {description || '待处理物品'}
                                </p>
                            </div>
                        </div>

                        {/* 分割线 */}
                        <div className="border-t border-gray-100 mb-4"></div>

                        {/* 交易推荐度区域 */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                {/* 推荐度数值 - 15-16px 加粗突出 */}
                                <div className={`text-base font-bold bg-gradient-to-r ${theme.recommendationGradient} bg-clip-text text-transparent`}>
                                    {recommendationScore}%
                                </div>
                                {/* 推荐度标签 - 13-14px 常规字 */}
                                <span className="text-sm text-gray-600 font-normal">
                                    {recommendationLabel}
                                </span>
                            </div>

                            {/* 推荐度进度条 */}
                            <div className={`h-2 ${theme.progressBgColor} rounded-full overflow-hidden`}>
                                <div
                                    className={`h-full bg-gradient-to-r ${theme.progressGradient} transition-all duration-1000 ease-out`}
                                    style={{ width: `${recommendationScore}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* 标签页导航 */}
                <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border ${theme.cardBorderColor} mb-6`}>
                    <div className="flex space-x-1">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                                        ? `bg-gradient-to-br ${theme.tabActiveGradient} text-white shadow-lg transform scale-105`
                                        : `text-gray-600 hover:${theme.tabHoverBgColor} hover:${theme.tabHoverTextColor}`
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

                {/* 额外的子组件内容 */}
                {children}
            </div>
        </div>
    );
};

export default DetailPageLayout; 