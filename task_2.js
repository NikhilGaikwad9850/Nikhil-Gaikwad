const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transactions', { useNewUrlParser: true, useUnifiedTopology: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/transactions', async (req, res) => {
  const { month, search, page, perPage } = req.query;
  const query = {};
  if (month) {
    query.dateOfSale = { $month: parseInt(month) };
  }
  if (search) {
    query.$or = [
      { productTitle: { $regex: search, $options: 'i' } },
      { productDescription: { $regex: search, $options: 'i' } },
      { price: { $regex: search, $options: 'i' } }
    ];
  }
  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage);
  res.send(transactions);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});