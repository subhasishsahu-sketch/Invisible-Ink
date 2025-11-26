import { Card } from "@/components/ui/card";
import { FileText, Code2, Image as ImageIcon, Lock } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Text Input",
    description: "Enter your secret message that you want to hide within an image."
  },
  {
    icon: Code2,
    title: "Morse Conversion",
    description: "Your text is converted to Morse code (dots and dashes), then to binary data."
  },
  {
    icon: ImageIcon,
    title: "LSB Steganography",
    description: "Binary data is embedded in the least significant bits of the image pixels."
  },
  {
    icon: Lock,
    title: "Hidden Message",
    description: "The image looks identical to the original, but contains your secret message."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" data-testid="text-how-title">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-how-description">
            Our steganography process uses a multi-layer approach to ensure your messages remain completely hidden and secure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 hover-elevate" data-testid={`card-step-${index}`}>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-medium text-primary mb-2">Step {index + 1}</div>
                <h3 className="text-lg font-medium mb-2" data-testid={`text-step-${index}-title`}>{step.title}</h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-step-${index}-description`}>{step.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-muted/30 rounded-md p-8">
          <h3 className="text-xl font-medium mb-4 text-center">Why LSB Steganography?</h3>
          <div className="max-w-3xl mx-auto space-y-3 text-muted-foreground">
            <p className="text-sm">
              <strong className="text-foreground">Invisible Changes:</strong> The least significant bit of each pixel is modified, which is imperceptible to the human eye. The image quality remains identical.
            </p>
            <p className="text-sm">
              <strong className="text-foreground">Morse Code Layer:</strong> Converting text to Morse code first adds an additional layer of obfuscation and compresses the data efficiently.
            </p>
            <p className="text-sm">
              <strong className="text-foreground">Binary Encoding:</strong> The final binary representation allows for precise bit-level manipulation within the image data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
