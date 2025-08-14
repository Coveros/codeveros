interface EnvConfig {
  apiUrl: string;
}

export type EnvWindow = Window & typeof globalThis & { env: EnvConfig };
