import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import "../../index.css";
import { Link } from 'react-scroll';
import Logo from "../../assets/logo.png"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="absolute h-20 w-full max-w-6xl mx-auto px-8 flex items-center  justify-start  gap-32   bg-transparent top-0 z-30 font-bold "  >
      <img src={Logo} alt="Logo" className="h-12 w-12 object-fill " />

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 ">
        <Link
          to="intro"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="text-white cursor-pointer hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1 "
        >
          Home
        </Link>

        <Link
          to="lobby"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          className="text-white cursor-pointer hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1"
        >
          Lobby
        </Link>
        <Link
          to="location"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          className="text-white cursor-pointer hover:text-yellow-400 hover:border-b-2 border-yellow-400 pb-1"
        >
          Location
        </Link>

      </div>


      {/* Mobile Menu Icon */}
      <IoMdMenu
        className="md:hidden h-7 w-7 text-white cursor-pointer right-16 absolute"
        onClick={() => setShowMenu(!showMenu)}
      />

      {/* Mobile Menu */}
      <div
        className={`absolute top-12 right-3  text-white p-4 rounded-lg flex flex-col space-y-4 md:hidden transition-transform duration-300 ${
          showMenu ? "flex" : "hidden"
        }`}
      >
        <Link
          to="intro"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="cursor-pointer hover:text-yellow-400"
          onClick={() => setShowMenu(false)}
        >
          Home
        </Link>
        <Link
          to="lobby"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          className="cursor-pointer hover:text-yellow-400"
          onClick={() => setShowMenu(false)}
        >
          Lobby
        </Link>
        <Link
          to="location"
          spy={true}
          smooth={true}
          offset={100}
          duration={500}
          className="cursor-pointer hover:text-yellow-400"
          onClick={() => setShowMenu(false)}
        >
          Location
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
