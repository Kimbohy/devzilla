// app/(root)/domaine/[domaineName]/not-found.tsx
// This will be shown only for non-existent domains

import Link from "next/link";

export default function DomainNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-2xl px-8 py-16 text-center">
        <h1 className="mb-4 text-4xl font-semibold text-slate-800">
          Domaine non trouvé
        </h1>
        <p className="mb-8 text-slate-600">
          Désolé, le domaine que vous recherchez n&apos;existe pas.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors duration-200"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
