/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_SOCKET_URL: string
  // Define more custom env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}