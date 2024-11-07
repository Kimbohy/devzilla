import { redirect } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  redirect("../Profile");
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
    </main>
  );
}
