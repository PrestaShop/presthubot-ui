export interface LocalConfig {
  isDark: boolean;
}

export interface Store {
  pageTitle: string;
  localConfig: LocalConfig;
}
