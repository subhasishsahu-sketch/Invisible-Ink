import { Card } from "@/components/ui/card";
import { Newspaper, Shield, Palette, MessageSquare } from "lucide-react";

const useCases = [
  {
    icon: Newspaper,
    title: "Journalism & Whistleblowing",
    description: "Securely transmit sensitive information to journalists without detection. Protect sources and maintain confidentiality."
  },
  {
    icon: Shield,
    title: "Personal Privacy",
    description: "Share private messages through public channels without revealing the content. Keep your communications secure."
  },
  {
    icon: Palette,
    title: "Creative Projects",
    description: "Embed hidden messages in artwork, photography, or digital media. Create interactive treasure hunts and puzzles."
  },
  {
    icon: MessageSquare,
    title: "Secure Communication",
    description: "Exchange confidential information in plain sight. Perfect for scenarios where encrypted files might raise suspicion."
  }
];

export default function UseCases() {
  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" data-testid="text-usecases-title">
            Use Cases
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-usecases-description">
            Discover how invisible ink can protect your privacy and enable secure communication in various scenarios.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="p-6 hover-elevate" data-testid={`card-usecase-${index}`}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <useCase.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2" data-testid={`text-usecase-${index}-title`}>{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-usecase-${index}-description`}>{useCase.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
