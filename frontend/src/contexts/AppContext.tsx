import React, { useContext, useState, useEffect } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import Toast from "../components/Toast";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  stripePromise: Promise<Stripe | null>;
};
const AppContext = React.createContext<AppContext>({
  showToast: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  stripePromise: loadStripe(STRIPE_PUB_KEY),
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let renderCount = 0;
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const stripePromise = loadStripe(STRIPE_PUB_KEY);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/auth/validate-token`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          setIsLoggedIn(true);
        }
      } catch (e) {
        setIsLoggedIn(false);
      }
    };
    validateToken();
  }, [isLoggedIn]);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn,
        setIsLoggedIn,
        stripePromise,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
