"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function CreateAnnonce() {
  const pathname = usePathname();
  const domaineName = decodeURIComponent(pathname?.split("/")[2] || "");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]); // Handle multiple images
  const [videos, setVideos] = useState<File[]>([]); // Handle multiple videos
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Convert FileList to an array
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

    if (!session?.user?.email) {
      setError("Identifiant utilisateur non disponible");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = {
        utilisateurId: session?.user?.id || "",
        type: "projet", // Set type to "projet"
        contenu: description,
        images: images.map((image) => image.name), // Get the names of the images
        videos: videos.map((video) => video.name), // Get the names of the videos
        nomDomaine: domaineName, // Set the domain name
      };

      console.log("Form Data:", formData); // Log the form data

      await axios.post(
        "https://ta-lenta.onrender.com/publications/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Change to application/json
          },
        }
      );

      // Reset form
      setTitle("");
      setDescription("");
      setImages([]);
      setVideos([]);
      setSuccess(true);
    } catch (err) {
      console.error("Publication submission error:", err);
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
          Votre annonce
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
        <label htmlFor="annonce-images" className="text-sm text-gray-600">
          Ajouter des images
        </label>
        <input
          type="file"
          id="annonce-images"
          accept="image/*"
          multiple // Allow multiple file selection
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-primary file:text-white
          hover:file:bg-primary-dark
          cursor-pointer"
        />
        {images.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Fichiers sélectionnés:{" "}
            {images.map((image) => image.name).join(", ")}
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
