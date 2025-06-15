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
                    <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border ${theme.cardBorderColor} mb-6`}>
                        <div className="flex items-center space-x-4 mb-4">
                            {/* 物品图片或默认图标 */}
                            {image ? (
                                <img
                                    src={image}
                                    alt="物品图片"
                                    className="w-20 h-20 object-cover rounded-2xl shadow-lg"
                                />
                            ) : (
                                <div className={`w-20 h-20 bg-gradient-to-r ${theme.defaultIconGradient} rounded-2xl shadow-lg flex items-center justify-center`}>
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            )}

                            {/* 物品信息 */}
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {description || '待处理物品'}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <div className={`text-2xl font-bold bg-gradient-to-r ${theme.recommendationGradient} bg-clip-text text-transparent`}>
                                        {recommendationScore}%
                                    </div>
                                    <span className="text-sm text-gray-600">{recommendationLabel}</span>
                                </div>
                            </div>
                        </div>

                        {/* 推荐度进度条 */}
                        <div className={`h-2 ${theme.progressBgColor} rounded-full overflow-hidden`}>
                            <div
                                className={`h-full bg-gradient-to-r ${theme.progressGradient} transition-all duration-1000 ease-out`}
                                style={{ width: `${recommendationScore}%` }}
                            />
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