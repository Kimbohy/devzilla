// app/(root)/profile/page.tsx
import ProfileUser from "@/components/ProfileUser";
import { auth } from "@/auth";
// import { redirect } from "next/navigation";

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

const Page = async () => {
  const session = await auth();

  // If no session, redirect to login
  if (!session?.user?.id) {
    console.log("???", session);
  }

  try {
    // Fetch with error handling and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    const response = await fetch(
      `http://localhost:8080/users?userId=${session?.user?.id || ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }
    );

    // Clear timeout
    clearTimeout(timeoutId);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user: ProfileProps = await response.json();

    // Additional validation
    if (!user || !user.id) {
      throw new Error("Invalid user data received");
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <ProfileUser profile={user} connectedUserId={session?.user?.id || ""} />
      </div>
    );
  } catch (error) {
    console.error("Profile fetch error:", error);

    // Render error component
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
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <strong className="font-bold block mb-1">
                Erreur de chargement du profil
              </strong>
              <span className="block sm:inline">
                {error instanceof Error
                  ? error.message
                  : "Une erreur inattendue s'est produite. Veuillez réessayer."}
              </span>
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
};

export default Page;
