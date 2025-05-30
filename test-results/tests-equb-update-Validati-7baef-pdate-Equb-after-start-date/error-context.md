# Test info

- Name: Validation: cannot update Equb after start date
- Location: C:\Users\Hp\Desktop\sqa\SQA-Automation-Test\tests\equb-update.spec.js:41:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)

Locator: locator(':root')
Expected pattern: /home/
Received string:  "https://final-project-f45e.onrender.com/login"
Call log:
  - expect.toHaveURL with timeout 5000ms
  - waiting for locator(':root')
    8 × locator resolved to <html lang="en" class="chromane-sonic-dark">…</html>
      - unexpected value "https://final-project-f45e.onrender.com/login"

    at C:\Users\Hp\Desktop\sqa\SQA-Automation-Test\tests\equb-update.spec.js:44:22
```

# Page snapshot

```yaml
- heading "e-EQUB" [level=1]
- heading "Admin Login" [level=2]
- text: Phone Number +251
- textbox "Phone Number": "932013310"
- text: Password
- textbox "Password": SecurePass123!
- button "Show password":
  - img
- checkbox "Keep me signed in"
- text: Keep me signed in
- button "Login"
- region "Notifications Alt+T"
- alert
```

# Test source

```ts
   1 | import { loginAsAdmin } from '../helpers/loginAsAdmin';
   2 | const { test, expect } = require('@playwright/test');
   3 |
   4 | test('Update Equb group as admin', async ({ page }) => {
   5 |   // Login as admin
   6 |   await loginAsAdmin(page)
   7 |   await expect(page).toHaveURL(/home/);
   8 |   // Go to Equbs list
   9 |   await page.click('a[href="/equbs"]');
   10 |   await expect(page).toHaveURL('https://final-project-f45e.onrender.com/equbs');
   11 |
   12 |   // Find the row for the Equb group to update
   13 |   const targetRow = page.locator('table tbody tr').filter({ hasText: 'Unique Test Equb Group' }).first();
   14 |   // Wait for the row to be visible
   15 |   await expect(targetRow).toBeVisible({ timeout: 10000 });
   16 |
   17 |
   18 | // Open the 3-dot menu
   19 |   await targetRow.locator('button:has(svg.lucide-ellipsis-vertical)').click();
   20 |
   21 | // Click the Edit button in the dropdown (with the pen icon)
   22 |   await page.locator('button:has(svg.lucide-square-pen)').click();
   23 |
   24 |
   25 |   // Update the description and start date (must be in the future)
   26 |   await page.fill('input[name="description"]', 'Updated description for Equb group.');
   27 |   await page.fill('input[name="startDate"]', '2025-12-31');
   28 |
   29 |   // Submit the update
   30 |   await page.click('button[type="submit"]');
   31 |
   32 |   // Assert success message
   33 |   await expect(page.getByText('Equb updated successfully!')).toBeVisible();
   34 |
   35 |
   36 |   // Optionally, verify the updated values in the list
   37 |   await expect(targetRow.locator('td').nth(1)).toHaveText('Updated description for Equb group.');
   38 |
   39 | });
   40 |
   41 | test('Validation: cannot update Equb after start date', async ({ page }) => {
   42 |   // Login as admin
   43 |    await loginAsAdmin(page)
>  44 |   await expect(page).toHaveURL(/home/);
      |                      ^ Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)
   45 |   // Navigate to Equbs page
   46 |   await page.click('a[href="/equbs"]');
   47 |   await expect(page).toHaveURL(/equbs/);
   48 |
   49 |   // Wait for table to load
   50 |   await expect(page.locator('table tbody tr')).not.toHaveCount(0, { timeout: 15000 });
   51 |
   52 |   // Get all rows and log their details for debugging
   53 |   const rows = page.locator('table tbody tr');
   54 |   const rowCount = await rows.count();
   55 |   console.log(`Total rows found: ${rowCount}`);
   56 |
   57 |   // Find all rows with start date in the past
   58 |   let validRows = [];
   59 |   let targetRow = null;
   60 |   let targetRowName = '';
   61 |   const today = new Date();
   62 |   today.setHours(0, 0, 0, 0);
   63 |
   64 |   for (let i = 0; i < rowCount; i++) {
   65 |     const row = rows.nth(i);
   66 |     const rowName = await row.locator('td:nth-child(1)').innerText();
   67 |     const startDateText = await row.locator('td:nth-child(5)').innerText();
   68 |     console.log(`Row ${i + 1}: ${rowName} | Start Date: ${startDateText}`);
   69 |
   70 |     // Parse DD/MM/YYYY format correctly
   71 |     const [month, day, year] = startDateText.split('/');
   72 |     const startDate = new Date(Number(year), Number(month) - 1, Number(day));
   73 |     startDate.setHours(0, 0, 0, 0);
   74 |
   75 |     console.log(`Raw: ${startDateText}, Parsed: ${startDate.toISOString()}, Today: ${today.toISOString()}`);
   76 |
   77 |     if (startDate < today) {
   78 |       validRows.push({ row, rowName });
   79 |     }
   80 |   }
   81 |
   82 |   if (validRows.length === 0) {
   83 |     throw new Error('No Equb with start date in the past found');
   84 |   }
   85 |
   86 |   // Pick a random valid row
   87 |   const randomIndex = Math.floor(Math.random() * validRows.length);
   88 |   targetRow = validRows[randomIndex].row;
   89 |   targetRowName = validRows[randomIndex].rowName;
   90 |
   91 |
   92 |   // Open the 3-dot menu for the specific row
   93 |   const menuButton = targetRow.locator('button:has(svg.lucide-ellipsis-vertical)');
   94 |   await expect(menuButton).toBeVisible();
   95 |   await menuButton.click();
   96 |
   97 |  // Open the 3-dot menu
   98 |   await targetRow.locator('button:has(svg.lucide-ellipsis-vertical)').click();
   99 |
  100 | // // Click the Edit button in the dropdown (with the pen icon)
  101 |    const editButton = await page.locator('button:has(svg.lucide-square-pen)').click();
  102 |
  103 |   // Verify we're editing the correct Equb
  104 |   await expect(page.locator('h2:has-text("Update Equb")')).toBeVisible();
  105 |   const editingEqubName = await page.locator('input[name="group_name"]').inputValue();
  106 |   expect(editingEqubName).toBe(targetRowName);
  107 |
  108 |   // Try to update with invalid date
  109 |   await page.fill('input[name="startDate"]', '2025-05-30');
  110 |   await page.waitForTimeout(500);
  111 |   await page.click('button[type="submit"]');
  112 |
  113 |   // Verify validation error
  114 |   await expect(page.locator('.Toastify__toast--error')).toHaveText(/You cannot update a group that has started/, { timeout: 5000 });
  115 | });
```