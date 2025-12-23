import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../contexts/AppContext";
import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from "react-router-dom";
//import { register } from "module";
import { useSearchContext } from "../../contexts/SearchContext";

type Props = {
  pricePerNight: number;
  hotelId: string;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};
const GuestInfoForm = ({ pricePerNight, hotelId }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  var timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
  var numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      numberOfNights,
      ""
    );

    navigate(`/hotel/${hotelId}/bookings`);
  };
  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      numberOfNights,
      ""
    );
    navigate("/login", { state: { from: location } });
  };

  return (
    <div className="flex flex-col bg-blue-200 gap-4 p-4">
      <h3 className="text=3xl font-bold">${pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr] gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date: Date) => setValue("checkIn", date as Date)}
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white opacity-60 focus:outline-none p-2"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date: Date) => setValue("checkOut", date as Date)}
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full opacity-60 bg-white focus:outline-none p-2"
            />
          </div>
          <div className="flex bg-white px-1 py-1 gap-1 ">
            <label className="flex items-center opacity-40">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
            <label className="items-center flex opacity-50">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.childCount && (
              <span className="text-red-500 font-bold text-sm">
                {errors.childCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl ">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
