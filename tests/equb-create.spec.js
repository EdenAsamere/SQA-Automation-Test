import { loginAsAdmin } from '../helpers/loginAsAdmin';

const { test, expect } = require('@playwright/test');

test('Create a new Equb group', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page)
  await expect(page).toHaveURL(/home/);
  // Navigate to Equbs page
  await page.click('a[href="/equbs"]');
  await expect(page).toHaveURL('http://localhost:3000/equbs');

  // Start group creation
  await page.click('button:has-text("Create New Equb")');

  // Fill the form using `name` attributes
  await page.fill('input[name="group_name"]', 'Unique Test Equb Group');
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
  // Login as admin 
  await loginAsAdmin(page)
  await expect(page).toHaveURL(/home/);

  await page.click('a[href="/equbs"]');
  await page.click('button:has-text("Create New Equb")');
  

  // Fill the form with a past date
  await page.fill('input[name="group_name"]', 'Testing past start date for Equb Group');
   
  await page.fill('input[name="description"]', 'This is a test Equb group for Playwright testing.');

  await page.fill('input[name="contributionAmount"]', '1000');

  await page.selectOption('select[name="frequency"]', 'weekly');

  await page.fill('input[name="startDate"]', '2025-05-21'); 

  await page.fill('input[name="members"]', '10');

  await page.click('button[type="submit"]')


  // Assert the appropriate error is shown
 await expect(page.getByText('Start date must be in the future')).toBeVisible();

});

