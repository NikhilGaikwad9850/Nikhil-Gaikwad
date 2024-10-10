// Task_03.js
app.get('/api/statistics', async (req, res) => {
    const month = req.query.month;

    const totalSaleAmount = await ProductTransaction.aggregate([
        {
            $match: {
                $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] }
            }
        },
        {
            $group: {
                _id: null,
                totalSaleAmount: { $sum: "$price" }
            }
        }
    ]);

    const totalSoldItems = await ProductTransaction.countDocuments({
        $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
        isSold: true
    });

    const totalNotSoldItems = await ProductTransaction.countDocuments({
        $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
        isSold: false
    });

    res.json({
        totalSaleAmount: totalSaleAmount.totalSaleAmount || 0,
        totalSoldItems,
        totalNotSoldItems
    });
});