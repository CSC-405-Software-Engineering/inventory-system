import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserStateProps } from "../interfaces/user.interface";
import axios from "axios";

export type AuthState = {
  user: UserStateProps | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

export const loadUser = createAsyncThunk<any, void>(
  "load-user",
  async () => {
    const token = localStorage.getItem("token");

    try {
      const { data }: any = await axios.get<any>(
        `/backend/v1/users/user`,
        {
          headers: { "x-access-token": token },
        }
      );
      return data;
    } catch (e: any) {
      throw new Error(e.response.data.error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    //load user
    builder.addCase(loadUser.pending, (state) => ({ ...state }));

    builder.addCase(loadUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });

    builder.addCase(loadUser.rejected, () => {
      localStorage.removeItem("token");
      // state.errMsg = {
      //   msg: action.error.message,
      //   Id: 'LOAD_USER_ERROR',
      // };
    });
  },
});

export const { setUser, setAuthToken, logoutUser } = authSlice.actions;
export default authSlice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
