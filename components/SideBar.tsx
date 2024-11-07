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
    <div className="sidebar h-screen relative bg-neutral-700 py-3 flex flex-col gap-3 md:px-6 w-1/4">
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
          <Domain
            key={domain.name}
            name={domain.name}
            icon={domain.icon}
            className={isActive ? "bg-neutral-500" : ""}
          />
        );
      })}
      <div className="mx-3 border-4 rounded-3xl flex items-center justify-center">
        <span className="text-white text-center text-4xl">+</span>
      </div>
    </div>
  );
}
