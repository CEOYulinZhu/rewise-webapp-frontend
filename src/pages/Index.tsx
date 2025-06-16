import React, { useState, useRef } from 'react';
import { Camera, Upload, Send, User, Lightbulb, Sparkles, X, Image as ImageIcon, Plus, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!selectedImage && !description.trim()) {
            return;
        }

        setIsLoading(true);

        let analysisMode = 'text';
        if (selectedImage && description.trim()) {
            analysisMode = 'comprehensive';
        } else if (selectedImage) {
            analysisMode = 'image';
        }

        setTimeout(() => {
            setIsLoading(false);
            navigate('/overview', {
                state: {
                    image: selectedImage,
                    description,
                    analysisMode
                }
            });
        }, 2000);
    };

    const handleRetake = () => {
        setSelectedImage(null);
    };

    const canSubmit = () => {
        return selectedImage !== null || description.trim().length > 0;
    };

    // 判断是否有用户输入
    const hasUserInput = () => {
        return selectedImage !== null || description.trim().length > 0;
    };

    const getAnalysisType = () => {
        if (selectedImage && description.trim()) {
            return {
                type: '智能综合分析',
                desc: '图片+文字描述，AI深度解析',
                icon: Sparkles,
                gradient: 'from-emerald-400 via-green-500 to-teal-500',
                bgGradient: 'from-emerald-50 via-green-50 to-teal-50',
                shadowColor: 'shadow-emerald-200/50'
            };
        } else if (selectedImage) {
            return {
                type: '图片智能识别',
                desc: 'AI视觉识别物品特征',
                icon: Camera,
                gradient: 'from-violet-400 via-purple-500 to-indigo-500',
                bgGradient: 'from-violet-50 via-purple-50 to-indigo-50',
                shadowColor: 'shadow-violet-200/50'
            };
        } else if (description.trim()) {
            return {
                type: '文字智能分析',
                desc: '基于描述的专业建议',
                icon: Lightbulb,
                gradient: 'from-blue-400 via-cyan-500 to-blue-500',
                bgGradient: 'from-blue-50 via-cyan-50 to-blue-50',
                shadowColor: 'shadow-blue-200/50'
            };
        }
        return {
            type: '开始智能分析',
            desc: '上传图片或输入描述',
            icon: Plus,
            gradient: 'from-gray-300 to-gray-400',
            bgGradient: 'from-gray-50 to-slate-50',
            shadowColor: 'shadow-gray-200/50'
        };
    };

    const analysisInfo = getAnalysisType();

    // 设计有趣的加载动画组件
    const LoadingAnimation = () => (
        <div className="flex items-center space-x-3">
            {/* 旋转的AI大脑图标 */}
            <div className="relative">
                <div className="w-6 h-6 rounded-full border-2 border-white/40 border-t-white animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* 数据流动效果 */}
            <div className="flex space-x-1">
                <div className="flex flex-col space-y-1">
                    <div className="w-1 h-1 bg-white/90 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-white/90 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-1 h-1 bg-white/90 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>

            {/* 文字处理效果 - 增强对比度 */}
            <div className="flex space-x-0.5">
                {['AI', '正', '在', '深', '度', '分', '析', '中'].map((char, index) => (
                    <span
                        key={index}
                        className="text-white font-medium drop-shadow-sm animate-pulse"
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            animationDuration: '1s',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/20 to-green-300/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-cyan-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
            </div>

            {/* 顶部导航 - 减少高度和上移 */}
            <div className="relative z-10 flex justify-between items-center p-4 pt-6">
                <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200/50">
                        <span className="text-white font-bold text-base">闲</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                            闲置物语
                        </h1>
                        <p className="text-xs text-gray-500 font-medium">让每个物品都有新的故事</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/profile')}
                    className="p-2.5 rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 border border-white/50"
                >
                    <User className="w-4 h-4 text-gray-600" />
                </button>
            </div>

            {/* 主要内容区域 */}
            <div className="relative z-10 px-6 pb-8 space-y-6">
                {/* 标题区域 - 根据用户输入动态显示/隐藏 */}
                {!hasUserInput() && (
                    <div className="text-center space-y-4 mt-4 animate-in fade-in-0 duration-500">
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                让闲置重获新生
                            </span>
                        </h2>
                        <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
                            上传物品照片或详细描述，获取专业的处置建议
                        </p>
                    </div>
                )}

                {/* 分析模式指示器 */}
                {hasUserInput() && (
                    <div className={`bg-gradient-to-r ${analysisInfo.bgGradient} rounded-3xl p-4 border border-white/50 backdrop-blur-xl shadow-2xl ${analysisInfo.shadowColor} transform transition-all duration-500 animate-in slide-in-from-top-2`}>
                        <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 bg-gradient-to-r ${analysisInfo.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <analysisInfo.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-800">{analysisInfo.type}</p>
                                <p className="text-gray-600 text-sm">{analysisInfo.desc}</p>
                            </div>
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 图片上传区域 - 减少高度 */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-gray-200/20 border border-white/50">
                    {!selectedImage ? (
                        <div
                            className={`border-2 border-dashed rounded-3xl p-6 text-center ${isDragOver
                                ? 'border-emerald-400 bg-gradient-to-b from-emerald-50 to-green-50 scale-105'
                                : 'border-gray-300 bg-gradient-to-b from-gray-50/50 to-transparent'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-200/50">
                                        <ImageIcon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                                        <Plus className="w-2.5 h-2.5 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        上传物品照片
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                        支持JPG、PNG格式，最大10MB
                                    </p>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => cameraInputRef.current?.click()}
                                        className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-200/50 font-semibold text-sm"
                                    >
                                        <Camera className="w-4 h-4" />
                                        <span>拍照</span>
                                    </button>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center space-x-2 bg-white border-2 border-emerald-200 text-emerald-600 px-6 py-3.5 rounded-2xl shadow-lg font-semibold text-sm"
                                    >
                                        <Upload className="w-4 h-4" />
                                        <span>相册</span>
                                    </button>
                                </div>
                                <input
                                    ref={cameraInputRef}
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="relative group">
                                <img
                                    src={selectedImage}
                                    alt="上传的图片"
                                    className="w-full h-48 object-cover rounded-3xl shadow-2xl shadow-gray-200/50"
                                />
                                <div className="absolute inset-0 bg-black/0 rounded-3xl"></div>
                                <button
                                    onClick={handleRetake}
                                    className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white p-2 rounded-2xl shadow-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-center justify-center space-x-3 text-emerald-600 bg-emerald-50 rounded-2xl py-2.5">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="font-bold text-sm">图片上传成功</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* 文字描述输入 */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-2xl shadow-gray-200/20 border border-white/50">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-7 h-7 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                                    <Lightbulb className="w-3.5 h-3.5 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    物品描述
                                </h3>
                            </div>
                            <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${description.length > 280 ? 'bg-red-100 text-red-600' :
                                description.length > 200 ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                {description.length}/300
                            </span>
                        </div>
                        <div className="relative">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value.slice(0, 300))}
                                placeholder="详细描述物品的名称、状态、材质、尺寸、用途等信息，越详细越准确..."
                                className="w-full h-28 p-4 border-2 border-gray-200 rounded-3xl resize-none focus:outline-none focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-300 bg-gradient-to-br from-white to-gray-50/50 placeholder-gray-400 text-gray-700 leading-relaxed transition-all duration-300 shadow-inner text-sm"
                            />
                            {description.length > 0 && (
                                <button
                                    onClick={() => setDescription('')}
                                    className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-200"
                                >
                                    <X className="w-3 h-3 text-gray-600" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* 提交按钮 - 减少间距 */}
                <div className="pt-2 relative">
                    <button
                        onClick={handleSubmit}
                        disabled={!canSubmit() || isLoading}
                        className={`w-full py-4 rounded-3xl font-bold text-lg flex items-center justify-center space-x-3 relative overflow-hidden ${canSubmit() && !isLoading
                            ? `bg-gradient-to-r ${analysisInfo.gradient} text-white shadow-2xl ${analysisInfo.shadowColor} border border-white/20`
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-lg'
                            }`}
                    >
                        {/* 按钮背景动画 */}
                        {canSubmit() && !isLoading && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%]"></div>
                        )}

                        {isLoading ? (
                            <LoadingAnimation />
                        ) : (
                            <>
                                <analysisInfo.icon className="w-5 h-5" />
                                <span>
                                    {canSubmit() ? `开始${analysisInfo.type}` : '请上传图片或输入物品描述'}
                                </span>
                                {canSubmit() && <Send className="w-4 h-4" />}
                            </>
                        )}
                    </button>


                </div>

            </div>

            {/* 固定的帮助按钮 - 只在没有用户输入时显示 */}
            {!hasUserInput() && (
                <button
                    onClick={() => setShowTips(!showTips)}
                    className="fixed bottom-6 right-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-xl flex items-center justify-center border-1 border-white/20 backdrop-blur-sm z-50"
                    title="查看功能介绍"
                >
                    <HelpCircle className="w-4 h-4" />
                </button>
            )}

            {/* 弹出式功能提示对话框 */}
            {!hasUserInput() && showTips && (
                <>
                    {/* 背景遮罩 */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in-0 duration-300"
                        onClick={() => setShowTips(false)}
                    ></div>

                    {/* 消息对话框 */}
                    <div className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 z-50 animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
                        {/* 对话框头部 */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100/50">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-800">AI功能介绍</h3>
                            </div>
                            <button
                                onClick={() => setShowTips(false)}
                                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                            >
                                <X className="w-3 h-3 text-gray-600" />
                            </button>
                        </div>

                        {/* 对话框内容 */}
                        <div className="p-5 space-y-4">
                            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-100/50">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Camera className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-emerald-800 text-sm mb-1">图片识别分析</p>
                                        <p className="text-emerald-700 text-xs leading-relaxed">
                                            AI视觉识别物品特征、材质、状态，自动判断物品类型和处置建议
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100/50">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Lightbulb className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-blue-800 text-sm mb-1">文字描述分析</p>
                                        <p className="text-blue-700 text-xs leading-relaxed">
                                            基于详细文字描述，AI理解物品信息并提供个性化处置方案
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100/50">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Sparkles className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-purple-800 text-sm mb-1">智能综合分析</p>
                                        <p className="text-purple-700 text-xs leading-relaxed">
                                            图片+文字双重输入，AI深度融合分析，提供最精准的处置建议
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 对话框底部 */}
                        <div className="px-5 pb-5">
                            <div className="bg-gray-50/80 rounded-2xl p-3 text-center">
                                <p className="text-xs text-gray-600">
                                    💡 上传图片或输入描述开始体验AI智能分析
                                </p>
                            </div>
                        </div>

                        {/* 对话框箭头 */}
                        <div className="absolute bottom-[-8px] right-8 w-4 h-4 bg-white/95 border-r border-b border-white/50 transform rotate-45"></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Index; 