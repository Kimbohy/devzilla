// app/(root)/profile/page.tsx
"use client";
import ProfileUser from "@/components/ProfileUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface SocialMedia {
  lien: string;
  nom: string;
}

export interface MentorApprenticeRelation {
  mentor?: string;
  apprenti?: string;
  domaine: string;
}

export interface ProfileProps {
  id: string;
  nom: string;
  email: string;
  type: string;
  photoProfil: string;
  description: string;
  competence: string[];
  reseauxSociaux: SocialMedia[];
  domaines: string[];
  mentor: MentorApprenticeRelation[];
  apprenti: MentorApprenticeRelation[];
}

const Page = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<ProfileProps | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async () => {
    if (!session?.user?.id) {
      throw new Error("User  is not authenticated.");
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

      const response = await fetch(
        `http://localhost:8080/users?userId=${session.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData: ProfileProps = await response.json();

      if (!userData || !userData.id) {
        throw new Error("Invalid user data received");
      }

      setUser(userData);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(
        err instanceof Error ? err : new Error("An unexpected error occurred")
      );
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile();
    }
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-2 5a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <strong className="font-bold block mb-1">
                Erreur de chargement du profil
              </strong>
              <span className="block sm:inline">{error.message}</span>
            </div>
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Actualiser
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Retour à l&apos;accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileUser profile={user} connectedUserId={session?.user?.id || ""} />
    </div>
  );
};

export default Page;
