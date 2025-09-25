import { testConfig, testEnv } from '../data/testData';

// Configuration class for DemoWebshop testing
export class Config {
  private static instance: Config;
  private config: any;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private loadConfig(): any {
    const environment = process.env.NODE_ENV || 'development';
    const baseConfig = testConfig;
    const envConfig = testEnv[environment as keyof typeof testEnv] || testEnv.development;

    return {
      ...baseConfig,
      ...envConfig,
      environment
    };
  }

  public get(key: string): any {
    return this.config[key];
  }

  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  public getEnvironment(): string {
    return this.config.environment;
  }

  public isHeadless(): boolean {
    return this.config.headless;
  }

  public getSlowMo(): number {
    return this.config.slowMo;
  }

  public getTimeout(): number {
    return this.config.timeout;
  }

  public getRetries(): number {
    return this.config.retries;
  }

  public getViewport(): { width: number; height: number } {
    return this.config.viewport;
  }

  public getBrowserConfig(): any {
    return {
      headless: this.isHeadless(),
      slowMo: this.getSlowMo(),
      timeout: this.getTimeout()
    };
  }

  public getTestConfig(): any {
    return {
      baseUrl: this.getBaseUrl(),
      timeout: this.getTimeout(),
      retries: this.getRetries(),
      viewport: this.getViewport()
    };
  }
}

// Export singleton instance
export const config = Config.getInstance();
