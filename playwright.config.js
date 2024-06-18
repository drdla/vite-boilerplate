import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Look for test files in the "tests" directory, relative to this configuration file.
  testMatch: '**/*.spec.*', // Only run files with .spec. in their name
  fullyParallel: true, // Run all tests in parallel
  forbidOnly: !!process.env.CI, // Fail the build on CI if you accidentally left test.only in the source code.
  retries: process.env.CI ? 2 : 0, // Retry on CI only.
  workers: process.env.CI ? 1 : undefined, // Opt out of parallel tests on CI.
  reporter: 'list', // Reporter to use, see https://playwright.dev/docs/test-reporters
  use: {
    baseURL: 'http://localhost:5173', // Base URL to use in actions like `await page.goto('/')`.
    trace: 'on-first-retry', // Collect trace when retrying the failed test.
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
