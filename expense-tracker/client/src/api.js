import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export const api = axios.create({ baseURL })

// simple interceptor for logging
api.interceptors.response.use(
  res => res,
  err => {
    console.error('API error:', err?.response?.data || err.message)
    return Promise.reject(err)
  }
)
