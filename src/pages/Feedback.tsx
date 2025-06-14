import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Star, Send, HelpCircle, Bug, Lightbulb, AlertCircle } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

const Feedback: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('feedback');
    const [feedbackType, setFeedbackType] = useState('suggestion');
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [contact, setContact] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const feedbackTypes = [
        {
            id: 'suggestion',
            name: '功能建议',
            icon: Lightbulb,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'bug',
            name: '问题反馈',
            icon: Bug,
            color: 'from-red-500 to-pink-500'
        },
        {
            id: 'praise',
            name: '表扬建议',
            icon: Star,
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 'other',
            name: '其他反馈',
            icon: MessageCircle,
            color: 'from-purple-500 to-violet-500'
        }
    ];

    const faqs = [
        {
            question: '如何获得更准确的分析结果？',
            answer: '建议上传清晰的物品照片，并详细描述物品的材质、尺寸和使用状况。'
        },
        {
            question: '分析结果不满意怎么办？',
            answer: '您可以重新上传照片或修改描述信息，系统会重新进行智能分析。'
        },
        {
            question: '如何联系买家或卖家？',
            answer: '在交易详情页面点击联系按钮，系统会为您提供安全的沟通渠道。'
        },
        {
            question: '隐私信息是否安全？',
            answer: '我们严格保护用户隐私，不会泄露个人信息给第三方。'
        }
    ];

    const handleSubmit = async () => {
        if (!content.trim()) {
            alert('请填写反馈内容');
            return;
        }

        setIsSubmitting(true);

        // 模拟提交过程
        setTimeout(() => {
            setIsSubmitting(false);
            alert('感谢您的反馈！我们会认真对待每一条建议，并持续改进产品体验。');
            setContent('');
            setContact('');
            setRating(0);
            setFeedbackType('suggestion');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* 顶部导航 */}
            <NavigationBar title="意见反馈" />

            <div className="px-4 pb-8">
                {/* 标签页导航 */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-2 shadow-lg border border-green-100/50 mb-6">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab('feedback')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${activeTab === 'feedback'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>反馈</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${activeTab === 'questions'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            <HelpCircle className="w-5 h-5" />
                            <span>问题</span>
                        </button>
                    </div>
                </div>

                {/* 标签页内容 */}
                {activeTab === 'feedback' && (
                    <div className="space-y-6">
                        {/* 反馈类型选择 */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-green-100/50">
                            <h3 className="text-base font-semibold text-gray-800 mb-4">反馈类型</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {feedbackTypes.map((type) => {
                                    const Icon = type.icon;
                                    return (
                                        <button
                                            key={type.id}
                                            onClick={() => setFeedbackType(type.id)}
                                            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${feedbackType === type.id
                                                ? 'border-green-400 bg-green-50 shadow-md'
                                                : 'border-gray-200 bg-white hover:border-green-300'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center shadow-sm`}>
                                                <Icon className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-800">{type.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 反馈内容 */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-green-100/50">
                            <h3 className="text-base font-semibold text-gray-800 mb-4">详细描述</h3>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="请详细描述您的意见或建议..."
                                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none resize-none text-sm bg-gray-50/50 leading-relaxed placeholder-gray-400"
                            />
                            <div className="flex justify-between items-center mt-3">
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-700">评价:</span>
                                    <div className="flex items-center space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className="transition-all duration-200 hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-6 h-6 ${star <= rating
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300 hover:text-gray-400'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    {rating > 0 && (
                                        <span className="text-sm text-gray-600">
                                            {rating} 星
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-gray-500">
                                    {content.length}/500
                                </span>
                            </div>
                        </div>

                        {/* 联系方式和提交 */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-green-100/50">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800 mb-3">
                                        联系方式 <span className="text-sm text-gray-500 font-normal">(可选)</span>
                                    </h3>
                                    <input
                                        type="text"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        placeholder="邮箱或手机号"
                                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none text-sm bg-gray-50/50 placeholder-gray-400"
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !content.trim()}
                                    className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl font-semibold transition-all duration-300 ${isSubmitting || !content.trim()
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                                        } shadow-md`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                            <span>提交中...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>提交反馈</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'questions' && (
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-green-100/50">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="p-5 bg-gradient-to-r from-white to-green-50/50 rounded-2xl border border-green-100/30 hover:shadow-md transition-all duration-300"
                                >
                                    <h4 className="font-bold text-gray-800 mb-3 flex items-start">
                                        <AlertCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                        {faq.question}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed ml-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feedback; 