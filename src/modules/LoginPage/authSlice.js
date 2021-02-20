import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticate } from "../../utils/apiClient";
const userDateLocalStorageKey = "authState";

export const login = createAsyncThunk(
  "auth/requestStatus",
  async ({ email, password }) => {
    const userData = await authenticate({ email, password });
    return userData;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // reads the 'cached' user data from the local storage so even if user refreshes, he stays logged in
    userData: JSON.parse(localStorage.getItem(userDateLocalStorageKey)),
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
      // saves user info (which includes the token) in local storage, so it will be saved between refreshes,
      // as requested
      localStorage.setItem(
        userDateLocalStorageKey,
        JSON.stringify(action.payload)
      );
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
