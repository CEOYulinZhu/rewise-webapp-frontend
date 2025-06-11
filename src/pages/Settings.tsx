import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, RotateCcw, Palette, Recycle, ShoppingBag, GripVertical, Info } from 'lucide-react';
import type { PreferenceItem } from '../types/preferences';

const Settings: React.FC = () => {
    const navigate = useNavigate();

    // 默认的处置路径配置
    const defaultPreferences: PreferenceItem[] = [
        {
            id: 'creative',
            title: '创意改造',
            subtitle: '让旧物焕发新生命',
            icon: Palette,
            gradient: 'from-purple-500 to-pink-500',
            enabled: true
        },
        {
            id: 'recycle',
            title: '回收捐赠',
            subtitle: '传递爱心，环保先行',
            icon: Recycle,
            gradient: 'from-green-500 to-emerald-500',
            enabled: true
        },
        {
            id: 'trading',
            title: '二手平台交易',
            subtitle: '经济实惠，物尽其用',
            icon: ShoppingBag,
            gradient: 'from-blue-500 to-cyan-500',
            enabled: true
        }
    ];

    const [preferences, setPreferences] = useState<PreferenceItem[]>(defaultPreferences);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // 从本地存储加载用户偏好设置
    useEffect(() => {
        const savedPreferences = localStorage.getItem('disposalPreferences');
        if (savedPreferences) {
            try {
                const parsed = JSON.parse(savedPreferences);
                setPreferences(parsed);
            } catch (error) {
                console.error('解析偏好设置失败:', error);
            }
        }
    }, []);

    // 监听偏好变化
    useEffect(() => {
        const savedPreferences = localStorage.getItem('disposalPreferences');
        if (savedPreferences) {
            const saved = JSON.parse(savedPreferences);
            const hasChanged = JSON.stringify(preferences) !== JSON.stringify(saved);
            setHasUnsavedChanges(hasChanged);
        } else {
            setHasUnsavedChanges(JSON.stringify(preferences) !== JSON.stringify(defaultPreferences));
        }
    }, [preferences]);

    // 拖拽开始
    const handleDragStart = (index: number) => {
        setDraggedItem(index);
    };

    // 拖拽结束
    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    // 拖拽悬停
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // 拖拽放置
    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();

        if (draggedItem === null) return;

        const newPreferences = [...preferences];
        const draggedPreference = newPreferences[draggedItem];

        // 移除被拖拽的项目
        newPreferences.splice(draggedItem, 1);
        // 在新位置插入
        newPreferences.splice(dropIndex, 0, draggedPreference);

        setPreferences(newPreferences);
        setDraggedItem(null);
    };

    // 切换启用状态
    const togglePreference = (index: number) => {
        const newPreferences = [...preferences];
        newPreferences[index].enabled = !newPreferences[index].enabled;
        setPreferences(newPreferences);
    };

    // 保存设置
    const handleSave = () => {
        localStorage.setItem('disposalPreferences', JSON.stringify(preferences));
        setHasUnsavedChanges(false);

        // 显示保存成功提示
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
        toast.textContent = '设置已保存';
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 2000);
    };

    // 重置为默认设置
    const handleReset = () => {
        setPreferences(defaultPreferences);
    };

    // 向上移动
    const moveUp = (index: number) => {
        if (index === 0) return;
        const newPreferences = [...preferences];
        [newPreferences[index], newPreferences[index - 1]] = [newPreferences[index - 1], newPreferences[index]];
        setPreferences(newPreferences);
    };

    // 向下移动
    const moveDown = (index: number) => {
        if (index === preferences.length - 1) return;
        const newPreferences = [...preferences];
        [newPreferences[index], newPreferences[index + 1]] = [newPreferences[index + 1], newPreferences[index]];
        setPreferences(newPreferences);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* 顶部导航 */}
            <div className="flex items-center justify-between p-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                    <ArrowLeft className="w-5 h-5 text-green-600" />
                </button>
                <h1 className="text-lg font-semibold text-gray-800">偏好设置</h1>
                <div className="w-10 h-10"></div> {/* 占位符保持居中 */}
            </div>

            <div className="px-4 pb-8 space-y-6">
                {/* 设置说明 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">处置方案优先级</h3>
                    <p className="text-sm text-green-700 leading-relaxed mb-2">
                        拖拽调整方案显示顺序，使用开关控制方案是否启用
                    </p>
                    <div className="flex items-start space-x-2 text-xs text-green-600 bg-green-100/50 rounded-lg px-3 py-2">
                        <Info className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <span className="font-medium">说明：</span>系统默认按照匹配度从高到低展示处置方案，您可以根据个人偏好调整展示顺序
                        </div>
                    </div>
                </div>

                {/* 偏好设置列表 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-green-100">
                    <div className="space-y-3">
                        {preferences.map((preference, index) => {
                            const Icon = preference.icon;
                            return (
                                <div
                                    key={preference.id}
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, index)}
                                    className={`relative px-3 py-5 rounded-xl border transition-all duration-200 ${preference.enabled
                                        ? 'bg-white border-green-200 shadow-sm'
                                        : 'bg-gray-50 border-gray-200'
                                        } ${draggedItem === index ? 'opacity-50 scale-95' : 'hover:shadow-md'} cursor-move`}
                                >
                                    <div className="flex items-center space-x-3">
                                        {/* 优先级和拖拽手柄 */}
                                        <div className="flex items-center space-x-2">
                                            <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs font-semibold">{index + 1}</span>
                                            </div>
                                            <GripVertical className="w-4 h-4 text-gray-400" />
                                        </div>

                                        {/* 图标 */}
                                        <div className={`w-10 h-10 bg-gradient-to-r ${preference.gradient} rounded-lg flex items-center justify-center flex-shrink-0 ${!preference.enabled && 'opacity-50'}`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>

                                        {/* 内容 */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className={`font-bold text-base whitespace-nowrap overflow-hidden ${preference.enabled ? 'text-gray-800' : 'text-gray-500'}`}>
                                                {preference.title}
                                            </h4>
                                            <p className={`text-xs mt-0.5 ${preference.enabled ? 'text-gray-600' : 'text-gray-400'}`}>
                                                {preference.subtitle}
                                            </p>
                                        </div>

                                        {/* 操作按钮 */}
                                        <div className="flex items-center space-x-1 flex-shrink-0">
                                            {/* 上移按钮 */}
                                            <button
                                                onClick={() => moveUp(index)}
                                                disabled={index === 0}
                                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                                            >
                                                <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                            </button>

                                            {/* 下移按钮 */}
                                            <button
                                                onClick={() => moveDown(index)}
                                                disabled={index === preferences.length - 1}
                                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                                            >
                                                <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {/* 启用/禁用开关 */}
                                            <button
                                                onClick={() => togglePreference(index)}
                                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${preference.enabled
                                                    ? 'bg-green-500'
                                                    : 'bg-gray-300'
                                                    }`}
                                            >
                                                <div className={`inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ${preference.enabled ? 'translate-x-5' : 'translate-x-1'
                                                    }`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-3">
                    <button
                        onClick={handleSave}
                        disabled={!hasUnsavedChanges}
                        className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-medium transition-all duration-200 ${hasUnsavedChanges
                            ? 'bg-green-500 text-white shadow-md hover:bg-green-600 hover:shadow-lg'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <Save className="w-5 h-5" />
                        <span>保存设置</span>
                    </button>

                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-medium bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:shadow-md transition-all duration-200"
                    >
                        <RotateCcw className="w-5 h-5" />
                        <span>重置</span>
                    </button>
                </div>

                {/* 提示信息 */}
                {hasUnsavedChanges && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                            <p className="text-sm text-amber-700">
                                您有未保存的更改，记得点击保存按钮哦！
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings; 