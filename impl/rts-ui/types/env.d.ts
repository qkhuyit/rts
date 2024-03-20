/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Website title */
  readonly VITE_APP_TITLE: string;
  /** Website deployment directory */
  readonly VITE_BASE_URL: string;
  /** API interface path */
  readonly VITE_BASE_API_URL: string;
  /** socket Request path prefix */
  readonly VITE_BASE_SOCKET_PATH: string;
  /** socket Namespaces */
  readonly VITE_BASE_SOCKET_NSP: string;
  /** mock API path */
  readonly VITE_MOCK_API: string;
  // More environment variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
