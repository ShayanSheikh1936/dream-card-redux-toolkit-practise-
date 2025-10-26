import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/carsSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    cars: carsReducer,
    ui: uiReducer,
  },
});

export default store;
