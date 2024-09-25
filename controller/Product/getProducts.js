const productModel = require("../../models/productModel")

const getProductsController = async (req, res) => {
    try {
        const allProduct = await productModel.find().sort({ createdAt: -1 })
        res.json({
            message: "All Products",
            error: false,
            success: true,
            data: allProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getProductsController