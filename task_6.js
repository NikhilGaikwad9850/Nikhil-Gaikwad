const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transactions', { useNewUrlParser: true, useUnifiedTopology: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/combined', async (req, res) => {
  const { month } = req.query;
  const query = { dateOfSale: { $month: parseInt(month) } };
  const statistics = await require('./task_03')(req, res);
  const barChart = await require('./task_04')(req, res);
  const pieChart = await require('./task_05')(req, res);
  res.send({ statistics, barChart, pieChart });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});