import React, { useState } from 'react';
import { Camera, Upload, Send, User, Lightbulb, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSubmit = async () => {
        // 简化验证：至少需要图片或文字描述
        if (!selectedImage && !description.trim()) {
            alert('请至少上传图片或输入物品描述');
            return;
        }

        setIsLoading(true);

        // 自动判断分析模式
        let analysisMode = 'text';
        if (selectedImage && description.trim()) {
            analysisMode = 'comprehensive'; // 图片+文字综合分析
        } else if (selectedImage) {
            analysisMode = 'image'; // 纯图片分析
        }

        // 模拟API调用
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
                desc: '图片+文字描述，最精准的分析结果',
                icon: Sparkles,
                colors: {
                    bg: 'from-emerald-50 to-green-50',
                    border: 'border-emerald-200',
                    iconBg: 'bg-emerald-500',
                    text: 'text-emerald-800',
                    subText: 'text-emerald-600',
                    button: 'from-emerald-500 to-green-600'
                }
            };
        } else if (selectedImage) {
            return {
                type: '图片识别分析',
                desc: 'AI智能识别物品特征',
                icon: Camera,
                colors: {
                    bg: 'from-violet-50 to-purple-50',
                    border: 'border-violet-200',
                    iconBg: 'bg-violet-500',
                    text: 'text-violet-800',
                    subText: 'text-violet-600',
                    button: 'from-violet-500 to-purple-600'
                }
            };
        } else if (description.trim()) {
            return {
                type: '文字描述分析',
                desc: '基于详细描述的专业建议',
                icon: Lightbulb,
                colors: {
                    bg: 'from-blue-50 to-indigo-50',
                    border: 'border-blue-200',
                    iconBg: 'bg-blue-500',
                    text: 'text-blue-800',
                    subText: 'text-blue-600',
                    button: 'from-blue-500 to-indigo-600'
                }
            };
        }
        return {
            type: '智能分析',
            desc: '上传图片或输入描述开始分析',
            icon: Sparkles,
            colors: {
                bg: 'from-gray-50 to-slate-50',
                border: 'border-gray-200',
                iconBg: 'bg-gray-400',
                text: 'text-gray-600',
                subText: 'text-gray-500',
                button: 'from-gray-400 to-gray-500'
            }
        };
    };

    const analysisInfo = getAnalysisType();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* 顶部导航 */}
            <div className="flex justify-between items-center p-4 pt-8">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">闲</span>
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        闲置物语
                    </h1>
                </div>
                <button
                    onClick={() => navigate('/profile')}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <User className="w-5 h-5 text-green-600" />
                </button>
            </div>

            {/* 主要内容区域 */}
            <div className="px-4 pb-8 space-y-6">
                {/* 标题和副标题 */}
                <div className="text-center space-y-3 mt-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        让闲置物品重获新生
                    </h2>
                    <p className="text-gray-600">
                        上传照片或描述物品，获取专业的处置建议
                    </p>
                </div>

                {/* 当前分析模式提示 */}
                {(selectedImage || description.trim()) && (
                    <div className={`bg-gradient-to-r ${analysisInfo.colors.bg} rounded-2xl p-4 border ${analysisInfo.colors.border} shadow-lg`}>
                        <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 ${analysisInfo.colors.iconBg} rounded-full flex items-center justify-center shadow-md`}>
                                <analysisInfo.icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className={`font-semibold text-sm ${analysisInfo.colors.text}`}>{analysisInfo.type}</p>
                                <p className={`text-xs ${analysisInfo.colors.subText}`}>{analysisInfo.desc}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 图片上传区域 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    {!selectedImage ? (
                        <div className="border-2 border-dashed border-green-300 rounded-2xl p-6 text-center bg-gradient-to-b from-green-50 to-transparent">
                            <div className="flex flex-col items-center space-y-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-700 mb-1">
                                        上传物品照片
                                    </h3>
                                    <p className="text-gray-500 text-xs mb-3">
                                        支持JPG、PNG格式，最大10MB（可选）
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <label className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 text-sm">
                                        <Camera className="w-3 h-3" />
                                        <span>拍照</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    <label className="flex items-center space-x-1 bg-white border border-green-300 text-green-600 px-3 py-2 rounded-lg cursor-pointer hover:bg-green-50 transition-all duration-300 text-sm">
                                        <Upload className="w-3 h-3" />
                                        <span>相册</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="relative">
                                <img
                                    src={selectedImage}
                                    alt="上传的图片"
                                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                                />
                                <button
                                    onClick={handleRetake}
                                    className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
                                >
                                    <Upload className="w-3 h-3" />
                                </button>
                            </div>
                            <div className="flex items-center justify-center space-x-2 text-green-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium">图片上传成功</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* 文字描述输入 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-700">
                                物品描述
                            </h3>
                            <span className="text-sm text-gray-500">
                                {description.length}/300
                            </span>
                        </div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value.slice(0, 300))}
                            placeholder="描述物品的名称、状态、材质、尺寸、用途等信息（可选）"
                            className="w-full h-28 p-4 border border-green-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent bg-green-50/50 placeholder-gray-400 text-sm"
                        />
                        <p className="text-xs text-gray-500 flex items-center space-x-1">
                            <Lightbulb className="w-3 h-3" />
                            <span>
                                {selectedImage
                                    ? "结合图片的文字描述能获得更精准的分析结果"
                                    : "即使没有图片，详细的文字描述也能获得专业建议"
                                }
                            </span>
                        </p>
                    </div>
                </div>

                {/* 提交按钮 */}
                <button
                    onClick={handleSubmit}
                    disabled={!canSubmit() || isLoading}
                    className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${canSubmit() && !isLoading
                        ? `bg-gradient-to-r ${analysisInfo.colors.button} text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]`
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>智能分析中...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            <span>
                                {canSubmit() ? `开始${analysisInfo.type}` : '请上传图片或输入描述'}
                            </span>
                        </>
                    )}
                </button>
            </div>

            {/* 底部装饰 */}
            <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-100/50 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default Index; 