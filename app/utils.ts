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
