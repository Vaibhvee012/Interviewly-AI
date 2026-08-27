const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "https://interviewly-ai-six.vercel.app",
        ],
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