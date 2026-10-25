// API Base URL configuration for Kontractor
// In local development, defaults to '' (proxied by Vite to http://localhost:5000)
// In production on Vercel, points to Render backend URL (e.g. https://kontractor-backend.onrender.com)

export const API_BASE_URL: string = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
