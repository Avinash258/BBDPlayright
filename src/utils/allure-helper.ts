import { Page } from '@playwright/test';

/**
 * Allure Helper for BDD Playwright Framework
 * Provides enhanced reporting capabilities with detailed step information
 */
export class AllureHelper {
  private allure: any;
  private page: Page;

  constructor(allure: any, page: Page) {
    this.allure = allure;
    this.page = page;
  }

  /**
   * Add step with screenshot
   */
  async addStep(name: string, action: () => Promise<void>): Promise<void> {
    if (!this.allure) return;

    const step = this.allure.createStep(name, async () => {
      try {
        await action();
        
        // Take screenshot after successful step
        const screenshot = await this.page.screenshot({ 
          fullPage: true,
          type: 'png'
        });
        
        this.allure.addAttachment(`${name} - Screenshot`, screenshot, 'image/png');
      } catch (error) {
        // Take screenshot on error
        const errorScreenshot = await this.page.screenshot({ 
          fullPage: true,
          type: 'png'
        });
        
        this.allure.addAttachment(`${name} - Error Screenshot`, errorScreenshot, 'image/png');
        throw error;
      }
    });

    await step();
  }

  /**
   * Add page information to Allure
   */
  async addPageInfo(): Promise<void> {
    if (!this.allure) return;

    try {
      const url = this.page.url();
      const title = await this.page.title();
      
      this.allure.addAttachment('Page URL', url, 'text/plain');
      this.allure.addAttachment('Page Title', title, 'text/plain');
      
      // Add page content as attachment
      const content = await this.page.content();
      this.allure.addAttachment('Page HTML', content, 'text/html');
      
    } catch (error) {
      console.warn('Could not add page info to Allure:', (error as Error).message);
    }
  }

  /**
   * Add browser console logs to Allure
   */
  async addConsoleLogs(): Promise<void> {
    if (!this.allure) return;

    try {
      const logs = await this.page.evaluate(() => {
        return (window as any).consoleLogs || [];
      });
      
      if (logs.length > 0) {
        this.allure.addAttachment('Console Logs', JSON.stringify(logs, null, 2), 'application/json');
      }
    } catch (error) {
      console.warn('Could not add console logs to Allure:', (error as Error).message);
    }
  }

  /**
   * Add network information to Allure
   */
  async addNetworkInfo(): Promise<void> {
    if (!this.allure) return;

    try {
      const networkInfo = await this.page.evaluate(() => {
        const navigation = (performance as any).getEntriesByType('navigation')[0];
        return {
          loadTime: navigation?.loadEventEnd - navigation?.loadEventStart,
          domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
          firstPaint: (performance as any).getEntriesByType('paint')[0]?.startTime,
          firstContentfulPaint: (performance as any).getEntriesByType('paint')[1]?.startTime
        };
      });
      
      this.allure.addAttachment('Network Performance', JSON.stringify(networkInfo, null, 2), 'application/json');
    } catch (error) {
      console.warn('Could not add network info to Allure:', (error as Error).message);
    }
  }

  /**
   * Add test data to Allure
   */
  addTestData(data: any, name: string = 'Test Data'): void {
    if (!this.allure) return;

    this.allure.addAttachment(name, JSON.stringify(data, null, 2), 'application/json');
  }

  /**
   * Add description to test
   */
  addDescription(description: string): void {
    if (!this.allure) return;

    this.allure.setDescription(description);
  }

  /**
   * Add labels to test
   */
  addLabels(labels: Array<{ name: string; value: string }>): void {
    if (!this.allure) return;

    labels.forEach(label => {
      this.allure.addLabel(label.name, label.value);
    });
  }

  /**
   * Add link to test
   */
  addLink(url: string, name: string, type: string = 'issue'): void {
    if (!this.allure) return;

    this.allure.addLink(url, name, type);
  }

  /**
   * Add parameter to test
   */
  addParameter(name: string, value: string): void {
    if (!this.allure) return;

    this.allure.addParameter(name, value);
  }

  /**
   * Add epic, feature, story labels
   */
  addEpic(epic: string): void {
    this.addLabels([{ name: 'epic', value: epic }]);
  }

  addFeature(feature: string): void {
    this.addLabels([{ name: 'feature', value: feature }]);
  }

  addStory(story: string): void {
    this.addLabels([{ name: 'story', value: story }]);
  }

  addSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): void {
    this.addLabels([{ name: 'severity', value: severity }]);
  }

  addOwner(owner: string): void {
    this.addLabels([{ name: 'owner', value: owner }]);
  }

  /**
   * Add comprehensive test information
   */
  async addComprehensiveInfo(): Promise<void> {
    await Promise.all([
      this.addPageInfo(),
      this.addConsoleLogs(),
      this.addNetworkInfo()
    ]);
  }
}
