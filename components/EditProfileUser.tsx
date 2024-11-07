"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import arrowleft from "@/public/angle-left-solid.svg";
import Link from "next/link";

const EditProfileUser = () => {
  const field =
    "border-[1px] border-black px-2 py-1 rounded-lg mt-3 md:h-20 md:w-[800px] flex flex-col justify-center md:px-6";
  const labelfield = "text-zinc-700 text-sm";

  const [formData, setFormData] = useState<{
    nom: string;
    photoProfil: string;
    competence: string[];
    reseauxSociaux: { lien: string; nom: string };
    domaines: string[];
  }>({
    nom: "",
    photoProfil: "",
    competence: [],
    reseauxSociaux: { lien: "", nom: "" },
    domaines: [],
  });

  const [initialData, setInitialData] = useState(formData);

  // State to hold new competencies and domains
  // const [newCompetence, setNewCompetence] = useState("");
  // const [newDomain, setNewDomain] = useState("");

  // State to control visibility of the social media link input
  // const [showSocialLinkInput, setShowSocialLinkInput] = useState(false);

  useEffect(() => {
    const fakeData = {
      nom: "John Doe",
      photoProfil: "https://example.com/profile.jpg",
      competence: ["JavaScript", "React", "Node.js"],
      reseauxSociaux: { lien: "https://twitter.com/johndoe", nom: "Twitter" },
      domaines: ["Musique", "Chant"],
    };

    setInitialData(fakeData);
    setFormData(fakeData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "reseauxSociaux.lien" || name === "reseauxSociaux.nom") {
      setFormData((prev) => ({
        ...prev,
        reseauxSociaux: {
          ...prev.reseauxSociaux,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name === "competence" || name === "domaines") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // const handleAddCompetence = () => {
  //   if (newCompetence) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       competence: [...prev.competence, newCompetence],
  //     }));
  //     setNewCompetence(""); // Clear the input after adding
  //   }
  // };

  // const handleAddDomain = () => {
  //   if (newDomain) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       domaines: [...prev.domaines, newDomain],
  //     }));
  //     setNewDomain(""); // Clear the input after adding
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Construct the data to send only for updated fields
    const dataToSend = [];

    // Check for updated fields
    if (formData.nom !== initialData.nom) {
      dataToSend.push({ key: "nom", value: formData.nom });
    }
    if (formData.photoProfil !== initialData.photoProfil) {
      dataToSend.push({ key: "photoProfil", value: formData.photoProfil });
    }
    formData.competence.forEach((comp, index) => {
      if (initialData.competence[index] !== comp) {
        dataToSend.push({ key: "competence", value: comp });
      }
    });
    if (
      formData.reseauxSociaux.lien !== initialData.reseauxSociaux.lien ||
      formData.reseauxSociaux.nom !== initialData.reseauxSociaux.nom
    ) {
      dataToSend.push({
        key: "reseauxSociaux",
        value: formData.reseauxSociaux,
      });
    }
    formData.domaines.forEach((domain, index) => {
      if (initialData.domaines[index] !== domain) {
        dataToSend.push({ key: "domaines", value: domain });
      }
    });

    // Remove duplicates, if any (optional)
    const uniqueDataToSend = dataToSend.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.key === item.key &&
            JSON.stringify(t.value) === JSON.stringify(item.value)
        )
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/users/update",
        uniqueDataToSend
      );
      console.log(response);
    } catch (error) {
      console.error("There was an error updating profile!", error);
    }
  };

  return (
    <div className="md:ml-10">
      <div className="flex gap-5 items-center pl-3 pt-4 md:my-9">
        <Link href="/profile">
          <Image src={arrowleft} alt="arrow" width={"15"} height={"15"} />
        </Link>
        <p className="font-semibold text-lg md:text-3xl">Edit profile</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center px-2 md:gap-4 md:pl-7"
      >
        <div className={field}>
          <label htmlFor="nom" className={labelfield}>
            Changer de nom
          </label>
          <input
            type="text"
            name="nom"
            id="nom"
            value={formData.nom}
            onChange={handleChange}
            className="focus:text-lg"
          />
        </div>
        <div className={field}>
          <label htmlFor="photoProfil" className={labelfield}>
            Changer votre photo de profile
          </label>
          <input
            type="text"
            name="photoProfil"
            id="photoProfil"
            value={formData.photoProfil}
            onChange={handleChange}
          />
        </div>
        <div className={field}>
          <label htmlFor="competence" className={labelfield}>
            Changer votre compétence
          </label>
          <input
            type="text"
            name="competence"
            id="competence"
            value={formData.competence.join(". ")}
            onChange={handleChange}
          />
          {/* <input
            type="text"
            value={newCompetence}
            onChange={(e) => setNewCompetence(e.target.value)}
            className="mt-2"
          /> */}
          {/* <button
            type="button"
            onClick={handleAddCompetence}
            className="mt-2 bg-blue-500 text-white rounded px-2 md:hidden"
          >
            Ajouter
          </button> */}
        </div>
        <div className={field}>
          <label htmlFor="reseauxSociaux" className={labelfield}>
            Changer votre reseaux sociaux
          </label>
          <input
            type="text"
            name="reseauxSociaux"
            id="reseauxSociaux"
            value={formData.reseauxSociaux.nom}
            onChange={handleChange}
          />
          {/* <button
            type="button"
            onClick={() => setShowSocialLinkInput((prev) => !prev)}
            className="mt-2 bg-blue-500 text-white rounded px-2 md:hidden"
          >
            {showSocialLinkInput ? "Masquer" : "Modifier"}
          </button> */}
          {/* {showSocialLinkInput && (
            <div className={field}>
              <label htmlFor="reseauxSociauxLien" className={labelfield}>
                Changer votre lien reseaux sociaux
              </label>
              <input
                type="text"
                name="reseauxSociaux.lien"
                id="reseauxSociauxLien"
                value={formData.reseauxSociaux.lien}
                onChange={handleChange}
                className="md:focus:text-3xl"
              />
            </div>
          )} */}
        </div>

        <div className={field}>
          <label htmlFor="domaines" className={labelfield}>
            Changer vos domaines
          </label>
          <input
            type="text"
            name="domaines"
            id="domaines"
            value={formData.domaines.join(". ")}
            onChange={handleChange}
          />
          {/* <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            className="mt-2"
          /> */}
          {/* <button
            type="button"
            onClick={handleAddDomain}
            className="mt-2 bg-blue-500 text-white rounded px-2 md:hidden"
          >
            Ajouter
          </button> */}
        </div>
        <button
          type="submit"
          className="px-2 bg-primary rounded-md text-white my-10 w-[150px] flex justify-center items-end h-7 md:text-xl md:h-10 md:gap-2 fixed right-3 bottom-16 md:justify-center md:items-center md:w-[200px] md:right-20 md:bottom-8"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditProfileUser;
