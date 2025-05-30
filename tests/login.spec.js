import { loginAsAdmin } from '../helpers/loginAsAdmin';

const { test, expect } = require('@playwright/test');

test('login successfully with valid credentials', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://final-project-f45e.onrender.com/login');
  
  // Verify login page elements are present
  await expect(page.locator('#phone')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
  
  // Perform login with valid credentials
  await page.fill('#phone', '932013310');
  await page.fill('#password', 'SecurePass123!');
  await page.click('button[type="submit"]');
  
  // Assert successful login by checking URL redirect
  await expect(page).toHaveURL(/home/);
});

test('reject invalid credentials', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://final-project-f45e.onrender.com/login');
  
  // Attempt login with invalid credentials
  await page.fill('#phone', '999999999');
  await page.fill('#password', 'wrongpassword');
  await page.click('button[type="submit"]');
  
  // Assert login failure - should stay on login page or show error message
  await expect(page).toHaveURL(/login/);
});

test('reject empty credentials', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://final-project-f45e.onrender.com/login');
  
  // Attempt to submit form without filling credentials
  await page.click('button[type="submit"]');
  
  // Assert that we remain on login page
  await expect(page).toHaveURL(/login/);
});

test('reject empty phone number', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://final-project-f45e.onrender.com/login');
  
  // Fill only password field
  await page.fill('#password', 'SecurePass123!');
  await page.click('button[type="submit"]');
  
  // Assert that we remain on login page
  await expect(page).toHaveURL(/login/);
});

test('reject empty password', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://final-project-f45e.onrender.com/login');
  
  // Fill only phone field
  await page.fill('#phone', '932013310');
  await page.click('button[type="submit"]');
  
  // Assert that we remain on login page
  await expect(page).toHaveURL(/login/);
});

test('login with helper function', async ({ page }) => {
  // Use the existing login helper
  await loginAsAdmin(page);
  
  // Assert successful login
  await expect(page).toHaveURL(/home/);
}); 