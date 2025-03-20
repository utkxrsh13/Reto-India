import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../Context/AuthContext";

// This component doesn't render anything - it just handles cart persistence logic
const CartPersistence = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    console.log("CartPersistence triggered. isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        if (parsedCart?.items?.length > 0) {
          const {
            addToCart,
            incrementQuantity,
            resetCart,
          } = require("../Redux/CartSlice");

          dispatch(resetCart()); // Clear existing cart before restoring

          parsedCart.items.forEach((item) => {
            dispatch(addToCart(item));
            for (let i = 1; i < item.quantity; i++) {
              dispatch(incrementQuantity(item._id));
            }
          });
        }
      } catch (error) {
        console.error("Error parsing saved cart:", error);
        localStorage.removeItem("cart"); // Remove corrupted cart data
      }
    }
  }, [dispatch]); // <-- Removed isLoggedIn dependency

  return null; // This component doesn't render anything
};

export default CartPersistence;
