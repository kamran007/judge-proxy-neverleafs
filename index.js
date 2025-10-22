import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so Shopify can fetch from frontend
app.use(cors());

const SHOP_DOMAIN = '6aef0b-62.myshopify.com'; // replace with your Shopify store
const API_TOKEN = 'GWa2chlkNUKGbOhQMcxHQaRNXYs';    // replace with your Judge.me private API token
const PER_PAGE = 20; // number of reviews to fetch

app.get('/', async (req, res) => {
  try {
    const response = await fetch(
      `https://judge.me/api/v1/reviews?shop_domain=${SHOP_DOMAIN}&api_token=${API_TOKEN}&per_page=${PER_PAGE}&page=1`
    );
    const data = await response.json();
    res.json(data.reviews || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
