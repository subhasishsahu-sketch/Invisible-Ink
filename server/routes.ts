import type { Express } from "express";
import { createServer, type Server } from "http";
import { encodeMessage, decodeMessage, textToMorse, morseToText } from "./steganography";
import multer from "multer";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/encode", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image provided" });
      }
      
      const message = req.body.message;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "No message provided" });
      }
      
      if (message.length > 500) {
        return res.status(400).json({ error: "Message too long (max 500 characters)" });
      }
      
      const morse = textToMorse(message);
      const encodedBuffer = await encodeMessage(req.file.buffer, message);
      
      const base64Image = encodedBuffer.toString("base64");
      
      res.json({
        success: true,
        morse,
        encodedImage: `data:image/png;base64,${base64Image}`
      });
    } catch (error) {
      console.error("Encode error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to encode message" 
      });
    }
  });

  app.post("/api/decode", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image provided" });
      }
      
      const result = await decodeMessage(req.file.buffer);
      
      res.json({
        success: true,
        morse: result.morse,
        text: result.text
      });
    } catch (error) {
      console.error("Decode error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to decode message" 
      });
    }
  });

  app.get("/api/random-image", async (req, res) => {
    try {
      const randomId = Math.floor(Math.random() * 1000);
      const imageUrl = `https://picsum.photos/800/600?random=${randomId}`;
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(imageUrl, {
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      
      res.json({
        success: true,
        image: `data:image/jpeg;base64,${base64}`
      });
    } catch (error) {
      console.error("Random image error:", error);
      res.status(500).json({ 
        error: "Failed to fetch random image. Please upload an image instead." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
