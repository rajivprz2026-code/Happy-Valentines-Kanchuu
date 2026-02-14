import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MuteButtonProps {
  muted: boolean;
  onToggle: () => void;
}

const MuteButton = ({ muted, onToggle }: MuteButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 rounded-full bg-valentine-blush/80 backdrop-blur-sm hover:bg-valentine-pink hover:text-primary-foreground transition-all duration-300"
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </Button>
  );
};

export default MuteButton;
