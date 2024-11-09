import Link from "next/link"; // Import Link from next/link
import Domain from "@/components/Domain";

const ListAllDomain = () => {
  const domains = [
    { name: "Musique", icon: "/domain/musique.svg" },
    { name: "Mathematiques", icon: "/domain/mathematiques.svg" },
    { name: "Chant", icon: "/domain/chant.svg" },
    { name: "Poésie", icon: "/domain/poesie.svg" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {domains.map((domain) => (
        <Link
          key={domain.name}
          href={`/domaine/${domain.name.toLowerCase()}`} // Set the href to redirect to the appropriate domain
          className="bg-white rounded-lg shadow-md p-4 transition-transform duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center"
        >
          <div className="flex flex-col justify-center items-center">
            <Domain name={domain.name} icon={domain.icon} isOnSideBar={false} />
            <span className="text-base mt-2 text-gray-700">{domain.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListAllDomain;
