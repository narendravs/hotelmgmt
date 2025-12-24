import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?: any;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};
const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  //const { showToast } = useAppContext();
  const formMethods = useForm<HotelFormData>({ defaultValues: hotel });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = formMethods;

  // This Effect ensures the form populates when the hotel data arrives
  useEffect(() => {
    if (hotel) {
      reset(hotel);
    }
  }, [hotel, reset]);
  // useEffect(() => {
  //   reset();
  // }, [isSubmitSuccessful, reset]);

  // const { mutate } = useMutation(apiClient.updateMyHotelById, {
  //   onSuccess: () => {
  //     showToast({ message: "Hotel Saved!", type: "SUCCESS" });
  //   },
  //   onError: () => {
  //     showToast({ message: "Error Saving Hotel", type: "ERROR" });
  //   },
  // });

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);

    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility) => {
      formData.append(`facilities`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url) => {
        formData.append(`imageUrls`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });
    // if (hotelId) {
    //   mutate(formData);
    // } else {
    //   onSave(formData);
    // }
    onSave(formData);
    navigate("/add-hotel");
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-1 px-2 flex items-center justify-center font-bold rounded-lg hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {hotelId ? (
              <button className="p-1 flex justify-center items-center">
                Update
              </button>
            ) : isLoading ? (
              "Saving..."
            ) : (
              "Save"
            )}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
