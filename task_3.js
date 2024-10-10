const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transactions', { useNewUrlParser: true, useUnifiedTopology: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/statistics', async (req, res) => {
  const { month } = req.query;
  const query = { dateOfSale: { $month: parseInt(month) } };
  const totalSaleAmount = await Transaction.aggregate([
    { $match: query },
    { $group: { _id: null, totalSaleAmount: { $sum: '$price' } } }
  ]);
  const totalSoldItems = await Transaction.countDocuments({ ...query, sold: true });
  const totalNotSoldItems = await Transaction.countDocuments({ ...query, sold: false });
  res.send({
    totalSaleAmount: totalSaleAmount[0].totalSaleAmount,
    totalSoldItems,
    totalNotSoldItems
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});