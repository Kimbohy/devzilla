"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfileUser = () => {
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

  // Initial data for comparison (you might fetch this from an API)
  const [initialData, setInitialData] = useState(formData);

  useEffect(() => {
    // Simulate fetching initial data
    const fetchInitialData = async () => {
      try {
        const userId = "someUserId"; // Replace with actual user ID logic
        const response = await axios.get(
          `http://localhost:8080/users?user-id=${userId}`
        );
        setInitialData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
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
    <div>
      <p>Profile</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nom">Changer de nom</label>
        <input
          type="text"
          name="nom"
          id="nom"
          value={formData.nom}
          onChange={handleChange}
        />
        <label htmlFor="photoProfil">Changer votre photo de profile</label>
        <input
          type="text"
          name="photoProfil"
          id="photoProfil"
          value={formData.photoProfil}
          onChange={handleChange}
        />
        <label htmlFor="competence">
          Changer votre compétence (separer par des virgules)
        </label>
        <input
          type="text"
          name="competence"
          id="competence"
          value={formData.competence.join(", ")}
          onChange={handleChange}
        />
        <label htmlFor="reseauxSociauxLien">
          Changer votre lien reseaux sociaux
        </label>
        <input
          type="text"
          name="reseauxSociaux.lien"
          id="reseauxSociauxLien"
          value={formData.reseauxSociaux.lien}
          onChange={handleChange}
        />
        <label htmlFor="reseauxSociauxNom">
          Changer le nom de votre reseaux sociaux
        </label>
        <input
          type="text"
          name="reseauxSociaux.nom"
          id="reseauxSociauxNom"
          value={formData.reseauxSociaux.nom}
          onChange={handleChange}
        />
        <label htmlFor="domaines">
          Changer vos domaines (separer par des virgules)
        </label>
        <input
          type="text"
          name="domaines"
          id="domaines"
          value={formData.domaines.join(", ")}
          onChange={handleChange}
        />
        <button type="submit">Mettre à jour le profil</button>
      </form>
    </div>
  );
};

export default EditProfileUser;
/*
only field updated will be sent to the server

const data = [
  {
    key: "nom",
    value: "John Doe",
  },
  { key: "photoProfil", value: "https://example.com/profile.jpg" },
  { key: "competence", value: "React" },
  { key: "competence", value: "Node.js" },
  {
    key: "reseauxSociaux",
    value: { lien: "https://linkedin.com/johndoe", nom: "LinkedIn" },
  },
  { key: "domaines", value: "Web Development" },
  { key: "domaines", value: "Mobile Development" },
];
*/
