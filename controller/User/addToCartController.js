const addToCartModel = require("../../models/cartProducts")

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req?.userId

        /* Checking id product Already in Cart */
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser })
        if (isProductAvailable) {
            return res.json({
                message: "Item Already in Cart",
                error: true,
                success: false
            })
        }

        /* Saving Data To Database */
        const payLoad = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }
        const newAddToCart = new addToCartModel(payLoad)
        const saveProduct = await newAddToCart.save()

        res.json({
            data: saveProduct,
            message: "Item Added To Cart",
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


module.exports = addToCartController