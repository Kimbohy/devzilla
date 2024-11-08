// components/LandingPage.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";

// Feature data
const features = [
  {
    icon: "/World-cuate.svg",
    title: "Collaboration",
    description: "Connectez-vous avec des créateurs de tous horizons.",
  },
  {
    icon: "/World-rafiki.svg",
    title: "Apprentissage",
    description: "Partagez et acquérez de nouvelles compétences.",
  },
  {
    icon: "/World-pana.svg",
    title: "Inspiration",
    description: "Découvrez de nouveaux domaines et perspectives.",
  },
];

const domains = [
  {
    name: "Entrepreneuriat",
    icon: "/International cooperation-bro.svg",
    description: "Développez vos compétences entrepreneuriales",
  },
  {
    name: "Science",
    icon: "Innovation-bro.svg",
    description: "Explorez les horizons scientifiques",
  },
  {
    name: "Art",
    icon: "/Creative thinking-bro.svg",
    description: "Libérez votre créativité artistique",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 to-primary/5">
        <Header />

        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-primary font-medium">
                Découvrez Ta Lenta
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Développez Votre <br />
              <span className="text-primary">Potentiel</span> Créatif
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Une plateforme collaborative qui vous permet de partager,
              apprendre et grandir dans divers domaines de création et
              d&apos;innovation.
            </p>

            <div className="flex space-x-4 pt-6">
              <Link href="/session">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-3 rounded-lg shadow-lg hover:bg-primary-dark transition-colors text-lg font-semibold"
                >
                  Commencer
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/10 transition-colors text-lg font-semibold"
                >
                  En savoir plus
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Image
              src="/Superhero-bro.svg"
              alt="Hero Illustration"
              width={600}
              height={600}
              className="z-10 relative"
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi Ta Lenta ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une plateforme conçue pour stimuler la créativité, le partage de
            connaissances et la collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center group"
            >
              <div className="flex justify-center mb-4">
                <motion.img
                  src={feature.icon}
                  alt={feature.title}
                  width={120}
                  height={120}
                  className="group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Domains Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explorez Nos Domaines
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez une variété de domaines où vous pouvez développer vos
              talents et passions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={domain.icon}
                    alt={domain.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{domain.name}</h3>
                  <p className="text-gray-600">{domain.description}</p>
                  <Link href={`/domaine/${domain.name.toLowerCase()}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="mt-4 text-primary hover:underline"
                    >
                      Explorer →
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à commencer votre voyage ?
          </h2>
          <p className="text-lg mb-6">
            Rejoignez notre communauté et commencez à développer vos compétences
            dès aujourd&apos;hui.
          </p>
          <Link href="/session">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white text-primary px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition-colors text-lg font-semibold"
            >
              Inscrivez-vous maintenant
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Ta Lenta. Tous droits réservés.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Conditions d&apos;util isation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
