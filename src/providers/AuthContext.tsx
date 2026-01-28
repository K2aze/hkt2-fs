"use client";
import { AuthMeResponse } from "@/types/auth";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface UserType {
  id: number;
  username: string;
  createdAt: string;
  contact: {
    fullName: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    phoneVerified: boolean;
  };
  bookings: {
    total: number;
    new: number;
    scheduled: number;
    contacted: number;
  };
}

export type AuthContextType = {
  user: UserType | null;
  loading: boolean;

  login: (payload: { username: string; password: string }) => Promise<void>;

  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data: AuthMeResponse = await res.json();

      if (!data.user) {
        setUser(null);
        return;
      }

      setUser({
        id: data.user.id,
        username: data.user.username,
        createdAt: data.user.createdAt,
        contact: data.contact!,
        bookings: data.bookings!,
      });
    } finally {
      setLoading(false);
    }
  };

  const login: AuthContextType["login"] = async (payload) => {
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setLoading(false);
      throw new Error("Login failed");
    }

    await checkAuth();
  };

  const logout: AuthContextType["logout"] = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
};
