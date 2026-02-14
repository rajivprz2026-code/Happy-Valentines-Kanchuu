import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface WelcomePageProps {
  onStart: () => void;
}

const WelcomePage = ({ onStart }: WelcomePageProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen valentine-gradient relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-center z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-script text-foreground mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          I have a surprise for you 💝
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-10 font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Something special awaits...
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        >
          <Button
            onClick={onStart}
            className="rounded-full px-8 py-6 text-lg font-body bg-primary hover:bg-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Heart className="mr-2 h-5 w-5" />
            Click to Reveal
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative floating hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-valentine-rose/20 text-4xl"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          💖
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WelcomePage;
