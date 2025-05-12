import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// ────────────── Env loading ──────────────
dotenv.config({ path: path.resolve(__dirname, '.env') });

/* -------------------------------------------------
 * Playwright Test Configuration
 * ------------------------------------------------- */
export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* Reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }]
  ],

  /* Shared settings */
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.HEADLESS !== 'false',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retry-with-video'
  },

  /* Browsers */
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }},
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] }},
    { name: 'webkit',   use: { ...devices['Desktop Safari'] }},
  ],

  /* Optional: start local server ‑ not needed for exito.com */
  // webServer: { ... }
});
