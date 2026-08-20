import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router"
import { AuthProvider } from "./features/auth/auth.context"
import { router } from "./app.routes"
import "./style.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)