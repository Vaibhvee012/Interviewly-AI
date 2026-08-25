import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // kept as a fallback; harmless alongside the Bearer token
})

// Attach the stored token to every outgoing request, if present.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt_token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const login = async ({ email, password }) => {
    const response = await api.post("/api/auth/login", { email, password })

    if (response.data?.token) {
        localStorage.setItem("jwt_token", response.data.token)
    }

    return response.data
}

export const register = async ({ username, email, password }) => {
    const response = await api.post("/api/auth/register", { username, email, password })

    if (response.data?.token) {
        localStorage.setItem("jwt_token", response.data.token)
    }

    return response.data
}

export const logout = async () => {
    const response = await api.post("/api/auth/logout")
    localStorage.removeItem("jwt_token")
    return response.data
}

export const getMe = async () => {
    const response = await api.get("/api/auth/get-me")
    return response.data
}

export default api
