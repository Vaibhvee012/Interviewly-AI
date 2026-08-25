const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
    // Prefer the Authorization header; fall back to the cookie for
    // anything still relying on the old cookie-based flow.
    const authHeader = req.headers.authorization
    const headerToken = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null

    const token = headerToken || req.cookies.jwt_token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decoded
        req.token = token // useful for logout to blacklist the right token

        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
            error: err.message
        })
    }
}

module.exports = {
    authUser
}
