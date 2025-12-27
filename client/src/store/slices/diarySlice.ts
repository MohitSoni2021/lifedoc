import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
export interface DiaryEntry {
    _id: string;
    userId: string;
    date: string;
    rawText?: string;
    summary: string;
    mood?: 'happy' | 'neutral' | 'stressed' | 'sad' | 'anxious' | 'energetic';
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

interface DiaryState {
    entries: DiaryEntry[];
    loading: boolean;
    error: string | null;
}

const initialState: DiaryState = {
    entries: [],
    loading: false,
    error: null,
};

const getAuthHeader = () => {
    const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || sessionStorage.getItem('token')) : null;
    return { Authorization: `Bearer ${token}` };
};

// Async thunks
export const fetchDiaryEntries = createAsyncThunk(
    'diary/fetchAll',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/diary/user/${userId}`, {
                headers: getAuthHeader(),
            });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch diary entries');
        }
    }
);

export const createDiaryEntry = createAsyncThunk(
    'diary/create',
    async (data: { date: string; rawText?: string; summary: string; mood?: string; tags?: string[] }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/diary`, data, {
                headers: getAuthHeader(),
            });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create diary entry');
        }
    }
);

// Slice
const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiaryEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDiaryEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(fetchDiaryEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(createDiaryEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDiaryEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.entries.unshift(action.payload);
            })
            .addCase(createDiaryEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearErrors } = diarySlice.actions;
export default diarySlice.reducer;
