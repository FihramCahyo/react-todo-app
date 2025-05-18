import { useState, useEffect, useRef } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todos';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import type { Todo } from '../types';

const TodosPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchTodos();
            hasFetchedRef.current = true;
        }
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const data = await getTodos();
            setTodos(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch todos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTodo = async (title: string, description: string) => {
        try {
            const newTodo = await createTodo({ title, description });
            setTodos([...todos, newTodo]);
        } catch (err) {
            setError('Failed to add todo');
            console.error(err);
        }
    };

    const handleUpdateTodo = async (id: number, data: Partial<Todo>) => {
        try {
            await updateTodo(id, data);
            setTodos(
                todos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo))
            );
        } catch (err) {
            setError('Failed to update todo');
            console.error(err);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (err) {
            setError('Failed to delete todo');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <TodoForm onAdd={handleAddTodo} />

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Todos</h2>

                {todos.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No todos yet. Add one above!</p>
                ) : (
                    <div>
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onUpdate={handleUpdateTodo}
                                onDelete={handleDeleteTodo}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodosPage;