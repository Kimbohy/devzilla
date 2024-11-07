"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

export default function Publier() {
  const pathname = usePathname();
  const domaineName = decodeURIComponent(pathname?.split("/")[2] || "");

  const [selectedType, setSelectedType] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const publicationTypes = [
    "Projets en cours",
    "Résultats de projets",
    "Challenge",
    "Question",
    "Event",
  ];

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!selectedType) {
      setError("Veuillez sélectionner un type de publication");
      return;
    }

    if (!content.trim()) {
      setError("Le contenu de la publication ne peut pas être vide");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("type", selectedType);
      formData.append("content", content);
      formData.append("domain", domaineName);

      if (image) {
        formData.append("image", image);
      }

      // Send publication to backend
      const response = await axios.post("/api/publications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form
      setSelectedType("");
      setContent("");
      setImage(null);
      setSuccess(true);

      // Optional: Clear file input
      const fileInput = document.getElementById("file") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      console.error("Publication submission error:", err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Erreur lors de la publication"
          : "Une erreur est survenue"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
        Publier dans {domaineName}
      </h1>

      {/* Error Message */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">
            Publication créée avec succès!
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
        <Image
          src="/avatar.svg"
          alt="user"
          width={50}
          height={50}
          className="rounded-full"
        />
        <span className="text-lg text-gray-700 font-medium">
          Kimbohy Marisika
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div id="type-de-publication" className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">
            Type de publication
          </label>
          <div className="flex flex-wrap gap-2">
            {publicationTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
                  ${
                    selectedType === type
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          cols={30}
          rows={10}
          placeholder="Que voulez-vous partager?"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        ></textarea>

        <div className="flex flex-col gap-2">
          <label htmlFor="file" className="text-sm text-gray-600">
            Ajouter une image
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-primary file:text-white
            hover:file:bg-primary-dark
            cursor-pointer"
          />
          {image && (
            <div className="mt-2 text-sm text-gray-600">
              Fichier sélectionné: {image.name}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            }`}
        >
          {isSubmitting ? "Publication en cours..." : "Publier"}
        </button>
      </form>
    </div>
  );
}
