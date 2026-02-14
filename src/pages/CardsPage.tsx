import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { playClickSound } from "@/lib/audio";

const memories = [
  {
    date: "Oct 27, 2025",
    message: "Our first meet ☕ — I knew right then you were special 💕",
    image: "/img1.jpg",
  },
  {
    date: "Nov 3, 2025",
    message: "Our first hug day — Since then i am all yours.😊",
    image: "/img2.jpg",
  },
  {
    date: "Nov 8, 2025",
    message: "That sunset meet in kahukhola, enjoyed every moment✨",
    image: "/img3.jpg",
  },
  {
    date: "Dec 6, 2025",
    message: "Met near fewalake — stayed singing our hearts out 🎶",
    image: "/img4.jpg",
  },
  {
    date: "Jan 9, 2026",
    message: "Having the best chatpat in town - together as always💖",
    image: "/img5.jpg",
  },
  {
    date: "Jan 13, 2026",
    message: "Our first selfie together - taken by you, hehe 🎁",
    image: "/img6.jpg",
  },
];

interface CardsPageProps {
  onNext: () => void;
  muted?: boolean;
}

const CardsPage = ({ onNext, muted }: CardsPageProps) => {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [yesClicks, setYesClicks] = useState(0);
  const [noClicks, setNoClicks] = useState(0);
  const [showLoveGame, setShowLoveGame] = useState(false);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  const flipCard = (index: number, e: React.MouseEvent) => {
    if (flipped.has(index)) {
      if (!muted) playClickSound();
      setFlipped((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
      return;
    }

    if (!muted) playClickSound();
    setFlipped((prev) => new Set(prev).add(index));

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const burst = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top,
    };

    setBursts((prev) => [...prev, burst]);
    setTimeout(
      () => setBursts((prev) => prev.filter((b) => b.id !== burst.id)),
      1500
    );
  };

  const yesScale = 1 + yesClicks * 0.5 + noClicks * 0.5;
  const noDisappeared = noClicks >= 3;

  const handleYesClick = () => {
    if (!muted) playClickSound();
    const next = yesClicks + 1;
    setYesClicks(next);
    if (next >= 3 || noDisappeared) {
      onNext();
    }
  };

  const handleNoClick = () => {
    if (!muted) playClickSound();
    setNoClicks((c) => c + 1);
  };

  return (
    <motion.div
      className="min-h-screen valentine-gradient flex flex-col items-center py-8 px-4 relative overflow-hidden"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heart bursts */}
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="fixed pointer-events-none z-40"
            style={{ left: burst.x, top: burst.y }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-xl"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * 60 * Math.PI) / 180) * 60,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 60 - 30,
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{ duration: 0.8 }}
              >
                💖
              </motion.span>
            ))}
          </div>
        ))}
      </AnimatePresence>

      <motion.h1
        className="text-4xl md:text-5xl font-script text-foreground mb-8 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Our Precious Memories 💕
      </motion.h1>

      {/* Photo Memory Collage */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-2xl mb-10 w-full">
        {memories.map((mem, i) => (
          <motion.div
            key={i}
            className="relative cursor-pointer"
            style={{ perspective: 800 }}
            initial={{ scale: 0, rotate: (i % 2 === 0 ? -1 : 1) * (3 + i) }}
            animate={{ scale: 1, rotate: (i % 2 === 0 ? -2 : 2) }}
            transition={{ delay: i * 0.12, type: "spring" }}
            onClick={(e) => flipCard(i, e)}
          >
            <motion.div
              className="w-full rounded-xl shadow-lg"
              animate={{ rotateY: flipped.has(i) ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {!flipped.has(i) ? (
                <div className="bg-card border-4 border-background rounded-xl p-2 shadow-md">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2">
                    <img
                      src={mem.image}
                      alt={mem.date}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground font-body text-center pb-1">
                    📅 {mem.date}
                  </p>
                </div>
              ) : (
                <motion.div
                  className="bg-valentine-blush border-4 border-primary/20 rounded-xl w-full aspect-[3/4] flex flex-col items-center justify-center text-sm md:text-base font-body text-foreground p-4"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <p className="text-center leading-relaxed">
                    {mem.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    📅 {mem.date}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Love Game trigger */}
      {flipped.size >= 3 && !showLoveGame && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Button
            onClick={() => setShowLoveGame(true)}
            className="rounded-full px-6 py-4 bg-accent text-accent-foreground font-body hover:scale-105 transition-transform"
          >
            A question for you... 💝
          </Button>
        </motion.div>
      )}

      {/* Yes/No Love Game */}
      {showLoveGame && (
        <motion.div
          className="text-center mt-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <h2 className="text-3xl md:text-4xl font-script text-foreground mb-6">
            Do you love me? 💕
          </h2>

          <div
            className="flex gap-4 items-center justify-center relative"
            style={{ minHeight: 100 }}
          >
            <motion.div
              animate={{ scale: 1 + yesClicks * 0.5 + noClicks * 0.5 }}
              transition={{ type: "spring" }}
              className={noClicks >= 3 ? "mx-auto" : ""}
            >
              <Button
                onClick={handleYesClick}
                className="rounded-full px-6 py-3 bg-primary text-primary-foreground font-body text-lg"
              >
                Yes! 💖
              </Button>
            </motion.div>

            <AnimatePresence>
              {noClicks < 3 && (
                <motion.div
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Button
                    onClick={handleNoClick}
                    variant="outline"
                    className="rounded-full px-6 py-3 font-body text-lg border-primary text-foreground"
                  >
                    No 😢
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CardsPage;
