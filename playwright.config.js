import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    screenshot: 'on', // or 'on' to always take screenshots
    video: 'retain-on-failure',    // or 'on' to always record video
    trace: 'retain-on-failure',    // for rich debugging info
  },
  reporter: [['html', { open: 'never' }]], // generate HTML report
});
