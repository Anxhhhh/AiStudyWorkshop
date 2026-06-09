import apiClient from './apiClient';

export interface Task {
    id: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
    // Specific fields appended below
    description?: string;
    status: string;
}

export const tasksService = {
    getAll: async () => {
        const response = await apiClient.get<Task[]>('/tasks');
        return response.data;
    },
    create: async (data: Partial<Task>) => {
        const response = await apiClient.post<Task>('/tasks', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Task>) => {
        const response = await apiClient.put<Task>(`/tasks/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await apiClient.delete(`/tasks/${id}`);
    }
};
