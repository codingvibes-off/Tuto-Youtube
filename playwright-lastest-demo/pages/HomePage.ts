import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly path = '/release-testing';

  readonly mainNav: Locator;
  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
    super(page);

    this.mainNav = page.getByRole('navigation', { name: 'Main navigation' });

    this.elements = {
      heroHeading: page.getByRole('heading', { level: 1 }),
      mainNav: this.mainNav,
      navReleaseTestingLink: this.mainNav.getByRole('link', { name: 'Release testing' }),
      navFeaturesLink: this.mainNav.getByRole('link', { name: 'Features' }),
      navPricingLink: this.mainNav.getByRole('link', { name: 'Pricing' }),
      navDemosLink: this.mainNav.getByRole('link', { name: 'Demos' }),
      navPlaygroundLink: this.mainNav.getByRole('link', { name: 'Playground' }),
      navDocsLink: this.mainNav.getByRole('link', { name: 'Docs' }),
      navBlogLink: this.mainNav.getByRole('link', { name: 'Blog' }),
      sampleDiffReportLink: page.getByRole('link', { name: 'See a sample diff report' }),
      bookReleaseReviewCta: page.getByRole('link', { name: 'Book a release-readiness review' }).first(),
      sapVendorLink: page.getByRole('link', { name: 'SAP S/4HANA regression testing' }).first(),
      salesforceVendorLink: page.getByRole('link', { name: 'Salesforce release regression testing' }).first()
    };
  }
}
