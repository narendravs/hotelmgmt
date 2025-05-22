import { SignInFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import {
  HotelSearchResponse,
  HotelType,
  PaymentIntenResponse,
  UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const login = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      //"content-type": "application/json; charset=UTF-8",
      "access-control-allow-credentials": "true",
    },
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};

export const fetchHotels = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }
  return response.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntenResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(" Error fetching payment intent");
  }
  return response.json();
};

export const fetchCurrentUser = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/users/getme`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const createRoomBooking = async (fromData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${fromData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(fromData),
    }
  );
  if (!response.ok) {
    throw new Error("Error booking room");
  }
  response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) => {
    queryParams.append("facilities", facility);
  });

  searchParams.types?.forEach((type) => {
    queryParams.append("types", type);
  });

  searchParams.stars?.forEach((star) => {
    queryParams.append("stars", star);
  });
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const updateMyHotelById = async (
  hotelFormData: FormData
): Promise<any> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
      mode: "cors",
      headers: {
        //"content-type": "application/json; charset=UTF-8",
        "access-control-allow-credentials": "true",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }
  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchMyBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }
  return response.json();
};
