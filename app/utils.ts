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
    `http://localhost:8080/publications/${domaineName}`
  );
  const publications = await response.json();
  return publications;
};

export const fetchAllDomaines = async () => {
  const response = await fetch("http://localhost:8080/domains");
  const domaines = await response.json();
  return domaines;
};
