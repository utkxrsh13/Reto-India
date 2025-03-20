import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCart } from "../../Redux/CartSlice";

// This component doesn't render anything - it just handles cart persistence logic
const CartPersistence = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default CartPersistence;
