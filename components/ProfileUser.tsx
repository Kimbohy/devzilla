"use client";
import Image from "next/image";
import Link from "next/link";
import Domain from "./Domain";
import facebook from "@/public/facebook-f-brands-solid.svg";
import instagram from "@/public/instagram-brands-solid.svg";
import linkedin from "@/public/linkedin-in-brands-solid.svg";
import chant from "@/public/domain/chant.svg";
import mathematiques from "@/public/domain/mathematiques.svg"; // Ensure you import all the required icons
import poesie from "@/public/domain/poesie.svg"; // Import the poetry icon
import musique from "@/public/domain/musique.svg"; // Import the music icon
import { toCapitalize } from "@/app/utils"; // Assuming you have this utility function

// fake data
interface ProfileProps {
  id: string;
  nom: string;
  photoProfil: string;
  competence: string[];
  reseauxSociaux: { lien: string; nom: string };
  domaines: string[];
}

const ProfileUser = ({ profile }: { profile: ProfileProps }) => {
  const profileManager =
    "px-7 bg-primary rounded-md text-white my-4 w-[150px] px-1 flex justify-center items-center h-7 md:text-xl md:h-10 md:w-[300px] md:gap-2";

  // Mapping of social media names to their respective icons
  const socialMediaIcons: { [key: string]: string } = {
    facebook: facebook,
    instagram: instagram,
    linkedin: linkedin,
  };

  // Define the domains with their respective icons
  const domains = [
    { name: "Musique", icon: musique },
    { name: "Mathematiques", icon: mathematiques },
    { name: "Chant", icon: chant },
    { name: "Poésie", icon: poesie },
  ];

  return (
    <div className="flex flex-col">
      <div className="md:flex md:flex-col md:gap-10">
        <div className="flex pt-4 px-3 w-full justify-between">
          <div className="flex flex-col md:flex-row md:gap-6 md:items-center md:pl-9">
            <Image
              src={profile.photoProfil}
              alt={profile.nom}
              width={90}
              height={90}
              className="md:w-40 md:h-40"
            />
            <p className="font-semibold text-2xl md:text-5xl">{profile.nom}</p>
          </div>
          <div className="flex gap-2 pr-3 top-4 right-4 fixed md:top-7 md:right-8 md:fixed">
            <Link
              href={profile.reseauxSociaux.lien}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              {profile.reseauxSociaux.nom in socialMediaIcons && (
                <>
                  <Image
                    src={socialMediaIcons[profile.reseauxSociaux.nom]}
                    alt={profile.reseauxSociaux.nom}
                    width={15}
                    height={15}
                    className="md:w-9 md:h-9"
                  />
                  <p className="hidden md:block md:text-lg md:pl-4">
                    {profile.reseauxSociaux.nom}
                  </p>
                </>
              )}
            </Link>
          </div>
        </div>
        <ul className="px-3 py-5 md:text-2xl">
          {profile.competence.map((comps) => (
            <li className="pb-1 md:pl-11" key={comps}>
              {comps}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full gap-2 items-center justify-center px-3 md:ml-5">
        <Link href="/editProfile">
          <button className={profileManager}>Edit profile</button>
        </Link>
        <Link href="/shareProfile">
          <button className={profileManager}>Share profile</button>
        </Link>
      </div>
      <div>
        <p className="font-semibold pl-3 text-2xl my-5 md:text-5xl md:text-center">
          Domaines
        </p>
        <div className="flex gap-2 pl-3 md:items-center md:justify-center">
          {profile.domaines.map((domainName) => {
            // Find the corresponding domain object based on the name
            const domain = domains.find((d) => d.name === domainName);
            return domain ? (
              <Link
                key={domain.name}
                href={`/domaine/${toCapitalize(domain.name)}`}
              >
                <Domain
                  name={domain.name}
                  icon={domain.icon}
                  className="border-[1px] border-black px-3 py-3 rounded-md w-14 h-12 md:w-fit md:h-16 md:bg-blue-950 md:border-none md:mt-6
                   md:px-5 md:py-5"
                />
              </Link>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
