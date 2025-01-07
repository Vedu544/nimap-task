import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./global.css";
import Homepage from "./pages/Homepage";
import Category from "./pages/Category";
import Aboutus from "./pages/Aboutus";
import axios from "axios";
import Layout from "./components/Layout";
import CategoryManage from "./pages/CategoryManage";
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("Axios Base URL:", axios.defaults.baseURL);
axios.defaults.withCredentials = true;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />

        {/* //category Page */}
        <Route path="/category" element={<Category />} />

        <Route path="/category-manage" element={<CategoryManage />} />

        {/* //about-us page */}
        <Route path="/about-us" element={<Aboutus />} />
      </Route>
    </Routes>
  );
}

export default App;
