import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailHeart {
  id: number;
  x: number;
  y: number;
}

const HeartCursorTrail = () => {
  const [trail, setTrail] = useState<TrailHeart[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newHeart: TrailHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setTrail((prev) => [...prev.slice(-8), newHeart]);
  }, []);

  useEffect(() => {
    let throttle = false;
    const handler = (e: MouseEvent) => {
      if (throttle) return;
      throttle = true;
      setTimeout(() => (throttle = false), 80);
      handleMouseMove(e);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-valentine-pink"
            style={{ left: heart.x - 8, top: heart.y - 8, fontSize: "16px" }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3, y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() =>
              setTrail((prev) => prev.filter((h) => h.id !== heart.id))
            }
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartCursorTrail;
