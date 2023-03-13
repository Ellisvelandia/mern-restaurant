import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4">
      <div className="flex items-center h-full">
        <Link to="/">
          <div className="h-16">
            <img
              src="https://res.cloudinary.com/dr49dbp8d/image/upload/v1678708164/mern/h-l-restaurant-logo-design-concept-for-food-service-vector-removebg-preview_c3son4.webp"
              alt="logo"
              className="h-full w-28"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
