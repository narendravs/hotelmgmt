import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const SignOutButton = () => {
  const { showToast, setIsLoggedIn } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["validateToken"]);
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      setIsLoggedIn(false);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="flex items-center p-1 text-blue-600 text-xs font-roboto bg-white rounded-lg hover:text-yellow-400"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
