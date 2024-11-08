"use client";

// app/not-found.tsx
// This will be shown for any non-existent route across your application
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-2xl px-8 py-16 text-center">
        {/* Optional: Add your 404 illustration here */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/404-illustration.svg" // Make sure to add this image to your public folder
            alt="404 Illustration"
            fill
            className="object-contain"
          />
        </div>

        {/* <h1 className="mb-4 text-6xl font-semibold text-slate-800">404</h1> */}

        <h2 className="mb-4 text-2xl font-medium text-slate-700">
          Page non trouvée
        </h2>

        <p className="mb-8 text-slate-600">
          Désolé, nous n&apos;avons pas pu trouver la page que vous recherchez.
          Peut-être que le lien est incorrect ou que la page a été supprimée.
        </p>

        <div className="space-x-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour à l&apos;accueil
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors duration-200"
          >
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
}
