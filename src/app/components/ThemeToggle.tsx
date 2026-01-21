"use client";

import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const buttons = [
    { id: "light", icon: <Sun size={18} />, label: "Light" },
    { id: "dark", icon: <Moon size={18} />, label: "Dark" },
    { id: "system", icon: <Laptop size={18} />, label: "System" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full border bg-background my-2 p-1 shadow-sm">
      {buttons.map((btn) => (
        <button
          key={btn.id}
          onClick={() => setTheme(btn.id)}
          className={`
            flex items-center gap-1 px-3 py-1.5 rounded-full text-sm
            transition-all duration-300
            ${
              theme === btn.id
                ? "bg-primary text-primary-foreground shadow"
                : "hover:bg-muted"
            }
          `}
        >
          {btn.icon}
          <span className="hidden sm:inline">{btn.label}</span>
        </button>
      ))}
    </div>
  );
}
