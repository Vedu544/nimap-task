import React from "react";
import Navbar from "../components/Nav.jsx"
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Category = () => {
  const [products, setProducts] = useState([]);

  //add product pop
  const [AddProductPop, setAddProductPop] = useState(false);

  //delete product pop
  const [deletePop, setDeletePop] = useState(false);

  //Update Product Pop
  const [UpdatePop, setUpdatePop] = useState(false);

  //update and remove products 
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
 
  //get product details by id
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
  });

  const addProduct = async () => {
    const name = document.getElementById("productName").value;
    const category = document.getElementById("productCategory").value;
    const image = document.getElementById("productImg").value;
    const price = document.getElementById("productPrice").value;
    try {
      const response = await axios.post("/api/v1/products/create", {
        name,
        category,
        image,
        price,
      });

      if (response.data.success) {
        console.log("Product added successfully:", response.data.message);
        setAddProductPop(false); // Close the popup
        toast.success("Product added successfully, please refresh")
      } else {
        console.log("Failed to add product:", response.data.message);
        toast.error("Failed to add product")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async () => {
    if (productIdToDelete) {
      try {
        const response = await axios.delete(
          `/api/v1/products/delete/${productIdToDelete}`
        );
        if (response.data.success) {
          console.log("Product deleted successfully");
          setDeletePop(false); // Close the popup
          toast.success("Product deleted successfully, please refresh")
        } else {
          console.log("Failed to delete product");
          toast.error("Failed to delete product")
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No product ID to delete");
    }
  };

  const updateProduct = async () => {
    const name = document.getElementById("updateName").value;
    const category = document.getElementById("updateCategory").value;
    const image = document.getElementById("updateImg").value;
    const price = document.getElementById("updatePrice").value;
    if (productIdToUpdate) {
      try {
        const response = await axios.put(
          `/api/v1/products/update/${productIdToUpdate}`,
          {
            name,
            category,
            image,
            price,
          }
        );
        if (response.data.success) {
          console.log("Product updated successfully");
          setUpdatePop(false); // Close the popup
          toast.success("Product updated successfully, please refresh")
        } else {
          console.log("Product not updated successfully");
          toast.error("Failed to update product")
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  //add product pop
  const handleAddProductClick = () => {
    setAddProductPop(true);
  };
  const closePopup = () => {
    setAddProductPop(false);
  };

  //delete product pop
  const handledeleteProduct = (id) => {
    setProductIdToDelete(id);
    setDeletePop(true);
  };
  const closeDeletePopup = () => {
    setDeletePop(false);
  };

  //Update product
  const handleUpdateProduct = async (id) => {
    try {
      const response = await axios.get(`/api/v1/products/product/${id}`);
      console.log(id);
      console.log(response); // Log the entire response object
      if (response.data.success) {
        const productData = response.data.data[0][0]; // Access the product data correctly

        // Check if productData is defined
        if (productData) {
          setProductDetails({
            name: productData.name,
            category: productData.category,
            image: productData.image,
            price: productData.price,
          });
          setProductIdToUpdate(id); // Set the product ID to update
          setUpdatePop(true); // Open the update popup after setting details
        } else {
          console.log("No product data found.");
        }
      } else {
        console.log("Failed to fetch product details.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closeUpdatePopup = () => {
    setUpdatePop(false);
  };

  //fetch All products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v1/products/all");
        const allProducts = response.data.data[0] || []; 
        setProducts(allProducts);
        console.log("Products fetched successfully", response.data);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  

  return (
    <>
      <Navbar />
      <h1 className="text-center text-gray-900 mt-3 text-2xl">Products Data</h1>

      <div className="flex justify-center items-center mt-3">
        <button
          onClick={handleAddProductClick}
          className="bg-blue-700 text-white p-3 rounded flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Product
        </button>
      </div>

      {AddProductPop && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black p-3 lg:p-0">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h1 className="text-center text-xl">Add New Product</h1>

            <div className="flex mt-5">
              <label className="mr-4 font-bold">Name</label>
              <label className="ml-44 font-bold lg:ml-48">Category</label>
            </div>
            <div className="flex">
              <input
                id="productName"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <select
                id="productCategory"
                className="w-full px-4 py-2 border border-gray-300 rounded ml-4"
                onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="gaming">Gaming</option>
                <option value="premium">Premium</option>
                <option value="midrange">Midrange</option>
                <option value="budget">Budget</option>
              </select>
            </div>

            <div className="flex mt-2">
              <label className="mr-4 font-bold">Image (web Link)</label>
              <label className="ml-24 lg:ml-28 font-bold">Price</label>
            </div>
            <div className="flex">
              <input
                id="productImg"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                id="productPrice"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded ml-4"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={addProduct}
                className="mt-4 text-white p-2 rounded bg-blue-900 "
              >
                Add
              </button>
              <button
                onClick={closePopup}
                className="mt-4 ml-2 text-white p-2 rounded bg-red-700"
              >
                Cancel Add
              </button>
            </div>
          </div>
        </div>
      )}

      {deletePop && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h1 className="text-center text-xl">Delete Product</h1>
            <p className="text-center text-black text-xl mt-3">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center mt-4 gap-3">
              <button
                className="bg-red-500 p-2 rounded text-white"
                onClick={deleteProduct}
              >
                Delete
              </button>
              <button
                className="bg-gray-600 p-2 rounded text-white"
                onClick={closeDeletePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {UpdatePop && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black p-3 lg:p-0">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h1 className="text-center text-xl">Update Product</h1>

            <div className="flex mt-5">
              <label className="mr-4 font-bold">Name</label>
              <label className="lg:ml-48 ml-44 font-bold">Category</label>
            </div>
            <div className="flex">
              <input
                id="updateName"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={productDetails.name}
                onChange={(e) =>
                  setProductDetails({ ...productDetails, name: e.target.value })
                }
              />
              <select
                id="updateCategory"
                className="w-full px-4 py-2 border border-gray-300 rounded ml-4"
                value={productDetails.category}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    category: e.target.value,
                  })
                }
              >
                <option value="">Select Category</option>
                <option value="gaming">Gaming</option>
                <option value="premium">Premium</option>
                <option value="midrange">Midrange</option>
                <option value="budget">Budget</option>
              </select>
            </div>

            <div className="flex mt-2">
              <label className="mr-4 font-bold">Image (web Link)</label>
              <label className="ml-24 lg:ml-28 font-bold">Price</label>
            </div>
            <div className="flex">
              <input
                id="updateImg"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={productDetails.image}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    image: e.target.value,
                  })
                }
              />
              <input
                id="updatePrice"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded ml-4"
                value={productDetails.price}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    price: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={updateProduct}
                className="mt-4 text-white p-2 rounded bg-blue-900 "
              >
                Update
              </button>
              <button
                onClick={closeUpdatePopup}
                className="mt-4 ml-2 text-white p-2 rounded bg-red-700"
              >
                Cancel Update
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center ml-4 mt-6">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 lg:w-auto mb-3">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Category-Id</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.category_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mx-auto"
                      width="100"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleUpdateProduct(product.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handledeleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded lg:ml-2 mt-2 lg:mt-0" 
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Category;
