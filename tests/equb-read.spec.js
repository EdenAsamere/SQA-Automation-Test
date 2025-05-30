const { test, expect } = require('@playwright/test');

test('Read Equb groups - list displays correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/equbs');

  await expect(page.locator('table')).toBeVisible();

  const rows = page.locator('table tbody tr');
  const count = await rows.count();
  expect(count).toBeGreaterThan(0);


  const firstMatch = rows.first();
  await expect(firstMatch).toBeVisible();

});
