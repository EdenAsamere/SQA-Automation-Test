# Test info

- Name: Delete Equb group with no transactions and no previous winners
- Location: C:\Users\Hp\Desktop\sqa\SQA-Automation-Test\tests\equb-delete.spec.js:5:1

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Transactions")')

    at C:\Users\Hp\Desktop\sqa\SQA-Automation-Test\tests\equb-delete.spec.js:32:18
```

# Page snapshot

```yaml
- heading "500" [level=1]
- heading "Internal Server Error." [level=2]
- alert
```

# Test source

```ts
   1 | import { loginAsAdmin } from '../helpers/loginAsAdmin';
   2 |
   3 | const { test, expect } = require('@playwright/test');
   4 |
   5 | test('Delete Equb group with no transactions and no previous winners', async ({ page }) => {
   6 |   // Login as admin
   7 |   await loginAsAdmin(page)
   8 |   await expect(page).toHaveURL(/home/);
   9 |
  10 |   // Navigate to Equbs page
  11 |   await page.click('a[href="/equbs"]');
  12 |   await expect(page).toHaveURL(/equbs/);
  13 |
  14 |   // Wait for table to load
  15 |   const rows = page.locator('table tbody tr');
  16 |   await expect(rows.first()).toBeVisible({ timeout: 10000 });
  17 |
  18 |   // Find the row for "Unique Test Equb Group"
  19 |   const rowCount = await rows.count();
  20 |   let targetRowIndex = null;
  21 |   let targetRowName = '';
  22 |
  23 |   for (let i = rowCount - 1; i >= 0; i--) {
  24 |     const row = rows.nth(i);
  25 |     const rowName = await row.locator('td').nth(0).innerText();
  26 |     console.log(`Checking row ${i}: ${rowName}`);
  27 |     if (rowName === 'Unique Test Equb Group') {
  28 |       // Open details
  29 |       await row.click();
  30 |
  31 |       // Check Transactions tab
> 32 |       await page.click('button:has-text("Transactions")');
     |                  ^ Error: page.click: Test timeout of 30000ms exceeded.
  33 |       // Wait for loading to finish (adjust selector as needed)
  34 |       await page.waitForSelector('text=No transactions found for this group, .loading-indicator', { state: 'attached', timeout: 5000 }).catch(() => {});
  35 |       const noTransactions = await page.locator('text=No transactions found for this group').isVisible();
  36 |
  37 |       // Check Previous Winners tab
  38 |       await page.click('button:has-text("Previous Winners")');
  39 |       await page.waitForSelector('text=No previous winners found for this Equb., .loading-indicator', { state: 'attached', timeout: 5000 }).catch(() => {});
  40 |       await page.waitForSelector('.loading-indicator', { state: 'detached', timeout: 5000 }).catch(() => {});
  41 |       const noWinners = await page.locator('text=No previous winners found for this Equb.').isVisible();
  42 |       const zeroWinners = await page.locator('text=Total Winners: 0').isVisible();
  43 |       console.log(`Row ${i}- No Winners: ${noWinners}, Zero Winners: ${zeroWinners}`);
  44 |
  45 |       if (noTransactions || (noWinners || zeroWinners)) {
  46 |         targetRowIndex = i;
  47 |         console.log(`Found deletable row at index ${i}: ${rowName}`);
  48 |         targetRowName = rowName;
  49 |         await page.click('button:has-text("Back to Equbs List")');
  50 |         break;
  51 |       }
  52 |
  53 |       // Return to list if not deletable
  54 |       await page.click('button:has-text("Back to Equbs List")');
  55 |     }
  56 |   }
  57 |
  58 |   if (targetRowIndex === null) {
  59 |     test.skip(true, 'No deletable Equb group found');
  60 |   }
  61 |   // Re-locate the target row after navigating back
  62 |   const targetRow = page.locator('table tbody tr').nth(targetRowIndex);
  63 |
  64 |   // Open options menu
  65 |   await targetRow.locator('button:has(svg.lucide-ellipsis-vertical)').click();
  66 |
  67 |   // Click Delete
  68 |   await page.locator('button:has-text("Delete")').click();
  69 |
  70 |   // Confirm delete if dialog appears
  71 |   const confirmBtn = page.locator('button:has-text("Delete Equb"), button:has-text("Confirm")');
  72 |   if (await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
  73 |     await confirmBtn.click();
  74 |   }
  75 |
  76 |   // Assert deletion success message
  77 |   await expect(page.locator('.Toastify__toast')).toHaveText(/Equb deleted successfully!/i, { timeout: 5000 });
  78 | });
  79 |
```