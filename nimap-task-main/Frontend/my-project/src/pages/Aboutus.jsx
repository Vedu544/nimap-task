import React from "react";
import Navbar from "../components/Nav.jsx";

const Aboutus = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center bg-gray-100 py-10 px-6">
        {/* Header Section */}
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Nimap Infotech!
          </h1>
          <p className="text-gray-700 text-lg">
            Empowering businesses with cutting-edge technology solutions tailored to meet unique needs. Let's build a brighter digital future together!
          </p>
        </div>

        {/* Image and Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-6 mt-10 bg-white shadow-lg rounded-lg p-6 lg:p-10">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqRd_Jrgs8prh9IcOtuyFF7X5LpORR3SjTCrQCWjCaAYf-LaDh1O2oZm-VrQ5TuRs_4ho&usqp=CAU"
              alt="Nimap Infotech"
              className="rounded-lg shadow-md w-full max-w-sm"
            />
          </div>

          {/* Text Content */}
          <div className="lg:ml-8 text-gray-700 text-justify">
            <p className="mb-4 text-lg">
              At <span className="font-semibold text-blue-600">Nimap Infotech</span>, we believe in empowering businesses with innovative technology solutions tailored to their unique needs. Since our inception, we’ve been on a mission to bridge the gap between cutting-edge technology and dynamic business requirements, helping organizations transform and thrive in the digital era.
            </p>
            <p className="mb-4 text-lg">
              With expertise in <span className="font-semibold">custom software development, mobile app development, web development,</span> and <span className="font-semibold">IT outsourcing</span>, we pride ourselves on delivering quality-driven, scalable, and future-ready solutions. Our skilled professionals combine technical expertise with creative thinking to craft solutions that drive growth and ensure success.
            </p>
            <p className="mb-4 text-lg">
              What sets us apart is our unwavering commitment to excellence, transparency, and customer satisfaction. We work closely with our clients as trusted partners, ensuring that every solution aligns perfectly with their business objectives.
            </p>
            <p className="text-lg">
              At Nimap Infotech, innovation isn’t just a buzzword—it’s the core of everything we do. From startups to enterprises, we cater to clients across industries, empowering them with technology to stay ahead of the competition.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
