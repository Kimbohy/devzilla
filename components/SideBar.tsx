"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toCapitalize } from "@/app/utils";
import Domain from "./Domain";
import { DomainSubmenu } from "./DomainSubmenu";

const domains = [
  { name: "Musique", icon: "/domain/musique.svg" },
  { name: "Mathematiques", icon: "/domain/mathematiques.svg" },
  { name: "Chant", icon: "/domain/chant.svg" },
  { name: "Poésie", icon: "/domain/poesie.svg" },
] as const;

export default function SideBar() {
  const pathname = usePathname();

  const isDomainActive = (domainName: string) => {
    const encodedName = toCapitalize(
      encodeURIComponent(domainName.toLowerCase())
    );
    return pathname?.startsWith(`/domaine/${encodedName}`) ?? false;
  };

  return (
    <aside className="h-screen sticky top-0 bg-slate-900 transition-all duration-300 ease-in-out flex flex-col md:w-[280px] w-16">
      {/* Logo Section */}
      <div className="flex items-center justify-between px-3 md:px-6 py-5 border-b border-slate-700">
        <Link href="/" className="block">
          <Image
            src="/logo-whit.svg"
            alt="logo"
            width={80}
            height={80}
            className="hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      {/* Domains Navigation */}
      <nav className="flex-1 overflow-y-auto px-1 md:px-4 py-6 space-y-2">
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
                isOnSideBar={true}
                className={`transition-all duration-200 rounded-sm ${
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

      {/* Search Button */}
      <div className="md:p-2 mx-2 mb-4">
        <Link
          href="/search"
          className="group flex items-center space-x-3 px-3 py-2 text-white bg-slate-800/50 transition-all duration-200 rounded-md hover:bg-slate-800"
        >
          <svg
            className="w-6 h-6 text-gray-400 group-hover:text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="hidden md:block">Search</span>
        </Link>
      </div>

      {/* Create Button */}
      <div className=" px-2 md:px-4 pb-6">
        <Link
          href="/create"
          className="w-full group px-4 py-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-200 flex items-center justify-center"
        >
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
        </Link>
      </div>
    </aside>
  );
}
