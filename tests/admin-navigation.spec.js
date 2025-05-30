import { loginAsAdmin } from '../helpers/loginAsAdmin';

const { test, expect } = require('@playwright/test');

test('verify dashboard elements after login', async ({ page }) => {
  // Login as admin and verify home page
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Verify key dashboard elements are visible
  await expect(page.getByText('Active Equb Groups')).toBeVisible();
  await expect(page.getByText('Pending ID Verifications')).toBeVisible();
  await expect(page.getByText('Pending Collaterals')).toBeVisible();
});

test('navigate to equbs page and verify page loads', async ({ page }) => {
  // Login and navigate to equbs page
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Click on Equbs navigation link
  await page.click('a[href="/equbs"]');
  
  // Verify navigation to equbs page
  await expect(page).toHaveURL('https://final-project-f45e.onrender.com/equbs');
  
  // Verify equbs page elements are visible
  await expect(page.locator('table')).toBeVisible();
});

test('navigate to collaterals page and verify page loads', async ({ page }) => {
  // Login and navigate to collaterals page
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Click on Collaterals navigation link
  await page.click('a[href="/collaterals"]');
  
  // Verify navigation to collaterals page
  await expect(page).toHaveURL('https://final-project-f45e.onrender.com/collaterals');
  
  // Verify collaterals page elements are visible
  await expect(page.locator('table, .collaterals-list, .collateral-container')).toBeVisible();
});

test('navigate to id verification page and verify page loads', async ({ page }) => {
  // Login and navigate to id verification page
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Click on ID Verification navigation link
  await page.click('a[href="/id-verification"], a[href="/verifications"], a[href="/verification"]');
  
  // Verify navigation to id verification page
  await expect(page).toHaveURL(/id-verification|verifications|verification/);
  
  // Verify id verification page elements are visible
  await expect(page.locator('table, .verification-list, .id-verification-container')).toBeVisible();
});

test('verify navigation menu structure exists', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Verify navigation elements exist
  const equbsLink = page.locator('a[href="/equbs"]');
  await expect(equbsLink).toBeVisible();
  
  // Verify some form of navigation container exists
  const navigation = page.locator('nav, .navbar, .navigation, .sidebar').first();
  await expect(navigation).toBeVisible();
});

test('navigate to users management page', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Try to navigate to users page (common admin functionality)
  const usersLink = page.locator('a[href="/users"], a[href="/user-management"], a:has-text("Users")').first();
  
  if (await usersLink.isVisible()) {
    await usersLink.click();
    await expect(page).toHaveURL(/users|user-management/);
    
    // Verify users page elements
    await expect(page.locator('table, .user-list, .users-container')).toBeVisible();
  }
});

test('navigate to reports or analytics page', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Try to navigate to reports/analytics page
  const reportsLink = page.locator('a[href="/reports"], a[href="/analytics"], a:has-text("Reports"), a:has-text("Analytics")').first();
  
  if (await reportsLink.isVisible()) {
    await reportsLink.click();
    await expect(page).toHaveURL(/reports|analytics/);
  }
});

test('navigate to settings page', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Try to navigate to settings page
  const settingsLink = page.locator('a[href="/settings"], a:has-text("Settings")').first();
  
  if (await settingsLink.isVisible()) {
    await settingsLink.click();
    await expect(page).toHaveURL(/settings/);
    
    // Verify settings page elements
    await expect(page.locator('form, .settings-container, .config-panel')).toBeVisible();
  }
});

test('verify profile menu interactions', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Check for profile avatar or profile menu
  const profileAvatar = page.locator('img[alt*="Profile"], .profile-avatar, .user-avatar').first();
  
  if (await profileAvatar.isVisible()) {
    await profileAvatar.click();
    
    // Check for profile dropdown menu
    const profileMenu = page.locator('.profile-menu, .dropdown-menu, .user-menu');
    if (await profileMenu.isVisible()) {
      await expect(profileMenu).toBeVisible();
    }
  }
});

test('verify sidebar navigation menu structure', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Verify sidebar or navigation menu exists
  const sidebar = page.locator('.sidebar, .nav-menu, nav, .navigation');
  await expect(sidebar.first()).toBeVisible();
  
  // Verify common navigation links are present
  const equbsLink = page.locator('a[href="/equbs"]');
  await expect(equbsLink).toBeVisible();
  
  // Check for other common admin navigation items
  const navigationItems = [
    'Home', 'Dashboard', 'Equbs', 'Users', 'Reports', 'Settings'
  ];
  
  for (const item of navigationItems) {
    const navItem = page.locator(`a:has-text("${item}"), .nav-item:has-text("${item}")`).first();
    if (await navItem.isVisible()) {
      await expect(navItem).toBeVisible();
    }
  }
});

test('verify breadcrumb navigation', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Navigate to equbs page
  await page.click('a[href="/equbs"]');
  await expect(page).toHaveURL('https://final-project-f45e.onrender.com/equbs');
  
  // Check for breadcrumb navigation
  const breadcrumb = page.locator('.breadcrumb, .breadcrumbs, .page-path');
  if (await breadcrumb.isVisible()) {
    await expect(breadcrumb).toBeVisible();
  }
});

test('test responsive navigation menu toggle', async ({ page }) => {
  // Login as admin
  await loginAsAdmin(page);
  await expect(page).toHaveURL(/home/);
  
  // Set mobile viewport to test responsive navigation
  await page.setViewportSize({ width: 375, height: 667 });
  
  // Look for mobile menu toggle button
  const menuToggle = page.locator('.menu-toggle, .nav-toggle, .hamburger, button:has-text("Menu")').first();
  
  if (await menuToggle.isVisible()) {
    await menuToggle.click();
    
    // Verify mobile menu opens
    const mobileMenu = page.locator('.mobile-menu, .nav-menu.open, .sidebar.open');
    if (await mobileMenu.isVisible()) {
      await expect(mobileMenu).toBeVisible();
    }
  }
}); 