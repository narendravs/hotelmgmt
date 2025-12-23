import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../api-client";

const DetailsSection = () => {
  const { hotelId } = useParams();
  //const [name, setname] = useState<HotelFormData | any>("");
  // const [city, setcity] = useState<HotelFormData | any>("");
  // const [country, setcountry] = useState<HotelFormData | any>("");
  // const [description, setdescription] = useState<HotelFormData | any>("");
  // const [pricePerNight, setpricePerNight] = useState<HotelFormData | any>("");
  // const [starRating, setstarrating] = useState<HotelFormData | any>("");

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<HotelFormData>();

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ["fetchHotelById"],
    exact: true,
  });

  const { data, isLoading, isFetching, refetch } = useQuery(
    ["fetchHotelById", hotelId],
    async () => await apiClient.fetchHotelById(hotelId!),
    {
      onSuccess: () => {
        if (data) {
          setValue("name", data?.name);
          setValue("city", data?.city);
          setValue("country", data?.country);
          setValue("description", data?.description);
          setValue("pricePerNight", data?.pricePerNight);
          setValue("starRating", data?.starRating);
        }
      },
      enabled: !!hotelId,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  // if (isLoading) return <p>Loading...</p>;
  // if (isFetching) return <p>Fetching...</p>;

  const name = watch("name");
  const city = watch("city");
  const country = watch("country");
  const description = watch("description");
  const starRating = watch("starRating");
  const pricePerNight = watch("pricePerNight");
  // useEffect(() => {
  //   const fetchHotelById = async () => {
  //     const response = await apiClient.fetchHotelById(hotelId);
  //     console.log(response);
  //     setname(response.name);
  //     setcity(response.city);
  //     setcountry(response.country);
  //     setdescription(response.description);
  //     setpricePerNight(response.pricePerNight);
  //     setstarrating(response.starRating);
  //   };
  //   if (hotelId) {
  //     fetchHotelById();
  //   }
  // }, [hotelId]);

  return (
    // <div className="flex flex-col gap-4" onClick={() => refetch()}>
    <div className="flex flex-col gap-4">
      {hotelId ? (
        <h1 className="text-3xl font-bold mb-3">Update Hotel</h1>
      ) : (
        <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      )}

      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded  py-1 px-2 font-normal w-full"
          value={name}
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            value={city}
            {...register("city", { required: "This field is required." })}
          ></input>
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            value={country}
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Description
          <textarea
            rows={10}
            className="border rounded w-full py-1 px-2 font-normal"
            value={description}
            {...register("description", { required: "This field is required" })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
          Price Per Night
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            value={pricePerNight}
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          ></input>
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
          Start Rating
          <select
            {...register("starRating", { required: "This field is required" })}
            className="border rounded w-full p-2 text-gray-700 font-normal"
            value={starRating}
          >
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((num, indx) => (
              <option value={num} key={indx}>
                {num}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
