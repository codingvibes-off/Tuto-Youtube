import { Page, expect } from '@playwright/test';
import { Journey, JourneyStep, getJourneyById } from './journey-loader';
import { PageRegistry } from './locator-resolver';

async function runStep(page: Page, registry: PageRegistry, step: JourneyStep) {
  const locator = step.page && step.element ? registry.resolveElement(step.page, step.element) : undefined;

  switch (step.action) {
    case 'goto': {
      const target = step.value ?? (step.page ? registry.get(step.page).path : '/');
      await page.goto(target);
      break;
    }
    case 'click':
      await locator!.click();
      break;
    case 'dblclick':
      await locator!.dblclick();
      break;
    case 'fill':
      await locator!.fill(step.value ?? '');
      break;
    case 'clear':
      await locator!.clear();
      break;
    case 'check':
      await locator!.check();
      break;
    case 'uncheck':
      await locator!.uncheck();
      break;
    case 'selectOption':
      await locator!.selectOption(step.value ?? '');
      break;
    case 'hover':
      await locator!.hover();
      break;
    case 'press':
      await locator!.press(step.value ?? '');
      break;
    case 'upload':
      await locator!.setInputFiles(step.value ?? '');
      break;
    case 'waitFor':
      await locator!.waitFor();
      break;
    case 'expectVisible':
      await expect(locator!).toBeVisible();
      break;
    case 'expectHidden':
      await expect(locator!).toBeHidden();
      break;
    case 'expectText':
      await expect(locator!).toContainText(step.value ?? '');
      break;
    case 'expectUrl':
      await expect(page).toHaveURL(new RegExp(escapeRegExp(step.value ?? '')));
      break;
    case 'expectTitle':
      await expect(page).toHaveTitle(step.value ?? '');
      break;
    case 'screenshot':
      await page.screenshot({ path: `result/screenshots/${step.value ?? `step-${step.id}`}.png` });
      break;
    default:
      throw new Error(`Unsupported action "${step.action}" at step ${step.id}`);
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function runJourney(page: Page, journeyId: string): Promise<Journey> {
  const journey = getJourneyById(journeyId);
  if (!journey) {
    throw new Error(`Journey "${journeyId}" not found in parcours.json`);
  }

  const registry = new PageRegistry(page);

  for (const step of journey.steps) {
    await runStep(page, registry, step);
  }

  return journey;
}
