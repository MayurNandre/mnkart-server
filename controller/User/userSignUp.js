const usermodel = require('../../models/userModel');
const bcrypt = require('bcrypt');

async function usersSignUpController(req, res) {
    try {
        const { name, email, password } = req.body

        const user = await usermodel.findOne({ email })
        if (user) {
            throw new Error("Email Allready exist")
        }

        if (!name) {
            throw new Error("please provide name");
        }
        if (!email) {
            throw new Error("please provide email");
        }
        if (!password) {
            throw new Error("please provide password");
        }
        /* ---converting plane password to hash--- */
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Somethig went wrong");
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        /* -------Saving data to DB------- */
        const userData = new usermodel(payload);

        const saveUser = userData.save();

        /* If All done then - response */
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully"
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = usersSignUpController