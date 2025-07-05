import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw, Upload, Palette, Recycle, ShoppingBag, Sparkles, Clock, TrendingUp, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import RecommendationCard from '../components/RecommendationCard';
import { createTaskProcessor, TaskProcessor, getUserLocation } from '../utils/api';
import type { StepUpdate, ErrorMessage } from '../utils/api';
import { setAnalysisResult, setInputData, getInputData, clearGlobalState, updateProcessingStep, getProcessingSteps, clearProcessingSteps } from '../utils/globalState';
import type { FinalAnalysisResult } from '../types/analysis';
import type { ProcessingStep } from '../utils/globalState';
import { useGlobalState } from '../hooks/useGlobalState';

interface LocationState {
    image: string;
    description: string;
    analysisMode?: string;
}



const Overview: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, description, analysisMode } = (location.state as LocationState) || {};
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

    const { analysisResult, hasResult, recommendations, processingSteps } = useGlobalState();

    const [isProcessing, setIsProcessing] = useState(() => {
        // 如果不是新请求且已有结果，则不需要处理
        const globalInputData = getInputData();
        const isNewRequest = !globalInputData ||
            globalInputData.image !== image ||
            globalInputData.description !== description;
        return isNewRequest && !hasResult;
    });
    const [processingError, setProcessingError] = useState<string | null>(null);
    const [isStepsExpanded, setIsStepsExpanded] = useState(true);
    const taskProcessorRef = useRef<TaskProcessor | null>(null);
    const isInitialMount = useRef(true);

    // 检查是否为新的分析请求
    const globalInputData = getInputData();
    const isNewRequest = !globalInputData ||
        globalInputData.image !== image ||
        globalInputData.description !== description;

    // 如果是新的请求，并且是首次渲染，则同步重置状态
    if (isInitialMount.current && isNewRequest) {
        clearGlobalState();
    }

    const toggleCard = (cardId: string) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(cardId)) {
            newExpanded.delete(cardId);
        } else {
            newExpanded.add(cardId);
        }
        setExpandedCards(newExpanded);
    };

    // 初始化API调用
    useEffect(() => {
        const initializeProcessing = async () => {
            isInitialMount.current = false; // 标记初始化已执行

            if (!image && !description) {
                setIsProcessing(false);
                return;
            }

            // 如果已经有匹配的结果，则直接显示
            if (hasResult && !isNewRequest) {
                setIsProcessing(false);
                setIsStepsExpanded(false);
                return;
            }

            // 开始新的处理流程
            setIsProcessing(true);
            clearProcessingSteps();
            setProcessingError(null);
            setIsStepsExpanded(true);
            setInputData({ image, description, analysisMode });

            try {
                const processor = createTaskProcessor({
                    onStepUpdate: handleStepUpdate,
                    onProcessComplete: handleProcessComplete,
                    onError: handleError,
                    onConnectionOpen: () => { },
                    onConnectionClose: () => { },
                    enableDetailedLogging: true
                });

                taskProcessorRef.current = processor;
                const userLocation = await getUserLocation();
                const requestData = {
                    text_description: description || undefined,
                    image_url: image || undefined,
                    user_location: userLocation
                };
                await processor.processTask(requestData);

            } catch (error) {
                setProcessingError(error instanceof Error ? error.message : '处理初始化失败');
                setIsProcessing(false);
            }
        };

        initializeProcessing();

        return () => {
            if (taskProcessorRef.current) {
                taskProcessorRef.current.disconnect();
            }
        };
    }, [image, description, analysisMode]); // 简化依赖项

    const handleStepUpdate = (step: StepUpdate) => {
        if (step.step === 'result_integration' && step.status === 'completed') {
            if (step.result) {
                setAnalysisResult(step.result as FinalAnalysisResult);
            }
            setIsProcessing(false);
            setIsStepsExpanded(false);
        }

        const newStep: ProcessingStep = {
            id: step.step,
            title: step.title,
            status: step.status,
            description: step.description,
            result: step.result,
            error: step.error,
            timestamp: step.timestamp
        };
        updateProcessingStep(newStep);
    };

    const handleProcessComplete = () => {
        setIsProcessing(false);
        setIsStepsExpanded(false);
    };

    const handleError = (error: ErrorMessage) => {
        setProcessingError(error.error);
        setIsProcessing(false);
        setIsStepsExpanded(false);
    };

    const handleBackToHome = () => {
        clearGlobalState();
        if (taskProcessorRef.current) {
            taskProcessorRef.current.disconnect();
        }
        navigate('/');
    };

    const handleDetailClick = (route: string, recommendation: any) => {
        const serializableRecommendation = { ...recommendation };
        delete serializableRecommendation.icon;

        navigate(route, {
            state: {
                image,
                description,
                recommendation: serializableRecommendation
            }
        });
    };

    const getProgressColor = (id: string) => {
        switch (id) {
            case 'creative': return 'from-purple-400 to-pink-400';
            case 'recycle': return 'from-green-400 to-emerald-400';
            case 'trading': return 'from-blue-400 to-cyan-400';
            default: return 'from-gray-400 to-gray-500';
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'highest': return { text: '强烈推荐', color: 'bg-gradient-to-r from-amber-400 to-orange-400 text-white', icon: Sparkles };
            case 'high': return { text: '推荐', color: 'bg-gradient-to-r from-green-400 to-emerald-400 text-white', icon: TrendingUp };
            case 'medium': return { text: '一般推荐', color: 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white', icon: Clock };
            default: return { text: '一般推荐', color: 'bg-gray-400 text-white', icon: Clock };
        }
    };

    const recommendationsList = isProcessing ? [] : recommendations.map(rec => ({
        ...rec,
        icon: rec.id === 'creative' ? Palette : rec.id === 'recycle' ? Recycle : ShoppingBag
    }));

    const primaryRecommendationInfo = (isProcessing || !analysisResult?.disposal_solution?.recommendations) ? null : {
        primaryChoice: analysisResult.disposal_solution.recommendations.overall_recommendation?.primary_choice || '暂无推荐',
        reason: analysisResult.disposal_solution.recommendations.overall_recommendation?.reason || '请查看详细分析结果'
    };

    const renderProcessingSteps = () => {
        // 只有在处理中，或有处理步骤可显示时，才渲染该组件
        if (processingSteps.length === 0 && !isProcessing) {
            return null;
        }

        const completedSteps = processingSteps.filter(step => step.status === 'completed').length;
        // 假设一个最小总步数以改善初始进度显示，实际步数会动态更新
        const totalSteps = Math.max(processingSteps.length, 3);

        return (
            <div className="mx-4 mb-6">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                    <button
                        onClick={() => setIsStepsExpanded(!isStepsExpanded)}
                        className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                            {isProcessing ? <Loader className="w-5 h-5 text-blue-500 animate-spin" /> : <CheckCircle className="w-5 h-5 text-green-500" />}
                            <div className="text-left">
                                <h3 className="text-lg font-bold text-gray-800">{isProcessing ? '处理进度' : '分析完成'}</h3>
                                <p className="text-sm text-gray-600">
                                    {isProcessing
                                        ? `正在处理中... ${processingSteps.length > 0 ? `(${completedSteps}/${totalSteps})` : ''}`
                                        : `已完成 ${completedSteps} 个步骤`}
                                </p>
                            </div>
                        </div>
                        <div className={`transform transition-transform duration-300 ${isStepsExpanded ? 'rotate-180' : 'rotate-0'}`}>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${isStepsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                        <div className="px-6 pb-6 border-t border-gray-100/50">
                            <div className="space-y-3 pt-4">
                                {processingSteps.map((step) => (
                                    <div key={step.id} className="flex items-center space-x-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.status === 'completed' ? 'bg-green-100' : step.status === 'running' ? 'bg-blue-100' : step.status === 'failed' ? 'bg-red-100' : 'bg-gray-100'}`}>
                                            {step.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                                            {step.status === 'running' && <Loader className="w-4 h-4 text-blue-600 animate-spin" />}
                                            {step.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-600" />}
                                            {step.status === 'pending' && <Clock className="w-4 h-4 text-gray-400" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-800">{step.title}</p>
                                            <p className="text-xs text-gray-600">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderError = () => {
        if (!processingError) return null;
        return (
            <div className="mx-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-3xl p-6">
                    <div className="flex items-center space-x-3">
                        <AlertCircle className="w-6 h-6 text-red-500" />
                        <div>
                            <h3 className="font-bold text-red-800">处理失败</h3>
                            <p className="text-sm text-red-700">{processingError}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
            <NavigationBar
                title="处置建议"
                actionButtons={[{ icon: Upload, onClick: handleBackToHome }, { icon: RefreshCw, onClick: () => window.location.reload() }]}
                className=""
            />

            {(image || description) && (
                <div className="mx-4 mb-6">
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
                        <div className="flex items-center space-x-5">
                            {image ? (
                                <div className="relative">
                                    <img
                                        src={image}
                                        alt="上传的物品"
                                        className="w-20 h-20 object-cover rounded-2xl shadow-lg ring-2 ring-white/50"
                                    />
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-lg flex items-center justify-center ring-2 ring-white/50">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {isProcessing ?
                                            '您的物品' :
                                            analysisResult ?
                                                `${analysisResult.analysis_result?.brand || '您的'} ${analysisResult.analysis_result?.category || '物品'}` :
                                                '您的物品'
                                        }
                                    </h3>
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${isProcessing ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {isProcessing ? '分析中' : '已识别'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    {isProcessing ?
                                        (description || '基于图片识别的物品') :
                                        (analysisResult?.analysis_result?.description || description || '基于图片识别的物品')
                                    }
                                </p>
                                <div className="mt-3 flex items-center text-xs text-gray-500">
                                    {isProcessing ? (
                                        <>
                                            <Loader className="w-3 h-3 mr-1 animate-spin" />
                                            正在分析物品特征...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                                            分析完成 • 已生成{recommendationsList.length}个处置方案
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {renderError()}
            {renderProcessingSteps()}

            {(!isProcessing && !processingError) && (
                <div className="px-4 space-y-4 pb-8">
                    {recommendationsList.map((rec: any) => (
                        <RecommendationCard
                            key={rec.id}
                            recommendation={rec}
                            isExpanded={expandedCards.has(rec.id)}
                            onToggle={() => toggleCard(rec.id)}
                            onDetailClick={() => handleDetailClick(rec.route, rec)}
                            priorityBadge={getPriorityBadge(rec.priority)}
                            progressColor={getProgressColor(rec.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Overview; 