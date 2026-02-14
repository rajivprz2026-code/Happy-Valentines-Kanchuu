import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomePage from "./WelcomePage";
import CardsPage from "./CardsPage";
import QuizPage from "./QuizPage";
import DatePage from "./DatePage";
import FinalPage from "./FinalPage";
import GiftPage from "./GiftPage";
import HeartParticles from "@/components/HeartParticles";
import HeartCursorTrail from "@/components/HeartCursorTrail";
import MuteButton from "@/components/MuteButton";
import { bgMusic } from "@/lib/audio";

const Index = () => {
  const [page, setPage] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (muted) {
      bgMusic.stop();
    } else {
      bgMusic.start();
    }
    return () => bgMusic.stop();
  }, [muted]);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return (
    <div className="relative">
      <HeartParticles />
      <HeartCursorTrail />
      <MuteButton muted={muted} onToggle={toggleMute} />

      <AnimatePresence mode="wait">
        {page === 0 && <WelcomePage key="welcome" onStart={() => setPage(1)} />}
        {page === 1 && <CardsPage key="cards" onNext={() => setPage(2)} muted={muted} />}
        {page === 2 && <QuizPage key="quiz" onNext={() => setPage(3)} muted={muted} />}
        {page === 3 && <DatePage key="date" onNext={() => setPage(4)} />}
        {page === 4 && <FinalPage key="final" onNext={() => setPage(5)} />}
        {page === 5 && <GiftPage key="gift" onRestart={() => setPage(0)} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
