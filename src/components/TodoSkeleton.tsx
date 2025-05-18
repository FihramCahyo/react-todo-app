import React from 'react';

interface TodoSkeletonProps {
    count?: number;
}

const TodoSkeleton: React.FC<TodoSkeletonProps> = ({ count = 3 }) => {
    return (
        <>
            {Array(count)
                .fill(0)
                .map((_, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 animate-pulse">
                        <div className="flex justify-between items-start">
                            <div className="w-3/4">
                                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default TodoSkeleton;