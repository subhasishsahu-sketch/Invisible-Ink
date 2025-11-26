import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-primary" data-testid="icon-logo" />
            <span className="text-xl font-semibold" data-testid="text-app-name">Invisible Ink</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("encode")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-encode"
            >
              Encode
            </button>
            <button
              onClick={() => scrollToSection("decode")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-decode"
            >
              Decode
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-how-it-works"
            >
              How It Works
            </button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
        </div>
      </div>
    </header>
  );
}
