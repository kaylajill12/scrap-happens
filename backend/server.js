require('dotenv').config();
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.TENOR_API_KEY;

app.use(cors());
app.use(express.static('../frontend'));

app.get('/api/search', async (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Please enter a search term' });
  }

  const apiUrl = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(searchTerm)}&key=${apiKey}&limit=12&searchfilter=sticker&media_filter=nanogif_transparent`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching stickers:', error);
    res.status(500).json({ error: 'Failed to fetch stickers' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});