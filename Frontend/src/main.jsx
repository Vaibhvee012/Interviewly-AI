import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router"
import { AuthProvider } from "./features/auth/auth.context"
import { router } from "./app.routes"
import { InterviewProvider } from "./features/interview/interview.context"
import "./style.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <InterviewProvider>
            <RouterProvider router={router} />
        </InterviewProvider>
    </AuthProvider>
)