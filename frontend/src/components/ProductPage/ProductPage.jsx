import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios"; 
import ProductPage from "./Carousel/FiveProduct";
import MainCarousel from "./Carousel/ThreeProduct";

const Home = () => {
  const [searchItems, setSearchItems] = useState("");
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [trending, setTrending] = useState([]); 
  const [filteredTrending, setFilteredTrending] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // 🟢 Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://reto-india-admin-backend.onrender.com/Product"
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  // 🟢 Fetch trending products from API
  const fetchTrending = async () => {
    try {
      const response = await axios.get(
        "https://reto-india-admin-backend.onrender.com/TrendingProduct"
      );
      setTrending(response.data);
      setFilteredTrending(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching trending products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchTrending();
  }, []);

  useEffect(() => {
    if (!searchItems.trim()) {
      setFilteredProducts(products);
      setFilteredTrending(trending);
      return;
    }

    const filtered = products?.filter((item) =>
      item?.title?.toLowerCase().includes(searchItems.toLowerCase())
    );

    const filteredTrend = trending?.filter((item) =>
      item?.name?.toLowerCase().includes(searchItems.toLowerCase())
    );

    setFilteredProducts(filtered);
    setFilteredTrending(filteredTrend);
  }, [searchItems, products, trending]);

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="background pt-[30px] md:pt-[50px] lg:pt-[30px] bg-cover bg-no-repeat bg-center min-h-lvh space-y-10 custom-padding"
  style={{paddingBottom: "4rem"}} 
    >
      {/* 🔎 Search Bar */}
      <div className="w-full flex justify-center items-center">
        <div className="w-full sm:w-4/5 md:w-2/3 lg:w-2/5 flex px-[30px] md:pt-0 relative justify-center">
          <input
            type="text"
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
            className="p-3 w-full rounded-2xl shadow-2xl border-[1px] border-black"
            placeholder="Search for Products"
          />
          <div className="absolute flex right-10 top-4 text-2xl">
            <CiSearch />
          </div>
        </div>
      </div>

      {/* Show loader when data is loading */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Show "No Product Found" only after loading is complete and there are no products */}
          {filteredProducts.length === 0 && filteredTrending.length === 0 ? (
            <p className="text-center text-red-500 text-lg font-semibold">
              No Product Found
            </p>
          ) : (
            <>
              {/* ✅ Product Carousels */}
              <MainCarousel trendingProduct={filteredTrending} />
              <ProductPage products={filteredProducts} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;