import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authenService } from "../services/authenService";

interface LoginRequest {
  email: string;
  password: string;
}

interface AppContextValue {
  user: { token: string; role: string; id: string } | null;
  setUser: (user: { token: string; role: string; id: string } | null) => void;
  login: (loginData: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<{
    token: string;
    role: string;
    id: string;
  } | null>(() => {
    const token = localStorage.getItem("USER");
    const role = localStorage.getItem("ROLE");
    const id = localStorage.getItem("ID");
    return token && role && id ? { token, role, id } : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("USER");
    const role = localStorage.getItem("ROLE");
    const id = localStorage.getItem("ID");

    if (token && role && id) {
      setUser({ token, role, id });
    } else {
      setUser(null);
    }
  }, []);

  const login = async (loginData: LoginRequest) => {
    try {
      const data = await authenService.login(loginData);
      localStorage.setItem("USER", data.token);
      localStorage.setItem("ROLE", data.role);
      localStorage.setItem("ID", data.id);
      setUser({ token: data.token, role: data.role, id: data.id });
      if (data.role === "STAFF") {
        navigate("/admin");
      } else if (data.role === "USER" || data.role === "MENTOR") {
        navigate("/user");
      } else {
        navigate("/auth");
      }
    } catch (err) {
      Swal.fire(
        "Xảy Ra Lỗi",
        "Email hoặc mật khẩu của bạn hiện đang chưa đúng. Vui lòng thử lại.",
        "error"
      );
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authenService.logout();
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
    ["USER", "ROLE", "ID"].forEach((key) => localStorage.removeItem(key));
    setUser(null);
    navigate("/auth");
  };

  const value: AppContextValue = {
    user,
    setUser,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
