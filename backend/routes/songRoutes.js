import express from "express";
import db from "../config/db.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Get all songs
router.get("/", (req, res) => {
  db.query("SELECT * FROM songs", (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

// Upload a new song
router.post("/upload", upload.single("song"), (req, res) => {
  const { title, artist } = req.body;
  const audio_url = req.file ? req.file.filename : null;
  if (!title || !artist || !audio_url) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  db.query(
    "INSERT INTO songs (title, artist, audio_url) VALUES (?, ?, ?)",
    [title, artist, audio_url],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, title, artist, audio_url });
    }
  );
});

export default router;
