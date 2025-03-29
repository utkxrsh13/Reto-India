import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { addToCart } from "../../../Redux/CartSlice";
import LottieAnimation from "../../LottieAnimation/LottieAnimation";
import LoadingAnimation from "../../../Lottie/Animation_Loading.json";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://reto-india-admin-backend.onrender.com/Product"
      );
      setTimeout(() => {
        setProducts(response.data);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: products.length > 3,
    speed: 1000,
    slidesToShow: Math.min(3, products.length),
    slidesToScroll: Math.min(3, products.length),
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, products.length),
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const handleAddToCart = (product) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/auth/signup");
      return;
    }
    toast.success("Item added to cart!");
    dispatch(addToCart(product));
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const handleBuyNow = (product) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/auth/signup");
      return;
    }
    dispatch(addToCart(product));
    setTimeout(() => navigate("/checkout"), 300);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <LottieAnimation
          animationData={LoadingAnimation}
          width={150}
          height={150}
        />
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <ToastContainer 
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
      />
      <div className="w-full lg:w-[90%] bg-white/20 rounded-lg shadow-2xl border border-white/30 p-6">
        <h2 className="text-2xl font-bold font-bricolage text-center mb-8">
          Our Products
        </h2>
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className="p-[5px] overflow-hidden w-full mx-auto cursor-pointer rounded-xl relative group">
              {/* Product Image */}
              <div className="w-full h-[450px]">
                <NavLink to={`/product/${product._id}`} state={{ product }}>
                  <img
                    src={product.image1}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                </NavLink>
              </div>

              {/* Action Buttons */}
              <div className="absolute w-full h-16 text-black bottom-0 left-0 bg-orange-300 opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-between px-3">
                <button 
                  className="py-2 font-semibold hover:text-white"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
                <div className="flex gap-3">
                  <NavLink to={`/product/${product._id}`} state={{ product }}>
                    <IoEyeOutline 
                      className="w-6 h-6 hover:text-white transition-colors cursor-pointer"
                      aria-label="View details"
                    />
                  </NavLink>
                  <IoCartOutline
                    className="w-6 h-6 hover:text-white transition-colors cursor-pointer"
                    onClick={() => handleAddToCart(product)}
                    aria-label="Add to cart"
                  />
                  <IoMdHeartEmpty 
                    className="w-6 h-6 hover:text-white transition-colors cursor-pointer"
                    aria-label="Add to wishlist"
                  />
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-3 right-3 bg-orange-300 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-90 transition-opacity duration-300 ease-in-out flex items-center gap-1">
                4.5 <AiFillStar className="text-yellow-600" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductPage;