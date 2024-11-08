"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaSave, FaPlus, FaTimes, FaCamera } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const EditProfileUser = () => {
  const [formData, setFormData] = useState({
    nom: "",
    photoProfil: "",
    competence: [] as string[],
    reseauxSociaux: { lien: "", nom: "" },
    domaines: [] as string[],
  });

  const [newCompetence, setNewCompetence] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fakeData = {
      nom: "John Doe",
      photoProfil: "/avatar.svg",
      competence: [
        "Enseignant de mathématique",
        "Directeur de club de danse",
        "Membre d'un club de dessin international",
      ],
      reseauxSociaux: { lien: "https://twitter.com/johndoe", nom: "Twitter" },
      domaines: ["Musique", "Chant"],
    };

    setFormData(fakeData);
    setImagePreview(fakeData.photoProfil);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "reseauxSociaux.lien" || name === "reseauxSociaux.nom") {
      setFormData((prev) => ({
        ...prev,
        reseauxSociaux: {
          ...prev.reseauxSociaux,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          photoProfil: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCompetence = () => {
    if (newCompetence && !formData.competence.includes(newCompetence)) {
      setFormData((prev) => ({
        ...prev,
        competence: [...prev.competence, newCompetence],
      }));
      setNewCompetence("");
    }
  };

  const handleRemoveCompetence = (competence: string) => {
    setFormData((prev) => ({
      ...prev,
      competence: prev.competence.filter((comp) => comp !== competence),
    }));
  };

  const handleAddDomain = () => {
    if (newDomain && !formData.domaines.includes(newDomain)) {
      setFormData((prev) => ({
        ...prev,
        domaines: [...prev.domaines, newDomain],
      }));
      setNewDomain("");
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setFormData((prev) => ({
      ...prev,
      domaines: prev.domaines.filter((dom) => dom !== domain),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic
    console.log("Submitting form data:", formData);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/20 p-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/profile" className="mr-4">
              <FaArrowLeft className="text-2xl text-gray-700 hover:text-primary transition-colors" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              Éditer le profil
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                <Image
                  src={imagePreview || "/default-avatar.png"}
                  alt="Profile"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
              >
                <FaCamera />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          {/* Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1 ">
              <label
                htmlFor="nom"
                className="form-label font-semibold md:text-xl"
              >
                Nom
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                value={formData.nom}
                onChange={handleChange}
                className="form-input md:text-lg outline-none"
                placeholder="Votre nom complet"
              />
            </div>
          </div>

          {/* Competences */}
          <div className="form-group">
            <label className="form-label font-semibold md:text-xl">
              Compétences
            </label>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={newCompetence}
                onChange={(e) => setNewCompetence(e.target.value)}
                className="form-input flex-grow outline-none"
                placeholder="Ajouter une compétence"
              />
              <button
                type="button"
                onClick={handleAddCompetence}
                className="btn-icon bg-primary text-white hover:bg-primary-dark"
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.competence.map((comp) => (
                <div
                  key={comp}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  {" "}
                  <span>{comp}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCompetence(comp)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="reseauxSociaux.nom"
              className="form-label font-semibold md:text-xl"
            >
              Réseau social
            </label>
            <input
              type="text"
              name="reseauxSociaux.nom"
              value={formData.reseauxSociaux.nom}
              onChange={handleChange}
              className="form-input md:text-lg outline-none"
              placeholder="Nom du réseau social"
            />
            <input
              type="text"
              name="reseauxSociaux.lien"
              value={formData.reseauxSociaux.lien}
              onChange={handleChange}
              className="form-input mt-2 md:text-lg outline-none"
              placeholder="Lien du réseau social"
            />
          </div>

          {/* Domains */}
          <div className="form-group">
            <label className="form-label font-semibold md:text-xl">
              Domaines
            </label>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                className="form-input flex-grow md:text-lg outline-none"
                placeholder="Ajouter un domaine"
              />
              <button
                type="button"
                onClick={handleAddDomain}
                className="btn-icon bg-primary text-white hover:bg-primary-dark"
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.domaines.map((domain) => (
                <div
                  key={domain}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{domain}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDomain(domain)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
          >
            <FaSave className="mr-2" />
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileUser;
