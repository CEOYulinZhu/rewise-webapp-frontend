import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
    value,
    onChange,
    placeholder = "搜索内容...",
    className = ""
}) => {
    return (
        <div className={`px-4 mb-4 ${className}`}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white border border-green-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-300 focus:shadow-xl transition-all duration-300"
                />
                {value && (
                    <button
                        onClick={() => onChange('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        title="清除搜索"
                    >
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBox; 