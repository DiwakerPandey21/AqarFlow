"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, pass?: string) => Promise<boolean>;
  logout: () => void;
  switchUser: (role: UserRole) => void;
}

const DEFAULT_ADMIN: User = {
  id: "usr-admin",
  agency_id: "agency-001",
  full_name: "Salman Tariq",
  email: "admin@aqarflow.com",
  phone: "+92 300 8551234",
  role: "agency_admin",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  status: "active",
  created_at: new Date().toISOString()
};

const DEFAULT_AGENT: User = {
  id: "usr-agent-1",
  agency_id: "agency-001",
  full_name: "Ayesha Khan",
  email: "ayesha@aqarflow.com",
  phone: "+92 321 4455667",
  role: "agent",
  avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  status: "active",
  created_at: new Date().toISOString()
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_ADMIN);
  const [token, setToken] = useState<string | null>("usr-admin");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedUserId = localStorage.getItem("aqarflow_user_id");
      if (savedUserId === "usr-agent-1") {
        setUser(DEFAULT_AGENT);
        setToken("usr-agent-1");
      } else {
        setUser(DEFAULT_ADMIN);
        setToken("usr-admin");
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const login = async (email: string, pass?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass || "Password123!" })
      });
      if (!res.ok) {
        setIsLoading(false);
        return false;
      }
      const data = await res.json();
      setUser(data.user);
      setToken(data.access_token);
      localStorage.setItem("aqarflow_user_id", data.user.id);
      setIsLoading(false);
      return true;
    } catch {
      // Offline / fallback login
      if (email.toLowerCase().includes("ayesha") || email.toLowerCase().includes("agent")) {
        setUser(DEFAULT_AGENT);
        setToken(DEFAULT_AGENT.id);
        localStorage.setItem("aqarflow_user_id", DEFAULT_AGENT.id);
      } else {
        setUser(DEFAULT_ADMIN);
        setToken(DEFAULT_ADMIN.id);
        localStorage.setItem("aqarflow_user_id", DEFAULT_ADMIN.id);
      }
      setIsLoading(false);
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem("aqarflow_user_id");
    } catch {
      // ignore
    }
  };

  const switchUser = (targetRole: UserRole) => {
    if (targetRole === "agency_admin") {
      setUser(DEFAULT_ADMIN);
      setToken(DEFAULT_ADMIN.id);
      localStorage.setItem("aqarflow_user_id", DEFAULT_ADMIN.id);
    } else {
      setUser(DEFAULT_AGENT);
      setToken(DEFAULT_AGENT.id);
      localStorage.setItem("aqarflow_user_id", DEFAULT_AGENT.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAdmin: user?.role === "agency_admin",
        login,
        logout,
        switchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
