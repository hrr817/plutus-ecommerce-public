import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: null
  },
  reducers: {
    updateCart: (state, action) => {
      state.data = action.payload
    },
    clearCart: (state) => {
      state.data = null;
    },
  },
});

export const { updateCart, clearCart } = cartSlice.actions;

export const selectCart = state => state.cart.data;

export default cartSlice.reducer;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };
