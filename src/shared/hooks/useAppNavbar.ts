import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useAppNavbar = () => {
  //* States
  const [isOpen, setIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { user, logout } = useAuth();

  //* Handlers
  const handleLogout = async () => {
    const error = await logout();
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Session closed successfully");
  };

  return {
    isOpen,
    confirmOpen,
    isAuthenticated: !!user,
    setIsOpen,
    setConfirmOpen,
    handleLogout,
  };
};
