import apiClient from './apiClient';

export interface Meeting {
    id: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
    // Specific fields appended below
    date: string;
    notes?: string;
}

export const meetingsService = {
    getAll: async () => {
        const response = await apiClient.get<Meeting[]>('/meetings');
        return response.data;
    },
    create: async (data: Partial<Meeting>) => {
        const response = await apiClient.post<Meeting>('/meetings', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Meeting>) => {
        const response = await apiClient.put<Meeting>(`/meetings/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await apiClient.delete(`/meetings/${id}`);
    }
};
