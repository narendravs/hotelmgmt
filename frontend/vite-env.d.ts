interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_STRIPE_PUB_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
