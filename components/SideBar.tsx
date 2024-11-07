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
    <div className="sidebar h-screen sticky top-0 bg-neutral-700 py-3 flex flex-col gap-3 md:px-6">
      <div className="px-3">
        <Link href="/">
          <Image src="/logo-whit.svg" alt="logo" width={80} height={80} />
        </Link>
      </div>
      {domains.map((domain) => {
        const encodedDomainName = encodeURIComponent(domain.name.toLowerCase());
        const isActive =
          pathname === `/domaine/${toCapitalize(encodedDomainName)}`;
        return (
          <div key={domain.name}>
            <Domain
              key={domain.name}
              name={domain.name}
              icon={domain.icon}
              className={isActive ? "bg-accent-dark" : ""}
            />
            {isActive && (
              <div className="flex flex-col pl-9 text-white gap-2 text-lg cursor-pointer">
                <span className=" hover:text-slate-200">Annonce</span>
                <span className=" hover:text-slate-200">Publier</span>
                <span className=" hover:text-slate-200">Mentors</span>
              </div>
            )}
          </div>
        );
      })}
      <div className="mx-3 border-4 rounded-3xl flex items-center justify-center">
        <span className="text-white text-center text-4xl">+</span>
      </div>
    </div>
  );
}
