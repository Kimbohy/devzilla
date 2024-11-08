export default function GuidelinesSection() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Lignes Directrices pour la Création de Domaine
        </h2>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-primary">
            🌟 Critères d&apos;Acceptation
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Domaine unique et distinctif</li>
            <li>Description claire et concise</li>
            <li>Potentiel d&apos;engagement communautaire</li>
            <li>Alignement avec nos valeurs de développement</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-green-700">
            ✅ Processus de Validation
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Soumission de votre proposition</li>
            <li>Examen par notre comité</li>
            <li>Validation ou demande de modifications</li>
            <li>Notification du résultat</li>
          </ol>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-blue-700">
            🤝 Engagement Communautaire
          </h3>
          <p className="text-gray-700">
            Votre proposition doit avoir un potentiel significatif pour
            favoriser l&apos;apprentissage, la collaboration et
            l&apos;innovation au sein de notre communauté.
          </p>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500 italic">
          Chaque nouvelle proposition contribue à enrichir notre écosystème
          d&apos;apprentissage et de partage.
        </p>
      </div>
    </div>
  );
}
