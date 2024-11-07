// import { auth } from "@/auth";
// import {redirect, usePathname} from "next/navigation";
export const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// export const goToLandingIfNotLoggedIn = async () =>{
//   const pathname = usePathname();
//   const session = await auth();
//   if(!session && !session?.user && pathname !== '/LandingPage'){
//     redirect("/LandingPage")
//   }
// };
