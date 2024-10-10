const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transactions', { useNewUrlParser: true, useUnifiedTopology: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/pie-chart', async (req, res) => {
  const { month } = req.query;
  const query = { dateOfSale: { $month: parseInt(month) } };
  const categories = await Transaction.aggregate([
    { $match: query },
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  res.send(categories);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});