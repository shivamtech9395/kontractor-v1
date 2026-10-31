// API Base URL configuration for Kontractor
// If VITE_API_URL is provided, use it.
// If on localhost / 127.0.0.1, use '' (for Vite local proxy).
// On production (Vercel or custom domain), automatically fallback to live Render backend.

const LIVE_BACKEND_URL = 'https://kontractor-v1.onrender.com';

const getBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return '';
    }
  }

  return LIVE_BACKEND_URL;
};

export const API_BASE_URL: string = getBaseUrl();
