const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token

        /* If not have token then */
        if (!token) {
            return res.json({
                message: "Please LogIn !",
                error: true,
                success: false
            })
        }

        /*if have then verifying token */
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            // console.log("authToken.js : ",decoded)
            if (err) {
                console.log("Auth Error :", err)
            }

            // Assigning ID from token to req.Body
            req.userId = decoded?._id

            next()
        })

        // console.log(token)

        /* if any error in accessing token */
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        })
    }
}

module.exports = authToken