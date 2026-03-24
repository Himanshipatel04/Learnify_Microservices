// src/config.ts
export const baseUrl = import.meta.env.VITE_BASE_URL;
if (!baseUrl) throw new Error("VITE_BASE_URL is not defined");