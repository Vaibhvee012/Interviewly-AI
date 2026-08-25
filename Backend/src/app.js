const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())

app.use(cookieParser())

const allowedOrigins = [
    "https://interviewly-ai-six.vercel.app",
    /^https:\/\/interviewly-[a-z0-9]+-vibe-7cbc\.vercel\.app$/
]

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true)

            const isAllowed = allowedOrigins.some((allowed) =>
                typeof allowed === "string" ? allowed === origin : allowed.test(origin)
            )

            if (isAllowed) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        },
        credentials: true
    })
)

const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app