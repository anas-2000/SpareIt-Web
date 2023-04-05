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
            state.total -= action.payload.quantity * action.payload.price;
            state.products = newItems;
        },
        decreaseProduct: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id); //change this to _id when integrating with backend
            if (state.products[index].quantity === 1) {
                const newItems = [...state.products.slice(0, index), ...state.products.slice(index + 1)];
                state.quantity -= 1;
                state.total -= action.payload.quantity * action.payload.price;
                state.products = newItems;
            }
            else{
                state.products[index].quantity -= 1;
                state.total -= action.payload.price;
            }
        }
    },
});

export const { addProduct, removeProduct, decreaseProduct } = cartSlice.actions;
export default cartSlice.reducer;