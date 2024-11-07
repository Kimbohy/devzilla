// components/SideBar.tsx
"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toCapitalize } from "@/app/utils";
import Domain from "./Domain";
import { DomainSubmenu } from "./DomainSubmenu";
import { useState } from "react";

const domains = [
  { name: "Musique", icon: "/domain/musique.svg" },
  { name: "Mathematiques", icon: "/domain/mathematiques.svg" },
  { name: "Chant", icon: "/domain/chant.svg" },
  { name: "Poésie", icon: "/domain/poesie.svg" },
] as const;

export default function SideBar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isDomainActive = (domainName: string) => {
    const encodedName = toCapitalize(
      encodeURIComponent(domainName.toLowerCase())
    );
    return pathname?.startsWith(`/domaine/${encodedName}`) ?? false;
  };

  return (
    <aside
      className={`h-screen sticky top-0 bg-slate-900 transition-all duration-300 ease-in-out flex flex-col
        ${isCollapsed ? "w-20" : "w-[280px]"}`}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
        <Link href="/" className="block">
          <Image
            src="/logo-whit.svg"
            alt="logo"
            width={isCollapsed ? 40 : 80}
            height={isCollapsed ? 40 : 80}
            className="hover:opacity-90 transition-opacity"
          />
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isCollapsed ? "M13 5l7 7-7 7" : "M11 19l-7-7 7-7"}
            />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {domains.map((domain) => {
          const encodedDomainName = encodeURIComponent(
            domain.name.toLowerCase()
          );
          const isActive = isDomainActive(domain.name);
          const domainPath = `/domaine/${toCapitalize(encodedDomainName)}`;

          return (
            <div key={domain.name} className="group">
              <Domain
                name={domain.name}
                icon={domain.icon}
                // isCollapsed={isCollapsed}
                className={`transition-all duration-200 ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-slate-800/50"
                }`}
              />
              {isActive && (
                <DomainSubmenu
                  domainPath={domainPath}
                  currentPath={pathname || ""}
                />
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-4 pb-6">
        <button className="w-full group relative px-4 py-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-200">
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </span>
          <span className="ml-8 text-primary text-sm font-medium">
            Ajouter un domaine
          </span>
        </button>
      </div>
    </aside>
  );
}
