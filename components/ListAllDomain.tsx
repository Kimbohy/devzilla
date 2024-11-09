import Domain from "@/components/Domain";

const ListAllDomain = () => {
  const domains = [
    { name: "Musique", icon: "/domain/musique.svg" },
    { name: "Mathematiques", icon: "/domain/mathematiques.svg" },
    { name: "Chant", icon: "/domain/chant.svg" },
    { name: "Poésie", icon: "/domain/poesie.svg" },
  ];
  return (
    <div>
      {domains.map((domain) => (
        <div
          key={domain.name}
          className="bg-white rounded-lg shadow-md p-4 transition-transform duration-100 hover:shadow-lg hover:scale-105 flex gap-2"
        >
          <Domain name={domain.name} icon={domain.icon} />
        </div>
      ))}
    </div>
  );
};

export default ListAllDomain;
