const express = require('express');
const fs = require('fs');
const path = require('path');

// Create a simple Express server to serve the character sheet front‑end and
// provide a minimal API to persist submitted characters to disk. This
// back‑end is intentionally lightweight: it does not implement any kind of
// authentication or database and simply writes incoming JSON to a file.

const app = express();

// Allow parsing of JSON request bodies
app.use(express.json());

// Serve the static files in the current directory (HTML, CSS, JS)
app.use(express.static(__dirname));

// Handle a POST request to save a character sheet. The client should
// provide a JSON payload representing the character. The server will
// overwrite the existing file or create it if it doesn't exist.
app.post('/save-character', (req, res) => {
  const charData = req.body;
  try {
    fs.writeFileSync(path.join(__dirname, 'saved_character.json'), JSON.stringify(charData, null, 2), 'utf8');
    res.json({ status: 'saved', filename: 'saved_character.json' });
  } catch (err) {
    console.error('Failed to save character', err);
    res.status(500).json({ error: 'Failed to save character' });
  }
});

// Start the server on a configurable port or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Murim character sheet server running at http://localhost:${PORT}`);
});