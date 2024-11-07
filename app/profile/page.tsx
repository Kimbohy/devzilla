import ProfileUser from "@/components/ProfileUser";
import SideBar from "@/components/SideBar";
import React from "react";

// fake data
interface ProfileProps {
  id: string;
  nom: string;
  photoProfil: string;
  competence: string[];
  reseauxSociaux: { lien: string; nom: string };
  domaines: string[];
}

const profile: ProfileProps = {
  id: "1",
  nom: "John Doe",
  photoProfil: "/avatar.svg",
  competence: [
    "Enseignant de mathématique à l'Université d'Antannarivo.",
    "Directeur d'un club de danse.",
    "Membre d'un club de dessin au niveau de l'international.",
  ],
  reseauxSociaux: { lien: "https://facebook.com", nom: "instagram" },
  domaines: ["Musique", "Chant", "Mathematiques"],
};

const Page = () => {
  return (
    <div className="flex">
      <SideBar />
      <ProfileUser profile={profile} />
    </div>
  );
};

export default Page;
