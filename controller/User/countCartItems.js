const addToCartModel = require("../../models/cartProducts")

const countCartItems = async (req, res) => {
    try {
        const userId = req.userId
        const countItems = await addToCartModel.countDocuments({
            userId: userId
        })

        res.json({
            data: {
                countItems: countItems
            },
            message: "OK",
            error: false,
            success: true
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


module.exports = countCartItems