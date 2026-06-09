import apiClient from './apiClient';

export interface Note {
    id: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
    // Specific fields appended below
    preview?: string;
    content: string;
}

export const notesService = {
    getAll: async () => {
        const response = await apiClient.get<Note[]>('/notes');
        return response.data;
    },
    create: async (data: Partial<Note>) => {
        const response = await apiClient.post<Note>('/notes', data);
        return response.data;
    },
    update: async (id: string, data: Partial<Note>) => {
        const response = await apiClient.put<Note>(`/notes/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await apiClient.delete(`/notes/${id}`);
    }
};
