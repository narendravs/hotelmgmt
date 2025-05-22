import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config.ts";
import { HotelFormData } from "./ManageHotelForm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../../api-client";

const TypeSection = () => {
  const { hotelId } = useParams();
  //const [hotelType, sethotelTypes] = useState(hotelTypes);
  //const [type, setType] = useState<string | undefined>();

  // useEffect(() => {
  //   const handleChange = async () => {
  //     if (hotelId) {
  //       const response = await apiClient.fetchHotelById(hotelId);
  //       sethotelTypes(
  //         hotelType.map((hotel) =>
  //           hotel.name === response.type
  //             ? { ...hotel, checked: !hotel.checked }
  //             : hotel
  //         )
  //       );
  //     }
  //   };
  //   handleChange();
  // }, [hotelId]);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  const { data } = useQuery(
    ["fetchHotelById", hotelId],
    async () => await apiClient.fetchHotelById(hotelId!),
    {
      onSuccess: () => {
        if (data) {
          setValue("type", data.type);
        }
      },
      enabled: !!hotelId,
      staleTime: 50,
    }
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type, indx) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
            key={indx}
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
              className="mr-2 "
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
