/**
 * 物品处置任务 WebSocket API 模块
 * 提供实时任务处理接口调用功能
 */

// 定义接口类型
export interface TaskRequest {
    text_description?: string;
    image_url?: string;
    user_location?: {
        lat: number;
        lon: number;
    };
}

export interface StepUpdate {
    type: 'step_update';
    step: string;
    title: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    description: string;
    result?: any;
    error?: string;
    metadata?: any;
    timestamp: string;
}

export interface ProcessComplete {
    type: 'process_complete';
    message: string;
    timestamp: string;
}

export interface ErrorMessage {
    type: 'error';
    error: string;
    timestamp: string;
}

export type WebSocketMessage = StepUpdate | ProcessComplete | ErrorMessage;

// WebSocket 连接配置
const WS_BASE_URL = 'ws://localhost:8000';
const WS_ENDPOINT = '/api/v1/tasks/ws/process';

export interface TaskProcessorOptions {
    onStepUpdate?: (step: StepUpdate) => void;
    onProcessComplete?: (message: ProcessComplete) => void;
    onError?: (error: ErrorMessage) => void;
    onConnectionOpen?: () => void;
    onConnectionClose?: () => void;
    enableDetailedLogging?: boolean;
}

export class TaskProcessor {
    private ws: WebSocket | null = null;
    private options: TaskProcessorOptions;
    private connectionPromise: Promise<void> | null = null;
    private isConnected = false;

    constructor(options: TaskProcessorOptions = {}) {
        this.options = {
            enableDetailedLogging: true,
            ...options
        };
    }

    /**
     * 建立WebSocket连接
     */
    private connect(): Promise<void> {
        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        this.connectionPromise = new Promise((resolve, reject) => {
            try {
                const wsUrl = `${WS_BASE_URL}${WS_ENDPOINT}`;
                this.log('🔗 正在连接WebSocket服务器...', { url: wsUrl });

                this.ws = new WebSocket(wsUrl);

                this.ws.onopen = () => {
                    this.isConnected = true;
                    this.log('✅ WebSocket连接已建立');
                    this.options.onConnectionOpen?.();
                    resolve();
                };

                this.ws.onmessage = (event) => {
                    try {
                        const data: WebSocketMessage = JSON.parse(event.data);
                        this.handleMessage(data);
                    } catch (error) {
                        this.log('❌ 解析WebSocket消息失败', { error, rawData: event.data });
                    }
                };

                this.ws.onclose = (event) => {
                    this.isConnected = false;
                    this.connectionPromise = null;
                    this.log('🔌 WebSocket连接已关闭', {
                        code: event.code,
                        reason: event.reason,
                        wasClean: event.wasClean
                    });
                    this.options.onConnectionClose?.();
                };

                this.ws.onerror = (error) => {
                    this.log('❌ WebSocket连接错误', { error });
                    reject(error);
                };

                // 设置连接超时
                setTimeout(() => {
                    if (!this.isConnected) {
                        reject(new Error('WebSocket连接超时'));
                    }
                }, 10000);

            } catch (error) {
                this.log('❌ 创建WebSocket连接失败', { error });
                reject(error);
            }
        });

        return this.connectionPromise;
    }

    /**
     * 处理WebSocket消息
     */
    private handleMessage(data: WebSocketMessage) {
        this.log(`📨 收到消息 [${data.type}]`, data);

        switch (data.type) {
            case 'step_update':
                this.logStepUpdate(data);
                this.options.onStepUpdate?.(data);
                break;
            case 'process_complete':
                this.log('🎉 处理完成', data);
                this.options.onProcessComplete?.(data);
                break;
            case 'error':
                this.log('❌ 服务器错误', data);
                this.options.onError?.(data);
                break;
            default:
                this.log('⚠️ 未知消息类型', data);
        }
    }

