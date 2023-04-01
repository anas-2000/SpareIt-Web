import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            console.log(state.products);
            state.total += action.payload.price * action.payload.quantity; // 1000 for shipping
        },
        removeProduct: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id); //change this to _id when integrating with backend
            const newItems = [...state.products.slice(0, index), ...state.products.slice(index + 1)];
            state.quantity -= 1;
            state.total -= action.payload.price;
            state.products = newItems;
        }
    },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;