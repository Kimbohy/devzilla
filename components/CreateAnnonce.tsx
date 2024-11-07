"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface CreateAnnonceProps {
  domaineName: string;
}

export default function CreateAnnonce({ domaineName }: CreateAnnonceProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setError("Le titre de l'annonce est requis");
      return;
    }

    if (!description.trim()) {
      setError("La description de l'annonce est requise");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("domain", domaineName);

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post("/api/annonces", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
      setSuccess(true);

      // Clear file input
      const fileInput = document.getElementById(
        "annonce-image"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      console.error("Annonce submission error:", err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message ||
              "Erreur lors de la création de l'annonce"
          : "Une erreur est survenue"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <span className="block sm:inline">Annonce créée avec succès!</span>
        </div>
      )}

      <div>
        <label htmlFor="title" className="text-sm text-gray-600 font-medium">
          Titre de l&apos;annonce
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          placeholder="Entrez le titre de l'annonce"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm text-gray-600 font-medium"
        >
          Description de l&apos;annonce
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          placeholder="Entrez la description de l'annonce"
        ></textarea>
      </div>

      <div>
        <label htmlFor="annonce-image" className="text-sm text-gray-600">
          Ajouter une image
        </label>
        <input
          type="file"
          id="annonce-image"
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
        {isSubmitting ? "Création en cours..." : "Créer l'annonce"}
      </button>
    </form>
  );
}
