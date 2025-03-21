import { createSlice } from "@reduxjs/toolkit";

// cartSlice.js
const initialState = (() => {
  // Check if running in a browser environment
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], totalQuantity: 0 };
  }
  return { items: [], totalQuantity: 0 };
})();

const cartSlice = createSlice({
  name: "cart",
  initialState, // Use the initialized state
  reducers: {
    loadCart: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addToCart: (state, action) => {
      const newItem = action.payload; // Payload contains the product object
      console.log("Reducer received payload:", newItem);

      // Find if the item already exists in the cart
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        // If item exists, increment its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity = 1
        state.items.push({ ...newItem, quantity: 1 });
      }

      // Update the total quantity of items in the cart
      state.totalQuantity++;
      console.log("Updated cart state:", state);
    },

    incrementQuantity: (state, action) => {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        state.totalQuantity--;
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== _id);
        state.totalQuantity--;
      }
    },

    removeItemCompletely: (state, action) => {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        // Deduct the item's total quantity from the totalQuantity count
        state.totalQuantity -= existingItem.quantity;
        // Remove the item from the cart
        state.items = state.items.filter((item) => item._id !== _id);
      }
    },

    resetCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});
export const {
  loadCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItemCompletely,
  resetCart,
} = cartSlice.actions;

// export const saveCartToLocalStorage = store => next => action => {
//   const result = next(action);

//   if (action.type.startsWith('cart/')) {
//     const cartState = store.getState().cart;
    
//     // Only save if the cart has items
//     if (cartState.items.length > 0) {
//       localStorage.setItem('cart', JSON.stringify(cartState));
//     }
//   }

//   return result;
// };

export const saveCartToLocalStorage = store => next => action => {
  const result = next(action);
  
  if (action.type.startsWith("cart/")) {
    const cartState = store.getState().cart;
    
    // Always save to localStorage for guest users
    localStorage.setItem("cart", JSON.stringify(cartState));
    
    // If user is logged in, also save to database
    const token = localStorage.getItem("token");
    if (token && cartState.items.length > 0 && 
        action.type !== "cart/loadCart") { // Prevent loop
      import("../API/api").then(api => {
        api.saveCartToDatabase(cartState.items);
      });
    }
  }
  
  return result;
};



export default cartSlice.reducer;
