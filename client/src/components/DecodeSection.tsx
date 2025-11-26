import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Copy, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const morseToText = (morse: string): string => {
  const morseToChar: { [key: string]: string } = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
    '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
    '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
    '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
    '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
    '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
    '---..': '8', '----.': '9', '/': ' '
  };
  
  return morse
    .split(' ')
    .map(code => morseToChar[code] || '')
    .join('');
};

export default function DecodeSection() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodedBinary, setDecodedBinary] = useState("");
  const [decodedMorse, setDecodedMorse] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
      
      setDecodedBinary("");
      setDecodedMorse("");
      setDecodedText("");
    }
  };

  const handleDecode = async () => {
    if (!image) {
      toast({
        title: "No image",
        description: "Please upload an encoded image first",
        variant: "destructive"
      });
      return;
    }

    setIsDecoding(true);
    console.log('Decoding image:', image.name);
    
    setTimeout(() => {
      const mockBinary = "01001000 01000101 01001100 01001100 01001111...";
      const mockMorse = ".... . .-.. .-.. --- / .-- --- .-. .-.. -..";
      const mockText = morseToText(mockMorse);
      
      setDecodedBinary(mockBinary);
      setTimeout(() => {
        setDecodedMorse(mockMorse);
        setTimeout(() => {
          setDecodedText(mockText);
          setIsDecoding(false);
          toast({
            title: "Decoding complete!",
            description: "Your secret message has been revealed"
          });
        }, 500);
      }, 500);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(decodedText);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="decode" className="py-12 lg:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" data-testid="text-decode-title">
            Reveal Message
          </h2>
          
          <div className="max-w-xl mx-auto space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">1</span>
              <p className="text-muted-foreground">Upload the encoded image.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">2</span>
              <p className="text-muted-foreground">Click Decode.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">3</span>
              <p className="text-muted-foreground">The hidden message will appear... like magic.</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4" data-testid="text-upload-decode-heading">Upload Encoded Image</h3>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover-elevate transition-colors mb-4 min-h-64 flex flex-col items-center justify-center"
              data-testid="dropzone-decode-upload"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                data-testid="input-decode-file"
              />
              
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-48 rounded-md" data-testid="img-decode-preview" />
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-sm font-medium mb-1">Click to upload encoded image</p>
                  <p className="text-xs text-muted-foreground">The image with hidden message</p>
                </>
              )}
            </div>

            <Button
              onClick={handleDecode}
              disabled={!image || isDecoding}
              className="w-full"
              data-testid="button-decode"
            >
              {isDecoding ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Revealing...
                </>
              ) : (
                'Reveal Message'
              )}
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-medium mb-4" data-testid="text-decoded-output-heading">Decoded Output</h3>
            
            {!decodedBinary && !isDecoding && (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p className="text-sm">Upload and decode an image to see results</p>
              </div>
            )}

            {decodedBinary && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Binary Data</p>
                  </div>
                  <p className="font-mono text-xs break-all" data-testid="text-binary-output">{decodedBinary}</p>
                </div>

                {decodedMorse && (
                  <div className="bg-muted/50 rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Morse Code</p>
                    </div>
                    <p className="font-mono text-sm break-all" data-testid="text-morse-output">{decodedMorse}</p>
                  </div>
                )}

                {decodedText && (
                  <div className="bg-primary/10 border border-primary/20 rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <p className="text-xs uppercase tracking-wide font-medium">Hidden Message Revealed</p>
                      </div>
                    </div>
                    <p className="text-base font-medium mb-3" data-testid="text-decoded-message">{decodedText}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopy}
                      className="w-full"
                      data-testid="button-copy-decoded"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Message
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
