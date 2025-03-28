// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { saveCartToLocalStorage } from "./CartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add your reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartToLocalStorage),
});

// Subscribe to store changes and save the cart state to localStorage
// store.subscribe(() => {
//   const state = store.getState();
//   localStorage.setItem("cart", JSON.stringify(state.cart));
// });

export default store;
