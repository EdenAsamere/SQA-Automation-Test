import { loginAsAdmin } from '../helpers/loginAsAdmin';

const { test, expect } = require('@playwright/test');

test('Search Equb groups by name', async ({ page }) => {
  // Login first
  await loginAsAdmin(page)
  await expect(page).toHaveURL(/home/);
  // Navigate to Equb groups page
  await page.click('a[href="/equbs"]');
  await expect(page).toHaveURL('http://localhost:3000/equbs');

  // Type into search box
  const searchInput = page.getByPlaceholder('Search Equbs by name...');
  await page.waitForTimeout(1000); // or use a wait-for-response/assertion if filtering is async
  await searchInput.fill('Test Equb');

  // Optionally wait for debounce or filtering
  await page.waitForTimeout(1000); // or use a wait-for-response/assertion if filtering is async

  // Verify a matching result appears
  const count = await page.locator('table td').filter({ hasText: 'Unique Test Equb Group' }).count();
  await expect(page.locator('table td').filter({ hasText: 'Unique Test Equb Group' })).toHaveCount(count);

await expect(page.locator('table td').filter({ hasText: 'Not Search result' })).toHaveCount(0);

});
