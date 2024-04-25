"use client";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    signOut();
  };
  return (
    <div>
      {JSON.stringify(user)}
      <button onClick={onClick}>Sign Out</button>
    </div>
  );
};

export default SettingsPage;
