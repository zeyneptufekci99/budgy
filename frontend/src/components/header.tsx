"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-provider";

export type HeaderProps = {
  title: string;
};

type User = {
  name: string;
  email: string;
};

export const Header = ({ title }: HeaderProps) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="py-4 px-4 font-bold bg-chart-1/50 border-b shadow-sm border-border flex items-center justify-between">
      <h1 className="text-foreground font-semibold text-lg">{title}</h1>

      <div className="flex items-center gap-4">
        {user && <span className="text-sm font-medium">{user.name}</span>}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};
