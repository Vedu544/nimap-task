import React, { useEffect, useState } from 'react';
import Navbar from '../components/Nav';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [AddCategoryPop, setAddCategoryPop] = useState(false);
  const [deletePop, setDeletePop] = useState(false);
  const [UpdatePop, setUpdatePop] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [categoryIdToUpdate, setCategoryIdToUpdate] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState({ name: "" });

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/v1/categories/");
      setCategories(response.data.data[0]);
      console.log(response.data.data[0])
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  };

  const addCategory = async () => {
    const name = document.getElementById("categoryName").value;
    try {
      const response = await axios.post("/api/v1/categories/create", { name });
      if (response.data.success) {
        toast.success("Category added successfully");
        setAddCategoryPop(false);
        fetchCategories();
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async () => {
    if (categoryIdToDelete) {
      try {
        const response = await axios.delete(`/api/v1/categories/delete/${categoryIdToDelete}`);
        if (response.data.success) {
          toast.success("Category deleted successfully");
          setDeletePop(false);
          fetchCategories();
        } else {
          toast.error("Failed to delete category");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateCategory = async () => {
    const name = document.getElementById("updateCategoryName").value;
    if (categoryIdToUpdate) {
      try {
        const response = await axios.put(`/api/v1/categories/update/${categoryIdToUpdate}`, { name });
        if (response.data.success) {
          toast.success("Category updated successfully");
          setUpdatePop(false);
          fetchCategories();
        } else {
          toast.error("Failed to update category");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddCategoryClick = () => {
    setAddCategoryPop(true);
  };

  const handleUpdateCategory = async (id) => {
    try {
      const response = await axios.get(`/api/v1/categories/category/${id}`);
      if (response.data.success) {
        const category = response.data.data[0][0]; // Adjust indexing based on your backend's response
        if (category) {
          setCategoryDetails({ name: category.name }); // Set the state with the category name
          setCategoryIdToUpdate(id);
          setUpdatePop(true); 
        } else {
          console.error("Category not found in the response.");
        }
      }
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };
  
  
  useEffect(() => {
    fetchCategories();
  }, []);



  return (
    <>
      <Navbar />
      <h1 className="text-center text-gray-900 mt-3 text-2xl">Categories Management</h1>

      <div className="flex justify-center items-center mt-3">
        <button onClick={handleAddCategoryClick} className="bg-blue-700 text-white p-3 rounded">
          Add New Category
        </button>
      </div>

      {AddCategoryPop && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h1 className="text-center text-xl">Add New Category</h1>
            <input id="categoryName" type="text" placeholder="Category Name" className="w-full px-4 py-2 border border-gray-300 rounded mt-2" />
            <div className="flex justify-center items-center">
              <button onClick={addCategory} className="mt-4 text-white p-2 rounded bg-blue-900">Add</button>
              <button onClick={() => setAddCategoryPop(false)} className="mt-4 ml-2 text-white p-2 rounded bg-red-700">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deletePop && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h1 className="text-center text-xl">Delete Category</h1>
            <p className="text-center text-black text-xl mt-3">Are you sure you want to delete this category?</p>
            <div className="flex justify-center mt-4 gap-3">
              <button className="bg-red-500 p-2 rounded text-white" onClick={deleteCategory}>Delete</button>
              <button className="bg-gray-600 p-2 rounded text-white" onClick={() => setDeletePop(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {UpdatePop && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h1 className="text-center text-xl">Update Category</h1>
            <label htmlFor="updateCategoryName" className="block text-gray-700 mt-2">Category Name</label>
            <input id="updateCategoryName" type="text" value={categoryDetails.name} onChange={(e) => setCategoryDetails({ name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded" />
            <div className="flex justify-center items-center">
              <button onClick={updateCategory} className="mt-4 text-white p-2 rounded bg-blue-900">Update</button>
              <button onClick={() => setUpdatePop(false)} className="mt-4 ml-2 text-white p-2 rounded bg-red-700">Cancel</button>
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
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">{category.id}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{category.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button onClick={() => handleUpdateCategory(category.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                    <button onClick={() => { setCategoryIdToDelete(category.id); setDeletePop(true); }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
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

export default CategoryManage;