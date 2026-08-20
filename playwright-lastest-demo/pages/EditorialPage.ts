import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class EditorialPage extends BasePage {
  readonly path = '/editorial';

  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
    super(page);

    this.elements = {
      enterpriseSection: page.getByRole('heading', { name: /AI speed meets enterprise governance/ })
    };
  }
}
