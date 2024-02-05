import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import User from '../../types/User';
import { base_url } from '../../common/common';
import CreateUserInput from '../../types/CreateUserInput';

const userUrl = `${base_url}/users`;

const initialState: {
  users: User[];
  isLoading: boolean;
  error: string;
} = {
  users: [],
  isLoading: false,
  error: '',
};

export const fetchAllUsersAsync = createAsyncThunk(
  'fetchAllUsersAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(userUrl);
      const users = response.data;
      return users;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  'createUserAsync',
  async (newUserInfo: CreateUserInput, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(`${userUrl}/signup`, newUserInfo);
      const user = response.data;
      return user;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
    }
  }
);

// export const logInUserAsync = createAsyncThunk(
//   'logInUserAsync',
//   async (
//     loginInfo: { email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post<User>(`${userUrl}/login`, loginInfo);
//       const user = response.data;
//       return user;
//     } catch (e) {
//       const error = e as AxiosError;
//       return rejectWithValue(error);
//     }
//   }
// );


const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    });
    builder.addCase(fetchAllUsersAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.response?.data.message,
        };
      }
    });
    builder.addCase(createUserAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    });
    builder.addCase(createUserAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.response?.data.message,
        };
      }
    });
  },
});

const userReducer = usersSlice.reducer;
export const { reset } = usersSlice.actions;
export default userReducer;
