import { loginAsAdmin } from '../helpers/loginAsAdmin';

const { test, expect } = require('@playwright/test');

test('Read Equb groups - list displays correctly', async ({ page }) => {
  await loginAsAdmin(page)
  await expect(page).toHaveURL(/home/);
  await page.goto('https://final-project-f45e.onrender.com/equbs');
  await expect(page.locator('table')).toBeVisible();

  const rows = page.locator('table tbody tr');
  const count = await rows.count();
  expect(count).toBeGreaterThan(0);


  const firstMatch = rows.first();
  await expect(firstMatch).toBeVisible();

});
