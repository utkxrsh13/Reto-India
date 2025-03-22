import StarRateIcon from "@mui/icons-material/StarRate";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Product.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/CartSlice";

const ProductView = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  console.log(productId);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <div style={{ fontSize: "30px", right: "10px"}}>&#9654;</div>,
    prevArrow: <div style={{ fontSize: "30px", left: "10px" }}>&#9664;</div>,
  };

  const handleAddToCart = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/auth/signup");
      return;
    }

    console.log("Product added to cart:", product);
    toast("Item added Successfully");
    dispatch(addToCart(product));
  };

  const handleBuyNow = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/auth/signup");
      return;
    }
    
    // Add to cart first (so it appears on checkout)
    dispatch(addToCart(product));
    
    // Then navigate to checkout
  // Use a timeout to ensure Redux state updates before navigating
  setTimeout(() => {
    navigate("/checkout");
  }, 300);
  };

  return (
    <div className="MainPage">
      <div className="ProductPage">
        <div className="ProdSection">
          <Slider {...sliderSettings}>
            {[product.image1, product.image2, product.image3, product.image4, product.image5].map((img, index) => (
              <div key={index} className="ProdSection flex justify-center items-center">
                <img
                  src={img}
                  alt={`product-${index}`}
                  className="w-full h-full object-cover rounded p-2"
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="content_section">
          <div className="content">
            <div id="header">
              <div>
                <div>
                  <h1 className="content_heading">{product.title}</h1>
                  <div className="rating">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarRateIcon
                        key={i}
                        className="RatingStar text-yellow-400"
                      />
                    ))}
                    <p className="rating-text">
                      4 (35)
                    </p>
                  </div>
                </div>

                <div>
                  <h2>
                    INR {product.price} ({product.discount_percentage}% off)
                  </h2>
                  <h2>Offer Price: INR {product.discounted_price}</h2>
                </div>

                <div>
                  <h1 id="description">About this Gem</h1>
                  <div className="prod_description">
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>

              <div className="BtnBar">
                <button onClick={handleAddToCart}>Add to Cart</button>
                {/* <NavLink to="/checkout"> */}
                  <button onClick={handleBuyNow}>Buy Now</button>
                {/* </NavLink> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <Review />
      </div> */}
    </div>
  );
};

export default ProductView;