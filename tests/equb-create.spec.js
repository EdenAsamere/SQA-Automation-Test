const { test, expect } = require('@playwright/test');

test('Create a new Equb group', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  // Login
  await page.goto('http://localhost:3000/login');
  await page.fill("#phone", "932013310");
  await page.fill("#password", "SecurePass123!");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/home');

  // Navigate to Equbs page
  await page.click('a[href="/equbs"]');
  await expect(page).toHaveURL('http://localhost:3000/equbs');

  // Start group creation
  await page.click('button:has-text("Create New Equb")');

  // Fill the form using `name` attributes
  await page.fill('input[name="group_name"]', 'Test Equb Group');
  await page.fill('input[name="description"]', 'This is a test Equb group for Playwright testing.');
  await page.fill('input[name="contributionAmount"]', '1000');
  await page.selectOption('select[name="frequency"]', 'weekly');
  await page.fill('input[name="startDate"]', '2025-12-01'); 
  await page.fill('input[name="members"]', '10');

  // Submit
  await page.click('button[type="submit"]');

  // Assert success
 await expect(page.getByText('Equb created successfully!')).toBeVisible();

});


test('Validation: start date must be in the future', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill("#phone", "932013310");
  await page.fill("#password", "SecurePass123!");
  await page.click('button[type="submit"]');
  await page.click('a[href="/equbs"]');
  await page.click('button:has-text("Create New Equb")');
  await page.waitForTimeout(1000); // or use a wait-for-response/assertion if filtering is async


  // Fill the form with a past date
  await page.fill('input[name="group_name"]', 'Testing past start date for Equb Group');
   await page.waitForTimeout(1000); // or use a wait-for-response/assertion if filtering is async

  await page.fill('input[name="description"]', 'This is a test Equb group for Playwright testing.');
   await page.waitForTimeout(1000); // or use a wait-for-response/assertion if filtering is async

  await page.fill('input[name="contributionAmount"]', '1000');
   await page.waitForTimeout(1000); // or use a wait-for-response/assertion if filtering is async

  await page.selectOption('select[name="frequency"]', 'weekly');
   await page.waitForTimeout(1000); // or use a wait-for-response/assertion if filtering is async

  await page.fill('input[name="startDate"]', '2025-05-21'); 
   await page.waitForTimeout(1000); // or use a wait-for-response/assertion if filtering is async

  await page.fill('input[name="members"]', '10');

  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000); // or use a wait-for-response/assertion if filtering is async


  // Assert the appropriate error is shown
 await expect(page.getByText('Start date must be in the future')).toBeVisible();

});

