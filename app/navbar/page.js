"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import logo from "../../public/skillcapital.png";
import Image from "next/image";

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  const isActive = (path) => pathname === path;

  return (
    <nav className="navbar flex items-center justify-between px-6 bg-white shadow-md border-b-2 border-gray-200">
      <Image className="py-2" src={logo} alt="Skill Capital Logo" />
      <div className="flex items-center space-x-8 pt-2">
        {/* <button
          onClick={() => navigateTo("/campaigns")}
          className="hover:border-b-2 hover:border-red-500 pb-4 text-xl "
        >
          Campaigns
        </button> */}
        <button
          onClick={() => navigateTo("/leads")}
          className={`pb-4 text-2xl ${isActive("/leads") ? "border-b-4 border-red-500" : "hover:border-b-2 hover:border-red-500"}`}
        >
          Leads
        </button>
        <button
          onClick={() => navigateTo("/opportunities")}
          className={`pb-4 text-2xl ${isActive("/opportunities") ? "border-b-4 border-red-500" : "hover:border-b-2 hover:border-red-500"}`}
        >
          Opportunities
        </button>
        <button
          onClick={() => navigateTo("/learners")}
          className={`pb-4 text-2xl ${isActive("/learners") ? "border-b-4 border-red-500" : "hover:border-b-2 hover:border-red-500"}`}
        >
          Learners
        </button>
        <button
          onClick={() => navigateTo("/courses")}
          className={`pb-4 text-2xl ${isActive("/courses") ? "border-b-4 border-red-500" : "hover:border-b-2 hover:border-red-500"}`}
        >
          Courses
        </button>
        <button
          onClick={() => navigateTo("/activities")}
          className={`pb-4 text-2xl ${isActive("/activities") ? "border-b-4 border-red-500" : "hover:border-b-2 hover:border-red-500"}`}
        >
          Activities
        </button>
        <button
          onClick={() => navigateTo("/analytics")}
          className={`pb-4 text-2xl ${isActive("/analytics") ? "border-b-4 border-red-500" : "hover:border-b-2 hover:border-red-500"}`}
        >
          Analytics
        </button>
      </div>
      <div className="flex items-center space-x-6">
        <button className="focus:outline-none">
          <FaSearch />
        </button>
        <button className="focus:outline-none">
          <FaBell />
        </button>
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="focus:outline-none"
          >
            <FaUserCircle size={24} />
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2  bg-gray-200 border-gray-600 rounded-xl shadow-lg">
              <button
                onClick={() => navigateTo("/user")}
                className="block  text-left px-4 py-2 text-sm hover:bg-red-200 w-full"
              >
                User
              </button>
              <button
                onClick={handleLogout}
                className="block  text-left px-4 py-2 text-sm hover:bg-red-200 w-full "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
