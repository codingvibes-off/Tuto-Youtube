// tests/signup/signup.spec.js
const { test, expect } = require('@playwright/test');
const URL = 'localhost:4200'
const PASSWORD = 'password123';
const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Eva', 'Liam', 'Olivia'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson'];

function randomUsername() {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first}${last}`;
}
const user = (() => {
  const username = randomUsername();
  return { username, email: `${username.toLowerCase()}@yopmail.com`, password: PASSWORD };
})();

test.describe('Signup form tests', () => {
  test('User can register successfully', async ({ page }) => {
    await page.goto('http://localhost:4200/register');
    await page.fill('[data-testid="name-input"]', user.username);
    await page.fill('[data-testid="email-input"]', user.email);
    await page.fill('[data-testid="password-input"]', user.password);
    await page.fill('[data-testid="confirm-password-input"]', user.password);
    await page.click('[data-testid="submit-button"]');
    await expect(page.locator('#confirmation')).toHaveText('Registration successful!');
  });
});


