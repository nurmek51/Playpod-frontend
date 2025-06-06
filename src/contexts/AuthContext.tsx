import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, refreshToken, fetchUserProfile } from "../api/authService";

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  description?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing tokens on mount
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshTokenValue = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshTokenValue) {
        setIsLoading(false);
        return;
      }

      try {
        // Try to fetch user profile with existing token
        const userProfile = await fetchUserProfile();
        setUser(userProfile);
        setIsAuthenticated(true);
      } catch (error) {
        // If the access token is invalid, try to refresh it
        try {
          await refreshToken();
          const userProfile = await fetchUserProfile();
          setUser(userProfile);
          setIsAuthenticated(true);
        } catch (refreshError) {
          // If refresh fails, clear tokens
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { accessToken, refreshTokenValue } = await loginUser(email, password);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshTokenValue);
      
      const userProfile = await fetchUserProfile();
      setUser(userProfile);
      setIsAuthenticated(true);
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await registerUser(username, email, password);
      // Automatically login after successful registration
      await login(email, password);
    } catch (error) {
      setError("Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      // In a real app, call API endpoint
      // await api.put('/users/profile', userData);
      
      // For demo, just update the local state
      setUser(prevUser => prevUser ? {...prevUser, ...userData} : null);
      
      // Update localStorage
      if (user) {
        localStorage.setItem('user', JSON.stringify({...user, ...userData}));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Auth context value
  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
