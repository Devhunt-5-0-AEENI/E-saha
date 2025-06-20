import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';   

const Acceuil = () => {
  const [theme, setTheme] = useState('boy');
  const [showTheme, setShowTheme] = useState(false);
  const [language, setLanguage] = useState('fr');

  const translations = {
    fr: {
      boyMode: "Mode Garçon",
      girlMode: "Mode Fille",
      sectionTitle: "Rejoins My Blooming et commence l'aventure de l'apprentissage joyeux",
      sectionSubtitle: "C'est un monde magique pour stimuler la créativité, la curiosité et l'intelligence des jeunes ésprits",
    },
    en: {
      title: "Welcome to Safezone",
      subtitle: "Join our platform to explore, learn, and connect with a community dedicated to shaping the digital future.",
      boyMode: "Boy Mode",
      girlMode: "Girl Mode",
      sectionTitle: "Discover Our News",
      sectionSubtitle: "Stay updated with our latest posts, images, and videos.",
    },
    mg: {
      title: "Tongasoa eto amin'ny Safezone",
      subtitle: "Midira amin'ny sehatray hijery, hianatra, ary hifandray amin'ny fiaraha-monina manokan-tena amin'ny famolavolana ny ho avy nomerika.",
      boyMode: "Fomba Zazalahy",
      girlMode: "Fomba Zazavavy",
      sectionTitle: "Jereo Ny Vaovaontsika",
      sectionSubtitle: "Mijanòna ho vaovao amin'ny lahatsoratra, sary, ary horonan-tsary farany.",
    },
  };

  const t = translations[language];

  const themeColors = {
    boy: {
      text: 'text-black',
      button: 'bg-blue-500 hover:bg-blue-600',
    },
    girl: {
      text: 'text-pink-900',
      button: 'bg-pink-500 hover:bg-pink-600',
    },
  };

  const toggleThemeMenu = () => {
    setShowTheme(!showTheme);
  };

  const selectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setShowTheme(false);
  };

  // Données fictives pour les blogs
  const blogs = [
    {
      id: 1,
      type: 'image',
      src: '/assets/blog1.jpg',
      title: 'Événement Communautaire',
      description: 'Découvrez notre dernier événement avec des photos exclusives.',
    },
    {
      id: 2,
      type: 'video',
      src: '/assets/video1.mp4',
      title: 'Tutoriel Safezone',
      description: 'Apprenez à utiliser notre plateforme avec ce guide vidéo.',
    },
    {
      id: 3,
      type: 'image',
      src: '/assets/blog2.jpg',
      title: 'Nouvelles Fonctionnalités',
      description: 'Explorez les dernières mises à jour de Safezone.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Section Jaune */}
      <div className=" bg-[#F0D63E] flex flex-col  items-center justify-center p-6 relative">
        {/* Header Controls */}
        <div className="absolute top-4 right-4 flex gap-3 z-10">
          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={toggleThemeMenu}
              className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
            >
              <Palette className="w-4 h-4 mr-2" />
              {theme === 'boy' ? t.boyMode : t.girlMode}
            </button>
            {showTheme && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-10"
              >
                <div className="py-1">
                  <button
                    onClick={() => selectTheme('boy')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {t.boyMode}
                  </button>
                  <button
                    onClick={() => selectTheme('girl')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {t.girlMode}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Login Button */}
          <Link
            to="/login"
            className={`text-white font-semibold py-2 px-4 rounded-lg shadow-md ${themeColors[theme].button} hover:shadow-lg transition-all duration-300`}
          >
            Se connecter
          </Link>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-2xl">
          <h1 className={`text-5xl font-bold ${themeColors[theme].text} mb-4`}>
            {t.title}
          </h1>
          <p className={`text-lg ${themeColors[theme].text} mb-8`}>
            {t.subtitle}
          </p>
          <img
            src='src/assets/blomy.png'
            alt="Welcome to Safezone"
            className="w-[1000px] h-[300px] mx-auto"
          />
        </div>
      </div>

      {/* Section Blanche */}
      <div className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl font-bold ${themeColors[theme].text} mb-4`}>
            {t.sectionTitle}
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Blogs */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {blog.type === 'image' ? (
                <img
                  src={blog.src}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video
                  src={blog.src}
                  controls
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className={`text-xl font-semibold ${themeColors[theme].text} mb-2`}>
                  {blog.title}
                </h2>
                <p className="text-gray-600">
                  {blog.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Acceuil;