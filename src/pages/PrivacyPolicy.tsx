import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Share2, Settings, Heart } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "信息收集",
            icon: Eye,
            content: [
                "注册时需要的基本信息：手机号、昵称",
                "使用过程中产生的功能数据：浏览记录、互动行为",
                "设备信息：型号、操作系统（用于优化体验）",
                "我们只收集必要信息，绝不过度获取"
            ]
        },
        {
            title: "信息使用",
            icon: Settings,
            content: [
                "提供核心功能服务和个性化建议",
                "改进产品功能和用户体验",
                "发送重要通知和服务消息",
                "所有使用都以服务您为目的"
            ]
        },
        {
            title: "信息保护",
            icon: Lock,
            content: [
                "采用行业标准加密技术保护数据安全",
                "严格限制员工访问权限",
                "定期进行安全审计和漏洞检测",
                "您的隐私是我们的首要责任"
            ]
        },
        {
            title: "信息共享",
            icon: Share2,
            content: [
                "我们不会向第三方出售您的个人信息",
                "仅在法律要求时配合相关部门调查",
                "经您明确同意后才会共享必要信息",
                "始终将您的隐私放在第一位"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* 简洁的顶部导航 */}
            <div className="flex items-center justify-between p-6 pt-12">
                <button
                    onClick={() => navigate(-1)}
                    className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-lg font-semibold text-gray-800">隐私政策</h1>
                <div className="w-11"></div>
            </div>

            <div className="px-6 pb-8">
                <div className="max-w-lg mx-auto">
                    {/* 整体文档容器 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* 文档标题区域 */}
                        <div className="text-center py-8 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">隐私保护政策</h2>
                            <p className="text-gray-600">我们重视您的隐私权利</p>
                        </div>

                        {/* 间隔线 */}
                        <div className="border-t border-gray-100"></div>

                        {/* 隐私承诺 */}
                        <div className="p-6">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Heart className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blue-800 mb-2">隐私承诺</h3>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        闲置物语承诺保护您的隐私安全。我们采用最严格的数据保护标准，
                                        仅收集必要信息，绝不滥用或泄露您的个人数据。
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 政策内容 */}
                        {sections.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <div key={index}>
                                    {/* 间隔线 */}
                                    <div className="border-t border-gray-100"></div>

                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {section.content.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-start space-x-3">
                                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p className="text-gray-700 leading-relaxed text-sm">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* 间隔线 */}
                        <div className="border-t border-gray-100"></div>

                        {/* 用户权利 */}
                        <div className="p-6">
                            <h3 className="font-semibold text-gray-800 mb-4 text-center">您的隐私权利</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-center">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <Eye className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-blue-700 font-medium">查看数据</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <Settings className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-blue-700 font-medium">修改信息</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-xs text-center mt-4">
                                您可以随时在应用内管理个人信息或联系客服协助处理
                            </p>
                        </div>

                        {/* 间隔线 */}
                        <div className="border-t border-gray-100"></div>

                        {/* 版本信息 */}
                        <div className="p-6 text-center bg-gray-50">
                            <div className="text-xs text-gray-500">
                                <p>政策版本：v1.0 | 生效日期：2025年6月11日</p>
                                <p className="mt-2">本政策如有更新，我们将及时通知您</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy; 