import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-900 text-white">
      <div className="flex justify-between">
        {/* //website name   */}
        <NavLink to={"/"} className=" mt-2 ml-5 mb-2">
          <h1 className=" text-lg lg:text-2xl font-bold">NIMAP CART</h1>
        </NavLink>

        <div className="flex justify-end gap-2">
          <div className="flex items-center mr-6">
            <NavLink to={"/category"}>
              <div>
                <h2 className="text-sm font-bold lg:text-xl">Product-Manage</h2>
              </div>
            </NavLink>

            <NavLink to={"/category-manage"}>
              <div>
                <h2 className="text-sm font-bold  ml-10 lg:text-lg">
                  Category-Manage
                </h2>
              </div>
            </NavLink>
          </div>
          <div className="flex items-center mr-6">
            <NavLink to={"/about-us"}>
              <div>
                <h2 className="text-sm font-bold lg:text-xl">About-us</h2>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
