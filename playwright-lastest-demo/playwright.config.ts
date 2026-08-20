import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', {
      outputFolder: 'result/playwright-report',
      open: 'never'
    }],
    ['list'],
    ['json', {
      outputFile: 'result/results.json'
    }]
  ],

  outputDir: 'result/test-results',

  use: {
    baseURL: process.env.BASE_URL ?? 'https://lastest.cloud',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: (process.env.VIDEO as 'on' | 'retain-on-failure' | undefined) ?? 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
