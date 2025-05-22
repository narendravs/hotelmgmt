import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import { useEffect, useState } from "react";
const GuestsSection = () => {
  const { hotelId } = useParams();

  // const [adultCount, setadultCount] = useState<number | undefined>();
  // const [childCount, setchildCount] = useState<number | undefined>();

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const { data } = useQuery(
    ["fetchHotelById", hotelId],
    async () => await apiClient.fetchHotelById(hotelId!),
    {
      onSuccess: () => {
        setValue("adultCount", data?.adultCount || parseInt("0"));
        setValue("childCount", data?.childCount || parseInt("0"));
      },
      enabled: !!hotelId,
    }
  );

  // useEffect(() => {
  //   const fetchHotelById = async () => {
  //     const response = await apiClient.fetchHotelById(hotelId);
  //     setadultCount(response.adultCount);
  //     setchildCount(response.childCount);
  //   };
  //   if (hotelId) {
  //     fetchHotelById();
  //   }
  // }, [hotelId]);
  const adultCount = watch("adultCount");
  const childCount = watch("childCount");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300 ">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            className="border rounded w-full py-2 px-3 font-normal "
            type="number"
            value={adultCount}
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            value={childCount}
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
