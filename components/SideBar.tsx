"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Domain from "./Domain";
import { toCapitalize } from "@/app/utils";

export default function SideBar() {
  const pathname = usePathname();

  const domains = [
    { name: "Musique", icon: "/domain/musique.svg" },
    { name: "Mathematiques", icon: "/domain/mathematiques.svg" },
    { name: "Chant", icon: "/domain/chant.svg" },
    { name: "Poésie", icon: "/domain/poesie.svg" },
  ];

  return (
    <aside className="h-screen sticky top-0 bg-slate-900 w-[280px] transition-all duration-300 ease-in-out flex flex-col">
      {/* Logo Section */}
      <div className="px-6 py-5 border-b border-slate-700">
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

      {/* Domains Section */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {domains.map((domain) => {
          const encodedDomainName = encodeURIComponent(
            domain.name.toLowerCase()
          );
          const isActive =
            pathname === `/domaine/${toCapitalize(encodedDomainName)}`;

          return (
            <div key={domain.name} className="group">
              <Domain
                name={domain.name}
                icon={domain.icon}
                className={`transition-all duration-200 ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-slate-800/50"
                }`}
              />

              {isActive && (
                <div className="ml-12 mt-2 space-y-3 border-l-2 border-primary/30 pl-4">
                  <Link href="#" className="block">
                    <span className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                      Annonce
                    </span>
                  </Link>

                  <Link
                    href={`/domaine/${toCapitalize(encodedDomainName)}/publier`}
                  >
                    <span className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                      Publier
                    </span>
                  </Link>

                  <Link href="#" className="block">
                    <span className="text-sm text-slate-300 hover:text-primary transition-colors duration-200">
                      Mentors
                    </span>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Add New Domain Button */}
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
