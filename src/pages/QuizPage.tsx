import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { playCorrectSound, playWrongSound } from "@/lib/audio";

interface QuizPageProps {
  onNext: () => void;
  muted?: boolean;
}

const questions = [
  {
    question: "What's my favorite color? 🎨",
    options: ["Blue 💙", "Red ❤️", "Yellow 💛", "Pink 💖"],
    correct: 0,
  },
  {
    question: "What's our favorite food? 🍽️",
    options: ["Butter Chicken🍗", "Pizza 🍕", "Pasta 🍝", "Chatpat 🌮"],
    correct: 0,
  },
  {
    question: "Where did we first meet? 📍",
    options: ["Park 🌳", "School 🏫", "Online 💻", "Cafe ☕"],
    correct: 2,
  },
  {
    question: "What's the first song you suggested and I sang? 🎵",
    options: ["Saino 🎶", "Meet 💕", "Lover 🎤", " Kasari ⏰"],
    correct: 1,
  },
  {
    question: "What do I love most about you? 💝",
    options: ["Your smile 😊", "Your laugh 😂", "Your eyes 👀", "Everything! 💖"],
    correct: 3,
  },
];

const QuizPage = ({ onNext, muted }: QuizPageProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const correct = index === questions[currentQ].correct;
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
      if (!muted) playCorrectSound();
    } else {
      if (!muted) playWrongSound();
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  const q = questions[currentQ];
  const progress = ((currentQ + (finished ? 1 : 0)) / questions.length) * 100;

  return (
    <motion.div
      className="min-h-screen valentine-gradient flex flex-col items-center justify-center px-4 py-8 relative"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md">
        <motion.h1
          className="text-4xl md:text-5xl font-script text-foreground mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          How well do you know me? 💭
        </motion.h1>

        <Progress value={progress} className="mb-8 h-3 bg-valentine-blush" />
        <p className="text-center text-muted-foreground font-body mb-2 text-sm">
          Question {currentQ + 1} of {questions.length}
        </p>

        {!finished ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-script text-foreground mb-6 text-center">
                {q.question}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((opt, i) => (
                  <motion.div key={i} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleAnswer(i)}
                      disabled={selected !== null}
                      className={`w-full rounded-2xl py-4 text-base font-body transition-all duration-300 ${
                        selected === i
                          ? isCorrect
                            ? "bg-green-400 text-white"
                            : "bg-destructive text-destructive-foreground animate-shake"
                          : selected !== null && i === q.correct
                          ? "bg-green-400 text-white"
                          : "bg-valentine-blush text-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                      variant="ghost"
                    >
                      {opt}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {isCorrect !== null && (
                  <motion.div
                    className="mt-4 text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring" }}
                  >
                    {isCorrect ? (
                      <span className="text-3xl">Yay! 💖🎉</span>
                    ) : (
                      <span className="text-3xl">Oops! ❌</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            className="text-center bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <h2 className="text-3xl font-script text-foreground mb-4">
              You scored {score}/{questions.length}! 🎉
            </h2>
            <p className="text-lg font-body text-muted-foreground mb-6">
              {score === questions.length
                ? "You know me perfectly! 💖"
                : score >= 3
                ? "Pretty good! You're getting there 💕"
                : "Let's make more memories together! 🥰"}
            </p>
            <Button
              onClick={onNext}
              className="rounded-full px-8 py-4 bg-primary text-primary-foreground font-body hover:scale-105 transition-transform"
            >
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Confetti on correct */}
      <AnimatePresence>
        {isCorrect === true && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="fixed text-2xl pointer-events-none z-40"
                style={{ left: `${10 + Math.random() * 80}%`, top: "40%" }}
                initial={{ y: 0, opacity: 1 }}
                animate={{
                  y: -200 - Math.random() * 200,
                  x: (Math.random() - 0.5) * 200,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                {["✨", "💖", "🎉", "💕", "⭐"][i % 5]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizPage;
