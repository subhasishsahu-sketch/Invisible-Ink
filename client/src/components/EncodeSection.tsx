import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Image as ImageIcon, Download, Loader2, Copy, CheckCircle2, Shuffle } from "lucide-react";
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
  const [isFetchingRandom, setIsFetchingRandom] = useState(false);
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
      setEncodedImage("");
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleFetchRandom = async () => {
    setIsFetchingRandom(true);
    try {
      const response = await fetch('/api/random-image');
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const data = await response.json();
      
      if (data.success && data.image) {
        setImagePreview(data.image);
        const file = dataURLtoFile(data.image, 'random-image.jpg');
        setImage(file);
        setEncodedImage("");
        toast({
          title: "Image fetched!",
          description: "Random image loaded successfully"
        });
      } else {
        throw new Error(data.error || 'Failed to fetch image');
      }
    } catch (error) {
      console.error('Fetch random image error:', error);
      toast({
        title: "Couldn't fetch random image",
        description: "Try uploading an image instead",
        variant: "destructive"
      });
    } finally {
      setIsFetchingRandom(false);
    }
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
    
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('message', message);

      const response = await fetch('/api/encode', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success && data.encodedImage) {
        setEncodedImage(data.encodedImage);
        toast({
          title: "Encoding complete!",
          description: "Your message has been hidden in the image"
        });
      } else {
        throw new Error(data.error || 'Failed to encode message');
      }
    } catch (error) {
      toast({
        title: "Encoding failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsEncoding(false);
    }
  };

  const handleDownload = () => {
    if (!encodedImage) return;
    
    const link = document.createElement('a');
    link.href = encodedImage;
    link.download = 'invisible-ink-encoded.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
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
              disabled={isFetchingRandom}
              className="w-full"
              data-testid="button-fetch-random"
            >
              {isFetchingRandom ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <Shuffle className="w-4 h-4 mr-2" />
                  Fetch Random Image
                </>
              )}
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4" data-testid="text-message-heading">2. Enter Your Message</h3>
            
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your secret message here..."
              className="min-h-40 mb-4 resize-none focus:ring-2 focus:ring-primary transition-all"
              maxLength={1200}
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
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${message.length > 1000 ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}`} data-testid="text-char-count">
                  {message.length}/1200
                </span>
                {message.length > 0 && (
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${message.length > 1000 ? 'bg-amber-600 dark:bg-amber-400' : 'bg-primary'}`}
                      style={{width: `${Math.min((message.length / 1200) * 100, 100)}%`}}
                    />
                  </div>
                )}
              </div>
            </div>

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
