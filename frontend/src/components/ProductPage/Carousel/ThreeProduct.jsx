import React from "react";
import { AiFillStar } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../../../Redux/CartSlice";
import './ThreeProduct.css';

const MainCarousel = ({trendingProduct}) => {
  const dispatch = useDispatch();


  const PrevArrow = ({ onClick }) => (
    <div
      className="prev-arrow-box absolute top-1/2 left-[-1rem] transform -translate-y-1/2 bg-gray-800 bg-opacity-20 text-white p-2 rounded-full cursor-pointer z-10"
      onClick={onClick}
    ><i className="fa-solid fa-arrow-left prev-arrow"></i>
      {/* <AiOutlineLeft size={40} className="prev-arrow" /> */}
    </div>
  );
 
  const NextArrow = ({ onClick }) => (
    <div
      className="next-arrow-box absolute top-1/2 right-[-1rem] transform -translate-y-1/2 bg-gray-800 bg-opacity-20 text-white p-2 rounded-full cursor-pointer z-10"
      onClick={onClick}
    ><i className="fa-solid fa-arrow-right next-arrow"></i>
      {/* <AiOutlineRight size={40} /> */}
    </div>
  );

  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    // autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, 
    nextArrow: <NextArrow />, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          // slidesToShow: Math.min(2, products.length),
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

  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      setTimeout(() => {
        navigate("/auth/signup");
      });
      return;
    }
    console.log("Product added to cart:", product);
    toast("Item Added Successfully");
    dispatch(addToCart(product));
  };

  const handleBuyNow = (product) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/auth/signup");
      return;
    }
    
    // Add to cart first (so it appears on checkout)
    dispatch(addToCart(product));
    
    // Then navigate to checkout
    navigate("/checkout");
  };

  return (
    <div className="w-full p-5 banner-div px-[3.2rem]" >
      <ToastContainer />
      <h1 className="md:text-3xl mb-4 text-black text-center font-semibold">
        {/* Trending Product */}
      </h1>
      <Slider {...settings}>
        {trendingProduct.map((image, id) => (
          <>
           <div key={id} className="banner h-[430px]  p-[5px] overflow-hidden w-[93%] mx-auto cursor-pointer rounded-xl relative group">
              {/* Image */}
              {image.image1 ? (
                  <img 
                    src={image.image1} 
                    alt={image.name ? image.name : "Product Image"} 
                    loading="lazy" 
                    className="banner-image w-full object-cover rounded-xl group-hover:scale-105 duration-300 ease-linear"
                  />
                ) : (
                  <div className="w-full h-[450px] flex items-center justify-center bg-gray-300 text-gray-700 text-lg font-semibold rounded-xl">
                    No Image Available
                  </div>
              )}


              {/* Hover Effects */}
              <div className="absolute top-2 right-2 flex gap-2"></div>
              <div className="absolute w-full h-16 text-black bottom-0 left-0 bg-orange-300 opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-between px-3">
                <button className="py-2 font-semibold" onClick={() => handleBuyNow(image)}>Buy Now</button>
                <div className="flex gap-2">
                  <IoEyeOutline className="cursor-pointer w-7 h-7" />
                  <IoCartOutline
                    className="cursor-pointer w-7 h-7"
                    onClick={() => handleAddToCart(image)}
                  />
                  <IoMdHeartEmpty className="cursor-pointer w-7 h-7" />
                </div>
              </div>

              {/* Rating (Visible on Hover) */}
              <div className="absolute top-3 right-3 bg-orange-300  px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-90 transition-opacity duration-300 ease-in-out flex items-center gap-1">
                4.5 <AiFillStar />
              </div>
            </div>
            {/* Name and Price */}
            {/* <div className="text-center mt-2">
              <h3 className="text-lg font-semibold">{image.name}</h3>
              <p className="text-sm text-gray-600">{image.price}</p>
            </div> */}
          </>
        ))}
      </Slider>
    </div>
  );
};

export default MainCarousel;