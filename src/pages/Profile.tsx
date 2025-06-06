import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, History, Heart, Settings, Info, MessageCircle, Star, ChevronRight, Award, Recycle } from 'lucide-react';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [userStats] = useState({
        totalAnalyses: 23,
        itemsRecycled: 15,
        carbonReduced: 12.5,
        helpedPeople: 8
    });

    const menuItems = [
        {
            id: 'history',
            title: '历史记录',
            subtitle: '查看过往分析记录',
            icon: History,
            color: 'from-blue-500 to-cyan-500',
            count: userStats.totalAnalyses
        },
        {
            id: 'favorites',
            title: '收藏夹',
            subtitle: '收藏的方案和教程',
            icon: Heart,
            color: 'from-red-500 to-pink-500',
            count: 12
        },
        {
            id: 'achievements',
            title: '环保成就',
            subtitle: '您的绿色贡献',
            icon: Award,
            color: 'from-green-500 to-emerald-500',
            count: 6
        },
        {
            id: 'settings',
            title: '设置',
            subtitle: '个人偏好设置',
            icon: Settings,
            color: 'from-gray-500 to-slate-500'
        }
    ];

    const infoItems = [
        {
            id: 'about',
            title: '关于我们',
            subtitle: '了解闲置物语',
            icon: Info,
            color: 'from-purple-500 to-violet-500'
        },
        {
            id: 'feedback',
            title: '意见反馈',
            subtitle: '帮助我们改进',
            icon: MessageCircle,
            color: 'from-orange-500 to-amber-500'
        },
        {
            id: 'rate',
            title: '给我们评分',
            subtitle: '分享使用体验',
            icon: Star,
            color: 'from-yellow-500 to-orange-500'
        }
    ];

    const recentAnalyses = [
        {
            id: 1,
            title: '旧手机处置分析',
            date: '2024-01-15',
            recommendation: '回收/捐赠',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop'
        },
        {
            id: 2,
            title: '闲置书籍处理',
            date: '2024-01-12',
            recommendation: '创意改造',
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop'
        },
        {
            id: 3,
            title: '旧家具再利用',
            date: '2024-01-10',
            recommendation: '二手交易',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop'
        }
    ];

    const handleMenuClick = (itemId: string) => {
        switch (itemId) {
            case 'history':
                // 跳转到历史记录页面
                break;
            case 'favorites':
                // 跳转到收藏页面
                break;
            case 'achievements':
                // 跳转到成就页面
                break;
            case 'settings':
                // 跳转到设置页面
                break;
            case 'about':
                // 显示关于我们信息
                alert('闲置物语 v1.0\n\n让每一件闲置物品都能重获新生，为环保贡献力量！');
                break;
            case 'feedback':
                // 打开反馈表单
                alert('感谢您的反馈！我们会认真对待每一条建议。');
                break;
            case 'rate':
                // 跳转到应用商店评分
                alert('感谢您的支持！');
                break;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* 顶部导航 */}
            <div className="flex items-center justify-between p-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <ArrowLeft className="w-5 h-5 text-green-600" />
                </button>
                <h1 className="text-lg font-semibold text-gray-800">个人中心</h1>
                <div className="w-10 h-10"></div> {/* 占位符保持居中 */}
            </div>

            <div className="px-4 pb-8 space-y-6">
                {/* 用户信息卡片 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800">环保达人</h3>
                            <p className="text-sm text-gray-600 mb-2">让闲置物品重获新生</p>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    LV.5 绿色守护者
                                </span>
                                <span className="text-xs text-gray-500">
                                    加入 {Math.floor(Math.random() * 200 + 50)} 天
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 环保统计 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <Recycle className="w-5 h-5 text-green-500 mr-2" />
                        我的环保贡献
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                            <div className="text-2xl font-bold text-blue-700">{userStats.totalAnalyses}</div>
                            <div className="text-sm text-blue-600">分析次数</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                            <div className="text-2xl font-bold text-green-700">{userStats.itemsRecycled}</div>
                            <div className="text-sm text-green-600">处置物品</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                            <div className="text-2xl font-bold text-purple-700">{userStats.carbonReduced}kg</div>
                            <div className="text-sm text-purple-600">减少碳排放</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                            <div className="text-2xl font-bold text-orange-700">{userStats.helpedPeople}</div>
                            <div className="text-sm text-orange-600">帮助他人</div>
                        </div>
                    </div>
                </div>

                {/* 最近分析 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">最近分析</h3>
                    <div className="space-y-3">
                        {recentAnalyses.map((analysis) => (
                            <div
                                key={analysis.id}
                                className="flex items-center space-x-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:shadow-md transition-all duration-300 cursor-pointer"
                                onClick={() => {
                                    // 这里可以跳转到具体的分析详情
                                }}
                            >
                                <img
                                    src={analysis.image}
                                    alt={analysis.title}
                                    className="w-12 h-12 object-cover rounded-xl shadow-md"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 text-sm">{analysis.title}</h4>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-green-600">{analysis.recommendation}</span>
                                        <span className="text-xs text-gray-500">{analysis.date}</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => handleMenuClick('history')}
                        className="w-full mt-4 text-center text-green-600 text-sm font-medium py-2 hover:text-green-700 transition-colors"
                    >
                        查看全部历史记录
                    </button>
                </div>

                {/* 功能菜单 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">功能菜单</h3>
                    <div className="space-y-3">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleMenuClick(item.id)}
                                    className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-green-50 rounded-2xl hover:shadow-md transition-all duration-300 border border-green-100"
                                >
                                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {item.count && (
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                {item.count}
                                            </span>
                                        )}
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 帮助与反馈 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">帮助与反馈</h3>
                    <div className="space-y-3">
                        {infoItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleMenuClick(item.id)}
                                    className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl hover:shadow-md transition-all duration-300 border border-gray-100"
                                >
                                    <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 环保小贴士 */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">🌱 今日环保小贴士</h4>
                    <p className="text-sm text-green-700">
                        将废旧物品进行分类处理，不仅能减少环境污染，还能为他人带来便利。每一次环保行动都是对地球的关爱！
                    </p>
                </div>

                {/* 版本信息 */}
                <div className="text-center text-xs text-gray-500 space-y-1 pt-4">
                    <p>闲置物语 v1.0.0</p>
                    <p>让每一件闲置物品都能重获新生</p>
                </div>
            </div>
        </div>
    );
};

export default Profile; 