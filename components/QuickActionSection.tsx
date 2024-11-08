import Link from "next/link";

const QuickActionSection: React.FC = () => {
  return (
    <section className="mt-8 bg-primary/10 rounded-xl p-6">
      <div className="max-w-4xl mx-auto flex flex-col items-start justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Nouveau domaine à proposer ?
        </h2>
        <div className="flex flex-nowrap flex-row items-center">
          <p className="text-gray-600">
            Vous pouvez demander à créer un nouveau domaine sur la plateforme.
          </p>
          <Link
            href="/create"
            className="mt-4 md:mt-0 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Nouveau
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickActionSection;
