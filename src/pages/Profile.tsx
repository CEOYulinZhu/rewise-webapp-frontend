import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, History, Heart, Settings, Info, MessageCircle, ChevronRight, Edit3, LogIn, BarChart3, Lightbulb } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn] = useState(false); // 这里可以从全局状态管理中获取登录状态
    const [userStats] = useState({
        totalAnalyses: 23
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
        }
    ];

    const handleMenuClick = (itemId: string) => {
        switch (itemId) {
            case 'history':
                navigate('/history');
                break;
            case 'favorites':
                navigate('/favorites');
                break;
            case 'settings':
                navigate('/settings');
                break;
            case 'about':
                navigate('/about');
                break;
            case 'feedback':
                navigate('/feedback');
                break;
            default:
                break;
        }
    };

    const handleLogin = () => {
        // 跳转到登录注册页面
        navigate('/login');
    };

    const handleEditProfile = () => {
        // 跳转到用户信息编辑页面
        navigate('/edit-profile');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* 顶部导航 */}
            <NavigationBar title="个人中心" />

            <div className="px-4 pb-8 space-y-6">
                {/* 用户信息卡片 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-800">环保达人</h3>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                                        LV.5 绿色守护者
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        加入 {Math.floor(Math.random() * 200 + 50)} 天
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={handleEditProfile}
                                className="p-2 rounded-full bg-green-100"
                            >
                                <Edit3 className="w-5 h-5 text-green-600" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center shadow-lg">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-800">未登录</h3>
                                <p className="text-sm text-gray-600 mt-1">登录后享受更多功能</p>
                            </div>
                            <button
                                onClick={handleLogin}
                                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-medium"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>登录</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* 分析统计 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-green-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-800">我的数据统计</h3>
                                <p className="text-xs text-gray-600">累计分析次数</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-blue-700">{userStats.totalAnalyses}</div>
                            <div className="text-xs text-blue-500">次分析</div>
                        </div>
                    </div>
                </div>

                {/* 功能菜单 */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">功能菜单</h3>
                    <div className="space-y-3">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleMenuClick(item.id)}
                                    className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-green-50 rounded-2xl border border-green-100 group"
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
                                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
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
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">帮助与反馈</h3>
                    <div className="space-y-3">
                        {infoItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleMenuClick(item.id)}
                                    className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-100 group"
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
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-5 border border-green-200 shadow-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-2 shadow-md">
                            <Lightbulb className="w-4 h-4 text-white" />
                        </div>
                        今日环保小贴士
                    </h4>
                    <p className="text-sm text-green-700 leading-relaxed">
                        将废旧物品进行分类处理，不仅能减少环境污染，还能为他人带来便利。每一次环保行动都是对地球的关爱！
                    </p>
                </div>

                {/* 版本信息 */}
                <div className="text-center text-xs text-gray-500 space-y-1 pt-4">
                    <p className="font-medium">闲置物语 v1.0.0</p>
                    <p>让每一件闲置物品都能重获新生</p>
                </div>
            </div>
        </div>
    );
};

export default Profile; 