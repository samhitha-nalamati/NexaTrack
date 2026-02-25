
"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";
import { initialUsers } from "@/lib/data";

interface AuthContextType {
  user: User | null;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const FAKE_USERS = initialUsers.map(user => ({...user, password: "12345678"}));

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("nexatrack-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Could not parse user from session storage", error);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const login = useCallback(async (username: string, pass: string) => {
    setIsAuthLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = FAKE_USERS.find(
      (u) => u.username === username && u.password === pass
    );

    if (foundUser) {
      const { password, ...userToStore } = foundUser;
      setUser(userToStore);
      sessionStorage.setItem("nexatrack-user", JSON.stringify(userToStore));
      setIsAuthLoading(false);
      return true;
    }

    setIsAuthLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("nexatrack-user");
    router.push("/");
  }, [router]);

  const isAuthenticated = !isAuthLoading && !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
