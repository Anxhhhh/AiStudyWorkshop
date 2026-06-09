import { create } from 'zustand';
import { type Goal, goalsService } from '../services/goalsService';

interface GoalState {
    goals: Goal[];
    loading: boolean;
    error: string | null;
    fetchGoals: () => Promise<void>;
    addGoal: (data: Partial<Goal>) => Promise<Goal>;
    updateGoal: (id: string, data: Partial<Goal>) => Promise<Goal>;
    deleteGoal: (id: string) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set, get) => ({
    goals: [],
    loading: false,
    error: null,

    fetchGoals: async () => {
        set({ loading: true, error: null });
        try {
            const data = await goalsService.getAll();
            set({ goals: data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch', loading: false });
        }
    },

    addGoal: async (data) => {
        set({ loading: true, error: null });
        try {
            const newGoal = await goalsService.create(data);
            set((state) => ({ goals: [newGoal, ...state.goals], loading: false }));
            return newGoal;
        } catch (err: any) {
            set({ error: err.message || 'Failed to create', loading: false });
            throw err;
        }
    },

    updateGoal: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const updated = await goalsService.update(id, data);
            set((state) => ({
                goals: state.goals.map(item => item.id === id ? updated : item),
                loading: false
            }));
            return updated;
        } catch (err: any) {
            set({ error: err.message || 'Failed to update', loading: false });
            throw err;
        }
    },

    deleteGoal: async (id) => {
        set({ loading: true, error: null });
        try {
            await goalsService.delete(id);
            set((state) => ({
                goals: state.goals.filter(item => item.id !== id),
                loading: false
            }));
        } catch (err: any) {
            set({ error: err.message || 'Failed to delete', loading: false });
            throw err;
        }
    }
}));
