const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const MYSTERRIA_URL = "https://www.mysterria.net/catwalk/pathway/everyone";

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/pathways", async (req, res) => {
  try {
    const response = await fetch(MYSTERRIA_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Mysterria returned ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch Mysterria data",
      details: err.message
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving files from: ${path.join(__dirname, "public")}`);
});