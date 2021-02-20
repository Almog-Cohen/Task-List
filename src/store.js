import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/LoginPage/authSlice";
import projectsReducer from "./modules/InfoPage/projectsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
});