/* import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  // other state properties...
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
    // other reducers...
  },
});

export const { showLoading, hideLoading } = alertsSlice.actions;
export default alertsSlice.reducer; */
import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {
        loading: false,
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { showLoading, hideLoading } = alertsSlice;