import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface FinalPageProps {
  onNext: () => void;
}

const FinalPage = ({ onNext }: FinalPageProps) => {
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number }[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setFireworks((prev) => [
        ...prev.slice(-20),
        { id: Date.now(), x: Math.random() * 100, y: Math.random() * 60 },
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen valentine-gradient flex flex-col items-center justify-center px-4 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Fireworks */}
      {fireworks.map((fw) => (
        <div key={fw.id} className="absolute pointer-events-none" style={{ left: `${fw.x}%`, top: `${fw.y}%` }}>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: `hsl(${(fw.id + i * 45) % 360}, 80%, 65%)` }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((i * 45 * Math.PI) / 180) * 40,
                y: Math.sin((i * 45 * Math.PI) / 180) * 40,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1 }}
            />
          ))}
        </div>
      ))}

      {/* Confetti rain */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute text-xl pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: "-5%" }}
          animate={{ y: "110vh", rotate: 360 * (Math.random() > 0.5 ? 1 : -1) }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "linear",
          }}
        >
          {["❤️", "💖", "💕", "🎉", "✨", "🌹", "💗", "🎊"][i % 8]}
        </motion.div>
      ))}

      <div className="text-center z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-script text-foreground mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          Happy Valentine&apos;s Day! 💖
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-body text-muted-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          To my sweetheart...
        </motion.p>

        <motion.p
          className="text-lg font-body text-foreground/80 max-w-md mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Every day with you feels like Valentine&apos;s Day. Thank you for being the most wonderful part of my life. 💝
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <Button
            onClick={onNext}
            className="rounded-full px-8 py-4 bg-primary text-primary-foreground font-body text-lg hover:scale-105 transition-transform"
          >
            <Gift className="mr-2 h-5 w-5" />
            Do you want a gift? 🎁
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FinalPage;
