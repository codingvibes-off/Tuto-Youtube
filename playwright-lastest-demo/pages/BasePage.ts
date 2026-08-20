import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  abstract readonly path: string;
  abstract readonly elements: Record<string, Locator>;

  constructor(protected readonly page: Page) {}

  async goto(path: string = this.path) {
    await this.page.goto(path);
  }

  async getTitle() {
    return this.page.title();
  }

  async screenshot(name: string) {
    await this.page.screenshot({
      path: `result/screenshots/${name}.png`
    });
  }

  element(name: string): Locator {
    const locator = this.elements[name];
    if (!locator) {
      throw new Error(`Unknown element "${name}" on page "${this.path}"`);
    }
    return locator;
  }
}
