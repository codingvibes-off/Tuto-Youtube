import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/HomePage';
import { DemosPage } from '../pages/DemosPage';
import { EditorialPage } from '../pages/EditorialPage';
import { FeaturesPage } from '../pages/FeaturesPage';
import { VendorPage } from '../pages/VendorPage';

const VENDOR_PATHS: Record<string, string> = {
  sap: '/for/sap-s4hana-regression-testing',
  salesforce: '/for/salesforce-release-regression-testing'
};

export function createPageObject(page: Page, pageId: string): BasePage {
  switch (pageId) {
    case 'home':
      return new HomePage(page);
    case 'demos':
      return new DemosPage(page);
    case 'editorial':
      return new EditorialPage(page);
    case 'features':
      return new FeaturesPage(page);
    case 'sap':
    case 'salesforce':
      return new VendorPage(page, VENDOR_PATHS[pageId]);
    default:
      throw new Error(`Unknown page id "${pageId}" — no Page Object registered.`);
  }
}

export class PageRegistry {
  private readonly cache = new Map<string, BasePage>();

  constructor(private readonly page: Page) {}

  get(pageId: string): BasePage {
    if (!this.cache.has(pageId)) {
      this.cache.set(pageId, createPageObject(this.page, pageId));
    }
    return this.cache.get(pageId)!;
  }

  resolveElement(pageId: string, elementName: string) {
    return this.get(pageId).element(elementName);
  }
}
