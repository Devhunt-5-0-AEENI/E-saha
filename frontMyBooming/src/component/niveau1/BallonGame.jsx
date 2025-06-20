"use client"

import { useState, useEffect } from "react"
import { Trophy, RotateCcw, Heart, Globe, Users } from "lucide-react"

const translations = {
  fr: {
    title: "Jeu d'Addition de Ballons",
    question: "Quelle est la somme de :",
    gameOver: "Jeu Terminé !",
    retry: "Réessayer",
    perfect: "Parfait ! Tu es un champion ! 🏆",
    great: "Très bien ! Continue comme ça ! 🌟",
    good: "Pas mal ! Tu peux faire mieux ! 💪",
    practice: "Continue à t'entraîner ! 📚",
    correct: [
      "Fantastique ! 🎉",
      "Bravo champion ! 🌟",
      "Excellent travail ! 🎈",
      "Tu es incroyable ! ✨",
      "Parfait ! Continue ! 🚀",
    ],
    incorrect: "Essaie encore ! La réponse était",
    language: "Langue",
    mode: "Mode",
    french: "Français",
    english: "Anglais",
    malagasy: "Malagasy",
    boy: "Garçon",
    girl: "Fille",
  },
  en: {
    title: "Balloon Addition Game",
    question: "What is the sum of:",
    gameOver: "Game Over!",
    retry: "Try Again",
    perfect: "Perfect! You're a champion! 🏆",
    great: "Great job! Keep it up! 🌟",
    good: "Not bad! You can do better! 💪",
    practice: "Keep practicing! 📚",
    correct: [
      "Fantastic! 🎉",
      "Great job, champ! 🌟",
      "Excellent work! 🎈",
      "You're amazing! ✨",
      "Perfect! Keep going! 🚀",
    ],
    incorrect: "Try again! The answer was",
    language: "Language",
    mode: "Mode",
    french: "French",
    english: "English",
    malagasy: "Malagasy",
    boy: "Boy",
    girl: "Girl",
  },
  mg: {
    title: "Lalao Fanampiana Balôna",
    question: "Inona ny fitambaran'ny:",
    gameOver: "Vita ny lalao!",
    retry: "Andramo indray",
    perfect: "Tena tsara! Tompiona ianao! 🏆",
    great: "Tsara be! Tohizo ihany! 🌟",
    good: "Tsy ratsy! Afaka manao tsaratsara kokoa ianao! 💪",
    practice: "Tohizo ny fampiharana! 📚",
    correct: [
      "Mahafinaritra! 🎉",
      "Tsara be, tompiona! 🌟",
      "Asa tsara! 🎈",
      "Mahagaga ianao! ✨",
      "Tena tsara! Tohizo! 🚀",
    ],
    incorrect: "Andramo indray! Ny valiny dia",
    language: "Fiteny",
    mode: "Fomba",
    french: "Frantsay",
    english: "Anglisy",
    malagasy: "Malagasy",
    boy: "Zazalahy",
    girl: "Zazavavy",
  },
}

