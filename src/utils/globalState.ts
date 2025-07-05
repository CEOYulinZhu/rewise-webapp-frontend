/**
 * 全局状态管理模块
 * 用于存储和访问分析结果数据
 */

import type { FinalAnalysisResult } from '../types/analysis';

// 处理步骤状态
export interface ProcessingStep {
    id: string;
    title: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    description: string;
    result?: any;
    error?: string;
    timestamp?: string;
}

// 全局状态接口
interface GlobalState {
    analysisResult: FinalAnalysisResult | null;
    inputData: {
        image: string | null;
        description: string;
        analysisMode?: string;
    } | null;
    isAnalysisComplete: boolean;
    processingSteps: ProcessingStep[];
}

// 全局状态对象
let globalState: GlobalState = {
    analysisResult: null,
    inputData: null,
    isAnalysisComplete: false,
    processingSteps: []
};

// 状态变更监听器
type StateChangeListener = (state: GlobalState) => void;
const stateChangeListeners: StateChangeListener[] = [];

/**
 * 设置分析结果
 */
export function setAnalysisResult(result: FinalAnalysisResult): void {
    globalState.analysisResult = result;
    globalState.isAnalysisComplete = true;
    notifyListeners();
}

/**
 * 获取分析结果
 */
export function getAnalysisResult(): FinalAnalysisResult | null {
    return globalState.analysisResult;
}

/**
 * 设置输入数据
 */
export function setInputData(data: { image: string | null; description: string; analysisMode?: string }): void {
    globalState.inputData = data;
    notifyListeners();
}

/**
 * 获取输入数据
 */
export function getInputData(): GlobalState['inputData'] {
    return globalState.inputData;
}

/**
 * 获取完整的全局状态
 */
export function getGlobalState(): GlobalState {
    return { ...globalState };
}

/**
 * 清除所有数据
 */
export function clearGlobalState(): void {
    globalState = {
        analysisResult: null,
        inputData: null,
        isAnalysisComplete: false,
        processingSteps: []
    };
    notifyListeners();
}

/**
 * 检查是否有分析结果
 */
export function hasAnalysisResult(): boolean {
    return globalState.analysisResult !== null;
}

/**
 * 检查分析是否完成
 */
export function isAnalysisComplete(): boolean {
    return globalState.isAnalysisComplete;
}

/**
 * 设置处理步骤
 */
export function setProcessingSteps(steps: ProcessingStep[]): void {
    globalState.processingSteps = steps;
    notifyListeners();
}

/**
 * 获取处理步骤
 */
export function getProcessingSteps(): ProcessingStep[] {
    return globalState.processingSteps;
}

/**
 * 添加或更新处理步骤
 */
export function updateProcessingStep(step: ProcessingStep): void {
    const steps = globalState.processingSteps;
    const existingIndex = steps.findIndex(s => s.id === step.id);

    let newSteps;
    if (existingIndex >= 0) {
        // 如果步骤已存在，则使用 map 创建一个新数组，并替换掉对应的步骤
        newSteps = steps.map(s => (s.id === step.id ? step : s));
    } else {
        // 如果是新步骤，则使用扩展语法创建一个包含新步骤的新数组
        newSteps = [...steps, step];
    }

    // 用新数组更新全局状态
    globalState.processingSteps = newSteps;
    notifyListeners();
}

/**
 * 清除处理步骤
 */
export function clearProcessingSteps(): void {
    globalState.processingSteps = [];
    notifyListeners();
}

/**
 * 添加状态变更监听器
 */
export function addStateChangeListener(listener: StateChangeListener): () => void {
    stateChangeListeners.push(listener);

    // 返回取消监听的函数
    return () => {
        const index = stateChangeListeners.indexOf(listener);
        if (index > -1) {
            stateChangeListeners.splice(index, 1);
        }
    };
}

/**
 * 通知所有监听器状态变更
 */
function notifyListeners(): void {
    stateChangeListeners.forEach(listener => {
        try {
            listener({ ...globalState });
        } catch (error) {
            console.error('状态监听器执行错误:', error);
        }
    });
}

/**
 * 数据转换工具函数
 */
