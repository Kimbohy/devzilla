"use client";
import { usePathname } from "next/navigation";
import AnnoncesListing from "@/components/AnnoncesListing";
import CreateAnnonce from "@/components/CreateAnnonce";

export default function AnnoncesPage() {
  const pathname = usePathname();
  const domaineName = decodeURIComponent(pathname?.split("/")[2] || "");

  return (
    <div className="container mx-auto px-4 py-6 md:h-screen">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        Annonces de {domaineName}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Annonces Listing Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Liste des Annonces</h2>
          <AnnoncesListing domaineName={domaineName} />
        </div>

        {/* Create Annonce Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Créer une Annonce</h2>
          <CreateAnnonce domaineName={domaineName} />
        </div>
      </div>
    </div>
  );
}
