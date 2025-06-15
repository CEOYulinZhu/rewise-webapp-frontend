import React from 'react';
import { Filter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// 筛选选项接口
export interface FilterOption {
    id: string;
    name: string;
    icon?: LucideIcon;
    color?: string;
}

// 筛选组接口
export interface FilterGroup {
    id: string;
    title: string;
    options: FilterOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
    type?: 'default' | 'gradient' | 'colored';
}

interface FilterPanelProps {
    isOpen: boolean;
    onToggle: () => void;
    filterGroups: FilterGroup[];
    className?: string;
    showAsDropdown?: boolean; // 是否显示为下拉面板
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    isOpen,
    onToggle,
    filterGroups,
    className = "",
    showAsDropdown = false
}) => {
    // 获取按钮样式
    const getButtonStyle = (group: FilterGroup, option: FilterOption, isSelected: boolean) => {
        if (group.type === 'gradient' && isSelected && option.color) {
            return `bg-gradient-to-r ${option.color} text-white shadow-lg`;
        } else if (group.type === 'colored' && isSelected) {
            return 'bg-blue-500 text-white shadow-lg';
        } else if (isSelected) {
            return 'bg-purple-500 text-white shadow-lg';
        } else {
            return 'bg-gray-100 text-gray-600 hover:bg-gray-200';
        }
    };

    if (showAsDropdown) {
        return (
            <div className={`relative ${className}`}>
                <button
                    onClick={onToggle}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-green-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <Filter className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">筛选</span>
                </button>

                {/* 筛选面板 */}
                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 z-10 min-w-80">
                        {filterGroups.map((group, groupIndex) => (
                            <div key={group.id} className={groupIndex < filterGroups.length - 1 ? 'mb-4' : ''}>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">{group.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.options.map((option) => {
                                        const Icon = option.icon;
                                        const isSelected = group.selectedValue === option.id;
                                        const buttonStyle = getButtonStyle(group, option, isSelected);

                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => group.onSelect(option.id)}
                                                className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 ${buttonStyle}`}
                                            >
                                                {Icon && <Icon className="w-4 h-4" />}
                                                <span className="text-sm">{option.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`px-4 mb-6 ${className}`}>
            {/* 筛选面板 */}
            {isOpen && (
                <div className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100">
                    {filterGroups.map((group, groupIndex) => (
                        <div key={group.id} className={groupIndex < filterGroups.length - 1 ? 'mb-4' : ''}>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">{group.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {group.options.map((option) => {
                                    const Icon = option.icon;
                                    const isSelected = group.selectedValue === option.id;
                                    const buttonStyle = getButtonStyle(group, option, isSelected);

                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => group.onSelect(option.id)}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 ${buttonStyle}`}
                                        >
                                            {Icon && <Icon className="w-4 h-4" />}
                                            <span className="text-sm">{option.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterPanel; 