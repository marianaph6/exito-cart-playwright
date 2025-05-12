import { defineConfig, devices } from '@playwright/test';
import * as path from 'node:path';
import * as dotenv from 'dotenv';

// ───── Cargar variables de entorno (.env) ─────
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Convierte “strings” booleans / numbers a sus tipos reales.
 * Si la variable no existe, usa el valor por defecto Playwright.
 */
const toBool   = (v?: string) => v?.toLowerCase() === 'true';
const toNumber = (v?: string) => (v ? Number(v) : undefined);

export default defineConfig({
  testDir: './src/tests',

  /* Corre los tests de cada archivo en paralelo */
  fullyParallel: true,

  /* Bloquea un `test.only` accidental en CI */
  forbidOnly: !!process.env.CI,

  /* Retries / Workers parametrizables vía .env (útil en CI) */
  retries: toNumber(process.env.RETRIES) ?? (process.env.CI ? 2 : 0),
  workers: toNumber(process.env.WORKERS) ?? (process.env.CI ? 1 : undefined),

  /* Reporter HTML + lista legible en consola */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
  ],

  /* Opciones compartidas */
  use: {
    baseURL: process.env.BASE_URL,
    headless: toBool(process.env.HEADLESS),
    trace: (process.env.TRACE as 'on' | 'retain-on-failure' | 'off') ?? 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* ───── Proyectos de navegador ───── */
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox',   use: { ...devices['Desktop Firefox'] } },
    { name: 'WebKit',    use: { ...devices['Desktop Safari'] } },
  ],

  /* ───── Servidor local opcional (SPA / SSR) ─────
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  */
});
