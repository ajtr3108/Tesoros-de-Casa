import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/products";
import categories from "../../data/categories";

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        products,
        categories,
        categorySelected: "",
        productSelected: "",
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.categorySelected = action.payload;
        },
        setProductSelected: (state, action) => {
            state.productSelected = action.payload;
        }
    },
});

export const { setCategorySelected, setProductSelected } = shopSlice.actions;
export default shopSlice.reducer;
