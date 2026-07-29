import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Based on the ENV variable input from the terminal, dynamically read the corresponding .env file.
const environment = process.env.ENV || 'staging'; // Default is staging.
dotenv.config({ path: path.resolve(__dirname, `.env.${environment}`) });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    // Use environment variables instead of hardcoding the URL!
    baseURL: process.env.BASE_URL, 
    headless: process.env.CI ? true : false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
