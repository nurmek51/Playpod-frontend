
import axiosInstance from "./axiosConfig";

interface LoginResponse {
  access: string;
  refresh: string;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/api/accounts/token/", {
      email,
      password,
    });
    
    return {
      accessToken: response.data.access,
      refreshTokenValue: response.data.refresh,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    await axiosInstance.post("/api/accounts/register/", {
      username,
      email,
      password,
    });
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const refreshTokenValue = localStorage.getItem("refreshToken");
    if (!refreshTokenValue) {
      throw new Error("No refresh token available");
    }
    
    const response = await axiosInstance.post<{ access: string }>("/api/accounts/token/refresh/", {
      refresh: refreshTokenValue,
    });
    
    localStorage.setItem("accessToken", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.get<UserProfile>("/api/accounts/me/");
    return response.data;
  } catch (error) {
    console.error("Fetch user profile error:", error);
    throw error;
  }
};

export const updateUserProfile = async (userData: Partial<UserProfile>) => {
  try {
    const response = await axiosInstance.put<UserProfile>("/api/accounts/me/update/", userData);
    return response.data;
  } catch (error) {
    console.error("Update user profile error:", error);
    throw error;
  }
};

export const uploadAvatar = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);
    
    const response = await axiosInstance.post("/api/accounts/me/avatar/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Upload avatar error:", error);
    throw error;
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/api/accounts/users/${userId}/`);
    return response.data;
  } catch (error) {
    console.error(`Get user ${userId} error:`, error);
    throw error;
  }
};
