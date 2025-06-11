import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const UserAgreement: React.FC = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "服务内容",
            icon: FileText,
            content: [
                "闲置物语为您提供环保的闲置物品处理建议和解决方案",
                "包括但不限于回收指导、交易建议、创意改造方案",
                "我们致力于帮助每一件闲置物品重获新生"
            ]
        },
        {
            title: "用户义务",
            icon: Users,
            content: [
                "提供真实有效的注册信息",
                "遵守法律法规，文明使用平台功能",
                "不发布虚假、违法或有害信息",
                "保护账户安全，妥善保管登录密码"
            ]
        },
        {
            title: "平台权利",
            icon: Shield,
            content: [
                "有权审核用户发布的内容",
                "对违规行为进行警告或限制使用",
                "根据法律要求配合相关部门调查",
                "持续改进和优化平台服务"
            ]
        },
        {
            title: "免责条款",
            icon: AlertTriangle,
            content: [
                "平台仅提供信息服务，不承担交易风险",
                "用户自行承担使用平台的相关风险",
                "不可抗力导致的服务中断不承担责任",
                "第三方链接或服务的安全性由第三方负责"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* 简洁的顶部导航 */}
            <div className="flex items-center justify-between p-6 pt-12">
                <button
                    onClick={() => navigate(-1)}
                    className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-lg font-semibold text-gray-800">用户协议</h1>
                <div className="w-11"></div>
            </div>

            <div className="px-6 pb-8">
                <div className="max-w-lg mx-auto">
                    {/* 整体文档容器 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* 文档标题区域 */}
                        <div className="text-center py-8 px-6 bg-gradient-to-r from-green-50 to-emerald-50">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">用户服务协议</h2>
                            <p className="text-gray-600">请仔细阅读以下条款</p>
                        </div>

                        {/* 间隔线 */}
                        <div className="border-t border-gray-100"></div>

                        {/* 重要提示 */}
                        <div className="p-6">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-800 mb-2">重要提示</h3>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        通过注册和使用闲置物语，即表示您已阅读、理解并同意本协议的全部内容。
                                        我们承诺保护您的合法权益，共同创建绿色环保的数字生活方式。
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 协议内容 */}
                        {sections.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <div key={index}>
                                    {/* 间隔线 */}
                                    <div className="border-t border-gray-100"></div>

                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {section.content.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-start space-x-3">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
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

                        {/* 版本信息 */}
                        <div className="p-6 text-center bg-gray-50">
                            <div className="text-xs text-gray-500">
                                <p>协议版本：v1.0 | 生效日期：2025年6月11日</p>
                                <p className="mt-2">闲置物语团队保留对本协议的最终解释权</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAgreement; 