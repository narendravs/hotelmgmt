import React, { FormEventHandler, HtmlHTMLAttributes, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";

const SearchBar = () => {
  const [destination, setDestination] = useState();
  const [adultCount, setAdultCount] = useState();
  const [childCount, setChildCount] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();

  const minDate = new Date();
  const maxDate = new Date();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" container -mt-8 p-3 mx-1 bg-orange-400 rounded shadow-md grid grid-cols-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 p-1 rounded-sm bg-white">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          className="text-md w-full focus:outline-none"
          placeholder="Where are you going ?"
          value={destination}
          onChange={(e) => setDestination(e.target.value as any)}
        />
      </div>
      <div className="flex bg-white  flex-2 rounded-sm px-2 container">
        <label className="flex items-center">
          Adults:
          <input
            className="w-full p-1 h-25 focus:outline-none font-bold no-scrollbar"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => {
              setAdultCount(e.target.value as any);
            }}
          />
        </label>
        <label className="flex items-center">
          Children:
          <input
            className="w-full p-1 h-25 focus:outline-none font-bold no-scrollbar"
            type="number"
            min={1}
            max={20}
            value={childCount}
            onChange={(e) => {
              setChildCount(e.target.value as any);
            }}
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date: Date) => {
            setCheckIn(date as any);
          }}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="p-1 rounded-sm min-w-full bg-white focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date: Date) => setCheckOut(date as any)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-1 rounded-sm focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-1  ">
        <button className="w-1/3 bg-blue-600 p-1 text-white rounded-lg hover:bg-blue-500 ">
          Search
        </button>
        <button className="w-2/3 bg-blue-600 p-1 text-white rounded-lg hover:bg-blue-500 ">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
