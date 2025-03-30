import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios"; 
import ProductPage from "./Carousel/FiveProduct";
import MainCarousel from "./Carousel/ThreeProduct";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [allTrending, setAllTrending] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredTrending, setFilteredTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, trendingRes] = await Promise.all([
          axios.get("https://reto-india-admin-backend.onrender.com/Product"),
          axios.get("https://reto-india-admin-backend.onrender.com/TrendingProduct")
        ]);
        
        // Normalize trending products to use 'title' field
        const normalizedTrending = trendingRes.data.map(item => ({
          ...item,
          title: item.name || item.title // Use name if exists, fallback to title
        }));
        
        setAllProducts(productsRes.data);
        setAllTrending(normalizedTrending);
        setFilteredProducts(productsRes.data);
        setFilteredTrending(normalizedTrending);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Update filtered products when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(allProducts);
      setFilteredTrending(allTrending);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    
    setFilteredProducts(
      allProducts.filter(product => 
        product.title?.toLowerCase().includes(searchLower)
      )
    );

    setFilteredTrending(
      allTrending.filter(product => 
        product.title?.toLowerCase().includes(searchLower)
    ));
  }, [searchTerm, allProducts, allTrending]);

  const showNoResults = !isLoading && searchTerm && 
                       filteredProducts.length === 0 && 
                       filteredTrending.length === 0;

  return (
    <div className="background pt-[30px] md:pt-[50px] lg:pt-[30px] bg-cover bg-no-repeat bg-center min-h-lvh space-y-10 custom-padding"
      style={{paddingBottom: "4rem"}} 
    >
      {/* Search Bar */}
      <div className="w-full flex justify-center items-center">
        <div className="w-full sm:w-4/5 md:w-2/3 lg:w-2/5 flex px-[30px] md:pt-0 relative justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 w-full rounded-2xl shadow-2xl border-[1px] border-black"
            placeholder="Search products by title"
          />
          <CiSearch className="absolute right-10 top-4 text-2xl" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {showNoResults && (
            <p className="text-center text-red-500 text-lg font-semibold">
              No products found matching "{searchTerm}"
            </p>
          )}

          {/* Show trending products if they exist */}
          {filteredTrending.length > 0 && (
            <MainCarousel trendingProduct={filteredTrending} />
          )}

          {/* Show regular products if they exist */}
          {filteredProducts.length > 0 && (
            <ProductPage products={filteredProducts} />
          )}
        </>
      )}
    </div>
  );
};

export default Home;