import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FeaturesPage extends BasePage {
  readonly path = '/features';

  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
    super(page);

    this.elements = {
      pageHeading: page.getByRole('heading', { level: 1 })
    };
  }
}
