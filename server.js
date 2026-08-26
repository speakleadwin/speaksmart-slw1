import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import generateContentRouter from "./server/generateContent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Static files (frontend)
app.use(express.static(path.join(__dirname, ".")));

// API routes
app.use(generateContentRouter);

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
