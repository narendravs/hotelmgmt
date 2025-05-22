import React, { useContext, useEffect } from "react";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading, data } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} hotel={data} />
    </>
  );
};

export default AddHotel;
