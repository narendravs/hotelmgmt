import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const { data: hotel } = useQuery(
    ["fetchHotelById"],
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchHotelById", hotelId]);
      showToast({ message: "Error Saving Hotel", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: any) => {
    mutate(hotelFormData);
  };
  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading} hotel={hotel} />
  );
};

export default EditHotel;
