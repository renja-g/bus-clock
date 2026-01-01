const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Get the endpoint URL from environment variable
const BUS_ENDPOINT = process.env.BUS_ENDPOINT_URL;

if (!BUS_ENDPOINT) {
  console.error('BUS_ENDPOINT_URL environment variable is not set');
  process.exit(1);
}

app.get('/site.webmanifest', (req, res) => {
  res.type('application/manifest+json');
  res.sendFile(path.join(__dirname, 'public', 'site.webmanifest'));
});

app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint to fetch bus departures
app.get('/api/departures', async (req, res) => {
  try {
    const response = await fetch(BUS_ENDPOINT, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unexpected response: ${response.status}`);
    }

    const data = await response.json();
    
    const filteredData = Array.isArray(data) 
      ? data.map(({ tatsaechliche_abfahrtszeit, abfahrtszeit }) => ({
          tatsaechliche_abfahrtszeit,
          abfahrtszeit,
        }))
      : data;
    
    res.json(filteredData);
  } catch (error) {
    console.error('Failed to fetch departures:', error);
    res.status(500).json({ error: 'Failed to fetch departures' });
  }
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

