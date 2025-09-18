import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import shopReducer from '../store/slices/shopSlices';
import cartReducer from '../store/slices/cartSlices';
import userReducer from '../store/slices/userSlices';
import { shopApi } from '../services/shopApi';
import { authApi } from '../services/authApi';

export const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    userReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(shopApi.middleware).concat(authApi.middleware))
})
setupListeners(store.dispatch);