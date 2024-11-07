import SideBar from "@/components/SideBar";
import { goToLandingIfNotLoggedIn } from "@/app/utils";
import Navbar from "@/components/Navbar";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await goToLandingIfNotLoggedIn();

  return (
    <main className="font-work-sans flex relative w-screen">
      <SideBar />
      <div className=" flex-grow">
        <Navbar />
        {children}
      </div>
    </main>
  );
}
