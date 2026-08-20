import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DemosPage extends BasePage {
  readonly path = '/demos';

  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
    super(page);

    this.elements = {
      pageHeading: page.getByRole('heading', { level: 1 }),
      allCategoryChip: page.getByRole('button', { name: /^All/ }),
      devToolsCategoryChip: page.getByRole('button', { name: /Developer Tools & Infra/ }),
      sortButton: page.getByRole('button', { name: /Recent/ }),
      // Icon-only CTA with no stable accessible name (per-demo title attribute) — CSS is the
      // documented last-resort fallback for this kind of element.
      firstLaunchButton: page.locator('.demo-card__launch').first()
    };
  }
}
