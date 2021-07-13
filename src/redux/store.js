import { configureStore } from '@reduxjs/toolkit';
import { phonebookReducer } from './phonebook';

const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
