import { auth } from "@/auth";
import CreateDomainForm from "@/components/CreateDomainForm";
import { redirect } from "next/navigation";
import GuidelinesSection from "@/components/GuidelinesSection";

export default async function CreateDomainPage() {
  const session = await auth();

  if (!session) {
    redirect("/session");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Form Column */}
        <div>
          <h1 className="text-3xl font-bold mb-6">
            Proposer un Nouveau Domaine
          </h1>
          <CreateDomainForm />
        </div>

        {/* Theme and Conditions Column */}
        <GuidelinesSection />
      </div>
    </div>
  );
}
