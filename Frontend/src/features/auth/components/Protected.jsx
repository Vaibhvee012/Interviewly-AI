import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from "react";
import "../auth.form.scss"
const Protected = ({ children }) => {

    const { loading, user } = useAuth()

    if (loading) {
        return (
            <main className="loading-container">
                <div className="loading-dots">
                    <span>●</span>
                    <span>●</span>
                    <span>●</span>
                </div>
            </main>
        )
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default Protected