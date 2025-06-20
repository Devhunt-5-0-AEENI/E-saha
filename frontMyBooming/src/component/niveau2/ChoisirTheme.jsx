import React from "react";

const themes = [
  "Robot Intelligent",
  "Maison Écologique",
  "Voiture Volante",
  "Parc de Jeux",
  "Ferme Futuriste"
];

export default function ChoisirTheme() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col">
      {/* Partie haute */}
      <div className="flex flex-col items-center justify-center p-6">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/01/18/00/kids-2368253_960_720.jpg"
          alt="Enfants jouant avec technologie"
          className="w-full max-w-3xl rounded-3xl shadow-xl mb-4"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-700">
          Salut Lucie, alors que va-t-on créer aujourd’hui ?
        </h1>
      </div>

      {/* Partie basse */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Choisis un thème :</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map((theme, index) => (
            <button
              key={index}
              className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-200"
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
