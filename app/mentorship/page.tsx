"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function MentorshipPage() {
  return (
    <div className="bg-white">
      {/* Logo Section */}
      <Link href="/LandingPage">
        <div className="flex justify-center py-8">
          <Image src="/logo2.svg" alt="Logo" width={150} height={150} />
        </div>
      </Link>

      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-16"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>

      {/* Benefits Section */}
      <motion.section
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Comment Développer Votre Talent ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "/icon-experience.svg",
              title: "Expérience",
              description:
                "Apprenez des experts qui vous aideront à développer vos compétences.",
            },
            {
              icon: "/icon-guidance.svg",
              title: "Accompagnement",
              description:
                "Recevez des conseils personnalisés pour maximiser votre potentiel.",
            },
            {
              icon: "/icon-network.svg",
              title: "Réseautage",
              description:
                "Connectez-vous avec d'autres talents et élargissez votre réseau.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Image
                src={benefit.icon}
                alt={benefit.title}
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="bg-gray-50 py-16"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Ce que nos talents disent
          </h2>
          <div className="flex flex-col items-center">
            <div className="flex flex-col mb-6">
              <motion.blockquote
                className="italic text-gray-600 mb-4"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                &quot;Le programme de mentorat m&apos;a permis de découvrir et
                de développer mes talents cachés.&quot;
              </motion.blockquote>
              <motion.blockquote
                className="italic text-gray-600"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                &quot;Avec le soutien de mon mentor, j&apos;ai pu transformer
                mes compétences en véritables atouts.&quot;
              </motion.blockquote>
            </div>
            <motion.blockquote
              className="italic text-gray-600"
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              transition={{ duration: 0.5, delay: 1 }}
            >
              &quot;Ce programme m&apos;a aidé à réaliser mon potentiel et à me
              lancer dans ma carrière.&quot;
            </motion.blockquote>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="bg-primary text-white py-16 text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
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
      </motion.section>
    </div>
  );
}
