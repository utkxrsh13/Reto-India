import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import './orderPage.css';

const OrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCartItem, setSelectedCartItem] = useState(null);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          console.error("No token found. User not authenticated.");
          setLoading(false);
          return;
        }

        const response = await axios.get("https://reto-india-backend.onrender.com/OrderPage", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setOrders(response.data);

        if (response.data.length > 0 && response.data[0].cartItems.length > 0) {
          setSelectedCartItem(response.data[0].cartItems[0]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate total quantity and price
  const totalQuantity = orders.reduce(
    (acc, order) => acc + order.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    0
  );
  
  const totalPrice = orders.reduce(
    (acc, order) => acc + order.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    0
  );

  const handleRowClick = (cartItem) => {
    setSelectedCartItem(cartItem);
  };

  const handleContinueShopping = () => {
    navigate("/product");
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div 
      className="order-page-container py-10 min-h-screen"
      style={{
        background: "linear-gradient(462deg, #fdf2e3 51%, #ffd39c 70%)",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          My Orders
        </h2>
        
        <div className="empty-order">
          {/* Cart Items Section */}
          <div className="cart-items-container">
            {orders.length === 0 ? (
              <div className="empty-cart-message">
                <p className="msg text-3xl max-md:text-2xl">
                  Please Add Items to the cart
                </p>
                <NavLink 
                  to="/product" 
                  className="px-4 py-3 rounded-[2rem] border border-orange-500 bg-orange-300 text-white font-semibold shadow-lg shadow-orange-400 transition-transform duration-200 ease-linear hover:bg-orange-400 hover:scale-105"
                >
                  Continue Shopping
                </NavLink>
              </div>
            ) : (
              <>
                <div className="table-container">
                  <table className="order-table">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="p-2">Product</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) =>
                        order.cartItems.map((cartItem, index) => (
                          <tr
                            key={`${order._id}-${index}`}
                            onClick={() => handleRowClick(cartItem)}
                            className={selectedCartItem?._id === cartItem._id ? "selected-row" : ""}
                          >
                            <td className="px-4 py-4">
                              <div className="product-cell">
                                <img
                                  src={cartItem.image1}
                                  alt={cartItem.title}
                                  className="product-image"
                                />
                                <h3 className="text-sm font-medium text-gray-800">
                                  {cartItem.title}
                                </h3>
                              </div>
                            </td>
                            <td className="p-2 text-sm text-gray-700">
                              Qty: {cartItem.quantity}
                            </td>
                            <td className="p-2 text-sm text-gray-700">
                              ${cartItem.price}
                            </td>
                            <td className="p-2 text-sm text-gray-700">
                              ${(cartItem.price * cartItem.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={handleContinueShopping}
                    className="continue-shopping-btn"
                  >
                    <FaArrowLeftLong />
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Order Summary Section */}
          {orders.length > 0 && (
            <div className="order-summary-container">
              <div className="summary-content">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-item">
                  <span className="text-sm font-medium text-gray-600">Order ID:</span>
                  <span className="text-sm font-medium text-gray-800">
                    {selectedCartItem ? selectedCartItem.itemId : "#2312343"}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="text-sm font-medium text-gray-600">Delivery Status:</span>
                  <span className="text-sm font-medium text-gray-800">
                    {selectedCartItem ? selectedCartItem.Status : "Delivered"}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="text-sm font-medium text-gray-600">Payment Method:</span>
                  <span className="text-sm font-medium text-gray-800">Online</span>
                </div>
                <div className="summary-item">
                  <span className="text-sm font-medium text-gray-600">Date:</span>
                  <span className="text-sm font-medium text-gray-800">
                    {orders.length > 0 ? new Date(orders[0].createdAt).toLocaleDateString() : "01/01/2025"}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="text-sm font-medium text-gray-600">Delivery Address:</span>
                  <span className="text-sm text-right font-medium text-gray-800">
                    {orders.length > 0 ? orders[0].address : "247,Aagman Society, Surat"}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="text-sm font-medium text-gray-600">Total Items:</span>
                  <span className="text-sm font-medium text-gray-800">
                    {selectedCartItem ? selectedCartItem.quantity : totalQuantity}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="text-sm font-medium text-gray-600">Total Price:</span>
                  <span className="text-sm font-medium text-gray-800">
                    ${selectedCartItem
                      ? (selectedCartItem.price * selectedCartItem.quantity).toFixed(2)
                      : totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="text-sm font-medium text-gray-600">Shipping Charge:</span>
                  <span className="text-sm font-medium text-gray-800">$5.00</span>
                </div>

                <div className="border-t border-gray-400 pt-4 mt-4">
                  <div className="summary-item">
                    <span className="text-sm font-medium text-gray-600">Total Cost:</span>
                    <span className="text-sm font-medium text-gray-800">
                      ${selectedCartItem
                        ? (selectedCartItem.price * selectedCartItem.quantity + 5).toFixed(2)
                        : (totalPrice + 5).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;