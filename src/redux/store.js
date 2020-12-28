import { configureStore } from '@reduxjs/toolkit';
import themeSlice from '../features/themeSlice';
import cartReducer from '../features/cartSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeSlice
  },
});
