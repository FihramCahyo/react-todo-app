export interface User {
    userId: number;
    username: string;
    token: string;
}

export interface LoginCredentials {
    user_name: string;
    user_password: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    userId: number;
    username: string;
    message: string;
}

export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: number;
    user_id: number;
}

export interface CreateTodoPayload {
    title: string;
    description: string;
}

export interface UpdateTodoPayload {
    title?: string;
    description?: string;
    completed?: number;
}
