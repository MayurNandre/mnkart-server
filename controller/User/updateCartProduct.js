const addToCartModel = require("../../models/cartProducts")

const updateCartProduct = async (req, res) => {
    try {
        const currentUser = req.userId
        const cartProductId = req?.body._id

        const qty = req.body?.quantity

        const updateCartItem = await addToCartModel.updateOne({ _id: cartProductId }, {
            ...(qty && { quantity: qty })
        })

        res.json({
            message: "Cart Item Updated",
            data: updateCartItem,
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

module.exports = updateCartProduct