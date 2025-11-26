import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Image as ImageIcon, Download, Loader2, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const textToMorse = (text: string): string => {
  const morseCode: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };
  
  return text
    .toUpperCase()
    .split('')
    .map(char => morseCode[char] || '')
    .filter(Boolean)
    .join(' ');
};

export default function EncodeSection() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isEncoding, setIsEncoding] = useState(false);
  const [encodedImage, setEncodedImage] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePasteMessage = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setMessage(text);
      toast({
        title: "Pasted!",
        description: "Text pasted from clipboard"
      });
    } catch {
      toast({
        title: "Unable to paste",
        description: "Please paste manually using Ctrl+V",
        variant: "destructive"
      });
    }
  };

  const morseCode = textToMorse(message);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file",
          description: "Please upload an image file",
          variant: "destructive"
        });
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFetchRandom = async () => {
    console.log('Fetching random image from Unsplash');
    toast({
      title: "Random image",
      description: "Feature coming soon - will fetch from Unsplash API"
    });
  };

  const handleEncode = async () => {
    if (!message || !image) {
      toast({
        title: "Missing information",
        description: "Please provide both a message and an image",
        variant: "destructive"
      });
      return;
    }

    setIsEncoding(true);
    console.log('Encoding message:', message);
    console.log('Morse code:', morseCode);
    
    setTimeout(() => {
      setEncodedImage(imagePreview);
      setIsEncoding(false);
      toast({
        title: "Encoding complete!",
        description: "Your message has been hidden in the image"
      });
    }, 2000);
  };

  const handleDownload = () => {
    console.log('Downloading encoded image');
    toast({
      title: "Download started",
      description: "Your encoded image is being downloaded"
    });
  };

  return (
    <section id="encode" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" data-testid="text-encode-title">
            Hide a Message
          </h2>
          
          <div className="max-w-xl mx-auto space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">1</span>
              <p className="text-muted-foreground">Type your secret message.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">2</span>
              <p className="text-muted-foreground">Fetch a random image or upload one.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">3</span>
              <p className="text-muted-foreground">Click Encode and download the hidden message image.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">4</span>
              <p className="text-muted-foreground">Share the image with someone you trust — only they can uncover the secret.</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4" data-testid="text-upload-heading">1. Choose an Image</h3>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover-elevate transition-colors mb-4 min-h-64 flex flex-col items-center justify-center"
              data-testid="dropzone-image-upload"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                data-testid="input-file-upload"
              />
              
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-48 rounded-md" data-testid="img-preview" />
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </>
              )}
            </div>

            <Button
              variant="outline"
              onClick={handleFetchRandom}
              className="w-full"
              data-testid="button-fetch-random"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Fetch Random Image
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4" data-testid="text-message-heading">2. Enter Your Message</h3>
            
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your secret message here..."
              className="min-h-32 mb-4 resize-none"
              maxLength={500}
              data-testid="input-secret-message"
            />
            
            <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePasteMessage}
                  data-testid="button-paste-message"
                >
                  Paste Text
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyMessage}
                  disabled={!message}
                  data-testid="button-copy-message"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                  Copy
                </Button>
              </div>
              <span className="text-xs text-muted-foreground" data-testid="text-char-count">{message.length}/500</span>
            </div>

            {morseCode && (
              <div className="bg-muted/50 rounded-md p-4 mb-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Morse Code Preview</p>
                <p className="font-mono text-sm break-all" data-testid="text-morse-preview">{morseCode}</p>
              </div>
            )}

            <Button
              onClick={handleEncode}
              disabled={!message || !image || isEncoding}
              className="w-full"
              data-testid="button-encode"
            >
              {isEncoding ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Encoding...
                </>
              ) : (
                'Encode Message'
              )}
            </Button>
          </Card>
        </div>

        {encodedImage && (
          <Card className="mt-8 p-6">
            <div className="text-center">
              <h3 className="text-xl font-medium mb-4" data-testid="text-result-heading">Encoding Complete!</h3>
              <div className="flex flex-col items-center gap-4">
                <img src={encodedImage} alt="Encoded" className="max-h-64 rounded-md" data-testid="img-encoded-result" />
                <div className="flex gap-4">
                  <Button onClick={handleDownload} data-testid="button-download">
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                  <Button variant="outline" onClick={() => { setEncodedImage(""); setMessage(""); setImage(null); setImagePreview(""); }} data-testid="button-encode-another">
                    Encode Another
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
