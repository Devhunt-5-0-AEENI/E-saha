import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, User, Lock, Globe, Palette } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const SingInParent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("boy");
  const [language, setLanguage] = useState("fr");
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Ajout du state pour le nom d'utilisateur
  const [confirmPassword, setConfirmPassword] = useState(''); // Ajout du state pour la confirmation de mot de passe
  const [error, setError] = useState('');

  const handleLoginToServer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setIsLoading(false);
      return;
    }

    console.log('Submitting email:', email);
    console.log('Submitting password:', password);
    console.log('Submitting username:', username);

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
        username, // Ajout du username dans la requête
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Login successful:', response.data);
    } catch (err) {
      console.log('Full error response:', err.response);
      let errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string' && err.response.data.includes('<!DOCTYPE html>')) {
          errorMessage = 'Erreur serveur : Vérifiez l\'URL ou contactez l\'administrateur.';
        } else {
          errorMessage = err.response.data.message || errorMessage;
        }
      }
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const translations = {
    fr: {
      title: "Connexion",
      email: "Adresse e-mail",
      password: "Mot de passe",
      username: "Nom d'utilisateur", // Ajout de la traduction
      confirmPassword: "Confirmer le mot de passe", // Ajout de la traduction
      login: "Créer",
      noAccount: "Vous avez un compte ?",
      signUp: "Se connecter",
      emailPlaceholder: "votre@email.com",
      passwordPlaceholder: "Votre mot de passe",
      usernamePlaceholder: "Votre nom d'utilisateur", // Ajout du placeholder
      confirmPasswordPlaceholder: "Confirmez votre mot de passe", // Ajout du placeholder
      boyMode: "Mode Garçon",
      girlMode: "Mode Fille",
      french: "Français",
      english: "English",
      malagasy: "Malagasy",
    },
    en: {
      title: "Login",
      
      email: "Email address",
      password: "Password",
      username: "Username",
      confirmPassword: "Confirm Password",
      login: "Create",
      noAccount: "Have an account?",
      signUp: "Sign up",
      emailPlaceholder: "your@email.com",
      passwordPlaceholder: "Your password",
      usernamePlaceholder: "Your username",
      confirmPasswordPlaceholder: "Confirm your password",
      boyMode: "Boy Mode",
      girlMode: "Girl Mode",
      french: "Français",
      english: "English",
      malagasy: "Malagasy",
    },
    mg: {
      title: "Fidirana",
      email: "Adiresy mailaka",
      password: "Teny miafina",
      username: "Anarana mpampiasa",
      confirmPassword: "Hamafiso ny teny miafina",
      login: "Hiditra",
      noAccount: "Manana kaonty?",
      signUp: "Hiditra",
      emailPlaceholder: "ny@mailaka.com",
      passwordPlaceholder: "Ny teny miafina",
      usernamePlaceholder: "Ny anarana mpampiasa",
      confirmPasswordPlaceholder: "Hamafiso ny teny miafina",
      boyMode: "Fomba Zazalahy",
      girlMode: "Fomba Zazavavy",
      french: "Français",
      english: "English",
      malagasy: "Malagasy",
    },
  };

  const t = translations[language];

  const themeColors = {
    boy: {
      primary: "from-yellow-400 via-amber-400 to-orange-400",
      secondary: "from-blue-400 to-cyan-400",
      accent: "bg-yellow-500",
      card: "bg-white/90 backdrop-blur-sm",
      text: "text-yellow-900",
    },
    girl: {
      primary: "from-pink-400 via-rose-400 to-purple-400",
      secondary: "from-yellow-400 to-orange-400",
      accent: "bg-pink-500",
      card: "bg-white/90 backdrop-blur-sm",
      text: "text-pink-900",
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const toggleLanguageMenu = () => {
    setShowLanguage(!showLanguage);
    setShowTheme(false);
  };

  const toggleThemeMenu = () => {
    setShowTheme(!showTheme);
    setShowLanguage(false);
  };

  const selectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setShowTheme(false);
  };

  const backgroundElements = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className={`absolute w-4 h-4 rounded-full ${theme === "boy" ? "bg-blue-300/30" : "bg-pink-300/30"}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Number.POSITIVE_INFINITY,
        delay: Math.random() * 2,
      }}
    />
  ));

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeColors[theme].primary} relative overflow-hidden`}>
      <div className="absolute inset-0">
        {backgroundElements}
        <motion.div
          className={`absolute top-20 left-20 w-16 h-16 rounded-full bg-gradient-to-r ${themeColors[theme].secondary} opacity-60`}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute top-40 right-32 w-12 h-12 rounded-lg ${themeColors[theme].accent} opacity-50`}
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className={`absolute bottom-32 left-40 w-8 h-8 rounded-full bg-gradient-to-r ${themeColors[theme].secondary} opacity-70`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="absolute top-6 right-6 flex gap-3 z-10">
        <div className="relative">
          <button onClick={toggleLanguageMenu} className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            {language.toUpperCase()}
          </button>
          {showLanguage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-10"
            >
              <div className="py-1">
                <button onClick={() => setLanguage("fr")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  {t.french}
                </button>
                <button onClick={() => setLanguage("en")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  {t.english}
                </button>
                <button onClick={() => setLanguage("mg")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  {t.malagasy}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative">
          <button onClick={toggleThemeMenu} className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            {theme === "boy" ? t.boyMode : t.girlMode}
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
                <button onClick={() => selectTheme("boy")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  {t.boyMode}
                </button>
                <button onClick={() => selectTheme("girl")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  {t.girlMode}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[90vw]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-row items-center"
            >
              <img
                src="src/assets/blomy.png"
                alt="Logo Safezone"
                className="w-[1000px] h-50 z-20"
              />
              <div className={`${themeColors[theme].card} border-0 shadow-2xl rounded-xl w-[50vw] h-fit`}>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className={`w-20 h-10 mx-auto ${themeColors[theme].primary} flex items-center justify-center`}
                  >
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`text-3xl font-bold ${themeColors[theme].text}`}
                  >
                    {t.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 text-sm"
                  >
                    {t.subtitle}
                  </motion.p>
                </div>

                <div className="p-8 space-y-6">
                  <form onSubmit={handleLoginToServer} method="POST" className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-2"
                    >
                      <label htmlFor="username" className={`block text-sm font-medium mb-1 ${themeColors[theme].text}`}>
                        {t.username}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="username"
                          type="text"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder={t.usernamePlaceholder}
                          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-current transition-colors"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="space-y-2"
                    >
                      <label htmlFor="email" className={`block text-sm font-medium mb-1 ${themeColors[theme].text}`}>
                        {t.email}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t.emailPlaceholder}
                          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-current transition-colors"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-2"
                    >
                      <label htmlFor="password" className={`block text-sm font-medium mb-1 ${themeColors[theme].text}`}>
                        {t.password}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={t.passwordPlaceholder}
                          className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-current transition-colors"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="space-y-2"
                    >
                      <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${themeColors[theme].text}`}>
                        {t.confirmPassword}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder={t.confirmPasswordPlaceholder}
                          className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-current transition-colors"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </motion.div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="text-red-500 text-center"
                      >
                        {error}
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <button
                        type="submit"
                        className={`w-full bg-gradient-to-r ${themeColors[theme].primary} hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105`}
                        disabled={isLoading}
                      >
                        <AnimatePresence mode="wait">
                          {isLoading ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center justify-center"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                              />
                              Connexion...
                            </motion.div>
                          ) : (
                            <motion.span
                              key="login"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              {t.login}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </motion.div>
                  </form>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-center"
                  >
                    <div className="text-sm text-gray-600">
                      {t.noAccount}{" "}
                      <Link
                        to="/LoginParent"
                        className={`${themeColors[theme].text} hover:underline font-semibold transition-colors`}
                      >
                        {t.signUp}
                      </Link>
                    </div>

                    
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default SingInParent;