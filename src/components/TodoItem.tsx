import React, { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';
import type { Todo } from '../types';
import { CheckCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: number, data: Partial<Todo>) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleUpdate = () => {
        onUpdate(todo.id, {
            title: editTitle,
            description: editDescription,
        });
        setIsEditing(false);
    };

    const handleToggleComplete = () => {
        onUpdate(todo.id, { completed: !todo.completed });
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        onDelete(todo.id);
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 ${todo.completed ? 'opacity-70' : ''}`}>
                {isEditing ? (
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                        <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            rows={3}
                        ></textarea>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-start">
                        <div>
                            <h3
                                className={`text-lg font-medium text-gray-900 dark:text-white ${todo.completed ? 'line-through' : ''
                                    }`}
                            >
                                {todo.title}
                            </h3>
                            <p className={`text-gray-600 dark:text-gray-300 mt-1 ${todo.completed ? 'line-through' : ''}`}>
                                {todo.description}
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleToggleComplete}
                                className={`p-2.5 rounded-full transition-colors duration-200 ${todo.completed
                                    ? 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
                                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                                aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
                                title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                            >
                                <CheckCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-2.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label={`Edit ${todo.title}`}
                                title="Edit"
                            >
                                <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                aria-label={`Delete ${todo.title}`}
                                title="Delete"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title={todo.title}
            />
        </>
    );
};

export default TodoItem;