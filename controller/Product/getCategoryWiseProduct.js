const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async(req,res)=>{
try {
    const {category} = req?.body || req?.query
    const products = await productModel.find({category})

    res.status(201).json({
        message: "Category wise products fetched",
        error: false,
        success: true,
        data : products
    })
} catch (err) {
    res.status(400).json({
        message: err.message || err,
        error: true,
        success: false
    })
}
}


module.exports = getCategoryWiseProduct