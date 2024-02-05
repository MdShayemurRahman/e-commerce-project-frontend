import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { base_url } from '../../common/common';
import User from '../../types/User';
import { LoginInput } from '../../types/LoginInput';
import { CurrentUser } from '../../types/CurrentUser';
import { getToken } from '../../common/getToken';

const userUrl = `${base_url}/users`;

const initialState: {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string;
  isValidUser: boolean;
  currentUser?: CurrentUser;
} = {
  isLoggedIn: false,
  isLoading: false,
  error: '',
  isValidUser: false,
  currentUser: undefined,
};

export const logInUserAsync = createAsyncThunk(
  'logInUserAsync',
  async (loginInfo: LoginInput, { rejectWithValue }) => {
    try {
      const response = await axios.post<CurrentUser>(
        `${userUrl}/login`,
        loginInfo
      );
      const loggedInUser = response.data;
      console.log(loggedInUser);
      const accessToken = loggedInUser.accessToken;
      localStorage.setItem('token', accessToken);
      const user = loggedInUser;
      return user;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
    }
  }
);

export const validateUserAsync = createAsyncThunk(
  'validateUserAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${userUrl}/validate-user`, getToken());
      const data: boolean = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    reset: (state) => initialState,
    // logout: (state) => {
    //   localStorage.removeItem('token');
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //     currentUser: null
    //   }
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(logInUserAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(logInUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      };
    });
    builder.addCase(logInUserAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.response?.data.message || 'Login failed',
        };
      }
    });
    builder.addCase(validateUserAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(validateUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        isValidUser: action.payload,
      };
    });
    builder.addCase(validateUserAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.response?.data.message || 'Login failed',
        };
      }
    });
  },
});

const authReducer = authSlice.reducer;
export const { reset } = authSlice.actions;
export default authReducer;
