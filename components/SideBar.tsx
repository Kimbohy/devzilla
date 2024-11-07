"use client";
import Link from "next/link";
import Image from "next/image";
import Domain from "./Domain";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();
  const domaineName = pathname ? pathname.split("/").pop() : ""; // This will get the last segment of the URL path

  const domains = [
    { name: "Musique", icon: "/domain/musique.svg" },
    { name: "Mathematiques", icon: "/domain/mathematiques.svg" },
    { name: "Chant", icon: "/domain/chant.svg" },
    { name: "Poésie", icon: "/domain/poesie.svg" },
  ];

  return (
    <div className="sidebar h-screen relative bg-neutral-700 py-3 flex flex-col gap-3 md:px-6">
      <div className="px-3">
        <Link href="/">
          <Image src="/logo-whit.svg" alt="logo" width={80} height={80} />
        </Link>
      </div>
      {domains.map((domain) => (
        <Domain
          key={domain.name}
          name={domain.name}
          icon={domain.icon}
          className={
            domaineName === domain.name.toLowerCase() ? "bg-neutral-500" : ""
          }
        />
      ))}
      <div className="mx-3 border-4 rounded-3xl flex items-center justify-center">
        <span className="text-white text-center text-4xl">+</span>
      </div>
    </div>
  );
}
