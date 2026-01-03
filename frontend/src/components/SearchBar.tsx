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
    // Define where the search SHOULD persist
    const PERSISTENT_ROUTES = ["/search"];
    const shouldPersist = PERSISTENT_ROUTES.some((route) =>
      location.pathname.startsWith(route)
    );

    if (!shouldPersist) {
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
      Number(childCount) || 0,
      0
    );
    navigate("/search");
  };

  const handleClear = () => {
    setDestination("");
    setAdultCount(1);
    setChildCount(0);
    setCheckIn(null);
    setCheckOut(null);
    search.saveSearchValues("", null as any, null as any, 1, 0, 0);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 md:-mt-10 p-3 bg-orange-400 rounded shadow-md grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-center gap-3"
    >
      {/* Destination */}
      <div className="flex flex-row items-center p-1 rounded-sm bg-white">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          className="text-md w-full focus:outline-none text-gray-600 placeholder:text-gray-400"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {/* Guests */}
      <div className="flex items-center justify-between gap-2 bg-white p-1 rounded-sm ">
        <label className="flex items-center gap-2 text-gray-600">
          <span className="whitespace-nowrap">Adults:</span>
          <input
            className="w-full text-center focus:outline-none no-scrollbar text-gray-700"
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
        <label className="flex items-center gap-2 text-gray-600">
          <span className="whitespace-nowrap">Children:</span>
          <input
            className="w-full  text-center focus:outline-none no-scrollbar text-gray-700"
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

      {/* Check-in */}
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
          className="p-1 rounded-sm w-full bg-white focus:outline-none text-gray-700 placeholder:text-gray-400"
          wrapperClassName="w-full"
        />
      </div>

      {/* Check-out */}
      <div className="z-10">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date | null)}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="w-full bg-white p-1 rounded-sm focus:outline-none text-gray-700 placeholder:text-gray-400"
          wrapperClassName="w-full"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 p-1 text-white rounded-lg hover:bg-blue-500"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 bg-blue-600 p-1 text-white rounded-lg hover:bg-blue-500"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
