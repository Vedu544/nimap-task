import React, { useEffect, useState } from "react";
import Navbar from "../components/Nav"
import axios from "axios";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [currentpage, setCurrentPage] = useState(1)
  const [nextPageProductsCount, setNextPageProductsCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  

 
 

  useEffect(() => {
    const fetchProducts = async (currentpage) => {
      console.log(currentpage)
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/products/page/${currentpage}`
        );
        const allProducts = response.data.data[0] || [];
        setProducts(allProducts);
        console.log("Products fetched successfully", response.data);

        const nextPageResponse = await axios.get(
          `/api/v1/products/page/${currentpage + 1}`
        );
        const nextPageProducts = nextPageResponse.data.data[0] || [];
        setNextPageProductsCount(nextPageProducts.length);
        setHasNextPage(nextPageProducts.length > 0);
        
      } catch (err) {
        console.error("Error fetching products", err.response ? err.response.data : err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts(currentpage);
  }, [currentpage]);




  return (
    <>
      <Navbar />
      <h1 className="text-center mt-3 text-3xl font-bold">Discover Your Perfect Phone</h1>

      {loading && (
        <div className="text-center mt-4">
          <span className="text-lg font-semibold text-gray-600">Loading products...</span>
        </div>
      )}

      {error && (
        <div className="text-center mt-4">
          <span className="text-lg font-semibold text-red-500">{error}</span>
        </div>
      )}


      {!loading && !error && (
        <div className="mt-2  p-4 ml-3 mr-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 cursor-pointer">
          {products.length > 0 ? (
            products.map((product) =>
              product && product.id && product.name && product.image ? (
                <div className="img transform transition-transform duration-300 hover:scale-105 border-2 border-pink-500 rounded-2xl p-4" key={product.id}>
                  <img
                    className="rounded-lg overflow-hidden border-blue-600 border-2 h-64 w-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <h1 className="text-lg ml-2 font-bold justify-start mt-2 text-black md:text-2xl lg:text-2xl group-hover:text-white">
                    {product.name}
                  </h1>
                  <h4 className="text-lg ml-2 justify-start mt-1 text-black md:text-2xl lg:text-lg group-hover:text-white">
                    Category - {product.category}
                  </h4>
                </div>
              ) : null
            )
          ) : (
            <div className="text-center mt-4">
              <span className="text-lg font-semibold text-gray-600">No products available.</span>
            </div>
          )}
        </div>
      )}

      <h1 className="text-center font-bold">Current Page  - {currentpage} </h1>
       

      <div className="flex justify-center items-center font-bold gap-1 mb-2 mt-3 ">
        {/* Left Arrow */}
        <h1 
          onClick={() => currentpage > 1 && setCurrentPage(currentpage - 1)} 
          className={currentpage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </h1>

        {/* Current Page Number */}
     
        <h1 className="text-xl mt-[-2px] rounded">{currentpage}</h1>
        
        

        {/* Right Arrow */}
        <h1 
          onClick={() => hasNextPage && setCurrentPage(currentpage + 1)} 
          className={hasNextPage ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </h1>
      </div>
    </>
  );
};

export default Homepage;
