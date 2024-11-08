import Image from "next/image";
import Link from "next/link";

// More specific interfaces
interface Contributor {
  id: string;
  name: string;
  avatar: string;
  publicationCount: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface RightSideFeaturesProps {
  publications: { id: string; title: string; date: string; content: string }[];
  topContributors: Contributor[];
  publicationTypes: string[];
  upcomingEvents: Event[];
  relatedDomains: string[];
}

export default function RightSideFeatures({
  publications,
  topContributors,
  publicationTypes,
  upcomingEvents,
  relatedDomains,
}: RightSideFeaturesProps) {
  return (
    <div className=" p-6 mt-2 pb-5 space-y-8 sticky top-0 overflow-y-auto">
      {/* Domain Statistics */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Statistiques du Domaine</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">
              {publications.length}
            </p>
            <p className="text-sm text-gray-600">Publications</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">
              {topContributors.length}
            </p>
            <p className="text-sm text-gray-600">Contributeurs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">
              {publicationTypes.length - 1}
            </p>
            <p className="text-sm text-gray-600">Types</p>
          </div>
        </div>
      </section>

      {/* Top Contributors */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Top Contributeurs</h2>
        <div className="space-y-3">
          {topContributors.map((contributor) => (
            <div
              key={contributor.id}
              className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={contributor.avatar}
                alt={contributor.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-grow">
                <p className="font-semibold">{contributor.name}</p>
                <p className="text-sm text-gray-500">
                  {contributor.publicationCount} publications
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Événements à Venir</h2>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="text-xs text-gray-500 mt-1">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Domains */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Domaines Connexes</h2>
        <div className="flex flex-wrap gap-2">
          {relatedDomains.map((domain) => (
            <Link
              key={domain}
              href={`/domaine/${domain.toLowerCase()}`}
              className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
            >
              {domain}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
