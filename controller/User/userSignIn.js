const usermodel = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function usersSignInController(req, res) {
    try {
        const { email, password } = req.body

        if (!email) {
            throw new Error("Please Enter a Email");
        }
        if (!password) {
            throw new Error("Please Enter a Password");
        }

        /* -----Finding provided email is in db is not----- */
        const user = await usermodel.findOne({ email })

        if (!user) {
            throw new Error("User Not Found")
        }
        /* -----Comparing Password----- */
        const checkPassword = bcrypt.compareSync(password, user.password);

        if (checkPassword) {
            /* ----------creating json web token---------- */
            const tokenData = {
                _id: user._id,
                email: user.email
            }

            const Token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            tokenOption={
                httpOnly : true,
                secure : true,
                sameSite: 'None'
            }
            /* If All done then - response */
            res.cookie("token",Token,tokenOption).json({
                data: Token,
                success: true,
                message: "Login successfully",
                error : false
            })

        } else {
            throw new Error("Check Password Again")
        }


    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }

}

module.exports = usersSignInController