export class AnalysisDataTransformer {
    /**
     * 将后端数据转换为推荐卡片数据
     */
    static transformToRecommendations(analysisResult: FinalAnalysisResult) {
        const { disposal_solution, creative_solution, recycling_solution, secondhand_solution } = analysisResult;

        const recommendations = [];

        // 创意改造推荐
        if (creative_solution?.success) {
            recommendations.push({
                id: 'creative',
                title: '创意改造',
                subtitle: creative_solution.renovation_plan?.summary?.title || '让旧物焕发新生命',
                percentage: disposal_solution?.recommendations?.creative_renovation?.recommendation_score || 0,
                priority: this.getPriorityByScore(disposal_solution?.recommendations?.creative_renovation?.recommendation_score || 0),
                estimatedTime: creative_solution.renovation_plan?.summary?.total_time_hours ?
                    `${creative_solution.renovation_plan.summary.total_time_hours}小时` : '2-3天',
                difficulty: creative_solution.renovation_plan?.summary?.difficulty || '简单',
                reasons: disposal_solution?.recommendations?.creative_renovation?.reason_tags || [],
                icon: 'Palette',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50',
                shadowColor: 'shadow-purple-200/50',
                borderColor: 'border-purple-100',
                route: '/detail/creative'
            });
        }

        // 回收捐赠推荐
        if (recycling_solution?.success) {
            recommendations.push({
                id: 'recycle',
                title: '回收捐赠',
                subtitle: '传递爱心，环保先行',
                percentage: disposal_solution?.recommendations?.recycling_donation?.recommendation_score || 0,
                priority: this.getPriorityByScore(disposal_solution?.recommendations?.recycling_donation?.recommendation_score || 0),
                estimatedTime: '当天',
                difficulty: '极简',
                reasons: disposal_solution?.recommendations?.recycling_donation?.reason_tags || [],
                icon: 'Recycle',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50',
                shadowColor: 'shadow-green-200/50',
                borderColor: 'border-green-100',
                route: '/detail/recycle'
            });
        }

        // 二手交易推荐
        if (secondhand_solution?.success) {
            recommendations.push({
                id: 'trading',
                title: '二手平台交易',
                subtitle: '经济实惠，物尽其用',
                percentage: disposal_solution?.recommendations?.secondhand_trading?.recommendation_score || 0,
                priority: this.getPriorityByScore(disposal_solution?.recommendations?.secondhand_trading?.recommendation_score || 0),
                estimatedTime: '5-7天',
                difficulty: '一般',
                reasons: disposal_solution?.recommendations?.secondhand_trading?.reason_tags || [],
                icon: 'ShoppingBag',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50',
                shadowColor: 'shadow-blue-200/50',
                borderColor: 'border-blue-100',
                route: '/detail/trading'
            });
        }

        // 按推荐分数排序
        return recommendations.sort((a, b) => b.percentage - a.percentage);
    }

    /**
     * 根据分数获取优先级
     */
    private static getPriorityByScore(score: number): string {
        if (score >= 80) return 'highest';
        if (score >= 60) return 'high';
        return 'medium';
    }

    /**
     * 获取物品基本信息摘要
     */
    static getItemSummary(analysisResult: FinalAnalysisResult) {
        const { analysis_result } = analysisResult;
        return {
            category: analysis_result?.category || '未知类别',
            brand: analysis_result?.brand || '未知品牌',
            condition: analysis_result?.condition || '未知状态',
            estimatedAge: analysis_result?.estimated_age || '未知年龄',
            description: analysis_result?.description || '暂无描述'
        };
    }

    /**
     * 获取主要推荐方案
     */
    static getPrimaryRecommendation(analysisResult: FinalAnalysisResult): string {
        return analysisResult?.disposal_solution?.recommendations?.overall_recommendation?.primary_choice || '暂无推荐';
    }
}

// 导出全局状态实例（用于调试）
if (typeof window !== 'undefined') {
    (window as any).__GLOBAL_STATE__ = {
        getState: getGlobalState,
        getAnalysisResult,
        hasAnalysisResult,
        isAnalysisComplete
    };
} 