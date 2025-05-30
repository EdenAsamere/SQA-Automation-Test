const { test, expect } = require('@playwright/test');

test('Delete Equb group with no transactions and no previous winners', async ({ page }) => {
  // Login as admin
  await page.goto('http://localhost:3000/login');
  await page.fill('#phone', '932013310');
  await page.fill('#password', 'SecurePass123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/home/);

  // Go to Equbs list
  await page.click('a[href="/equbs"]');
  await expect(page).toHaveURL(/equbs/);

  // Wait for table to load
  await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 10000 });

  // Find the last row with name "Test Equb Group"
  const rows = page.locator('table tbody tr');
  const rowCount = await rows.count();
  let targetRowIndex = null;
  let targetRowName = '';

  for (let i = rowCount - 1; i >= 0; i--) {
    const row = rows.nth(i);
    const rowName = await row.locator('td').nth(0).innerText();
    if (rowName.trim() === 'Test Equb Group') {
      targetRowIndex = i;
      targetRowName = rowName;
      break;
    }
  }

  expect(targetRowIndex).not.toBeNull();

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    const rowName = await row.locator('td').nth(0).innerText();

    // Click the row to open details
    await row.click();


    // Check Transactions tab for both payout and contribution
    await page.click('button:has-text("Transactions")');
    const transactionRows = page.locator('tbody tr');
    const transactionCount = await transactionRows.count();
    let hasPayout = false;
    let hasContribution = false;

    // Check for "No transactions found for this group" text
    const noTransactionsText = await page.locator('text=No transactions found for this group').isVisible();
    hasPayout = !noTransactionsText;
    hasContribution = !noTransactionsText;

    // Check Previous Winners tab for empty state
    await page.click('button:has-text("Previous Winners")');
    const noWinnersText = await page.locator('text=No previous winners found for this Equb.').isVisible();
    const totalWinnersText = await page.locator('text=Total winners:0').isVisible();

    const hasTransactions = hasPayout || hasContribution ? 1 : 0;
    const hasWinners = (noWinnersText && totalWinnersText) ? 0 : 1;

    // If both are empty, this Equb can be deleted
    if (hasTransactions === 0 && hasWinners === 0) {
      targetRowIndex = i;
      targetRowName = rowName;
      await page.click('button:has-text("Back to Equbs List")');
      break;
    }

    // Go back to the list view
    await page.click('button:has-text("Back to Equbs List")');
  }

  expect(targetRowIndex).not.toBeNull();

  // Re-fetch the row after navigation
  const targetRow = page.locator('table tbody tr').nth(targetRowIndex);

  // Open the 3-dot menu
  await targetRow.locator('button:has(svg.lucide-ellipsis-vertical)').click();

  // Click the Delete button (with trash icon or text)
  await page.locator('button:has(svg.lucide-trash), button:has-text("Delete")').click();

  // Confirm deletion if a dialog appears
  const confirmButton = page.locator('button:has-text("Delete Equb"), button:has-text("Confirm")');
  if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
    await confirmButton.click();
  }

  // Assert success toast or message
 await expect(page.locator('.Toastify__toast')).toHaveText(/Equb deleted successfully!/i, { timeout: 5000 });

});