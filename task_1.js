const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transactions', { useNewUrlParser: true, useUnifiedTopology: true });

const transactionSchema = new mongoose.Schema({
  dateOfSale: Date,
  productTitle: String,
  productDescription: String,
  price: Number,
  category: String,
  sold: Boolean
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/initialize', async (req, res) => {
  try {
    const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = await response.json();
    const transactions = data.map((item) => {
      return {
        dateOfSale: new Date(item.dateOfSale),
        productTitle: item.productTitle,
        productDescription: item.productDescription,
        price: item.price,
        category: item.category,
        sold: item.sold
      };
    });
    await Transaction.insertMany(transactions);
    res.send('Database initialized successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error initializing database');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});