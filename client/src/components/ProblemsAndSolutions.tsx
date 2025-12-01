import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

const problems = [
  {
    title: "Image Compression",
    problem: "Many apps automatically reduce image quality when you save or share them. This compression removes tiny details from the image — including your hidden message.",
    solution: "Always share the encoded image as a file, not as a photo. Use file-sharing methods that keep the original quality like email, cloud storage, or file transfer apps."
  },
  {
    title: "File Format Changes",
    problem: "Changing the image format (like PNG to JPG or vice versa) rewrites the entire image. This process destroys all the hidden data inside.",
    solution: "Always keep and share the image in the original PNG format exactly as you downloaded it. Don't convert it to JPG or any other format."
  },
  {
    title: "Image Resizing",
    problem: "Stretching or shrinking the image changes the pixels. When pixels are resized, the hidden message is erased because the exact pixel data is no longer there.",
    solution: "Never resize or stretch the encoded image. Keep it at its original size when sharing with others."
  },
  {
    title: "Cropping or Rotating",
    problem: "Cropping removes parts of the image, and rotating may rewrite pixels. Both actions destroy the hidden message inside.",
    solution: "Avoid cropping or rotating the encoded image. Share it exactly as it was created, without any modifications to its orientation or size."
  },
  {
    title: "Applying Filters or Edits",
    problem: "Filters, brightness changes, contrast adjustments, or any editing changes the pixel values. These edits delete the hidden data.",
    solution: "Don't edit the encoded image in any way. No filters, no brightness/contrast changes, no color adjustments — keep it completely unmodified."
  },
  {
    title: "Taking a Screenshot",
    problem: "When you take a screenshot of the image, it creates a brand-new image file. This new image was never encoded, so it has no hidden message inside.",
    solution: "Always share the original downloaded file, never a screenshot. Encourage the person receiving it to decode the original file directly."
  },
  {
    title: "Auto-Compression by Apps",
    problem: "Social media apps (like Instagram, Facebook, WhatsApp, iMessage) and messaging apps automatically compress images and destroy the hidden message.",
    solution: "Use file-sharing methods that preserve the original quality: email attachments, Google Drive, Dropbox, Telegram (send as file), or direct file transfer instead of sharing through social media or chat apps."
  }
];

export default function ProblemsAndSolutions() {
  return (
    <section id="problems" className="py-12 lg:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2" data-testid="text-problems-title">
            Common Problems & Solutions
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto" data-testid="text-problems-description">
            Your hidden message can be lost if the image is modified. Here's what to watch out for.
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3 max-w-4xl mx-auto" data-testid="problems-grid">
          {problems.map((item, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-2 sm:gap-3" data-testid={`problem-row-${index}`}>
              {/* Problem Card */}
              <Card className="p-3 sm:p-4 hover-elevate transition-all bg-amber-50/50 dark:bg-amber-950/20 border-l-4 border-l-amber-600 dark:border-l-amber-400" data-testid={`problem-card-${index}`}>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" data-testid={`problem-icon-${index}`} />
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-semibold mb-1 text-amber-900 dark:text-amber-100" data-testid={`problem-title-${index}`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-amber-800 dark:text-amber-200" data-testid={`problem-description-${index}`}>
                      {item.problem}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Solution Card */}
              <Card className="p-3 sm:p-4 hover-elevate transition-all bg-green-50/50 dark:bg-green-950/20 border-l-4 border-l-green-600 dark:border-l-green-400" data-testid={`solution-card-${index}`}>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" data-testid={`solution-icon-${index}`} />
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-semibold mb-1 text-green-900 dark:text-green-100" data-testid={`solution-heading-${index}`}>
                      Solution
                    </h3>
                    <p className="text-xs text-green-800 dark:text-green-200" data-testid={`solution-text-${index}`}>
                      {item.solution}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-lg p-3 sm:p-4 text-center" data-testid="best-practices-box">
          <h3 className="text-xs sm:text-sm font-semibold mb-1 text-blue-900 dark:text-blue-100" data-testid="best-practices-title">
            Best Practice
          </h3>
          <p className="text-xs text-blue-800 dark:text-blue-200" data-testid="best-practices-text">
            Always share encoded images as file attachments or through file-sharing services. This ensures the hidden message stays safe and intact.
          </p>
        </div>
      </div>
    </section>
  );
}
