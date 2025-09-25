import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Log levels
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

// Logger class for DemoWebshop testing
export class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private logFile: string;
  private logs: string[] = [];

  private constructor() {
    this.logLevel = this.getLogLevelFromEnv();
    this.logFile = this.getLogFile();
    this.ensureLogDirectory();
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private getLogLevelFromEnv(): LogLevel {
    const level = process.env.LOG_LEVEL?.toUpperCase();
    switch (level) {
      case 'ERROR': return LogLevel.ERROR;
      case 'WARN': return LogLevel.WARN;
      case 'INFO': return LogLevel.INFO;
      case 'DEBUG': return LogLevel.DEBUG;
      default: return LogLevel.INFO;
    }
  }

  private getLogFile(): string {
    const timestamp = new Date().toISOString().split('T')[0];
    const logDir = process.env.LOG_DIR || 'reports/logs';
    return join(logDir, `test-${timestamp}.log`);
  }

  private ensureLogDirectory(): void {
    const logDir = process.env.LOG_DIR || 'reports/logs';
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }
  }

  private formatMessage(level: LogLevel, message: string, context?: any): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${levelName}] ${message}${contextStr}`;
  }

  private log(level: LogLevel, message: string, context?: any): void {
    if (level <= this.logLevel) {
      const formattedMessage = this.formatMessage(level, message, context);
      
      // Console output
      switch (level) {
        case LogLevel.ERROR:
          console.error(formattedMessage);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage);
          break;
        case LogLevel.INFO:
          console.info(formattedMessage);
          break;
        case LogLevel.DEBUG:
          console.debug(formattedMessage);
          break;
      }

      // Store in memory
      this.logs.push(formattedMessage);

      // Write to file
      this.writeToFile(formattedMessage);
    }
  }

  private writeToFile(message: string): void {
    try {
      writeFileSync(this.logFile, message + '\n', { flag: 'a' });
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  public error(message: string, context?: any): void {
    this.log(LogLevel.ERROR, message, context);
  }

  public warn(message: string, context?: any): void {
    this.log(LogLevel.WARN, message, context);
  }

  public info(message: string, context?: any): void {
    this.log(LogLevel.INFO, message, context);
  }

  public debug(message: string, context?: any): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  public getLogs(): string[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }

  public getLogFilePath(): string {
    return this.logFile;
  }

  public exportLogs(filePath?: string): void {
    const exportPath = filePath || join('reports', 'exported-logs.json');
    const logData = {
      timestamp: new Date().toISOString(),
      logLevel: LogLevel[this.logLevel],
      logs: this.logs
    };

    try {
      writeFileSync(exportPath, JSON.stringify(logData, null, 2));
      this.info(`Logs exported to: ${exportPath}`);
    } catch (error) {
      this.error('Failed to export logs:', error);
    }
  }

  // Test-specific logging methods
  public testStart(testName: string): void {
    this.info(`Test started: ${testName}`);
  }

  public testEnd(testName: string, status: 'PASSED' | 'FAILED' | 'SKIPPED'): void {
    this.info(`Test ${status.toLowerCase()}: ${testName}`);
  }

  public stepStart(stepName: string): void {
    this.debug(`Step started: ${stepName}`);
  }

  public stepEnd(stepName: string, status: 'PASSED' | 'FAILED'): void {
    this.debug(`Step ${status.toLowerCase()}: ${stepName}`);
  }

  public pageAction(action: string, page: string): void {
    this.debug(`Page action: ${action} on ${page}`);
  }

  public elementAction(action: string, selector: string): void {
    this.debug(`Element action: ${action} on ${selector}`);
  }

  public assertion(assertion: string, result: boolean): void {
    this.debug(`Assertion: ${assertion} - ${result ? 'PASSED' : 'FAILED'}`);
  }

  public errorWithException(message: string, error: Error): void {
    this.log(LogLevel.ERROR, message, {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }

  public performance(operation: string, duration: number): void {
    this.info(`Performance: ${operation} took ${duration}ms`);
  }

  public screenshot(path: string): void {
    this.info(`Screenshot saved: ${path}`);
  }

  public video(path: string): void {
    this.info(`Video saved: ${path}`);
  }

  public trace(path: string): void {
    this.info(`Trace saved: ${path}`);
  }

  public report(reportPath: string): void {
    this.info(`Report generated: ${reportPath}`);
  }

  public environment(env: string): void {
    this.info(`Environment: ${env}`);
  }

  public browser(browser: string, version?: string): void {
    this.info(`Browser: ${browser}${version ? ` ${version}` : ''}`);
  }

  public url(url: string): void {
    this.debug(`URL: ${url}`);
  }

  public data(data: any): void {
    this.debug('Test data:', data);
  }

  public config(config: any): void {
    this.info('Configuration:', config);
  }

  public summary(passed: number, failed: number, skipped: number): void {
    this.info(`Test Summary: ${passed} passed, ${failed} failed, ${skipped} skipped`);
  }
}

// Export singleton instance
export const logger = Logger.getInstance();
