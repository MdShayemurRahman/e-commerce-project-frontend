import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import Category from '../../types/Category';
import { base_url } from '../../common/common';

const categoryUrl = `${base_url}/categories`;

const initialState: {
  categories: Category[];
  isLoading: boolean;
  error: string;
} = {
  categories: [],
  isLoading: false,
  error: '',
};

export const fetchAllCategories = createAsyncThunk(
  'fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get<Category[]>(categoryUrl);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleCategory = createAsyncThunk(
  'fetchSingleCategory',
  async (_id: string, { rejectWithValue }) => {
    try {
      const result = await axios.get<Category>(`${categoryUrl}/${_id}`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'createCategory',
  async (categoryName: string, { rejectWithValue }) => {
    try {
      const result = await axios.post<Category>(categoryUrl, {
        name: categoryName,
      });
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSingleCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedCategory = action.payload;
        const existingIndex = state.categories.findIndex(
          (category) => category._id === updatedCategory._id
        );
        if (existingIndex !== -1) {
          state.categories[existingIndex] = updatedCategory;
        }
      }) ////
      .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

const categoryReducer = categoriesSlice.reducer;
export default categoryReducer;
