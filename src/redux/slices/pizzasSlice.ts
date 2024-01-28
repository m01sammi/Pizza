import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';
import { Sort } from './filterSlice';

export type SearchPizzaParams = {
  category: string, 
  search: string, 
  sortBy: string, 
  order: string, 
  currentPage: string
}

export const fetchPizzas  = createAsyncThunk<Pizza[], SearchPizzaParams> (
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {category, search, sortBy, order, currentPage}  = params;
        const {data} = await axios.get<Pizza[]>(
          `https://65a05328600f49256fafd79c.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        
          // if (data.length === 0        ) {
          //   return thunkAPI.rejectWithValue('Пиццы пустые')
          // } 

          // return thunkAPI.fulfillWithValue(data);
        
        
          return data;
    })

type Pizza = {
  id: string, 
  name: string, 
  price:number, 
  imageURL: string, 
  sizes: number[], 
  types: number[], 
  rating: number,
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzasSliceState {
  pizzas: Pizza[];
  status:  Status,
}

const initialState: PizzasSliceState = {
  pizzas: [],
  status: Status.LOADING, // loadind|success|error
}


export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems (state, action: PayloadAction<Pizza[]>) {
        state.pizzas = action.payload;
        
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
                state.pizzas = [] 
     
     })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = Status.SUCCESS  

      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.pizzas = [] 

      });
      
  },
   
})

export const selectPizzaItems = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;