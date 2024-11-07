import React from "react";
import { useState } from "react";
import axios from "axios";

const EditProfileUser = () => {
  const [formData, setFormData] = useState({
    nom: "",
    photoProfil: "",
    competence: [],
    reseauxSociaux: {},
    domaines: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post<{
        success: boolean;
        message: string;
        data: {
          _id: string;
          nom: string;
          photoProfil: string;
          competence: [];
          reseauxSociaux: { lien: string; nom: string };
          domaines: [];
          type: string;
        };
      }>("http://localhost:8080/users/update", {
        nom: formData.nom,
        photoProfil: formData.photoProfil,
        competence: formData.competence,
        reseauxSociaux: formData.reseauxSociaux,
        domaines: formData.domaines,
      });
      console.log(response.data);
    } catch (error) {
      console.error("There was an error updating profile!", error);
    }
  };

  return (
    <div>
      <p>Profile</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          id="nom"
          value={formData.nom}
          onChange={handleChange}
        />
        <input
          type="text"
          name="photoProfil"
          id="photoProfil"
          value={formData.photoProfil}
          onChange={handleChange}
        />
        <input
          type="text"
          name="competence"
          id="competence"
          value={formData.competence}
          onChange={handleChange}
        />
        <input
          type="text"
          name="reseauxSociaux"
          id="reseauxSociaux"
          value={JSON.stringify(formData.reseauxSociaux)}
          onChange={handleChange}
        />
        <input
          type="text"
          name="domaines"
          id="domaines"
          value={formData.domaines}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditProfileUser;
