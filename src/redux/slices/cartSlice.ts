import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage.ts';
import { calcTotalPrice } from '../../utils/calcTotalPrice.ts';

export type CartItem = {
      id: string, 
      name: string,
      price: number,
      imageURL: string,
      types: string,
      sizes: number,
      count: number
}

interface CartSliceState {
  totalPrice: number;
  items:  CartItem[]
}

const cartData = getCartFromLocalStorage()

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  items:  cartData.items
}

export const cartSlice  = createSlice({
  name: 'cart',
  initialState,
  reducers: { 
    // addItem (state, action) {
    //     state.items.push(action.payload);
    //     state.totalPrice = state.items.reduce((sum, obj) => {
    //         return obj.price + sum;
    //     }, 0)
    // },
    addItem (state, action: PayloadAction<CartItem>) {
        const findItem = state.items.find((obj) => obj.id == action.payload.id);

        if (findItem) {
            findItem.count++;
        }
        else {
            state.items.push ({
                ...action.payload, 
                count: 1,
            }); 
        }

        state.totalPrice = calcTotalPrice(state.items)
    },

   
    minusItem (state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id == action.payload);

        if (findItem) {
            findItem.count--;
        }
        
    },
    
    removeItem (state, action: PayloadAction<string>) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems (state) {
        state.items = [];
        state.totalPrice = 0
    },
    
  }
  
})

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => 
  state.cart.items.find((obj) => obj.id == id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;