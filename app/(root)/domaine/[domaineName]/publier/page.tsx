"use client";
import { usePathname } from "next/navigation";

export default function Publier() {
  const pathname = usePathname();
  const domaineName = decodeURIComponent(pathname?.split("/")[2] || "");

  return (
    <div>
      <h1>Publier dans {domaineName}</h1>
    </div>
  );
}
