import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Recycle, Heart, Users, Mail, Globe, Shield, Lightbulb, Award, Leaf, Palette, Code, Headphones } from 'lucide-react';

const About: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: Recycle,
            title: 'AI智能分析',
            description: '通过AI技术分析闲置物品，提供最佳处理方案'
        },
        {
            icon: Heart,
            title: '环保理念',
            description: '倡导绿色生活，让每件物品都能重获新生'
        },
        {
            icon: Shield,
            title: '安全可靠',
            description: '保护用户隐私，提供安全的交易环境'
        }
    ];


    const teamMembers = [
        {
            name: '产品团队',
            role: '专注用户体验设计',
            icon: Palette,
            color: 'from-purple-500 to-pink-500'
        },
        {
            name: '技术团队',
            role: 'AI算法与系统开发',
            icon: Code,
            color: 'from-blue-500 to-indigo-500'
        },
        {
            name: '运营团队',
            role: '社区建设与用户服务',
            icon: Headphones,
            color: 'from-green-500 to-teal-500'
        }
    ];

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
                <h1 className="text-lg font-semibold text-gray-800">关于我们</h1>
                <div className="w-10 h-10"></div>
            </div>

            <div className="px-4 pb-8 space-y-8">
                {/* 应用介绍 */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-green-100/50">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                <Recycle className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">闲置物语</h2>
                        </div>
                        <p className="text-green-600 font-semibold text-lg mb-4">让每一件闲置物品都能重获新生</p>
                        <p className="text-gray-600 leading-relaxed max-w-lg mx-auto">
                            智能分析闲置物品，提供最佳处理方案，让环保变得简单易行
                        </p>
                    </div>
                </div>

                {/* 核心特色 + 团队信息 合并 */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-green-100/50">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">核心特色</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center p-4 bg-gradient-to-br from-white to-green-50/50 rounded-2xl border border-green-100/30 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md mx-auto mb-3">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="font-bold text-gray-800 text-sm">{feature.title}</h4>
                                </div>
                            );
                        })}
                    </div>

                    {/* 团队信息简化 */}
                    <div className="border-t border-gray-100 pt-4">
                        <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">专业团队</h4>
                        <div className="flex justify-center space-x-8">
                            {teamMembers.slice(0, 3).map((member, index) => {
                                const Icon = member.icon;
                                return (
                                    <div key={index} className="text-center">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center shadow-md mx-auto mb-2`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-800">{member.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 联系方式 + 版本信息 合并 */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-green-100/50">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">联系我们</h3>
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-blue-50/30 rounded-2xl border border-blue-100/30">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-bold text-gray-800 text-sm">邮箱联系</p>
                                <p className="text-gray-600 text-xs">contact@xianzhi.app</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-green-50/30 rounded-2xl border border-green-100/30">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-bold text-gray-800 text-sm">官方网站</p>
                                <p className="text-gray-600 text-xs">www.xianzhi.app</p>
                            </div>
                        </div>
                    </div>

                    {/* 版本信息内嵌 */}
                    <div className="text-center pt-4 border-t border-gray-100">
                        <p className="text-gray-600 text-sm">
                            <span className="font-semibold">闲置物语 v1.0.0</span> · 构建时间: 2025年6月
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About; 