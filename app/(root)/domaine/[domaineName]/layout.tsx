"use client";
import { usePathname } from "next/navigation";
import JoinTheDomain from "@/components/JoinTheDomain";

const domains = [
  { name: "Musique", icon: "/domain/musique.svg" },
  { name: "Mathematiques", icon: "/domain/mathematiques.svg" },
  { name: "Chant", icon: "/domain/chant.svg" },
  { name: "Poésie", icon: "/domain/poesie.svg" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const domaineName = decodeURIComponent(pathname?.split("/")[2] || "");
  const currentDomain = domains.find(
    (domain) =>
      domain.name.toLowerCase() === (domaineName as string).toLowerCase()
  );

  return (
    <div>
      {children}
      {/* need to be changed to the correct logic */}
      {currentDomain && <JoinTheDomain domain={currentDomain} />}
    </div>
  );
}
