import { create } from 'zustand';
import { type Task, tasksService } from '../services/tasksService';

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (data: Partial<Task>) => Promise<Task>;
    updateTask: (id: string, data: Partial<Task>) => Promise<Task>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    loading: false,
    error: null,

    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const data = await tasksService.getAll();
            set({ tasks: data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch', loading: false });
        }
    },

    addTask: async (data) => {
        set({ loading: true, error: null });
        try {
            const newTask = await tasksService.create(data);
            set((state) => ({ tasks: [newTask, ...state.tasks], loading: false }));
            return newTask;
        } catch (err: any) {
            set({ error: err.message || 'Failed to create', loading: false });
            throw err;
        }
    },

    updateTask: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const updated = await tasksService.update(id, data);
            set((state) => ({
                tasks: state.tasks.map(item => item.id === id ? updated : item),
                loading: false
            }));
            return updated;
        } catch (err: any) {
            set({ error: err.message || 'Failed to update', loading: false });
            throw err;
        }
    },

    deleteTask: async (id) => {
        set({ loading: true, error: null });
        try {
            await tasksService.delete(id);
            set((state) => ({
                tasks: state.tasks.filter(item => item.id !== id),
                loading: false
            }));
        } catch (err: any) {
            set({ error: err.message || 'Failed to delete', loading: false });
            throw err;
        }
    }
}));
