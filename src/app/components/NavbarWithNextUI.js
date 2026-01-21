"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function NavBarNextUI() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const path = usePathname();

  const navigation = [
    { name: "My CV", href: "/myCv", current: false },
    { name: "Contact Us", href: "/contact", current: false },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="
    sticky top-0 z-50
    bg-white/30 backdrop-blur-md
  "
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navigation.map((item) => (
            <NavbarItem key={item.name}>
              <Link href={item.href}>
                <div
                  className={
                    path === item.href
                      ? "text-gray-900  text-lg font-medium"
                      : "text-gray-400 hover:text-gray-900 text-lg font-medium"
                  }
                >
                  {item.name}
                </div>
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </NavbarContent>
      <NavbarBrand className="flex sm:justify-center">
        <Link href="/">
          <h1 className="text-4xl font-sans text-inherit tracking-tight">
            Flights{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
              Fetch
            </span>
          </h1>
        </Link>
      </NavbarBrand>
      <div className="">
        <ThemeToggle />
      </div>
      <NavbarMenu className="mt-6">
        {navigation.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === navigation.length - 1
                    ? "danger"
                    : "foreground"
              }
              className={
                path === item.href
                  ? "text-gray-900  text-lg font-medium w-full"
                  : "text-gray-400 hover:text-gray-900 text-lg font-medium w-full"
              }
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
