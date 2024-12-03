import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../store/slices/counterSlice/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  }
})