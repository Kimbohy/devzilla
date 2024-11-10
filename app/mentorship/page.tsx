"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function MentorshipPage() {
  return (
    <div className="bg-white">
      {/* Logo Section */}
      <div className="flex justify-center py-8">
        <Image src="/logo2.svg" alt="Logo" width={150} height={150} />
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Développez Votre Talent
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez notre programme de mentorat pour cultiver vos talents et
            réaliser votre potentiel.
          </p>
          <Link href="/session">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-primary text-white px-8 py-3 rounded-lg shadow-lg hover:bg-primary-dark transition-colors text-lg font-semibold"
            >
              Inscrivez-vous maintenant
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Pourquoi Développer Votre Talent ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <Image
              src="/icon-experience.svg" // Remplacez par votre icône
              alt="Experience"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Expérience</h3>
            <p className="text-gray-600">
              Apprenez des experts qui vous aideront à développer vos
              compétences.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <Image
              src="/icon-guidance.svg" // Remplacez par votre icône
              alt="Guidance"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Accompagnement</h3>
            <p className="text-gray-600">
              Recevez des conseils personnalisés pour maximiser votre potentiel.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <Image
              src="/icon-network.svg" // Remplacez par votre icône
              alt="Networking"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Réseautage</h3>
            <p className="text-gray-600">
              Connectez-vous avec d&apos;autres talents et élargissez votre
              réseau.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Ce que nos mentees disent
          </h2>
          <div className="flex flex-col items-center">
            <div className="flex flex-col mb-6">
              <blockquote className="italic text-gray-600 mb-4">
                &quot;Le programme de mentorat m&apos;a permis de découvrir et
                de développer mes talents cachés.&quot;
              </blockquote>
              <blockquote className="italic text-gray-600">
                &quot;Avec le soutien de mon mentor, j&apos;ai pu transformer
                mes compétences en véritables atouts.&quot;
              </blockquote>
            </div>
            <blockquote className="italic text-gray-600">
              &quot;Ce programme m&apos;a aidé à réaliser mon potentiel et à me
              lancer dans ma carrière.&quot;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à développer votre talent ?
          </h2>
          <p className="text-lg mb-6">
            Inscrivez-vous dès aujourd&apos;hui et commencez votre parcours vers
            l&apos;excellence.
          </p>
          <Link href="/session">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white text-primary px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition-colors text-lg font-semibold"
            >
              Inscrivez-vous maintenant
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
