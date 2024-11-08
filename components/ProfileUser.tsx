"use client";
import Image from "next/image";
import Link from "next/link";
import Domain from "./Domain";
import { toCapitalize } from "@/app/utils";
import { FaEdit, FaShareAlt } from "react-icons/fa";

interface ProfileProps {
  id: string;
  nom: string;
  photoProfil: string;
  competence: string[];
  reseauxSociaux: { lien: string; nom: string };
  domaines: string[];
}

const ProfileUser = ({ profile }: { profile: ProfileProps }) => {
  const socialMediaIcons: { [key: string]: string } = {
    facebook: "facebook-f-brands-solid.svg",
    instagram: "/instagram-brands-solid.svg",
    linkedin: "/linkedin-in-brands-solid.svg",
  };

  const domains = [
    { name: "Musique", icon: "/domain/musique.svg" },
    { name: "Mathematiques", icon: "/domain/mathematiques.svg" },
    { name: "Chant", icon: "/domain/chant.svg" },
    { name: "Poésie", icon: "/domain/poesie.svg" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/20 p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Image
                src={profile.photoProfil}
                alt={profile.nom}
                width={150}
                height={150}
                className="rounded-full border-4 border-white shadow-lg"
              />
              {/* <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2">
                 <FaStar className="w-5 h-5" /> 
              </div> */}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {profile.nom}
              </h1>
              <div className="flex justify-center md:justify-start space-x-3 mt-3">
                {profile.reseauxSociaux.nom in socialMediaIcons && (
                  <Link
                    href={profile.reseauxSociaux.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    <Image
                      src={socialMediaIcons[profile.reseauxSociaux.nom]}
                      alt={profile.reseauxSociaux.nom}
                      width={30}
                      height={30}
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="flex justify-center space-x-4 p-4 bg-gray-50">
          <Link href="/editProfile" className="w-full max-w-xs">
            <button className="flex items-center justify-center w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors space-x-2">
              <FaEdit className="w-5 h-5" />
              <span className="hidden md:block">Edit Profile</span>
            </button>
          </Link>
          <Link href="/shareProfile" className="w-full max-w-xs">
            <button className="flex items-center justify-center w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors space-x-2">
              <FaShareAlt className="w-5 h-5" />
              <span className="hidden md:block">Share Profile</span>
            </button>
          </Link>
        </div>

        {/* Skills Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Compétences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {profile.competence.map((skill) => (
              <div
                key={skill}
                className="bg-gray-100 text-start rounded-lg px-4 py-2 md:text-center text-sm font-medium text-gray-700 hover:bg-primary/10 transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Domains Section */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Domaines
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {profile.domaines.map((domainName) => {
              const domain = domains.find((d) => d.name === domainName);
              return domain ? (
                <Link
                  key={domain.name}
                  href={`/domaine/${toCapitalize(domain.name)}`}
                  className="hover:scale-110 transition-transform"
                >
                  <div className="flex flex-col items-center">
                    <Domain
                      name={domain.name}
                      icon={domain.icon}
                      isOnSideBar={false}
                      className="bg-white shadow-md rounded-full p-5 w-16 h-16 flex items-center justify-center md:w-24 md:h-24 "
                    />
                    <span className="text-sm mt-2 text-gray-700">
                      {domain.name}
                    </span>
                  </div>
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
