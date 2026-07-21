import { expect, test } from '@playwright/test';

test('test basique', async ({ page }) => {
  await page.goto('https://valentinos-magic-beans.click/');
  await page.getByRole('button', { name: 'Shop Coffee' }).click();
  await page.getByRole('button', { name: /add to cart/i }).first().waitFor();
  const buttons = page.getByRole('button', { name: /add to cart/i });
  const count = await buttons.count();
  console.log(count);
});