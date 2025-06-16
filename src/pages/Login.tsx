import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Lock, Eye, EyeOff, User, CheckCircle2, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    // 验证手机号
    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^1[3-9]\d{9}$/;
        return phoneRegex.test(phone);
    };

    // 验证密码强度
    const validatePassword = (password: string): boolean => {
        return password.length >= 6;
    };

    // 处理输入变化
    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setTouched(prev => ({ ...prev, [field]: true }));

        // 实时验证
        if (field === 'phone' && typeof value === 'string') {
            if (value && !validatePhone(value)) {
                setErrors(prev => ({ ...prev, phone: '请输入正确的手机号码' }));
            } else {
                setErrors(prev => ({ ...prev, phone: '' }));
            }
        }

        if (field === 'password' && typeof value === 'string') {
            if (value && !validatePassword(value)) {
                setErrors(prev => ({ ...prev, password: '密码至少需要6位字符' }));
            } else {
                setErrors(prev => ({ ...prev, password: '' }));
            }
        }

        if (field === 'confirmPassword' && typeof value === 'string') {
            if (value && value !== formData.password) {
                setErrors(prev => ({ ...prev, confirmPassword: '两次输入的密码不一致' }));
            } else {
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
            }
        }
    };

    // 处理输入框失焦
    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));

        if (field === 'phone' && formData.phone && !validatePhone(formData.phone)) {
            setErrors(prev => ({ ...prev, phone: '请输入正确的手机号码' }));
        }

        if (field === 'password' && formData.password && !validatePassword(formData.password)) {
            setErrors(prev => ({ ...prev, password: '密码至少需要6位字符' }));
        }

        if (field === 'nickname' && !isLogin && formData.nickname && formData.nickname.trim().length < 2) {
            setErrors(prev => ({ ...prev, nickname: '昵称至少需要2个字符' }));
        }
    };

    // 验证表单
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.phone) {
            newErrors.phone = '请输入手机号码';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = '请输入正确的手机号码';
        }

        if (!formData.password) {
            newErrors.password = '请输入密码';
        } else if (!validatePassword(formData.password)) {
            newErrors.password = '密码至少需要6位字符';
        }

        if (!isLogin) {
            if (!formData.nickname) {
                newErrors.nickname = '请输入昵称';
            } else if (formData.nickname.trim().length < 2) {
                newErrors.nickname = '昵称至少需要2个字符';
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = '请确认密码';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = '两次输入的密码不一致';
            }

            if (!formData.agreeTerms) {
                newErrors.agreeTerms = '请同意用户协议和隐私政策';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 处理提交
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (isLogin) {
                alert('登录成功！');
                navigate('/profile');
            } else {
                alert('注册成功！请登录您的账户。');
                setIsLogin(true);
                setFormData(prev => ({ ...prev, confirmPassword: '', nickname: '', agreeTerms: false }));
                setTouched({});
                setErrors({});
            }
        } catch (error) {
            alert('操作失败，请重试');
        } finally {
            setIsLoading(false);
        }
    };

    // 切换登录/注册模式
    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setTouched({});
        setFormData(prev => ({
            ...prev,
            confirmPassword: '',
            nickname: '',
            agreeTerms: false
        }));
    };

    // 输入框样式辅助函数
    const getInputState = (field: string) => {
        if (errors[field] && touched[field]) return 'error';
        if (touched[field] && formData[field as keyof typeof formData] && !errors[field]) return 'success';
        return 'default';
    };

    const getInputClasses = (field: string) => {
        const state = getInputState(field);
        const baseClasses = "w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400";

        switch (state) {
            case 'error':
                return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-red-50`;
            case 'success':
                return `${baseClasses} border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100`;
            default:
                return `${baseClasses} border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100`;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col">
            {/* 优化的顶部导航 */}
            <div className="flex items-center justify-between p-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
                >
                    <ArrowLeft className="w-5 h-5 text-green-600" />
                </button>

                <div className="flex items-center justify-center flex-1">
                    <div className="flex bg-gray-100 rounded-full p-1.5 w-64">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2.5 px-6 rounded-full text-base font-medium ${isLogin
                                ? 'bg-white text-green-600 shadow-sm'
                                : 'text-gray-600'
                                }`}
                        >
                            登录
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2.5 px-6 rounded-full text-base font-medium ${!isLogin
                                ? 'bg-white text-green-600 shadow-sm'
                                : 'text-gray-600'
                                }`}
                        >
                            注册
                        </button>
                    </div>
                </div>

                <div className="w-10 h-10"></div>
            </div>

            {/* 主内容区域 */}
            <div className="flex-1 px-6">
                <div className="max-w-sm mx-auto">
                    {/* 标题区域 */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {isLogin ? '欢迎回来' : '创建账户'}
                        </h1>
                        <p className="text-gray-600">
                            {isLogin ? '使用您的账户继续' : '开始您的环保之旅'}
                        </p>
                    </div>

                    {/* 表单 */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 昵称输入（仅注册时显示） */}
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    昵称
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.nickname}
                                        onChange={(e) => handleInputChange('nickname', e.target.value)}
                                        onBlur={() => handleBlur('nickname')}
                                        placeholder="请输入您的昵称"
                                        className={getInputClasses('nickname')}
                                    />
                                    {getInputState('nickname') === 'success' && (
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        </div>
                                    )}
                                    {getInputState('nickname') === 'error' && (
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                            <AlertCircle className="w-5 h-5 text-red-500" />
                                        </div>
                                    )}
                                </div>
                                {errors.nickname && touched.nickname && (
                                    <p className="text-red-500 text-xs flex items-center mt-1">
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        {errors.nickname}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* 手机号输入 */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                手机号码
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    onBlur={() => handleBlur('phone')}
                                    placeholder="请输入手机号码"
                                    className={getInputClasses('phone')}
                                />
                                {getInputState('phone') === 'success' && (
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    </div>
                                )}
                                {getInputState('phone') === 'error' && (
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.phone && touched.phone && (
                                <p className="text-red-500 text-xs flex items-center mt-1">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* 密码输入 */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                密码
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    onBlur={() => handleBlur('password')}
                                    placeholder="请输入密码"
                                    className={`${getInputClasses('password')} pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && touched.password && (
                                <p className="text-red-500 text-xs flex items-center mt-1">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* 确认密码输入（仅注册时显示） */}
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    确认密码
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        onBlur={() => handleBlur('confirmPassword')}
                                        placeholder="请再次输入密码"
                                        className={`${getInputClasses('confirmPassword')} pr-12`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <p className="text-red-500 text-xs flex items-center mt-1">
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* 用户协议（仅注册时显示） */}
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="flex items-start space-x-3 cursor-pointer group">
                                    <div className="relative mt-0.5">
                                        <input
                                            type="checkbox"
                                            checked={formData.agreeTerms}
                                            onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${formData.agreeTerms
                                            ? 'bg-green-500 border-green-500'
                                            : errors.agreeTerms
                                                ? 'border-red-300'
                                                : 'border-gray-300'
                                            }`}>
                                            {formData.agreeTerms && (
                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-600 leading-relaxed">
                                        我已阅读并同意
                                        <button
                                            type="button"
                                            onClick={() => navigate('/user-agreement')}
                                            className="text-green-600 mx-1 underline font-medium"
                                        >
                                            用户协议
                                        </button>
                                        和
                                        <button
                                            type="button"
                                            onClick={() => navigate('/privacy-policy')}
                                            className="text-green-600 mx-1 underline font-medium"
                                        >
                                            隐私政策
                                        </button>
                                    </span>
                                </label>
                                {errors.agreeTerms && (
                                    <p className="text-red-500 text-xs flex items-center mt-1">
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        {errors.agreeTerms}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* 提交按钮 */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>{isLogin ? '登录中...' : '注册中...'}</span>
                                </div>
                            ) : (
                                isLogin ? '立即登录' : '立即注册'
                            )}
                        </button>

                        {/* 忘记密码（仅登录时显示） */}
                        {isLogin && (
                            <div className="text-center">
                                <button
                                    type="button"
                                    className="text-gray-500 text-sm font-medium"
                                >
                                    忘记密码？
                                </button>
                            </div>
                        )}
                    </form>

                    {/* 切换提示 */}
                    <div className="text-center mt-8 mb-6">
                        <span className="text-gray-600 text-sm">
                            {isLogin ? '还没有账户？' : '已有账户？'}
                        </span>
                        <button
                            onClick={toggleMode}
                            className="text-green-600 font-medium text-sm ml-2"
                        >
                            {isLogin ? '立即注册' : '立即登录'}
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login; 