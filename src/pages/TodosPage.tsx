import { useReducer, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todos';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import type { Todo, UpdateTodoPayload } from '../types';
import { toast } from 'react-toastify';
import TodoSkeleton from '../components/TodoSkeleton';

// Definisikan tipe state
interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

// Definisikan tipe action
type TodosAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: Todo[] }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'ADD_TODO'; payload: Todo }
    | { type: 'UPDATE_TODO'; payload: { id: number; data: Partial<Todo> } }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'SET_ERROR'; payload: string };

// Reducer function
const todosReducer = (state: TodosState, action: TodosAction): TodosState => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, todos: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id ? { ...todo, ...action.payload.data } : todo
                ),
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const TodosPage = () => {
    // Inisialisasi state dengan useReducer
    const [state, dispatch] = useReducer(todosReducer, {
        todos: [],
        loading: true,
        error: null,
    });

    // Destructure state untuk kemudahan penggunaan
    const { todos, loading, error } = state;

    // Fetch todos saat komponen dimount
    useEffect(() => {
        const fetchTodos = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const data = await getTodos();
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch todos' });
                console.error(err);
            }
        };

        fetchTodos();
    }, []);

    // Handler untuk menambah todo
    const handleAddTodo = async (title: string, description: string) => {
        try {
            const newTodo = await createTodo({ title, description });
            dispatch({ type: 'ADD_TODO', payload: newTodo });
            toast.success('Todo added successfully!');
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to add todo' });
            toast.error('Failed to add todo');
            console.error(err);
        }
    };

    // Handler untuk memperbarui todo
    const handleUpdateTodo = async (id: number, data: Partial<Todo>) => {
        try {
            const transformedData: Partial<UpdateTodoPayload> = {
                ...data,
                completed: data.completed !== undefined ? (data.completed ? 1 : 0) : undefined,
            };
            await updateTodo(id, transformedData);
            dispatch({ type: 'UPDATE_TODO', payload: { id, data } });
            toast.success('Todo updated successfully!');
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to update todo' });
            toast.error('Failed to update todo');
            console.error(err);
        }
    };

    // Handler untuk menghapus todo
    const handleDeleteTodo = async (id: number) => {
        try {
            await deleteTodo(id);
            dispatch({ type: 'DELETE_TODO', payload: id });
            toast.success('Todo deleted successfully!');
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to delete todo' });
            toast.error('Failed to delete todo');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <TodoSkeleton count={5} />
            </div>
        );
    }

    return (
        <div>
            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
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