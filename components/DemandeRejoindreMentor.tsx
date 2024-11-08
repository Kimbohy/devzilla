"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const DemandeRejoindreMentor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCheckboxChange = () => {
    setAcceptConditions(!acceptConditions);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Veuillez télécharger votre CV.");
      return;
    }
    if (!acceptConditions) {
      setError("Vous devez accepter les conditions.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("cv", file);

    try {
      await axios.post("/api/mentors/request", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      setFile(null); // Reset the file input
    } catch (err) {
      console.error("Erreur lors de l'envoi de la demande :", err);
      setError("Une erreur est survenue lors de l'envoi de votre demande.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <h2 className="md:text-3xl text-xl font-bold text-primary text-center mb-6">
        Demande de Rejoindre en Tant que Mentor
      </h2>

      <div className="space-y-4">
        <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
          <h3 className="font-bold md:text-lg text-base mb-2 text-primary">
            🌟 Critères d&apos;Acceptation
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Minimum de 3 à 5 ans d&apos;expérience dans le domaine</li>
            <li>Réalisations ou contributions démontrables</li>
            <li>Diplôme ou certification pertinente</li>
            <li>CV détaillé avec parcours, expérience et compétences</li>
          </ul>
        </div>

        <div className="bg-green-100 p-5 rounded-lg shadow-sm">
          <h3 className="font-bold md:text-lg text-base mb-2 text-green-700">
            ✅ Processus de Validation
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Soumission d&apos;un CV complet</li>
            <li>
              Participation à un entretien pour évaluer les capacités de
              mentorat
            </li>
            <li>
              Vérification des antécédents pour un dossier professionnel propre
            </li>
            <li>Évaluations par des mentors actuels sur les qualifications</li>
          </ol>
        </div>

        <div className="bg-blue-100 p-5 rounded-lg shadow-sm">
          <h3 className="font-bold md:text-lg text-base mb-2 text-blue-700">
            🤝 Engagement Communautaire
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Disponibilité pour des réunions régulières avec les mentorés
            </li>
            <li>Passion pour aider les autres à se développer</li>
            <li>
              Mentorat de quelques mentorés sous supervision pour évaluer
              l&apos;adéquation
            </li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="file" className="text-lg text-gray-600">
            Envoyer votre CV
          </label>
          <input
            type="file"
            id="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary-dark
              cursor-pointer"
          />
          {file && (
            <div className="mt-2 text-sm text-gray-600">
              Fichier sélectionné: {file.name}
            </div>
          )}
        </div>
        <div className="flex gap-1 items-center">
          <input
            type="checkbox"
            name="accept"
            id="accept"
            className="w-4 h-4"
            checked={acceptConditions}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="accept" className="py-4">
            J&apos;accepte toutes les conditions.
          </label>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && (
          <div className="text-green-500 text-sm flex items-center">
            <span className="mr-1">✅</span>
            Demande envoyée avec succès !
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium mt-5
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark"
              }`}
        >
          {isSubmitting ? "Envoie en cours..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
};

export default DemandeRejoindreMentor;
