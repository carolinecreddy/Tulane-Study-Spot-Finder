import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API route for Gemini study spot reviews summarization
app.post("/api/gemini/summarize", async (req, res) => {
  const { spotName, reviews } = req.body;

  if (!spotName || !reviews || !Array.isArray(reviews)) {
    res.status(400).json({ error: "Missing spotName or reviews array." });
    return;
  }

  // Fallback summary that will be returned if no API key is set or if Gemini fails
  const fallbackSummary = `**Green Wave Core Pulse (Offline/Demo Mode)**:\n*   **Prime Study Real Estate:** Outstandingly rated by peers for productivity.\n*   **Tech & Utilities:** Adequate power outlets and solid Wi-Fi performance.\n*   *Tip:* Grab a refreshing beverage from PJ's Coffee nearby to stay focused!`;

  if (reviews.length === 0) {
    res.json({
      summary: "No student reports or reviews available yet to summarize! Be the first to add one below.",
    });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment variables. Returning offline fallback summary.");
    res.json({
      error: "Gemini API key is not configured.",
      summary: fallbackSummary,
    });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const reviewsText = reviews
      .map(
        (r: any, idx: number) =>
          `Review #${idx + 1} (${r.rating} stars) by ${r.user_name || "Anonymous"}: "${r.comment}" (Quietness: ${
            r.quiet_level || "n/a"
          }, Outlets: ${r.outlets || "n/a"})`
      )
      .join("\n\n");

    const prompt = `You are a helpful student assistant at Tulane University. Consolidate and summarize the following anonymous student reviews for the study spot named '${spotName}'. Tell students what the overall vibe is, if it's quiet, outlet availability, WiFi speed/stability, and suitability for group or solo work. Keep the style encouraging, concise, informative and use local Tulane lingo (like PJ's Coffee, Howie T, Lavin-Bernick Center, Green Wave) naturally if suitable. Format with markdown bullets (maximum 3 bullet points, under 120 words total). Do not mention that you were given reviews, just write a summary of the spot based on what other students say.

Reviews:
${reviewsText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ summary: response.text || "Unable to consolidate reviews." });
  } catch (err: any) {
    console.error("Error generating Gemini summary:", err);
    res.json({
      error: "Failed to generate live summary: " + (err.message || err),
      summary: fallbackSummary,
    });
  }
});

// Setup Vite middleware for development or serve built files for production
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for client-side routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
