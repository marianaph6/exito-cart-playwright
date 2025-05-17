import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

// ────────────── Env loading ──────────────
dotenv.config({ path: path.resolve(__dirname, ".env") });

/* -------------------------------------------------
 * Playwright Test Configuration
 * ------------------------------------------------- */
export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000, // Global timeout for each test

  /* Reporters */
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/html", open: "never" }],
  ],

  /* Shared settings */
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.HEADLESS !== "false",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retry-with-video",
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },

  /* Browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1280, height: 720 },
        actionTimeout: 45000, // Firefox needs more time
        navigationTimeout: 45000,
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
