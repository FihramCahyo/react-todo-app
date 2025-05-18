
import type { CreateTodoPayload, Todo, UpdateTodoPayload } from '../types';
import api from './api';

export const getTodos = async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
};

export const getTodo = async (id: number): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`);
    return response.data;
};

export const createTodo = async (todo: CreateTodoPayload): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', todo);
    return response.data;
};

export const updateTodo = async (id: number, todo: UpdateTodoPayload): Promise<Todo> => {
    const response = await api.put<Todo>(`/todos/${id}`, todo);
    return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
};
