const addToCartModel = require("../../models/cartProducts")

const deleteCartItem = async (req, res) => {
    try {
        const currentUser = req.userId
        const cartProductId = req.body._id

        const deleteItem = await addToCartModel.deleteOne({ _id: cartProductId })
        res.json({
            message: "Item deleted from cart",
            error: false,
            success: true,
            data: deleteItem
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = deleteCartItem