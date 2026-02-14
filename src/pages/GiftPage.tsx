import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift, Heart, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
interface GiftPageProps {
  onRestart: () => void;
}
const giftEmojis = ["🎁", "🎀", "💝", "🌹", "🧸", "💎"];
const GiftPage = ({ onRestart }: GiftPageProps) => {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [redeemed, setRedeemed] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const handleGiftClick = (index: number) => {
    if (selectedGift !== null) return;
    setSelectedGift(index);
  };
  const handleRedeem = () => {
    setRedeemed(true);
    setTimeout(() => setShowLetter(true), 600);
  };
  const handleCloseLetter = () => {
    setShowLetter(false);
    setTimeout(() => onRestart(), 300);
  };
  return (
    <motion.div
      className="min-h-screen valentine-gradient flex flex-col items-center justify-center px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Floating hearts background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-xl pointer-events-none opacity-30"
          style={{ left: `${Math.random() * 100}%`, top: "-5%" }}
          animate={{ y: "110vh", rotate: 360 }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear",
          }}
        >
          💕
        </motion.div>
      ))}
      <motion.h1
        className="text-4xl md:text-6xl font-script text-foreground mb-3 z-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        Choose Your Gift 🎁
      </motion.h1>
      <motion.p
        className="text-lg font-body text-muted-foreground mb-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Pick the one that calls to your heart...
      </motion.p>
      {/* Gift grid */}
      <div className="grid grid-cols-3 gap-4 md:gap-6 z-10 max-w-md mx-auto">
        {giftEmojis.map((emoji, i) => (
          <motion.button
            key={i}
            className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center text-4xl md:text-5xl cursor-pointer border-2 transition-colors ${
              selectedGift === i
                ? "border-primary bg-primary/20 shadow-lg shadow-primary/30"
                : selectedGift !== null
                ? "border-muted bg-muted/30 opacity-50 cursor-not-allowed"
                : "border-primary/30 bg-card/80 hover:border-primary hover:bg-primary/10"
            }`}
            onClick={() => handleGiftClick(i)}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
            whileHover={selectedGift === null ? { scale: 1.1, rotate: 5 } : {}}
            whileTap={selectedGift === null ? { scale: 0.95 } : {}}
          >
            {selectedGift === i ? (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ✨
              </motion.span>
            ) : (
              emoji
            )}
          </motion.button>
        ))}
      </div>
      {/* Reveal popup */}
      <Dialog open={selectedGift !== null && !showLetter} onOpenChange={() => {}}>
        <DialogContent className="bg-card border-primary/30 max-w-sm text-center [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-script text-foreground">
              {redeemed ? "Redeemed For Life 😘" : "It's me! 🥹"}
            </DialogTitle>
          </DialogHeader>
          <AnimatePresence mode="wait">
            {!redeemed ? (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <motion.span
                  className="text-6xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🥹
                </motion.span>
                <p className="font-body text-muted-foreground text-lg">
                  Do you want anything other than me this Valentine?
                </p>
                <Button
                  onClick={handleRedeem}
                  className="rounded-full px-8 py-3 bg-primary text-primary-foreground font-body hover:scale-105 transition-transform mt-2"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  Redeem The Gift
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="redeemed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 py-4"
              >
                <motion.span
                  className="text-6xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  😘
                </motion.span>
                <p className="font-body text-foreground/80">
                  Loading your forever gift...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
      {/* Love letter popup */}
      <Dialog open={showLetter} onOpenChange={() => {}}>
        <DialogContent className="bg-[#fef6e4] border-primary/40 max-w-md p-0 overflow-hidden [&>button]:hidden">
          <div className="relative p-8 md:p-10">
            {/* Letter texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 27px, hsl(var(--primary) / 0.3) 28px)",
              }}
            />
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="font-script text-3xl text-primary mb-6 text-center">
                  My Love Letter 💌
                </p>
                <div className="font-body text-foreground/90 space-y-4 text-sm md:text-base leading-relaxed">
                  <p>My Dearest,</p>
                  <p>
                    From the moment you walked into my life, everything changed for the better.
                    Your smile is my sunrise, your laugh is my favorite melody, and your love
                    is the greatest gift I've ever received.
                  </p>
                  <p>
                    Every day with you feels like a beautiful dream I never want to wake up from.
                    You are my best friend, my soulmate, and the love of my life.
                  </p>
                  <p>
                    Thank you for choosing me, for loving me, and for being the most incredible
                    person I know. I promise to cherish every moment with you, today and always.
                  </p>
                  <p className="text-right font-script text-xl text-primary mt-6">
                    Forever Yours 💗
                  </p>
                </div>
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handleCloseLetter}
                    className="rounded-full px-10 py-4 bg-primary text-primary-foreground font-body text-lg hover:scale-105 transition-transform"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    I Love You
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
export default GiftPage;