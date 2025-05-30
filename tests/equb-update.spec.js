const { test, expect } = require('@playwright/test');

test('Update Equb group as admin', async ({ page }) => {
  // Login as admin
  await page.goto('http://localhost:3000/login');
  await page.fill('#phone', '932013310');
  await page.fill('#password', 'SecurePass123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/home');

  // Go to Equbs list
  await page.click('a[href="/equbs"]');
  await expect(page).toHaveURL('http://localhost:3000/equbs');

  // Find the row for the Equb group to update
  const targetRow = page.locator('table tbody tr').filter({ hasText: 'Test Equb Group' }).first();
  await expect(targetRow).toBeVisible();



// Open the 3-dot menu
  await targetRow.locator('button:has(svg.lucide-ellipsis-vertical)').click();

// Click the Edit button in the dropdown (with the pen icon)
  await page.locator('button:has(svg.lucide-square-pen)').click();


  // Update the description and start date (must be in the future)
  await page.fill('input[name="description"]', 'Updated description for Equb group.');
  await page.fill('input[name="startDate"]', '2025-12-31');

  // Submit the update
  await page.click('button[type="submit"]');

  // Assert success message
  await expect(page.getByText('Equb updated successfully!')).toBeVisible();


  // Optionally, verify the updated values in the list
  await expect(targetRow.locator('td').nth(1)).toHaveText('Updated description for Equb group.');

});

test('Validation: cannot update Equb after start date', async ({ page }) => {
  // Login as admin
  await page.goto('http://localhost:3000/login');
  await page.fill('#phone', '932013310');
  await page.fill('#password', 'SecurePass123!');
  await page.click('button[type="submit"]');

  // Wait for navigation to home
  await expect(page).toHaveURL(/home/);

  // Navigate to Equbs page
  await page.click('a[href="/equbs"]');
  await expect(page).toHaveURL(/equbs/);

  // Wait for table to load
  await expect(page.locator('table tbody tr')).not.toHaveCount(0, { timeout: 15000 });

  // Get all rows and log their details for debugging
  const rows = page.locator('table tbody tr');
  const rowCount = await rows.count();
  console.log(`Total rows found: ${rowCount}`);

  // Find all rows with start date in the past
  let validRows = [];
  let targetRow = null;
  let targetRowName = '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    const rowName = await row.locator('td:nth-child(1)').innerText();
    const startDateText = await row.locator('td:nth-child(5)').innerText();
    console.log(`Row ${i + 1}: ${rowName} | Start Date: ${startDateText}`);

    // Parse DD/MM/YYYY format correctly
    const [month, day, year] = startDateText.split('/');
    const startDate = new Date(Number(year), Number(month) - 1, Number(day));
    startDate.setHours(0, 0, 0, 0);

    console.log(`Raw: ${startDateText}, Parsed: ${startDate.toISOString()}, Today: ${today.toISOString()}`);

    if (startDate < today) {
      validRows.push({ row, rowName });
    }
  }

  if (validRows.length === 0) {
    throw new Error('No Equb with start date in the past found');
  }

  // Pick a random valid row
  const randomIndex = Math.floor(Math.random() * validRows.length);
  targetRow = validRows[randomIndex].row;
  targetRowName = validRows[randomIndex].rowName;


  // Open the 3-dot menu for the specific row
  const menuButton = targetRow.locator('button:has(svg.lucide-ellipsis-vertical)');
  await expect(menuButton).toBeVisible();
  await menuButton.click();

 // Open the 3-dot menu
  await targetRow.locator('button:has(svg.lucide-ellipsis-vertical)').click();

// // Click the Edit button in the dropdown (with the pen icon)
   const editButton = await page.locator('button:has(svg.lucide-square-pen)').click();

  // Verify we're editing the correct Equb
  await expect(page.locator('h2:has-text("Update Equb")')).toBeVisible();
  const editingEqubName = await page.locator('input[name="group_name"]').inputValue();
  expect(editingEqubName).toBe(targetRowName);

  // Try to update with invalid date
  await page.fill('input[name="startDate"]', '2025-05-30');
  await page.waitForTimeout(500);
  await page.click('button[type="submit"]');

  // Verify validation error
  await expect(page.locator('.Toastify__toast--error')).toHaveText(/You cannot update a group that has started/, { timeout: 5000 });
});