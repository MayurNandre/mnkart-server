const usermodel = require("../../models/userModel")

async function allUsers(req,res) {
    try {
        // console.log("userId AllUsers :" , req.userId)

        const allUser = await usermodel.find()
        
        res.json({
            message : "All Users Detail",
            error : false,
            success : true,
            data : allUser
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = allUsers