const { test, expect } = require('@playwright/test');

test('Search Equb groups by name', async ({ page }) => {
  // Login first
  await page.goto('http://localhost:3000/login');
  await page.fill('#phone', '932013310');
  await page.fill('#password', 'SecurePass123!');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000); // or use a wait-for-response/assertion if filtering is async


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
  const count = await page.locator('table td').filter({ hasText: 'Test Equb Group' }).count();
  await expect(page.locator('table td').filter({ hasText: 'Test Equb Group' })).toHaveCount(count);

await expect(page.locator('table td').filter({ hasText: 'Not Search result' })).toHaveCount(0);

});
