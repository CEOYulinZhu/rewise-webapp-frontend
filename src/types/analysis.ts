/**
 * 分析结果数据类型定义
 */

// 物品分析结果
export interface AnalysisResult {
    category: string;
    sub_category: string;
    brand: string;
    condition: string;
    material: string;
    color: string;
    keywords: string[];
    description: string;
    estimated_age: string;
    special_features: string;
    success: boolean;
}

// 处置方案推荐
export interface DisposalSolution {
    success: boolean;
    recommendations: {
        creative_renovation: {
            recommendation_score: number;
            reason_tags: string[];
        };
        recycling_donation: {
            recommendation_score: number;
            reason_tags: string[];
        };
        secondhand_trading: {
            recommendation_score: number;
            reason_tags: string[];
        };
        overall_recommendation: {
            primary_choice: string;
            reason: string;
        };
    };
    recommendation_source: string;
}

// 创意改造方案
export interface CreativeSolution {
    success: boolean;
    renovation_plan: {
        summary: {
            title: string;
            difficulty: string;
            total_time_hours: number;
            budget_range: string;
            cost_description: string;
            required_skills: string[];
            tools: string[];
            materials: string[];
            total_steps: number;
        };
        steps: Array<{
            title: string;
            description: string;
            estimated_time_minutes: number;
            difficulty: string;
            tools: string[];
            materials: string[];
        }>;
    };
    videos: Array<{
        title: string;
        cover_url: string;
        url: string;
        score: number;
        play_count: number;
        description: string;
        uploader: string;
        duration: string;
    }>;
    keywords: string[];
    search_intent: string;
}

// 回收捐赠方案
export interface RecyclingSolution {
    success: boolean;
    processing_summary: {
        success: boolean;
        has_locations: boolean;
        has_platforms: boolean;
        recycling_type: string;
        location_count: number;
        nearby_location_count: number;
        platform_count: number;
        top_platform: {
            name: string;
            score: number;
        };
        processing_mode: string;
        processing_time_seconds: number;
    };
    location_recommendation: {
        success: boolean;
        recycling_type: string;
        locations_count: number;
        error: string | null;
        locations: Array<{
            id: string;
            name: string;
            location: string;
            type: string;
            address: string;
            pname: string;
            cityname: string;
            adname: string;
            opentime_today: string;
            opentime_week: string;
            tel: string;
            distance_meters: number;
            distance_formatted: string;
            photos: Array<{
                title: string;
                url: string;
            }>;
        }>;
    };
    platform_recommendation: {
        success: boolean;
        ai_recommendations: {
            recommendations: Array<{
                platform_name: string;
                suitability_score: number;
                pros: string[];
                cons: string[];
                recommendation_reason: string;
            }>;
        };
        platform_details: Array<{
            platform_icon: string;
            platform_name: string;
            description: string;
            focus_categories: string[];
            tags: string[];
            user_data: {
                registered_users: string | null;
                monthly_active_users: string | null;
                cumulative_users: string | null;
                daily_new_users: string | null;
                transaction_volume: string | null;
            };
            rating: {
                app_store: number | null;
                yingyongbao: number | null;
                kuan: number | null;
            };
            transaction_model: string;
        }>;
    };
}

// 二手交易方案
export interface SecondhandSolution {
    success: boolean;
    search_result: {
        success: boolean;
        source: string;
        result: {
            success: boolean;
            total_products: number;
            products: Array<{
                platform: string;
                title: string;
                seller: string;
                price: number;
                image_url: string;
                location: string;
                platform_type: string;
            }>;
            platform_stats: {
                [key: string]: {
                    success: boolean;
                    product_count: number;
                    price_stats: {
                        platform: string;
                        min_price: number;
                        max_price: number;
                        average_price: number;
                        product_count: number;
                        price_range: string;
                    };
                    error: string | null;
                };
            };
        };
    };
    content_result: {
        success: boolean;
        source: string;
        generation_source: string;
        content_result: {
            title: string;
            description: string;
        };
    };
    processing_metadata: {
        processing_mode: string;
        processing_time_seconds: number;
        search_success: boolean;
        content_success: boolean;
        search_error: string | null;
        content_error: string | null;
    };
}

// 处理元数据
export interface ProcessingMetadata {
    processing_time_seconds: number;
    agents_executed: {
        disposal_recommendation: boolean;
        creative_coordination: boolean;
        recycling_coordination: boolean;
        secondhand_coordination: boolean;
        total_successful: number;
    };
    analysis_metadata: {
        source: string;
        has_conflicts: boolean;
    };
}

// 最终分析结果
export interface FinalAnalysisResult {
    success: boolean;
    source: string;
    analysis_result: AnalysisResult;
    disposal_solution: DisposalSolution;
    creative_solution: CreativeSolution;
    recycling_solution: RecyclingSolution;
    secondhand_solution: SecondhandSolution;
    processing_metadata: ProcessingMetadata;
} 