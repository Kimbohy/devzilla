import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const goToLandingIfNotLoggedIn = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/LandingPage");
  }
};

export const fetchPublication = async (domaineName: string) => {
  const response = await fetch(
    `https://ta-lenta.onrender.com/publications?domainName=${domaineName}`
  );
  const publications = await response.json();
  console.log(publications);

  return publications;
};

export const fetchAllDomaines = async () => {
  const response = await fetch("https://ta-lenta.onrender.com/domains");
  const domaines = await response.json();
  return domaines;
};

export const getUser = async (email: string) => {
  const response = await fetch(
    `https://ta-lenta.onrender.com/users?userEmail=${email}&status=1`
  );
  const user = await response.json();
  if (user.success) {
    return user.data.user._id as string;
  }
  return "unknown";
};
