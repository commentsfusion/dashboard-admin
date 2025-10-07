"use client";
import { FiSearch, FiSidebar } from "react-icons/fi"; // Edit and View icons
import { FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

// Example blog posts data


export default function Header() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center flex-1 gap-3">
                <FiSidebar size={20} className="block md:hidden" />
    
                {/* Search Bar */}
                <div className="flex items-center w-full sm:w-[350px] border rounded-lg px-3 py-1 shadow-sm bg-white">
                  <FiSearch className="text-gray-500 mr-2" size={14} />
                  <input
                    type="text"
                    placeholder="Search dashboard..."
                    className="w-full text-gray-700 outline-none"
                  />
                </div>
              </div>
    
              {/* Right Section: Icons */}
              <div className="flex gap-5">
                <IoMdNotificationsOutline size={22} />
                <FiUser size={20} />
              </div>
            </div>
    
            <hr className="mt-3" /></>
  );
}
