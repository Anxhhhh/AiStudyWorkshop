import apiClient from './apiClient';

export interface Goal {
    id: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
    // Specific fields appended below
    progress: number;
    target: number;
}

export const goalsService = {
    getAll: async () => {
        const response = await apiClient.get<Goal[]>('/goals');
        return response.data;
    },
    create: async (data: Partial<Goal>) => {
        const response = await apiClient.post<Goal>('/goals', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Goal>) => {
        const response = await apiClient.put<Goal>(`/goals/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await apiClient.delete(`/goals/${id}`);
    }
};
