import { create } from 'zustand';
import { type Note, notesService } from '../services/notesService';

interface NoteState {
    notes: Note[];
    loading: boolean;
    error: string | null;
    fetchNotes: () => Promise<void>;
    addNote: (data: Partial<Note>) => Promise<Note>;
    updateNote: (id: string, data: Partial<Note>) => Promise<Note>;
    deleteNote: (id: string) => Promise<void>;
}

export const useNoteStore = create<NoteState>((set, get) => ({
    notes: [],
    loading: false,
    error: null,

    fetchNotes: async () => {
        set({ loading: true, error: null });
        try {
            const data = await notesService.getAll();
            set({ notes: data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch', loading: false });
        }
    },

    addNote: async (data) => {
        set({ loading: true, error: null });
        try {
            const newNote = await notesService.create(data);
            set((state) => ({ notes: [newNote, ...state.notes], loading: false }));
            return newNote;
        } catch (err: any) {
            set({ error: err.message || 'Failed to create', loading: false });
            throw err;
        }
    },

    updateNote: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const updated = await notesService.update(id, data);
            set((state) => ({
                notes: state.notes.map(item => item.id === id ? updated : item),
                loading: false
            }));
            return updated;
        } catch (err: any) {
            set({ error: err.message || 'Failed to update', loading: false });
            throw err;
        }
    },

    deleteNote: async (id) => {
        set({ loading: true, error: null });
        try {
            await notesService.delete(id);
            set((state) => ({
                notes: state.notes.filter(item => item.id !== id),
                loading: false
            }));
        } catch (err: any) {
            set({ error: err.message || 'Failed to delete', loading: false });
            throw err;
        }
    }
}));
