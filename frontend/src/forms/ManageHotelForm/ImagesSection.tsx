import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import React, { useState, useEffect } from "react";

const ImagesSection = () => {
  const { hotelId } = useParams();
  // const [imageUrls, setimageUrls] = useState<string[] | undefined>();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const { data } = useQuery(
    ["fetchHotelById", hotelId],
    async () => await apiClient.fetchHotelById(hotelId!),
    {
      onSuccess: () => {
        if (data) {
          setValue("imageUrls", data?.imageUrls);
        }
      },
      enabled: !!hotelId,
      staleTime: 50,
    }
  );
  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  // useEffect(() => {
  //   const handleChange = async () => {
  //     if (hotelId) {
  //       const response = await apiClient.fetchHotelById(hotelId);
  //       setimageUrls(response.imageUrls);
  //     }
  //   };

  //   handleChange();
  // }, [hotelId]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url, indx) => (
              <div className="relative group" key={indx}>
                <img src={url} className="object-cover min-h-full" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);
              if (totalLength === 0) {
                return "At least one image should be added";
              }
              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
