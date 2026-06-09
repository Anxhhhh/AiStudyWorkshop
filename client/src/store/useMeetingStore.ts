import { create } from 'zustand';
import { type Meeting, meetingsService } from '../services/meetingsService';

interface MeetingState {
    meetings: Meeting[];
    loading: boolean;
    error: string | null;
    fetchMeetings: () => Promise<void>;
    addMeeting: (data: Partial<Meeting>) => Promise<Meeting>;
    updateMeeting: (id: string, data: Partial<Meeting>) => Promise<Meeting>;
    deleteMeeting: (id: string) => Promise<void>;
}

export const useMeetingStore = create<MeetingState>((set, get) => ({
    meetings: [],
    loading: false,
    error: null,

    fetchMeetings: async () => {
        set({ loading: true, error: null });
        try {
            const data = await meetingsService.getAll();
            set({ meetings: data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch', loading: false });
        }
    },

    addMeeting: async (data) => {
        set({ loading: true, error: null });
        try {
            const newMeeting = await meetingsService.create(data);
            set((state) => ({ meetings: [newMeeting, ...state.meetings], loading: false }));
            return newMeeting;
        } catch (err: any) {
            set({ error: err.message || 'Failed to create', loading: false });
            throw err;
        }
    },

    updateMeeting: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const updated = await meetingsService.update(id, data);
            set((state) => ({
                meetings: state.meetings.map(item => item.id === id ? updated : item),
                loading: false
            }));
            return updated;
        } catch (err: any) {
            set({ error: err.message || 'Failed to update', loading: false });
            throw err;
        }
    },

    deleteMeeting: async (id) => {
        set({ loading: true, error: null });
        try {
            await meetingsService.delete(id);
            set((state) => ({
                meetings: state.meetings.filter(item => item.id !== id),
                loading: false
            }));
        } catch (err: any) {
            set({ error: err.message || 'Failed to delete', loading: false });
            throw err;
        }
    }
}));
