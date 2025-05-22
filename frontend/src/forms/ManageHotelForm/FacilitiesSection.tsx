import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";
import { useParams } from "react-router-dom";
import * as apiClient from "../../api-client";
import { useQuery } from "@tanstack/react-query";
const FacilitiesSection = () => {
  const { hotelId } = useParams();
  //const [hotelFacilitie, sethotelFacilities] = useState(hotelFacilities);

  // useEffect(() => {
  //   const handleChange = async () => {
  //     if (hotelId) {
  //       const response = await apiClient.fetchHotelById(hotelId);
  //       sethotelFacilities(
  //         hotelFacilities.map((hotelFacility) =>
  //           response.facilities.includes(hotelFacility.name)
  //             ? { ...hotelFacility, checked: true }
  //             : hotelFacility
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
  const { data } = useQuery(
    ["fetchHotelById", hotelId],
    async () => await apiClient.fetchHotelById(hotelId!),
    {
      onSuccess: () => {
        if (data) {
          setValue("facilities", data?.facilities);
        }
      },
      enabled: !!hotelId,
    }
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 ">Facilities</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelFacilities.map((facility) => (
          <label className="text-sm  gap-1 text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
              className="mr-2"
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
