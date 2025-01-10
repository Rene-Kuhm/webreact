export const APP_CONFIG = {
  siteName: 'Mi Portfolio',
  siteDescription: 'Portfolio personal y proyectos',
  contactEmail: 'tu@email.com',
  socialMedia: {
    github: 'https://github.com/tuusuario',
    linkedin: 'https://linkedin.com/in/tuusuario',
  }
} as const;

export const API_ENDPOINTS = {
  base: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  // Agrega aquí otros endpoints de tu API
} as const;
