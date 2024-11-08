"use client";
import { useState } from "react";
import { SidebarSubMenuItem } from "./SidebarSubMenuItem";
import { FaBars, FaTimes } from "react-icons/fa";

interface DomainSubmenuProps {
  domainPath: string;
  currentPath: string;
}

const menuItems = [
  {
    href: "annonces",
    label: "Annonces",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
  },
  {
    href: "publier",
    label: "Publier",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    href: "mentors",
    label: "Mentors",
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

export function DomainSubmenu({ domainPath, currentPath }: DomainSubmenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed bottom-10 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menu Container */}
      <div
        className={`
          fixed md:static 
          inset-x-0 bottom-0 
          md:block 
          transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "translate-y-0 z-40"
              : "translate-y-full md:translate-y-0"
          }
          bg-white md:bg-transparent 
          shadow-lg md:shadow-none 
          rounded-t-xl md:rounded-none
        `}
      >
        <div
          className={`
          md:ml-12 mt-2 
          space-y-3 
          border-l-2 border-primary/30 
          pl-4 
          p-4 md:p-0
        `}
        >
          {menuItems.map((item) => (
            <SidebarSubMenuItem
              key={item.href}
              href={`${domainPath}/${item.href}`}
              currentPath={currentPath}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
