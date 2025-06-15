import React from 'react';
import { SortAsc, SortDesc } from 'lucide-react';

interface TimeSortButtonProps {
    sortOrder: 'asc' | 'desc';
    onToggle: () => void;
    className?: string;
}

const TimeSortButton: React.FC<TimeSortButtonProps> = ({
    sortOrder,
    onToggle,
    className = ""
}) => {
    return (
        <button
            onClick={onToggle}
            className={`flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-green-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        >
            {sortOrder === 'desc' ?
                <SortDesc className="w-4 h-4 text-green-600" /> :
                <SortAsc className="w-4 h-4 text-green-600" />
            }
            <span className="text-sm text-gray-700">时间</span>
        </button>
    );
};

export default TimeSortButton; 