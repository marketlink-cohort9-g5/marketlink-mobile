import apiClient from "./client";
import type { User } from "../types";

export interface LoginCredentials {
  phone: string;
  pin: string;
}

export interface SignupData {
  name: string;
  phone: string;
  email?: string;
  role: User["role"];
  pin: string;
  shopName?: string;
  storeName?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface OtpVerificationData {
  phone: string;
  otp: string;
}

export interface ResetPinData {
  phone: string;
  otp: string;
  newPin: string;
}

// Register a new retailer or wholesaler.
export const signup = async (
  data: SignupData,
): Promise<{ message: string }> => {
  const response = await apiClient.post("/auth/signup", data);

  return response.data;
};

// Log in using phone number and PIN.
export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/login", credentials);

  return response.data;
};

// Verify the OTP sent to the user's phone.
export const verifyOtp = async (
  data: OtpVerificationData,
): Promise<{ message: string }> => {
  const response = await apiClient.post("/auth/verify-otp", data);

  return response.data;
};

// Request an OTP for PIN recovery.
export const requestPinReset = async (
  phone: string,
): Promise<{ message: string }> => {
  const response = await apiClient.post("/auth/request-pin-reset", { phone });

  return response.data;
};

// Reset the user's PIN after OTP verification.
export const resetPin = async (
  data: ResetPinData,
): Promise<{ message: string }> => {
  const response = await apiClient.post("/auth/reset-pin", data);

  return response.data;
};
