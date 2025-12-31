import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdTravelExplore } from "react-icons/md";
import { useSearchContext } from "../contexts/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize with values from context or defaults
  const [destination, setDestination] = useState<string>(
    search.destination || ""
  );
  const [adultCount, setAdultCount] = useState<number | string>(
    search.adultCount || 1
  );
  const [childCount, setChildCount] = useState<number | string>(
    search.childCount || 0
  );
  const [checkIn, setCheckIn] = useState<Date | null>(search.checkIn || null);
  const [checkOut, setCheckOut] = useState<Date | null>(
    search.checkOut || null
  );

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/my-hotels" ||
      location.pathname === "/my-bookings"
    ) {
      handleClear();
    }
  }, [location.pathname]);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      Number(adultCount) || 1,
      Number(childCount) || 0
    );
    navigate("/search");
  };

  const handleClear = () => {
    setDestination("");
    setAdultCount(1);
    setChildCount(0);
    setCheckIn(null);
    setCheckOut(null);
    search.saveSearchValues("", null as any, null as any, 1, 0);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" container -mt-8 p-3 mx-1 bg-orange-400 rounded shadow-md grid grid-cols-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 p-1 rounded-sm bg-white">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          className="text-md w-full focus:outline-none text-gray-500"
          placeholder="Where are you going ?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="flex bg-white  flex-2 rounded-sm px-2 container">
        <label className="flex items-center text-gray-500 ">
          Adults:
          <input
            className="w-full p-1 h-8 focus:outline-none no-scrollbar text-gray-500"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setAdultCount(isNaN(val) ? "" : val);
            }}
          />
        </label>
        <label className="flex items-center text-gray-500 ">
          Children:
          <input
            className="w-full p-1 h-8 focus:outline-none no-scrollbar text-gray-500"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setChildCount(isNaN(val) ? "" : val);
            }}
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date | null)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="p-1 rounded-sm min-w-full bg-white focus:outline-none text-gray-500"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="z-100">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date | null)}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-1 rounded-sm focus:outline-none text-gray-500"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-1  ">
        <button
          type="submit"
          className="w-1/3 bg-blue-600 p-1 text-white rounded-lg hover:bg-blue-500 "
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="w-2/3 bg-blue-600 p-1 text-white rounded-lg hover:bg-blue-500 "
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
