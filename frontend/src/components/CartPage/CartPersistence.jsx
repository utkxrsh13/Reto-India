// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { loadCart } from "../../Redux/CartSlice";

// // This component doesn't render anything - it just handles cart persistence logic
// const CartPersistence = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");

//     if (savedCart) {
//       try {
//         const parsedCart = JSON.parse(savedCart);
//         if (parsedCart?.items?.length > 0) {
//           dispatch(loadCart(parsedCart));
//         }
//       } catch (error) {
//         console.error("Error parsing saved cart:", error);
//         localStorage.removeItem("cart"); // Remove corrupted cart data
//       }
//     }
//   }, [dispatch]);

//   return null; // This component doesn't render anything
// };

// export default CartPersistence;


// In CartPersistence.js

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadCart } from "../../Redux/CartSlice";
import { loadCartFromDatabase } from "../../API/api";

const CartPersistence = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadCartData = async () => {
      // Check if user is logged in
      const token = localStorage.getItem("token");
      
      if (token) {
        // User is logged in, try to load from database first
        const dbCart = await loadCartFromDatabase();
        
        if (dbCart && dbCart.length > 0) {
          // If database cart exists, use it
          dispatch(loadCart({ 
            items: dbCart, 
            totalQuantity: dbCart.reduce((sum, item) => sum + item.quantity, 0) 
          }));
          setIsLoaded(true);
          return;
        }
      }
      
      // Fall back to localStorage if no db cart or not logged in
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (parsedCart?.items?.length > 0) {
            dispatch(loadCart(parsedCart));
          }
        } catch (error) {
          console.error("Error parsing saved cart:", error);
          localStorage.removeItem("cart"); // Remove corrupted cart data
        }
      }
      
      setIsLoaded(true);
    };

    loadCartData();
  }, [dispatch]);

  return null;
};

export default CartPersistence;