    /**
 * 详细记录步骤更新
 */
    private logStepUpdate(step: StepUpdate) {
        const statusEmoji = {
            pending: '⏳',
            running: '🔄',
            completed: '✅',
            failed: '❌'
        };

        const emoji = statusEmoji[step.status] || '📋';

        this.log(`${emoji} 步骤更新: ${step.title} [${step.status}]`, {
            step: step.step,
            description: step.description,
            hasResult: !!step.result,
            hasError: !!step.error,
            timestamp: step.timestamp
        });

        // 如果有结果，详细记录
        if (step.result) {
            this.log(`📊 步骤结果 [${step.step}]`, step.result);
        } else if (step.step === 'result_integration' && step.status === 'completed') {
            // 特别检查最终结果步骤是否缺少数据
            this.log(`⚠️ 警告: result_integration 步骤完成但缺少结果数据!`, {
                step: step.step,
                status: step.status,
                hasResult: !!step.result,
                resultValue: step.result,
                fullStep: step
            });
        }

        // 如果有错误，详细记录
        if (step.error) {
            this.log(`🚨 步骤错误 [${step.step}]`, { error: step.error });
        }

        // 如果有元数据，记录
        if (step.metadata) {
            this.log(`📋 步骤元数据 [${step.step}]`, step.metadata);
        }

        // 特别处理最终结果
        if (step.step === 'result_integration' && step.status === 'completed') {
            if (step.result) {
                this.logFinalResult(step.result);
            } else {
                this.log(`❌ 最终结果缺失: result_integration 步骤完成但没有返回结果数据`);
                this.log(`🔍 完整步骤数据:`, step);
            }
        }
    }

    /**
     * 详细记录最终结果
     */
    private logFinalResult(result: any) {
        this.log('🎯 === 最终处理结果 ===');

        // 记录成功状态
        this.log('📈 处理状态', {
            success: result.success,
            source: result.source
        });

        // 记录分析结果
        if (result.analysis_result) {
            this.log('🔍 物品分析结果', result.analysis_result);
        }

        // 记录各个处置方案
        if (result.disposal_solution) {
            this.log('💡 处置方案推荐', result.disposal_solution);
        }

        if (result.creative_solution) {
            this.log('🎨 创意改造方案', result.creative_solution);
        }

        if (result.recycling_solution) {
            this.log('♻️ 回收捐赠方案', result.recycling_solution);
        }

        if (result.secondhand_solution) {
            this.log('💰 二手交易方案', result.secondhand_solution);
        }

        // 记录处理元数据
        if (result.processing_metadata) {
            this.log('⚙️ 处理元数据', result.processing_metadata);
        }

        this.log('🎯 === 结果记录完成 ===');
    }

    /**
     * 发送任务处理请求
     */
    async processTask(request: TaskRequest): Promise<void> {
        this.log('🚀 开始处理任务', request);

        try {
            // 建立连接
            await this.connect();

            // 发送请求
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                const requestData = JSON.stringify(request);
                this.log('📤 发送处理请求', request);
                this.ws.send(requestData);
            } else {
                throw new Error('WebSocket连接未就绪');
            }
        } catch (error) {
            this.log('❌ 任务处理失败', { error });
            throw error;
        }
    }

    /**
     * 关闭连接
     */
    disconnect(): void {
        if (this.ws) {
            this.log('🔌 主动断开WebSocket连接');
            this.ws.close();
            this.ws = null;
        }
        this.isConnected = false;
        this.connectionPromise = null;
    }

    /**
     * 获取连接状态
     */
    getConnectionStatus(): 'connecting' | 'connected' | 'disconnected' | 'error' {
        if (!this.ws) return 'disconnected';

        switch (this.ws.readyState) {
            case WebSocket.CONNECTING:
                return 'connecting';
            case WebSocket.OPEN:
                return 'connected';
            case WebSocket.CLOSING:
            case WebSocket.CLOSED:
                return 'disconnected';
            default:
                return 'error';
        }
    }

    /**
     * 日志记录方法
     */
    private log(message: string, data?: any) {
        if (!this.options.enableDetailedLogging) return;

        const timestamp = new Date().toISOString();
        const logPrefix = `[TaskProcessor ${timestamp}]`;

        if (data) {
            console.log(`${logPrefix} ${message}`, data);
        } else {
            console.log(`${logPrefix} ${message}`);
        }
    }
}

/**
 * 创建任务处理器实例的便捷方法
 */
export function createTaskProcessor(options: TaskProcessorOptions = {}): TaskProcessor {
    return new TaskProcessor(options);
}

/**
 * 处理图片文件转换为base64的工具函数
 */
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result);
        };
        reader.onerror = () => {
            reject(new Error('文件读取失败'));
        };
        reader.readAsDataURL(file);
    });
}

/**
 * 获取用户地理位置的工具函数
 */
export function getUserLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('浏览器不支持地理位置获取'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => {
                // 如果获取位置失败，使用默认位置（北京）
                console.warn('获取地理位置失败，使用默认位置', error);
                resolve({
                    lat: 39.9042,
                    lon: 116.4074
                });
            },
            {
                timeout: 10000,
                enableHighAccuracy: true
            }
        );
    });
} 