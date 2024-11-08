import Image from "next/image";
import Link from "next/link";

interface RightSideFeaturesProps {
  publications: any[];
  topContributors: any[];
  publicationTypes: string[];
  upcomingEvents: any[];
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
    <div className="w-96 bg-gray-50 p-6 space-y-8 border-l">
      {/* Domain Statistics */}
      <section>
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
      <section>
        <h2 className="text-xl font-bold mb-4">Top Contributeurs</h2>
        <div className="space-y-3">
          {topContributors.map((contributor) => (
            <div
              key={contributor.id}
              className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm"
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
      <section>
        <h2 className="text-xl font-bold mb-4">Événements à Venir</h2>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="text-xs text-gray-500 mt-1">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Domains */}
      <section>
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
