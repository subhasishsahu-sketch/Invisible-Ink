import { Lock, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-primary" />
              <span className="font-semibold">Invisible Ink</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Hide secret messages in plain sight. Only those who know can reveal them.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Privacy Notice</h3>
            <p className="text-sm text-muted-foreground">
              All encoding and decoding happens locally in your browser. Your images and messages are never uploaded to our servers.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Attribution</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Random images powered by Unsplash API
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-github"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Invisible Ink. Your secrets, safe and invisible.
          </p>
        </div>
      </div>
    </footer>
  );
}
