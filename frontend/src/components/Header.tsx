import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
const Header = () => {
  const [isLoggedIn, setstate] = useState(true);
  return (
    <div className="bg-blue-800 py-6 mx-1 rounded-sm">
      <div className="container m-auto flex justify-between items-center">
        <span className=" text-white text-xs font-bold tracking-tight hover:text-yellow-400">
          <Link to="/"> MernHolidays.com </Link>
        </span>
        {isLoggedIn ? (
          <>
            <Link
              className="flex items-center text-xs text-white font-roboto  hover:bg-blue-600 rounded-lg p-1 hover:text-yellow-400"
              to="/my-bookings"
            >
              My Bookings
            </Link>
            <Link
              className="flex items-center text-xs text-white font-roboto hover:bg-blue-600 rounded-lg p-1 hover:text-yellow-400"
              to="/my-hotels"
            >
              My Hotels
            </Link>
            <SignOutButton />
          </>
        ) : (
          <Link
            className="flex bg-white text-blue-600 rounded-lg p-1 text-xs ffont-roboto hover:text-yellow-400"
            to="/login"
          >
            Sign-in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
