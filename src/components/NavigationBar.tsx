import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, type LucideIcon } from 'lucide-react';

// 操作按钮配置接口
interface ActionButton {
    icon: LucideIcon;
    onClick: () => void;
    className?: string;
    isActive?: boolean;
    activeColor?: string;
}

// 导航栏组件属性接口
interface NavigationBarProps {
    title: string;
    onBack?: () => void; // 自定义返回逻辑，不传则使用默认的 navigate(-1)
    showBackButton?: boolean; // 是否显示返回按钮，默认为 true
    actionButtons?: ActionButton[]; // 右侧操作按钮数组
    className?: string; // 自定义样式类
    titleClassName?: string; // 标题自定义样式类
    backButtonClassName?: string; // 返回按钮自定义样式类
    backButtonColor?: string; // 返回按钮图标颜色，默认为 text-green-600
    centerContent?: React.ReactNode; // 中间自定义内容，会替换标题
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    title,
    onBack,
    showBackButton = true,
    actionButtons = [],
    className = '',
    titleClassName = '',
    backButtonClassName = '',
    backButtonColor = 'text-green-600',
    centerContent
}) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <div className={`relative flex items-center p-4 pt-8 ${className}`}>
            {/* 左侧返回按钮 */}
            {showBackButton && (
                <button
                    onClick={handleBack}
                    className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${backButtonClassName}`}
                >
                    <ArrowLeft className={`w-5 h-5 ${backButtonColor}`} />
                </button>
            )}

            {/* 中间内容区域 */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                {centerContent || (
                    <h1 className={`text-lg font-semibold text-gray-800 ${titleClassName}`}>
                        {title}
                    </h1>
                )}
            </div>

            {/* 右侧操作按钮 */}
            <div className="flex space-x-2 ml-auto">
                {actionButtons.map((button, index) => {
                    const Icon = button.icon;
                    return (
                        <button
                            key={index}
                            onClick={button.onClick}
                            className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${button.className || ''}`}
                        >
                            <Icon
                                className={`w-5 h-5 ${button.isActive && button.activeColor
                                    ? button.activeColor
                                    : 'text-gray-600'
                                    }`}
                            />
                        </button>
                    );
                })}
                {/* 如果没有操作按钮且显示返回按钮，添加占位符保持居中 */}
                {actionButtons.length === 0 && showBackButton && (
                    <div className="w-10 h-10"></div>
                )}
            </div>
        </div>
    );
};

export default NavigationBar; 