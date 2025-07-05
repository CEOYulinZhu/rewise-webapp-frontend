/**
 * React Hook 用于访问全局分析状态
 */

import { useState, useEffect } from 'react';
import {
    getAnalysisResult,
    getInputData,
    hasAnalysisResult,
    isAnalysisComplete,
    addStateChangeListener,
    AnalysisDataTransformer,
    getProcessingSteps
} from '../utils/globalState';
import type { FinalAnalysisResult } from '../types/analysis';
import type { ProcessingStep } from '../utils/globalState';

interface GlobalStateHook {
    analysisResult: FinalAnalysisResult | null;
    inputData: {
        image: string | null;
        description: string;
        analysisMode?: string;
    } | null;
    hasResult: boolean;
    isComplete: boolean;
    itemSummary: ReturnType<typeof AnalysisDataTransformer.getItemSummary> | null;
    primaryRecommendation: string | null;
    recommendations: any[];
    processingSteps: ProcessingStep[];
}

/**
 * 使用全局分析状态的Hook
 */
export function useGlobalState(): GlobalStateHook {
    const [analysisResult, setAnalysisResult] = useState<FinalAnalysisResult | null>(getAnalysisResult());
    const [inputData, setInputData] = useState(getInputData());
    const [hasResult, setHasResult] = useState(hasAnalysisResult());
    const [isComplete, setIsComplete] = useState(isAnalysisComplete());
    const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>(getProcessingSteps());

    useEffect(() => {
        // 监听全局状态变化
        const unsubscribe = addStateChangeListener((state) => {
            setAnalysisResult(state.analysisResult);
            setInputData(state.inputData);
            setHasResult(state.analysisResult !== null);
            setIsComplete(state.isAnalysisComplete);
            setProcessingSteps(state.processingSteps);
        });

        return unsubscribe;
    }, []);

    // 计算衍生数据
    const itemSummary = analysisResult ? AnalysisDataTransformer.getItemSummary(analysisResult) : null;
    const primaryRecommendation = analysisResult ? AnalysisDataTransformer.getPrimaryRecommendation(analysisResult) : null;
    const recommendations = analysisResult ? AnalysisDataTransformer.transformToRecommendations(analysisResult) : [];

    return {
        analysisResult,
        inputData,
        hasResult,
        isComplete,
        itemSummary,
        primaryRecommendation,
        recommendations,
        processingSteps
    };
}

/**
 * 仅获取分析结果的简化Hook
 */
export function useAnalysisResult(): FinalAnalysisResult | null {
    const [result, setResult] = useState<FinalAnalysisResult | null>(getAnalysisResult());

    useEffect(() => {
        const unsubscribe = addStateChangeListener((state) => {
            setResult(state.analysisResult);
        });

        return unsubscribe;
    }, []);

    return result;
}

/**
 * 仅获取推荐数据的Hook
 */
export function useRecommendations() {
    const [recommendations, setRecommendations] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = addStateChangeListener((state) => {
            if (state.analysisResult) {
                const transformed = AnalysisDataTransformer.transformToRecommendations(state.analysisResult);
                setRecommendations(transformed);
            } else {
                setRecommendations([]);
            }
        });

        // 初始化
        const currentResult = getAnalysisResult();
        if (currentResult) {
            const transformed = AnalysisDataTransformer.transformToRecommendations(currentResult);
            setRecommendations(transformed);
        }

        return unsubscribe;
    }, []);

    return recommendations;
} 