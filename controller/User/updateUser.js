const usermodel = require("../../models/userModel")

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId

        const { userId, email, name, role } = req.body

        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role }),

        }

        /* finding that the user has permission or not (admin,general) */
        const user = await usermodel.findById(sessionUser)

        // console.log("ROLE :",user.role)

        /* updating data  */
        const updateUser = await usermodel.findByIdAndUpdate(userId, payload)

        // if(updateUser)
        res.json({
            data: updateUser,
            message: "User Data Updated",
            success: true,
            error: false
        })


    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateUser