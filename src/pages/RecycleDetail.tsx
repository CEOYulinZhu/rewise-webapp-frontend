import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin, Phone, Globe, Clock, Navigation, Info, BarChart3, Map, Smartphone, AlertTriangle } from 'lucide-react';

interface LocationState {
    image: string;
    description: string;
    recommendation: any;
}

// 标签页定义
const tabs = [
    { id: 'overview', name: '概览', icon: BarChart3 },
    { id: 'locations', name: '回收', icon: Map },
    { id: 'platforms', name: '平台', icon: Smartphone },
    { id: 'tips', name: '提示', icon: AlertTriangle },
];

const RecycleDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, description } = (location.state as LocationState) || {};
    const [isFavorited, setIsFavorited] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // 模拟回收点数据
    const recyclePoints = [
        {
            id: 1,
            name: '绿色环保回收站',
            type: '综合回收点',
            address: '北京市朝阳区望京SOHO T3 1层',
            distance: '1.2km',
            phone: '010-12345678',
            hours: '周一至周日 8:00-18:00',
            acceptTypes: ['电子产品', '家具', '衣物', '书籍'],
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop'
        },
        {
            id: 2,
            name: '爱心公益收集点',
            type: '慈善组织',
            address: '北京市海淀区中关村大街27号',
            distance: '2.1km',
            phone: '010-87654321',
            hours: '周一至周五 9:00-17:00',
            acceptTypes: ['衣物', '玩具', '书籍', '生活用品'],
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&h=200&fit=crop'
        },
        {
            id: 3,
            name: '智能回收柜',
            type: '自助回收',
            address: '北京市西城区复兴门内大街甲8号',
            distance: '3.5km',
            phone: '400-888-9999',
            hours: '24小时开放',
            acceptTypes: ['电子产品', '金属', '塑料'],
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop'
        }
    ];

    // 模拟在线平台数据
    const onlinePlatforms = [
        {
            id: 1,
            name: '闲鱼回收',
            description: '阿里巴巴旗下二手交易平台，支持多种物品回收',
            website: 'https://2.taobao.com',
            features: ['免费上门', '在线估价', '快速到账'],
            logo: '🐟',
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 2,
            name: '爱回收',
            description: '专业的数码产品回收平台，价格透明',
            website: 'https://www.aihuishou.com',
            features: ['专业估价', '顺丰包邮', '当天到账'],
            logo: '♻️',
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 3,
            name: '京东回收',
            description: '京东商城官方回收服务，品质保障',
            website: 'https://huishou.jd.com',
            features: ['官方保障', '以旧换新', '环保认证'],
            logo: '🛒',
            color: 'from-red-500 to-pink-500'
        }
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case '综合回收点': return 'bg-green-100 text-green-700';
            case '慈善组织': return 'bg-blue-100 text-blue-700';
            case '自助回收': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleCall = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    const handleNavigation = (address: string) => {
        // 模拟导航功能
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://maps.baidu.com/search/${encodedAddress}`, '_blank');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: '回收/捐赠方案',
                text: '发现一个很棒的回收捐赠方案！',
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('链接已复制到剪贴板！');
        }
    };

    // 概览内容
    const renderOverview = () => (
        <div className="space-y-6">
            {/* 回收优势 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Info className="w-5 h-5 text-green-500 mr-2" />
                    为什么选择回收/捐赠？
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                        <div className="text-2xl mb-2">🌍</div>
                        <div className="font-semibold text-green-700">保护环境</div>
                        <div className="text-xs text-green-600">减少环境污染</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                        <div className="text-2xl mb-2">💝</div>
                        <div className="font-semibold text-blue-700">传递爱心</div>
                        <div className="text-xs text-blue-600">帮助有需要的人</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="font-semibold text-yellow-700">便民服务</div>
                        <div className="text-xs text-yellow-600">就近处理方便</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="font-semibold text-purple-700">快速处理</div>
                        <div className="text-xs text-purple-600">高效解决方案</div>
                    </div>
                </div>
            </div>

            {/* 环保统计 */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 text-center">🌱 您的环保贡献</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-lg font-bold text-green-700">-2.3kg</div>
                        <div className="text-xs text-green-600">减少碳排放</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-green-700">+1</div>
                        <div className="text-xs text-green-600">帮助他人</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-green-700">100%</div>
                        <div className="text-xs text-green-600">资源再利用</div>
                    </div>
                </div>
            </div>
        </div>
    );

    // 回收点内容
    const renderLocations = () => (
        <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-green-500 mr-2" />
                    附近回收点
                </h3>
                <div className="space-y-4">
                    {recyclePoints.map((point) => (
                        <div
                            key={point.id}
                            className="bg-gradient-to-r from-white to-green-50 rounded-2xl p-4 border border-green-100 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex space-x-4">
                                <img
                                    src={point.image}
                                    alt={point.name}
                                    className="w-16 h-16 object-cover rounded-xl shadow-md"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{point.name}</h4>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(point.type)}`}>
                                                    {point.type}
                                                </span>
                                                <span className="text-xs text-gray-600">{point.distance}</span>
                                                <div className="flex items-center text-xs text-yellow-600">
                                                    <span>⭐ {point.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-xs text-gray-600 mb-2">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        <span className="flex-1">{point.address}</span>
                                    </div>

                                    <div className="flex items-center text-xs text-gray-600 mb-3">
                                        <Clock className="w-3 h-3 mr-1" />
                                        <span>{point.hours}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {point.acceptTypes.map((type, idx) => (
                                            <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                                                {type}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleCall(point.phone)}
                                            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                                        >
                                            <Phone className="w-3 h-3" />
                                            <span>电话咨询</span>
                                        </button>
                                        <button
                                            onClick={() => handleNavigation(point.address)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                                        >
                                            <Navigation className="w-3 h-3" />
                                            <span>导航前往</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 在线平台内容
    const renderPlatforms = () => (
        <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Globe className="w-5 h-5 text-green-500 mr-2" />
                    在线回收平台
                </h3>
                <div className="space-y-4">
                    {onlinePlatforms.map((platform) => (
                        <div
                            key={platform.id}
                            className={`bg-gradient-to-r ${platform.color.replace('from-', 'from-').replace('to-', 'to-').replace('-500', '-50').replace('-500', '-100')} rounded-2xl p-4 border border-white/50`}
                        >
                            <div className="flex items-start space-x-4">
                                <div className="text-3xl">{platform.logo}</div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-1">{platform.name}</h4>
                                    <p className="text-sm text-gray-600 mb-3">{platform.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {platform.features.map((feature, idx) => (
                                            <span key={idx} className="text-xs bg-white/70 px-2 py-1 rounded-lg text-gray-700">
                                                ✓ {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => window.open(platform.website, '_blank')}
                                        className="w-full bg-white/80 hover:bg-white text-gray-800 font-medium py-2 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300"
                                    >
                                        <Globe className="w-4 h-4" />
                                        <span>访问平台</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 提示内容
    const renderTips = () => (
        <div className="space-y-4">
            {/* 注意事项 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">📋 回收注意事项</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 回收前请清洁物品，确保无污渍异味</li>
                    <li>• 电子产品请提前备份并清除个人信息</li>
                    <li>• 衣物建议清洗干净，分类整理</li>
                    <li>• 提前电话确认回收点的营业时间</li>
                    <li>• 携带身份证件，部分回收点需要登记</li>
                </ul>
            </div>

            {/* 环保小贴士 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">🌱 环保小贴士</h4>
                <div className="text-sm text-green-700 space-y-2">
                    <p>• 定期整理家中物品，及时处理不需要的物品</p>
                    <p>• 购买前先考虑是否真正需要，减少过度消费</p>
                    <p>• 选择质量好的产品，延长使用寿命</p>
                    <p>• 关注环保认证标识，支持可持续发展</p>
                </div>
            </div>

            {/* 安全提醒 */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">⚠️ 安全提醒</h4>
                <div className="text-sm text-red-700 space-y-1">
                    <p>• 选择正规有资质的回收机构</p>
                    <p>• 保护个人隐私信息安全</p>
                    <p>• 不要随意透露家庭住址等敏感信息</p>
                    <p>• 如有疑问及时咨询官方客服</p>
                </div>
            </div>

            {/* 联系支持 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">📞 需要帮助？</h4>
                <div className="text-sm text-blue-700">
                    <p>如果您在回收过程中遇到任何问题，请随时联系我们：</p>
                    <div className="mt-2 space-y-1">
                        <p>• 客服热线：400-888-0000</p>
                        <p>• 在线客服：工作日 9:00-18:00</p>
                        <p>• 邮箱：support@recycleapp.com</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // 渲染当前激活的标签页内容
    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'locations':
                return renderLocations();
            case 'platforms':
                return renderPlatforms();
            case 'tips':
                return renderTips();
            default:
                return renderOverview();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* 顶部导航 */}
            <div className="relative flex items-center p-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <ArrowLeft className="w-5 h-5 text-green-600" />
                </button>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-800">回收/捐赠方案</h1>
                <div className="flex space-x-2 ml-auto">
                    <button
                        onClick={() => setIsFavorited(!isFavorited)}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Heart className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="px-4 pb-8">
                {/* 物品信息和推荐度 - 始终显示 */}
                {image && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100 mb-6">
                        <div className="flex items-center space-x-4 mb-4">
                            <img
                                src={image}
                                alt="物品图片"
                                className="w-20 h-20 object-cover rounded-2xl shadow-lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 mb-1">您的物品</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {description || '待处置物品'}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                                        70%
                                    </div>
                                    <span className="text-sm text-gray-600">回收推荐度</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
                                style={{ width: '70%' }}
                            />
                        </div>
                    </div>
                )}

                {/* 标签页导航 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-green-100 mb-6">
                    <div className="flex space-x-1">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                                        : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 标签页内容 */}
                <div>
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default RecycleDetail; 