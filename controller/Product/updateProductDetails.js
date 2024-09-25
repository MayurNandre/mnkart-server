const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function updateProductDetailsController(req, res) {
    try {
        const sessionUserId = req.userId

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission Denied")
        }

        const { _id, ...restBody } = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, restBody)
        res.json({
            message: "Product Details Updated Successfully",
            error: false,
            success: true,
            data: updateProduct
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


module.exports = updateProductDetailsController