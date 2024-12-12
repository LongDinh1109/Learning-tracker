import axios, { AxiosError, AxiosResponse } from "axios";
import { errorHandler } from "../utils/errorHandler";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

interface SignupResponse {
  message: string;
  user: {
    username: string;
    email: string;
  };
}

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type WordPayload = {
  word: string;
  definition: string;
  context: string;
  synonyms: string[];
};

export type Word = WordPayload & {
  _id: string;
};

export type DateOfCheck = {
  date: Date;
  isChecked: boolean;
};

export type WordChecker = {
  word: Word;
  dateOfCheck: {
    first: DateOfCheck;
    third: DateOfCheck;
    seventh: DateOfCheck;
    fourteenth: DateOfCheck;
  };
};

export type UpdateWordsCheckerPayload = {
  wordId: string;
  times: string;
};

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle authentication by storing the token if needed
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to handle login
export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
      "/auth/login",
      payload
    );
    return response.data; // Return data to handle further (e.g., token)
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    if (error instanceof Error) {
      throw new Error("Login failed: " + error.message);
    }
    throw new Error("Login failed: " + error);
  }
};

// Function to handle signup
export const signupUser = async (
  payload: SignupPayload
): Promise<SignupResponse> => {
  try {
    const response: AxiosResponse<SignupResponse> = await axiosInstance.post(
      "/auth/register",
      payload
    );
    return response.data; // Return data (e.g., success message or token)
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Signup failed");
    }
    if (error instanceof Error) {
      throw new Error("Signup failed: " + error.message);
    }
    throw new Error("Signup failed: " + error);
  }
};

export const getWords = async () => {
  try {
    const response: AxiosResponse<Word[]> = await axiosInstance.get("/words");
    return response.data;
  } catch (error) {
    errorHandler(error, "Error fetching words");
  }
};

export const addWord = async (word: WordPayload) => {
  try {
    const response: AxiosResponse<Word> = await axiosInstance.post(
      "/words",
      word
    );
    return response.data;
  } catch (error) {
    errorHandler(error, "Error adding word");
  }
};

export const editWord = async (word: Word) => {
  try {
    const response: AxiosResponse<Word> = await axiosInstance.post(
      `/words/${word._id}`,
      word
    );
    return response.data;
  } catch (error) {
    errorHandler(error, "Error editing word");
  }
};

export const deleteWord = async (id: string) => {
  try {
    const response: AxiosResponse<Word> = await axiosInstance.delete(
      `/words/${id}`
    );
    return response.data;
  } catch (error) {
    errorHandler(error, "Error deleting word");
  }
};

export const getDateChecker = async () => {
  try {
    const response: AxiosResponse<WordChecker[]> =
      await axiosInstance.get("/date-checker");
    return response.data;
  } catch (error) {
    errorHandler(error, "Error fetching date checker");
  }
};

export const updateDateChecker = async (payload: UpdateWordsCheckerPayload) => {
  try {
    const response: AxiosResponse<Response> =
      await axiosInstance.post("/date-checker", payload);
    return response;
  } catch (error) {
    errorHandler(error, "Error fetching date checker");
  }
};
