// Task_02.js
app.get('/api/transactions', async (req, res) => {
    const month = req.query.month;
    const search = req.query.search;
    const page = req.query.page || 1;
    const perPage = 10;

    // Query the database based on the month and search criteria
    const transactions = await ProductTransaction.find({
        $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
        $or: [
            { productTitle: { $regex: search, $options: 'i' } },
            { productDescription: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } }
        ]
    })
    .skip((page - 1) * perPage)
    .limit(perPage);

    const totalTransactions = await ProductTransaction.countDocuments({
        $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
        $or: [
            { productTitle: { $regex: search, $options: 'i' } },
            { productDescription: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } }
        ]
    });

    res.json({
        transactions,
        totalPages: Math.ceil(totalTransactions / perPage)
    });
});