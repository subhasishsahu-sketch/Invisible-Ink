import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBackground from "@assets/generated_images/hero_background_encrypted_pattern.png";

export default function Hero() {
  const scrollToEncode = () => {
    const element = document.getElementById("encode");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHow = () => {
    const element = document.getElementById("how-it-works");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${heroBackground})`,
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" data-testid="text-hero-title">
          Hide Secret Messages
          <br />
          Inside Images
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
          Use advanced LSB steganography and Morse code to secretly embed and extract messages from any image. Your secrets, hidden in plain sight.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={scrollToEncode}
            className="bg-primary/90 backdrop-blur-md hover:bg-primary text-primary-foreground min-w-[200px]"
            data-testid="button-start-encoding"
          >
            Start Encoding
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToHow}
            className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 min-w-[200px]"
            data-testid="button-how-it-works"
          >
            How It Works
          </Button>
        </div>

        <button
          onClick={scrollToHow}
          className="mt-12 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          data-testid="button-scroll-down"
        >
          <span>Learn more</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
