import type { LucideIcon } from 'lucide-react';

export interface PreferenceItem {
    id: 'creative' | 'recycle' | 'trading';
    title: string;
    subtitle: string;
    icon: LucideIcon;
    gradient: string;
    enabled: boolean;
}

export interface RecommendationItem {
    id: 'creative' | 'recycle' | 'trading';
    title: string;
    subtitle: string;
    percentage: number;
    description: string;
    icon: LucideIcon;
    gradient: string;
    bgGradient: string;
    route: string;
}

export interface LocationState {
    image: string;
    description: string;
    recommendation?: any;
}

// 历史记录相关类型定义
export interface HistoryItem {
    id: string;
    type: 'image' | 'text' | 'both';
    image?: string;
    text?: string;
    timestamp: Date;
    category: 'creative' | 'recycle' | 'trading' | 'general';
    paths: DisposalPath[];
    expanded?: boolean;
}

export interface DisposalPath {
    id: 'creative' | 'recycle' | 'trading';
    title: string;
    subtitle: string;
    percentage: number;
    description: string;
    icon: LucideIcon;
    gradient: string;
    route: string;
}

export type SortType = 'time' | 'category';
export type FilterType = 'all' | 'creative' | 'recycle' | 'trading' | 'general'; 