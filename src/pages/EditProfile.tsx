import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Camera, Save, Edit3, CheckCircle, Shield, Info } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

const EditProfile: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        nickname: '环保达人',
        phone: '138****8888',
        bio: '热爱环保，致力于让每一件闲置物品重获新生！',
        avatar: null as File | null
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // 处理输入变化
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // 清除对应字段的错误
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // 处理头像上传
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // 检查文件大小（限制为2MB）
            if (file.size > 2 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, avatar: '头像文件大小不能超过2MB' }));
                return;
            }

            // 检查文件类型
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, avatar: '请选择图片文件' }));
                return;
            }

            setFormData(prev => ({ ...prev, avatar: file }));
            setErrors(prev => ({ ...prev, avatar: '' }));
        }
    };

    // 验证表单
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.nickname.trim()) {
            newErrors.nickname = '请输入昵称';
        } else if (formData.nickname.trim().length < 2) {
            newErrors.nickname = '昵称至少需要2个字符';
        } else if (formData.nickname.trim().length > 20) {
            newErrors.nickname = '昵称不能超过20个字符';
        }

        if (formData.bio.length > 100) {
            newErrors.bio = '个人简介不能超过100个字符';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 处理保存
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1500));

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/profile');
            }, 2000);
        } catch (error) {
            alert('保存失败，请重试');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* 成功提示浮层 */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl mx-4 max-w-sm w-full">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">保存成功</h3>
                            <p className="text-gray-600">您的个人信息已更新</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 顶部导航 */}
            <NavigationBar title="编辑资料" />

            <div className="px-4 pb-8 space-y-4">
                <form onSubmit={handleSave} className="space-y-4">
                    {/* 头像设置 */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200">
                                    <Camera className="w-3.5 h-3.5 text-gray-600" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                                    <Camera className="w-4 h-4 text-emerald-600" />
                                    <span>头像设置</span>
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">点击相机图标更换头像</p>
                                {errors.avatar && (
                                    <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 基本信息 */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100 space-y-4">
                        <h3 className="font-medium text-gray-900 flex items-center space-x-2 mb-3">
                            <User className="w-4 h-4 text-emerald-600" />
                            <span>基本信息</span>
                        </h3>

                        {/* 昵称 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center space-x-1">
                                <Edit3 className="w-3.5 h-3.5 text-gray-500" />
                                <span>昵称</span>
                            </label>
                            <input
                                type="text"
                                value={formData.nickname}
                                onChange={(e) => handleInputChange('nickname', e.target.value)}
                                placeholder="请输入您的昵称"
                                className={`w-full px-3 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-200 text-sm ${errors.nickname ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' : 'border-gray-200'
                                    }`}
                            />
                            <div className="flex justify-between items-center mt-1">
                                {errors.nickname ? (
                                    <p className="text-red-500 text-xs">{errors.nickname}</p>
                                ) : (
                                    <span></span>
                                )}
                                <span className="text-xs text-gray-400">{formData.nickname.length}/20</span>
                            </div>
                        </div>

                        {/* 手机号 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center space-x-1">
                                <Phone className="w-3.5 h-3.5 text-gray-500" />
                                <span>手机号码</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.phone}
                                    disabled
                                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed text-sm"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Shield className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                                <Info className="w-3 h-3" />
                                <span>如需更换手机号，请联系客服</span>
                            </p>
                        </div>
                    </div>

                    {/* 个人简介 */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                            <Edit3 className="w-3.5 h-3.5 text-gray-500" />
                            <span>个人简介</span>
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            placeholder="简单介绍一下自己，让大家更好地了解您~"
                            rows={3}
                            className={`w-full px-3 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-200 resize-none text-sm ${errors.bio ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' : 'border-gray-200'
                                }`}
                        />
                        <div className="flex justify-between items-center mt-1">
                            {errors.bio ? (
                                <p className="text-red-500 text-xs">{errors.bio}</p>
                            ) : (
                                <span></span>
                            )}
                            <span className="text-xs text-gray-400">{formData.bio.length}/100</span>
                        </div>
                    </div>

                    {/* 保存按钮 */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-lg font-medium text-base shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>保存中...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <Save className="w-4 h-4" />
                                <span>保存修改</span>
                            </div>
                        )}
                    </button>
                </form>

                {/* 友情提示 */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-5 border border-green-200 shadow-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-2 shadow-md">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        隐私保护
                    </h4>
                    <p className="text-sm text-green-700 leading-relaxed">
                        我们重视您的隐私安全，所有个人信息都将严格保密，仅用于改善您的使用体验。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EditProfile; 