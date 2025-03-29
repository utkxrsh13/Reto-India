import React from "react";
import { AiFillStar } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { addToCart } from "../../../Redux/CartSlice";
import './ThreeProduct.css';

const MainCarousel = ({ trendingProduct }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Custom Arrow Components
  const PrevArrow = ({ onClick }) => (
    <div
      className="prev-arrow-box absolute top-1/2 left-[-1rem] transform -translate-y-1/2 bg-gray-800 bg-opacity-20 text-white p-2 rounded-full cursor-pointer z-10"
      onClick={onClick}
      aria-label="Previous product"
    >
      <i className="fa-solid fa-arrow-left prev-arrow"></i>
    </div>
  );
 
  const NextArrow = ({ onClick }) => (
    <div
      className="next-arrow-box absolute top-1/2 right-[-1rem] transform -translate-y-1/2 bg-gray-800 bg-opacity-20 text-white p-2 rounded-full cursor-pointer z-10"
      onClick={onClick}
      aria-label="Next product"
    >
      <i className="fa-solid fa-arrow-right next-arrow"></i>
    </div>
  );

  // Carousel Settings
  const settings = {
    dots: false,
    infinite: trendingProduct.length > 3,
    speed: 1000,
    slidesToShow: Math.min(3, trendingProduct.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, trendingProduct.length),
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleAddToCart = (product) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/auth/signup");
      return;
    }
    toast.success("Item Added Successfully");
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

  return (
    <div className="w-full p-5 banner-div px-[3.2rem]">
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Slider {...settings}>
        {trendingProduct.map((product) => (
          <div key={product._id} className="banner h-[430px] p-[5px] overflow-hidden w-[93%] mx-auto cursor-pointer rounded-xl relative group">
            
            {/* Product Image */}
            <div 
              className="w-full h-full"
              onClick={() => handleViewProduct(product)}
            >
              {product.image1 ? (
                <img 
                  src={product.image1} 
                  alt={product.name || "Trending product"} 
                  loading="lazy" 
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-700 rounded-xl">
                  No Image Available
                </div>
              )}
            </div>

            {/* Action Buttons (Slide Up on Hover) */}
            <div className="absolute w-full h-16 text-black bottom-0 left-0 bg-orange-300 opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-between px-3">
              <button 
                className="py-2 font-semibold hover:text-white" 
                onClick={() => handleBuyNow(product)}
              >
                Buy Now
              </button>
              <div className="flex gap-3">
                <IoEyeOutline 
                  className="w-6 h-6 hover:text-white transition-colors cursor-pointer"
                  onClick={() => handleViewProduct(product)}
                  aria-label="View details"
                />
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

            {/* Rating Badge (Appears on Hover) */}
            <div className="absolute top-3 right-3 bg-orange-300 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center gap-1">
              <span>4.5</span>
              <AiFillStar className="text-yellow-600" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainCarousel;