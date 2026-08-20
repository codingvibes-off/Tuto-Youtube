import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class VendorPage extends BasePage {
  readonly elements: Record<string, Locator>;

  constructor(page: Page, readonly path: string) {
    super(page);

    this.elements = {
      pageHeading: page.getByRole('heading', { level: 1 })
    };
  }
}
