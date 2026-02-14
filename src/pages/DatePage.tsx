import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface DatePageProps {
  onNext: () => void;
}

const DatePage = ({ onNext }: DatePageProps) => {
  // Fixed date
  const month = "October";
  const day = 8;
  const year = 2026; // Change year if needed

  return (
    <motion.div
      className="min-h-screen valentine-gradient flex flex-col items-center justify-center px-4 relative overflow-hidden"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center z-10">
        <motion.div
          className="text-3xl md:text-5xl font-script text-foreground mb-2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {month}
        </motion.div>

        <motion.div
          className="text-8xl md:text-[10rem] font-bold font-script text-primary leading-none"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        >
          {day}
        </motion.div>

        <motion.div
          className="text-3xl md:text-5xl font-script text-foreground mt-2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {year}
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl font-body text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          A day to remember 💗<br />
          The day we started talking.❤️
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8"
        >
          <Button
            onClick={onNext}
            className="rounded-full px-8 py-4 bg-primary text-primary-foreground font-body hover:scale-105 transition-transform"
          >
            One more surprise <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Floating decorations */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl pointer-events-none"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {["💗", "🌸", "💕", "✨"][i % 4]}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DatePage;
