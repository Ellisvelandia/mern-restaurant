import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserNinja } from "react-icons/fa";
import { RiLuggageCartFill } from "react-icons/ri";

const Navlinks = [
  { name: "Home", to: "/" },
  { name: "Menu", to: "/menu" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to="/">
          <div className="h-16">
            <img
              src="https://res.cloudinary.com/dr49dbp8d/image/upload/v1678708164/mern/h-l-restaurant-logo-design-concept-for-food-service-vector-removebg-preview_c3son4.webp"
              alt="logo"
              className="h-full w-28"
            />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="flex items-center gap-4 md:gap-6 text-base md:text-lg">
            {Navlinks.map(({ name, to }) => (
              <Link to={to} key={name + to}>
                <p className="">{name}</p>
              </Link>
            ))}
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <RiLuggageCartFill size={25} />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-center text-sm">
              0
            </div>
          </div>
          <div className="text-2xl text-slate-600">
            <FaUserNinja
              size={25}
              className="cursor-pointer text-3xl"
              onClick={handleShowMenu}
            />
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-4 shadow drop-shadow-md mt-3 text-lg flex flex-col">
                <Link
                  to="/newproduct"
                  className="whitespace-nowrap cursor-pointer"
                >
                  New product
                </Link>
                <Link to="/login" className="whitespace-nowrap cursor-pointer">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
