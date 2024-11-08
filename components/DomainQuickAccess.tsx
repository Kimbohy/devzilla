import Image from "next/image";
import Link from "next/link";

interface Domain {
  name: string;
  icon: string;
  description: string;
}

const domains: Domain[] = [
  {
    name: "Musique",
    icon: "/domain/musique.svg",
    description: "Explorez et partagez votre passion musicale",
  },
  {
    name: "Mathematiques",
    icon: "/domain/mathematiques.svg",
    description: "Découvrez les merveilles des mathématiques",
  },
  {
    name: "Chant",
    icon: "/domain/chant.svg",
    description: "Développez votre talent vocal",
  },
  {
    name: "Poésie",
    icon: "/domain/poesie.svg",
    description: "Exprimez vos émotions à travers les mots",
  },
];

export default function DomainQuickAccess() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Explorez les Domaines</h3>
      <div className="space-y-4">
        {domains.map((domain) => (
          <Link
            key={domain.name}
            href={`/domaine/${domain.name.toLowerCase()}`}
            className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <Image src={domain.icon} alt={domain.name} width={40} height={40} />
            <div>
              <h4 className="font-medium">{domain.name}</h4>
              <p className="text-sm text-gray-500">{domain.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
