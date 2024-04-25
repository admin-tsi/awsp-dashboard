"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    signOut();
  };
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