export default function Component() {
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [question, setQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [language, setLanguage] = useState("fr")
  const [mode, setMode] = useState("girl")
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showModeMenu, setShowModeMenu] = useState(false)

  const maxQuestions = 3

  const balloonColors = [
    "bg-red-500 hover:bg-red-600",
    "bg-blue-500 hover:bg-blue-600",
    "bg-green-500 hover:bg-green-600",
    "bg-yellow-500 hover:bg-yellow-600",
  ]

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 9) + 1
    const num2 = Math.floor(Math.random() * 9) + 1
    const correctAnswer = num1 + num2
    const wrongAnswers = []
    while (wrongAnswers.length < 3) {
      const wrong = correctAnswer + Math.floor(Math.random() * 10) - 5
      if (wrong !== correctAnswer && wrong > 0 && wrong <= 20 && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong)
      }
    }
    const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5)
    setQuestion({ num1, num2, correctAnswer, options })
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswerClick = (answer) => {
    if (showResult) return
    setSelectedAnswer(answer)
    const correct = answer === question?.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) {
      setCorrectAnswers((prev) => prev + 1)
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }
    setTimeout(() => {
      if (currentQuestion >= maxQuestions) {
        const finalScore = Math.round(((correctAnswers + (correct ? 1 : 0)) / maxQuestions) * 100)
        setScore(finalScore)
        setGameFinished(true)
      } else {
        setCurrentQuestion((prev) => prev + 1)
        generateQuestion()
      }
    }, 2500)
  }

  const resetGame = () => {
    setScore(0)
    setCurrentQuestion(1)
    setCorrectAnswers(0)
    setGameFinished(false)
    setShowResult(false)
    setSelectedAnswer(null)
    setShowCelebration(false)
    generateQuestion()
  }

  useEffect(() => {
    generateQuestion()
  }, [])

  const getScoreMessage = () => {
    if (score === 100) return translations[language].perfect
    if (score >= 67) return translations[language].great
    if (score >= 34) return translations[language].good
    return translations[language].practice
  }

  const backgroundGradient = mode === "boy"
    ? "from-yellow-400 via-orange-300 to-red-300"
    : "from-pink-400 via-rose-300 to-purple-300"

  const headerGradient = mode === "boy"
    ? "from-yellow-600 to-orange-600"
    : "from-pink-600 to-purple-600"

  if (gameFinished) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} p-4 flex items-center justify-center transition-all duration-1000`}>
        <div className="max-w-md mx-auto flex justify-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center animate-[popIn_0.5s_ease-out]">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-[trophySpin_2s_infinite]" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{translations[language].gameOver}</h2>
              <div className="text-6xl font-bold text-purple-600 mb-2 animate-[pulse_1s_infinite]">{score}%</div>
              <p className="text-lg text-gray-600 mb-4">{getScoreMessage()}</p>
              <p className="text-sm text-gray-500">
                {translations[language].correctAnswers} {correctAnswers} {translations[language].outOf} {maxQuestions} {translations[language].questions}
              </p>
            </div>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2 mx-auto animate-[bounce_2s_infinite]"
            >
              <RotateCcw className="w-5 h-5" />
              {translations[language].retry}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} p-4 flex items-center justify-center transition-all duration-1000 relative`}>
      <div className="max-w-md mx-auto">
        {/* Language Button */}
        <button
          onClick={() => {
            setShowLanguageMenu(!showLanguageMenu)
            setShowModeMenu(false)
          }}
          className="absolute top-4 right-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 animate-[float_3s_infinite]"
        >
          <Globe className="w-6 h-6" />
        </button>

        {/* Mode Button */}
        <button
          onClick={() => {
            setShowModeMenu(!showModeMenu)
            setShowLanguageMenu(false)
          }}
          className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white p-3 rounded-full shadow-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 animate-[float_3.5s_infinite]"
        >
          <Users className="w-6 h-6" />
        </button>

        {/* Language Menu */}
        {showLanguageMenu && (
          <div className="absolute top-16 right-16 bg-white rounded-2xl p-4 shadow-xl animate-[slideIn_0.3s_ease-out] z-20">
            <h3 className="font-bold text-gray-700 mb-2">{translations[language].language}</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setLanguage("fr")
                  setShowLanguageMenu(false)
                }}
                className={`px-3 py-1 rounded-full text-sm ${language === "fr" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400 hover:text-white transition-all duration-200 animate-[popIn_0.2s_ease-out]`}
              >
                {translations[language].french}
              </button>
              <button
                onClick={() => {
                  setLanguage("en")
                  setShowLanguageMenu(false)
                }}
                className={`px-3 py-1 rounded-full text-sm ${language === "en" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400 hover:text-white transition-all duration-200 animate-[popIn_0.2s_ease-out_0.1s]`}
              >
                {translations[language].english}
              </button>
              <button
                onClick={() => {
                  setLanguage("mg")
                  setShowLanguageMenu(false)
                }}
                className={`px-3 py-1 rounded-full text-sm ${language === "mg" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400 hover:text-white transition-all duration-200 animate-[popIn_0.2s_ease-out_0.2s]`}
              >
                {translations[language].malagasy}
              </button>
            </div>
          </div>
        )}

        {/* Mode Menu */}
        {showModeMenu && (
          <div className="absolute top-16 right-4 bg-white rounded-2xl p-4 shadow-xl animate-[slideIn_0.3s_ease-out] z-20">
            <h3 className="font-bold text-gray-700 mb-2">{translations[language].mode}</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setMode("boy")
                  setShowModeMenu(false)
                }}
                className={`px-3 py-1 rounded-full text-sm ${mode === "boy" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-yellow-400 hover:text-white transition-all duration-200 animate-[popIn_0.2s_ease-out]`}
              >
                {translations[language].boy}
              </button>
              <button
                onClick={() => {
                  setMode("girl")
                  setShowModeMenu(false)
                }}
                className={`px-3 py-1 rounded-full text-sm ${mode === "girl" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-pink-400 hover:text-white transition-all duration-200 animate-[popIn_0.2s_ease-out_0.1s]`}
              >
                {translations[language].girl}
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className={`bg-gradient-to-r ${headerGradient} rounded-t-3xl p-6 text-white text-center shadow-lg animate-[fadeIn_0.5s_ease-out]`}>
          <h1 className="text-2xl font-bold mb-2">🎈 {translations[language].title}</h1>
          <p className="text-purple-100">
            {translations[language].question} {currentQuestion} {translations[language].outOf} {maxQuestions}
          </p>
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-b-3xl p-6 shadow-lg relative overflow-hidden animate-[popIn_0.5s_ease-out]">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className={`bg-gradient-to-r ${mode === "boy" ? "from-yellow-500 to-orange-500" : "from-pink-500 to-purple-500"} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${(currentQuestion / maxQuestions) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          {question && (
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 animate-[fadeIn_0.3s_ease-out]">{translations[language].question}</h2>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-2xl font-bold text-blue-700 shadow-lg animate-[bounceIn_0.5s_ease-out]">
                  {question.num1}
                </div>
                <span className="text-3xl font-bold text-gray-600">+</span>
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-2xl font-bold text-blue-700 shadow-lg animate-[bounceIn_0.5s_ease-out_0.2s]">
                  {question.num2}
                </div>
                <span className="text-3xl font-bold text-gray-600">=</span>
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 shadow-lg animate-[bounceIn_0.5s_ease-out_0.4s]">
                  ?
                </div>
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-6">
                {question.options.map((option, index) => (
                  <button
                    key={`${option}-${index}`}
                    className={`
                      ${balloonColors[index]} text-white text-2xl font-bold 
                      w-24 h-24 rounded-full shadow-lg transform transition-all duration-200
                      ${selectedAnswer === option ? "ring-4 ring-white scale-110" : ""}
                      ${showResult && option === question.correctAnswer ? "ring-4 ring-green-400 scale-110" : ""}
                      ${showResult && selectedAnswer === option && !isCorrect ? "ring-4 ring-red-400 scale-110" : ""}
                      ${!showResult ? "hover:scale-110 hover:shadow-xl" : ""}
                      mx-auto animate-[float_2s_infinite_${index * 0.2}s]
                    `}
                    onClick={() => handleAnswerClick(option)}
                    disabled={showResult}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Result Message */}
              {showResult && (
                <div
                  className={`mt-6 p-4 rounded-2xl text-center font-bold text-lg transition-all duration-500 ${
                    isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  } animate-[popIn_0.3s_ease-out]`}
                >
                  {isCorrect ? (
                    <div className="flex items-center justify-center gap-2">
                      <Trophy className="w-6 h-6" />
                      {translations[language].correct[Math.floor(Math.random() * translations[language].correct.length)]}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Heart className="w-6 h-6" />
                      {translations[language].incorrect} {question.correctAnswer}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-8 animate-[fadeIn_0.5s_ease-out]">
            <p>{translations[language].footer}</p>
          </div>

          {/* Celebration Animation */}
          {showCelebration && (
            <>
              <div className="fixed left-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                <div className="flex flex-col items-center space-y-8">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={`left-${i}`}
                      className="text-5xl animate-[bounce_1s_infinite]"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    >
                      {i % 2 === 0 ? "🎉" : "🎈"}
                    </span>
                  ))}
                </div>
              </div>
              <div className="fixed right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                <div className="flex flex-col items-center space-y-8">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={`right-${i}`}
                      className="text-5xl animate-[bounce_1s_infinite]"
                      style={{ animationDelay: `${i * 0.3 + 0.15}s` }}
                    >
                      {i % 2 === 0 ? "⭐" : "✨"}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tailwind CSS Animation Keyframes */}
      <style jsx global>{`
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideIn {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: translateY(-20px); opacity: 0; }
          60% { transform: translateY(5px); opacity: 1; }
          100% { transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        @keyframes trophySpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-popIn {
          animation: popIn 0.5s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-bounceIn {
          animation: bounceIn 0.5s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-trophySpin {
          animation: trophySpin 2s linear infinite;
        }
      `}</style>
    </div>
  )
}