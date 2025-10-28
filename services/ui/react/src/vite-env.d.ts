/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROD: boolean;
  readonly REACT_APP_API_BASE_URL: string;
  readonly REACT_APP_API_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
