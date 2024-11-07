import { auth } from "@/auth";
import NotificationsList from "@/components/NotificationsList";
import NotificationTabs from "@/components/NotificationTabs";
import { redirect } from "next/navigation";

export default async function NotificationsPage() {
  const session = await auth();

  if (!session) {
    redirect("/session");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <div className="bg-white rounded-xl shadow-md">
        <NotificationTabs />
        <NotificationsList />
      </div>
    </div>
  );
}
