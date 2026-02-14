import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

const HeartParticles = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 12 + Math.random() * 20,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-valentine-rose opacity-40"
            style={{
              left: `${heart.x}%`,
              bottom: "-20px",
              fontSize: `${heart.size}px`,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(heart.id) * 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartParticles;
