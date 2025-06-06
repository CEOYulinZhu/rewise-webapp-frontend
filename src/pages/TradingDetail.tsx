import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, TrendingUp, DollarSign, Users, Copy, Star, Info, BarChart3, LineChart as LineChartIcon, Zap, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface LocationState {
    image: string;
    description: string;
    recommendation: any;
}

// 标签页定义
const tabs = [
    { id: 'overview', name: '概览', icon: BarChart3 },
    { id: 'market', name: '分析', icon: LineChartIcon },
    { id: 'platforms', name: '对比', icon: Zap },
    { id: 'tools', name: '文案', icon: FileText },
];

const TradingDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, description } = (location.state as LocationState) || {};
    const [isFavorited, setIsFavorited] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState('闲鱼');
    const [activeTab, setActiveTab] = useState('overview');

    // 模拟价格分析数据
    const priceData = [
        { name: '50-100元', 闲鱼: 15, 转转: 12, 拍拍: 8 },
        { name: '100-200元', 闲鱼: 25, 转转: 20, 拍拍: 15 },
        { name: '200-300元', 闲鱼: 30, 转转: 25, 拍拍: 20 },
        { name: '300-400元', 闲鱼: 20, 转转: 18, 拍拍: 25 },
        { name: '400+元', 闲鱼: 10, 转转: 15, 拍拍: 32 }
    ];

    // 模拟销量趋势数据
    const salesData = [
        { month: '1月', sales: 120 },
        { month: '2月', sales: 98 },
        { month: '3月', sales: 145 },
        { month: '4月', sales: 178 },
        { month: '5月', sales: 156 },
        { month: '6月', sales: 192 }
    ];

    // 模拟竞争分析数据
    const competitionData = [
        { name: '低竞争', value: 30, color: '#10B981' },
        { name: '中等竞争', value: 45, color: '#F59E0B' },
        { name: '高竞争', value: 25, color: '#EF4444' }
    ];

    // 平台数据
    const platforms = [
        {
            id: 'xianyu',
            name: '闲鱼',
            logo: '🐟',
            recommendation: 85,
            userBase: '5亿+',
            features: ['免费发布', '支付宝担保', '芝麻信用'],
            avgPrice: '180-220元',
            competition: '中等',
            timeToSell: '3-7天',
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 'zhuanzhuan',
            name: '转转',
            logo: '🔄',
            recommendation: 75,
            userBase: '2亿+',
            features: ['验机服务', '分期付款', '质检报告'],
            avgPrice: '200-250元',
            competition: '较低',
            timeToSell: '5-10天',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'paipai',
            name: '拍拍',
            logo: '🛒',
            recommendation: 65,
            userBase: '1亿+',
            features: ['品质保证', '京东配送', '售后保障'],
            avgPrice: '250-300元',
            competition: '较高',
            timeToSell: '7-14天',
            color: 'from-red-500 to-pink-500'
        }
    ];

    // 文案模板
    const copyTemplates = [
        {
            title: '标题模板',
            content: '【9成新】高品质闲置物品转让，原价XXX，现价XXX包邮',
            category: 'title'
        },
        {
            title: '描述模板',
            content: '物品状况良好，使用次数不多，因搬家/升级等原因转让。支持当面交易，验货满意再付款。诚心要的私聊，非诚勿扰。',
            category: 'description'
        },
        {
            title: '交易说明',
            content: '📍 同城优先，支持当面交易\n💰 价格小刀，包装完好\n🚚 非同城可快递，运费自理\n✅ 支持验货，满意再确认收货',
            category: 'terms'
        }
    ];

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('已复制到剪贴板！');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: '二手交易方案',
                text: '发现一个很棒的二手交易方案！',
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
            {/* 市场概览 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                    市场分析概览
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                        <div className="text-xl font-bold text-green-700">180-250元</div>
                        <div className="text-sm text-green-600">建议定价区间</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                        <div className="text-xl font-bold text-blue-700">5-8天</div>
                        <div className="text-sm text-blue-600">预计成交时间</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                        <div className="text-xl font-bold text-purple-700">中等</div>
                        <div className="text-sm text-purple-600">竞争程度</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                        <div className="text-xl font-bold text-orange-700">78%</div>
                        <div className="text-sm text-orange-600">成交概率</div>
                    </div>
                </div>
            </div>

            {/* 定价建议 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Info className="w-5 h-5 text-blue-500 mr-2" />
                    定价策略建议
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">💰 建议定价：200-220元</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                            <li>• 高于市场均价10%，突出品质优势</li>
                            <li>• 为议价留出10-15元空间</li>
                            <li>• 可考虑包邮策略提高竞争力</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-2">⚡ 快速出售：180-190元</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• 低于市场均价，吸引更多买家</li>
                            <li>• 预计3-5天内成交</li>
                            <li>• 适合急需资金回流的情况</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    // 市场分析内容
    const renderMarket = () => (
        <div className="space-y-6">
            {/* 价格分析图表 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 text-blue-500 mr-2" />
                    价格分布分析
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={priceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="闲鱼" fill="#FF6B35" />
                            <Bar dataKey="转转" fill="#4F9CF9" />
                            <Bar dataKey="拍拍" fill="#E74C3C" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    💡 大部分同类商品在200-300元价格区间成交量最高
                </p>
            </div>

            {/* 销量趋势 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="w-5 h-5 text-blue-500 mr-2" />
                    销量趋势分析
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#4F9CF9" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    📈 6月是销售旺季，建议在此时段发布商品
                </p>
            </div>

            {/* 竞争分析 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Star className="w-5 h-5 text-blue-500 mr-2" />
                    竞争程度分析
                </h3>
                <div className="flex items-center space-x-6">
                    <div className="h-48 w-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={competitionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={80}
                                    dataKey="value"
                                >
                                    {competitionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-3">
                        {competitionData.map((item) => (
                            <div key={item.name} className="flex items-center space-x-3">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                <span className="text-sm text-gray-600">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-700">
                        💡 您的商品处于中等竞争环境，建议突出产品亮点和性价比优势
                    </p>
                </div>
            </div>
        </div>
    );

    // 平台对比内容
    const renderPlatforms = () => (
        <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">推荐平台对比</h3>
                <div className="space-y-3">
                    {platforms.map((platform) => (
                        <div
                            key={platform.id}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedPlatform === platform.name
                                ? 'border-blue-300 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                            onClick={() => setSelectedPlatform(platform.name)}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="text-2xl">{platform.logo}</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-800">{platform.name}</h4>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">{platform.recommendation}%推荐</span>
                                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${platform.color} rounded-full`}
                                                    style={{ width: `${platform.recommendation}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 平台详细信息 */}
                                    <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                                        <div>
                                            <span className="text-gray-500">用户基数: </span>
                                            <span className="font-medium">{platform.userBase}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">平均价格: </span>
                                            <span className="font-medium">{platform.avgPrice}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">竞争程度: </span>
                                            <span className="font-medium">{platform.competition}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">成交时间: </span>
                                            <span className="font-medium">{platform.timeToSell}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {platform.features.map((feature, idx) => (
                                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 文案工具内容
    const renderTools = () => (
        <div className="space-y-6">
            {/* 文案模板 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">文案模板</h3>
                <div className="space-y-4">
                    {copyTemplates.map((template, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-2xl">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-800">{template.title}</h4>
                                <button
                                    onClick={() => handleCopyText(template.content)}
                                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <Copy className="w-4 h-4" />
                                    <span>复制</span>
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 whitespace-pre-line">
                                {template.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 发布时机建议 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">⏰ 最佳发布时机</h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-blue-700">
                    <div>
                        <strong>工作日：</strong>晚上19:00-21:00
                    </div>
                    <div>
                        <strong>周末：</strong>上午10:00-12:00，下午15:00-17:00
                    </div>
                    <div>
                        <strong>最佳月份：</strong>3-6月，9-11月
                    </div>
                    <div>
                        <strong>避开时段：</strong>深夜和工作时间
                    </div>
                </div>
            </div>

            {/* 拍照技巧 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">📸 拍照技巧</h4>
                <div className="text-sm text-purple-700 space-y-1">
                    <p>• 充足自然光，避免使用闪光灯</p>
                    <p>• 多角度展示，包含细节特写</p>
                    <p>• 保持背景简洁，突出商品主体</p>
                    <p>• 展示使用痕迹，诚实描述商品状况</p>
                    <p>• 添加尺寸对比物，方便买家判断大小</p>
                </div>
            </div>

            {/* 交易安全提示 */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">🔒 交易安全提示</h4>
                <div className="text-sm text-red-700 space-y-1">
                    <p>• 优先选择平台担保交易，避免私下转账</p>
                    <p>• 同城交易选择公共场所，确保人身安全</p>
                    <p>• 保存聊天记录和交易凭证</p>
                    <p>• 谨防虚假买家，核实对方身份</p>
                    <p>• 遇到纠纷及时联系平台客服</p>
                </div>
            </div>
        </div>
    );

    // 渲染当前激活的标签页内容
    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'market':
                return renderMarket();
            case 'platforms':
                return renderPlatforms();
            case 'tools':
                return renderTools();
            default:
                return renderOverview();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
            {/* 顶部导航 */}
            <div className="relative flex items-center p-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <ArrowLeft className="w-5 h-5 text-blue-600" />
                </button>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-800">二手交易方案</h1>
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
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-100 mb-6">
                        <div className="flex items-center space-x-4 mb-4">
                            <img
                                src={image}
                                alt="物品图片"
                                className="w-20 h-20 object-cover rounded-2xl shadow-lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 mb-1">您的物品</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {description || '待出售物品'}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                        60%
                                    </div>
                                    <span className="text-sm text-gray-600">交易推荐度</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 transition-all duration-1000 ease-out"
                                style={{ width: '60%' }}
                            />
                        </div>
                    </div>
                )}

                {/* 标签页导航 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-blue-100 mb-6">
                    <div className="flex space-x-1">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg transform scale-105'
                                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
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

export default TradingDetail; 