/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SANITY_PROJECT_ID: string
  readonly VITE_SANITY_DATASET: string
  readonly VITE_SANITY_API_VERSION: string
  readonly VITE_SANITY_USE_CDN: string
  readonly VITE_MERCADO_PAGO_PUBLIC_KEY: string
  readonly VITE_MP_ACCESS_TOKEN: string
  readonly VITE_PUBLIC_URL: string
  readonly VITE_TEST_VAR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
