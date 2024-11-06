import SideBar from "@/components/SideBar";
import Navbar from "../../components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans flex">
      <SideBar />
      <div className="">
        <Navbar />
        {children}
      </div>
    </main>
  );
}
