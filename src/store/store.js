// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";

// ✅ Try to load existing state from localStorage
const persistedState = localStorage.getItem("dashboardState")
  ? JSON.parse(localStorage.getItem("dashboardState"))
  : undefined;

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
  // ✅ Use persisted state if available
  preloadedState: {
    dashboard: persistedState || undefined,
  },
});

// ✅ Save state to localStorage whenever Redux changes
store.subscribe(() => {
  localStorage.setItem(
    "dashboardState",
    JSON.stringify(store.getState().dashboard)
  );
});

export default store;
