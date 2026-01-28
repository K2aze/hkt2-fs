"use client";
import { useAuth } from "@/providers/AuthContext";

const LogoutBtn = () => {
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
  };
  return <button onClick={handleClick}>Logout</button>;
};

export default LogoutBtn;
