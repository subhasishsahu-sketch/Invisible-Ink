import { Jimp } from "jimp";
import { intToRGBA, rgbaToInt } from "@jimp/utils";

const MORSE_CODE: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
};

const REVERSE_MORSE: { [key: string]: string } = Object.entries(MORSE_CODE).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

const START_MARKER = "<<INVISIBLE_INK_START>>";
const END_MARKER = "<<INVISIBLE_INK_END>>";

export function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map(char => MORSE_CODE[char] || '')
    .filter(code => code !== '')
    .join(' ');
}

export function morseToText(morse: string): string {
  return morse
    .split(' ')
    .map(code => {
      if (code === '/') return ' ';
      return REVERSE_MORSE[code] || '';
    })
    .join('');
}

function textToBinary(text: string): string {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}

function binaryToText(binary: string): string {
  const bytes = binary.match(/.{1,8}/g) || [];
  return bytes
    .map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join('');
}

export async function encodeMessage(imageBuffer: Buffer, message: string): Promise<Buffer> {
  const morse = textToMorse(message);
  const fullMessage = START_MARKER + morse + END_MARKER;
  const binaryMessage = textToBinary(fullMessage);
  
  const image = await Jimp.read(imageBuffer);
  const width = image.width;
  const height = image.height;
  const totalPixels = width * height;
  const requiredBits = binaryMessage.length;
  
  if (requiredBits > totalPixels * 3) {
    throw new Error(`Image too small. Need ${requiredBits} bits but image only has ${totalPixels * 3} available.`);
  }
  
  let bitIndex = 0;
  
  for (let y = 0; y < height && bitIndex < binaryMessage.length; y++) {
    for (let x = 0; x < width && bitIndex < binaryMessage.length; x++) {
      const pixelColor = image.getPixelColor(x, y);
      const rgba = intToRGBA(pixelColor);
      
      if (bitIndex < binaryMessage.length) {
        rgba.r = (rgba.r & 0xFE) | parseInt(binaryMessage[bitIndex], 2);
        bitIndex++;
      }
      
      if (bitIndex < binaryMessage.length) {
        rgba.g = (rgba.g & 0xFE) | parseInt(binaryMessage[bitIndex], 2);
        bitIndex++;
      }
      
      if (bitIndex < binaryMessage.length) {
        rgba.b = (rgba.b & 0xFE) | parseInt(binaryMessage[bitIndex], 2);
        bitIndex++;
      }
      
      const newColor = rgbaToInt(rgba.r, rgba.g, rgba.b, rgba.a);
      image.setPixelColor(newColor, x, y);
    }
  }
  
  const outputBuffer = await image.getBuffer("image/png");
  return outputBuffer;
}

export async function decodeMessage(imageBuffer: Buffer): Promise<{ morse: string; text: string }> {
  const image = await Jimp.read(imageBuffer);
  const width = image.width;
  const height = image.height;
  
  let binaryMessage = '';
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelColor = image.getPixelColor(x, y);
      const rgba = intToRGBA(pixelColor);
      
      binaryMessage += (rgba.r & 1).toString();
      binaryMessage += (rgba.g & 1).toString();
      binaryMessage += (rgba.b & 1).toString();
    }
  }
  
  const fullText = binaryToText(binaryMessage);
  
  const startIndex = fullText.indexOf(START_MARKER);
  const endIndex = fullText.indexOf(END_MARKER);
  
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("No hidden message found in this image.");
  }
  
  const morse = fullText.substring(startIndex + START_MARKER.length, endIndex);
  const text = morseToText(morse);
  
  return { morse, text };
}
