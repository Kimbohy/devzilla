import SideBar from "@/components/SideBar";
import Navbar from "../../components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Navbar />
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </main>
  );
}
