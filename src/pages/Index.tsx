import React, { useState, useRef } from 'react';
import { Camera, Upload, Send, User, Lightbulb, Sparkles, X, Image as ImageIcon, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/20 to-green-300/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-cyan-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
            </div>

            {/* 顶部导航 */}
            <div className="relative z-10 flex justify-between items-center p-6 pt-12">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200/50">
                        <span className="text-white font-bold text-lg">闲</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                            闲置物语
                        </h1>
                        <p className="text-xs text-gray-500 font-medium">让每个物品都有新的故事</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/profile')}
                    className="p-3 rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-300 border border-white/50"
                >
                    <User className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* 主要内容区域 */}
            <div className="relative z-10 px-6 pb-8 space-y-8">
                {/* 标题区域 */}
                <div className="text-center space-y-4 mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                        {/* 减少字体大小 */}
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent text-2xl">
                            让闲置重获新生
                        </span>
                    </h2>
                    <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
                        上传物品照片或详细描述，获取专业的处置建议
                    </p>
                </div>

                {/* 分析模式指示器 */}
                {(selectedImage || description.trim()) && (
                    <div className={`bg-gradient-to-r ${analysisInfo.bgGradient} rounded-3xl p-5 border border-white/50 backdrop-blur-xl shadow-2xl ${analysisInfo.shadowColor} transform transition-all duration-500 animate-in slide-in-from-top-2`}>
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${analysisInfo.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <analysisInfo.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-800 text-lg">{analysisInfo.type}</p>
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

                {/* 图片上传区域 */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-gray-200/20 border border-white/50">
                    {!selectedImage ? (
                        <div
                            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 ${isDragOver
                                ? 'border-emerald-400 bg-gradient-to-b from-emerald-50 to-green-50 scale-105'
                                : 'border-gray-300 bg-gradient-to-b from-gray-50/50 to-transparent hover:border-emerald-300 hover:bg-gradient-to-b hover:from-emerald-50/50 hover:to-green-50/50'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center space-y-6">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-200/50">
                                        <ImageIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                                        <Plus className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800">
                                        上传物品照片
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                        支持JPG、PNG格式，最大10MB
                                        {/* <br />
                                        拖拽文件到此处或点击按钮上传 */}
                                    </p>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => cameraInputRef.current?.click()}
                                        className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white px-6 py-3 rounded-2xl shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:shadow-emerald-300/50 transition-all duration-300 hover:scale-105 active:scale-95 font-semibold"
                                    >
                                        <Camera className="w-4 h-4" />
                                        <span>拍照</span>
                                    </button>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center space-x-2 bg-white border-2 border-emerald-200 text-emerald-600 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 hover:scale-105 active:scale-95 font-semibold"
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
                        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="relative group">
                                <img
                                    src={selectedImage}
                                    alt="上传的图片"
                                    className="w-full h-64 object-cover rounded-3xl shadow-2xl shadow-gray-200/50"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-3xl transition-all duration-300"></div>
                                <button
                                    onClick={handleRetake}
                                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white p-2.5 rounded-2xl hover:bg-black/80 transition-all duration-300 shadow-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-center justify-center space-x-3 text-emerald-600 bg-emerald-50 rounded-2xl py-3">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="font-bold">图片上传成功</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* 文字描述输入 */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-gray-200/20 border border-white/50">
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                                    <Lightbulb className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    物品描述
                                </h3>
                            </div>
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${description.length > 280 ? 'bg-red-100 text-red-600' :
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
                                className="w-full h-32 p-5 border-2 border-gray-200 rounded-3xl resize-none focus:outline-none focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-300 bg-gradient-to-br from-white to-gray-50/50 placeholder-gray-400 text-gray-700 leading-relaxed transition-all duration-300 shadow-inner"
                            />
                            {description.length > 0 && (
                                <button
                                    onClick={() => setDescription('')}
                                    className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                                >
                                    <X className="w-3 h-3 text-gray-600" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* 提交按钮 */}
                <div className="pt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={!canSubmit() || isLoading}
                        className={`w-full py-5 rounded-3xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden ${canSubmit() && !isLoading
                            ? `bg-gradient-to-r ${analysisInfo.gradient} text-white shadow-2xl ${analysisInfo.shadowColor} hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98] border border-white/20`
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-lg'
                            }`}
                    >
                        {/* 按钮背景动画 */}
                        {canSubmit() && !isLoading && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        )}

                        {isLoading ? (
                            <>
                                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>AI正在深度分析中...</span>
                            </>
                        ) : (
                            <>
                                <analysisInfo.icon className="w-6 h-6" />
                                <span>
                                    {canSubmit() ? `开始${analysisInfo.type}` : '请上传图片或输入物品描述'}
                                </span>
                                {canSubmit() && <Send className="w-5 h-5" />}
                            </>
                        )}
                    </button>
                </div>

                {/* 功能提示 */}
                {!selectedImage && !description.trim() && (
                    <div className="grid grid-cols-1 gap-4 pt-6">
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <Camera className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-emerald-800 text-sm">图片识别</p>
                                    <p className="text-emerald-600 text-xs">AI视觉识别物品特征和状态</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Lightbulb className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-blue-800 text-sm">文字分析</p>
                                    <p className="text-blue-600 text-xs">基于描述提供专业建议</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-purple-800 text-sm">综合分析</p>
                                    <p className="text-purple-600 text-xs">图片+描述，最精准的结果</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index; 