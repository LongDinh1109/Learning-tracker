import {
  LoginPayload,
  loginUser,
  SignupPayload,
  signupUser,
} from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: null | {
    username: string;
    email: string;
  };
  token: null | string;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signup failed";
      })
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signup failed";
      });
  },
});

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (payload: SignupPayload, thunkAPI) => {
    try {
      const username = payload.username;
      const email = payload.email;
      const password = payload.password;
      const res = await signupUser({ username, email, password });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      return await loginUser(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
