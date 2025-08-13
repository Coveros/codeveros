interface EnvConfig {
  apiUrl: string;
}

export type EnvWindow = typeof window & { env?: EnvConfig };
