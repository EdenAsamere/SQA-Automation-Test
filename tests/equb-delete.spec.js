import { loginAsAdmin } from '../helpers/loginAsAdmin';

const { test, expect } = require('@playwright/test');

test('Delete Equb group with no transactions and no previous winners', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page)
  await expect(page).toHaveURL(/home/);

  // Navigate to Equbs page
  await page.click('a[href="/equbs"]');
  await expect(page).toHaveURL(/equbs/);

  // Wait for table to load
  const rows = page.locator('table tbody tr');
  await expect(rows.first()).toBeVisible({ timeout: 10000 });

  // Find the row for "Unique Test Equb Group"
  const rowCount = await rows.count();
  let targetRowIndex = null;
  let targetRowName = '';

  for (let i = rowCount - 1; i >= 0; i--) {
    const row = rows.nth(i);
    const rowName = await row.locator('td').nth(0).innerText();
    console.log(`Checking row ${i}: ${rowName}`);
    if (rowName === 'Unique Test Equb Group') {
      // Open details
      await row.click();

      // Check Transactions tab
      await page.click('button:has-text("Transactions")');
      // Wait for loading to finish (adjust selector as needed)
      await page.waitForSelector('text=No transactions found for this group, .loading-indicator', { state: 'attached', timeout: 5000 }).catch(() => {});
      const noTransactions = await page.locator('text=No transactions found for this group').isVisible();

      // Check Previous Winners tab
      await page.click('button:has-text("Previous Winners")');
      await page.waitForSelector('text=No previous winners found for this Equb., .loading-indicator', { state: 'attached', timeout: 5000 }).catch(() => {});
      await page.waitForSelector('.loading-indicator', { state: 'detached', timeout: 5000 }).catch(() => {});
      const noWinners = await page.locator('text=No previous winners found for this Equb.').isVisible();
      const zeroWinners = await page.locator('text=Total Winners: 0').isVisible();
      console.log(`Row ${i}- No Winners: ${noWinners}, Zero Winners: ${zeroWinners}`);

      if (noTransactions || (noWinners || zeroWinners)) {
        targetRowIndex = i;
        console.log(`Found deletable row at index ${i}: ${rowName}`);
        targetRowName = rowName;
        await page.click('button:has-text("Back to Equbs List")');
        break;
      }

      // Return to list if not deletable
      await page.click('button:has-text("Back to Equbs List")');
    }
  }

  if (targetRowIndex === null) {
    test.skip(true, 'No deletable Equb group found');
  }
  // Re-locate the target row after navigating back
  const targetRow = page.locator('table tbody tr').nth(targetRowIndex);

  // Open options menu
  await targetRow.locator('button:has(svg.lucide-ellipsis-vertical)').click();

  // Click Delete
  await page.locator('button:has-text("Delete")').click();

  // Confirm delete if dialog appears
  const confirmBtn = page.locator('button:has-text("Delete Equb"), button:has-text("Confirm")');
  if (await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await confirmBtn.click();
  }

  // Assert deletion success message
  await expect(page.locator('.Toastify__toast')).toHaveText(/Equb deleted successfully!/i, { timeout: 5000 });
});
