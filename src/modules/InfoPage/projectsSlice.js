import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProjectsInfo } from "../../utils/apiClient";

export const getProjects = createAsyncThunk(
  "projects/requestStatus",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().auth.userData.token;
    const projectInfo = await getProjectsInfo(token);
    return projectInfo;
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: {
    [getProjects.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProjects.fulfilled]: (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    },
    [getProjects.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default projectsSlice.reducer;
