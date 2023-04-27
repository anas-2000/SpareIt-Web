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
            else {
                state.products[index].quantity -= 1;
                state.total -= action.payload.price;
            }
        },
        increaseProduct: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id); //change this to _id when integrating with backend
            state.products[index].quantity += 1;
            state.total += action.payload.price;
        },
        removeAllProducts: (state, action) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        emptyCart: (state) => {
            return {
                ...state,
                products: [],
                quantity: 0,
                total: 0,
            };
        }
    },
});

export const { addProduct, removeProduct, decreaseProduct, increaseProduct, removeAllProducts, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;