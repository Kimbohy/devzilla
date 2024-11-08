"use client";
import { usePathname } from "next/navigation";
import JoinTheDomain from "@/components/JoinTheDomain";
import { AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <div className="flex flex-col">
        <div className="flex-grow">{children}</div>
        {currentDomain && <JoinTheDomain domain={currentDomain} />}
      </div>
    </AnimatePresence>
  );
}
