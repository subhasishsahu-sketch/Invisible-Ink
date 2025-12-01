import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBackground from "@assets/generated_images/hero_background_encrypted_pattern.png";

export default function Hero() {
  const scrollToEncode = () => {
    const element = document.getElementById("encode");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDecode = () => {
    const element = document.getElementById("decode");
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
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-16 lg:py-20">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 leading-tight" data-testid="text-hero-title">
          Hide Secret Messages
          <br />
          Inside Images
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
          Secretly embed and extract hidden messages from any image. Your secrets, invisible in plain sight.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
          <Button
            size="lg"
            onClick={scrollToEncode}
            className="bg-primary/90 backdrop-blur-md hover:bg-primary text-primary-foreground w-full sm:w-auto sm:min-w-[200px]"
            data-testid="button-start-encoding"
          >
            Hide a Message
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToDecode}
            className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 w-full sm:w-auto sm:min-w-[200px]"
            data-testid="button-reveal-message"
          >
            Reveal a Message
          </Button>
        </div>

        <button
          onClick={scrollToEncode}
          className="mt-12 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          data-testid="button-scroll-down"
        >
          <span>Get started</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
