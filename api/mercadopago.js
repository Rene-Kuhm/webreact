const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/create-preference', async (req, res) => {
  try {
    const { items } = req.body;
    
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: items.map(item => ({
          id: item.id.toString(),
          title: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
          currency_id: 'ARS',
        })),
        back_urls: {
          success: `${process.env.FRONTEND_URL}/success`,
          failure: `${process.env.FRONTEND_URL}/failure`,
          pending: `${process.env.FRONTEND_URL}/pending`,
        },
        auto_return: 'approved',
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('MercadoPago API error:', errorData);
      return res.status(response.status).json(errorData);
    }

    const preference = await response.json();
    res.json(preference);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Error al crear la preferencia de pago',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
