"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateDomainForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    category: "",
  });
  const [icon, setIcon] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Art et Créativité",
    "Science et Technologie",
    "Entrepreneuriat",
    "Développement Personnel",
    "Sport et Bien-être",
    "Éducation",
    "Autre",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIcon(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.name.trim()) {
      setError("Le nom du domaine est requis");
      return;
    }

    if (!formData.description.trim()) {
      setError("La description du domaine est requise");
      return;
    }

    if (!formData.category) {
      setError("Veuillez sélectionner une catégorie");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);

      if (icon) {
        formDataToSend.append("icon", icon);
      }

      const response = await axios.post(
        "/api/domains/propose",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);

      // Reset form
      setFormData({
        name: "",
        description: "",
        icon: "",
        category: "",
      });
      setIcon(null);

      // Optional: Redirect or show success message
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error("Domain proposal error:", err);
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message ||
              "Erreur lors de la proposition du domaine"
          : "Une erreur est survenue"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md space-y-6"
    >
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">
            Votre proposition de domaine a été soumise avec succès !
          </span>
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nom du Domaine
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ex: Intelligence Artificielle"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description du Domaine
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Décrivez brièvement ce domaine et son importance"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          required
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Catégorie
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="icon"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Icône du Domaine (Optionnel)
        </label>
        <input
          type="file"
          id="icon"
          name="icon"
          accept="image/*"
          onChange={handleIconChange}
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-primary file:text-white
          hover:file:bg-primary-dark
          cursor-pointer"
        />
        {icon && (
          <div className="mt-2 text-sm text-gray-600">
            Fichier sélectionné: {icon.name}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-200 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Envoi..." : "Proposer le Domaine"}
      </button>
    </form>
  );
}
