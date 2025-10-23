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
    const shop_name = req.query.shop || SHOP_DOMAIN;
    const token = req.query.token || API_TOKEN;
    const per_page = req.query.per_page || PER_PAGE;
    const page_no = req.query.page || 1;
    const response = await fetch(
      `https://judge.me/api/v1/reviews?shop_domain=${shop_name}&api_token=${token}&per_page=${per_page}&page=${page_no}`
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
