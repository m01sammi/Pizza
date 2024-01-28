import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice.ts'
import cart from './slices/cartSlice.ts';
import pizzas from './slices/pizzasSlice.ts';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas
  },
});

// console.log(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispath = typeof store.dispatch
export const useAppDispath = () => useDispatch<AppDispath>()