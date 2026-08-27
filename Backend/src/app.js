const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",

    // Vercel production
    "https://interviewly-ai-zeta.vercel.app",

    // Vercel deployments
    "https://interviewly-ai-git-main-vibe-7cbc.vercel.app",
    "https://interviewly-ekuylfxwb-vibe-7cbc.vercel.app",
]

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) {
                return callback(null, true)
            }

            if (allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.get("/", (req, res) => {
    res.json({
        message: "Interviewly AI Backend is running",
    })
})

module.exports = app