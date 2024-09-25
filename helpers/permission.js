const usermodel = require("../models/userModel")

const uploadProductPermission = async (userId) => {
    const user = await usermodel.findById(userId)

    if (user.role !== "ADMIN") {
        return false
    }
    return true
}

module.exports = uploadProductPermission