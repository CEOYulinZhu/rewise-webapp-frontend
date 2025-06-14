import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface InstantScrollResetProps {
    excludePaths?: string[];
}

const InstantScrollReset: React.FC<InstantScrollResetProps> = ({
    excludePaths = []
}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        // 检查是否需要排除当前路径
        if (excludePaths.some(path => pathname.includes(path))) {
            return;
        }

        // 立即重置滚动位置到顶部
        // 使用多种方法确保在所有浏览器中都能正常工作
        const resetScrollPosition = () => {
            // 方法1：直接设置scrollTop（最可靠）
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            // 方法2：使用window.scrollTo
            window.scrollTo(0, 0);

            // 方法3：设置CSS样式（备用方案）
            document.documentElement.style.scrollBehavior = 'auto';
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

        };

        // 立即执行
        resetScrollPosition();

    }, [pathname, excludePaths]);

    return null;
};

export default InstantScrollReset; 