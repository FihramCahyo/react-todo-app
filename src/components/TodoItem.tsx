import { useState } from 'react';
import type { Todo } from '../types';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: number, data: Partial<Todo>) => void;
    onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onUpdate, onDelete }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleToggleComplete = () => {
        onUpdate(todo.id, { completed: todo.completed ? 0 : 1 });
    };

    const handleSave = () => {
        onUpdate(todo.id, { title, description });
        setIsEditing(false);
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 shadow-sm">
            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        rows={3}
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                            {todo.title}
                        </h3>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(todo.id)}
                                className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <p className={`mt-1 text-gray-600 dark:text-gray-400 ${todo.completed ? 'line-through' : ''}`}>
                        {todo.description}
                    </p>
                    <div className="mt-3">
                        <button
                            onClick={handleToggleComplete}
                            className={`px-3 py-1 rounded ${todo.completed
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                }`}
                        >
                            {todo.completed ? 'Completed' : 'Mark as Complete'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoItem;