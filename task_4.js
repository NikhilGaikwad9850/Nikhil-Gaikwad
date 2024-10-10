const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transactions', { useNewUrlParser: true, useUnifiedTopology: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/bar-chart', async (req, res) => {
  const { month } = req.query;
  const query = { dateOfSale: { $month: parseInt(month) } };
  const priceRanges = [
    { $match: { price: { $lte: 100 } } },
    { $match: { price: { $gt: 100, $lte: 200 } } },
    { $match: { price: { $gt: 200, $lte: 300 } } },
    { $match: { price: { $gt: 300, $lte: 400 } } },
    { $match: { price: { $gt: 400, $lte: 500 } } },
    { $match: { price: { $gt: 500, $lte: 600 } } },
    { $match: { price: { $gt: 600, $lte: 700 } } },
    { $match: { price: { $gt: 700, $lte: 800 } } },
    { $match: { price: { $gt: 800, $lte: 900 } } },
    { $match: { price: { $gt: 900 } } }
  ];
  const results = await Promise.all(priceRanges.map((range) => Transaction.countDocuments({ ...query, ...range })));
  res.send(results);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});