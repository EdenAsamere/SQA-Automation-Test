# Test info

- Name: navigate to collaterals page and verify page loads
- Location: C:\Users\Hp\Desktop\sqa\SQA-Automation-Test\tests\admin-navigation.spec.js:31:1

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href="/collaterals"]')

    at C:\Users\Hp\Desktop\sqa\SQA-Automation-Test\tests\admin-navigation.spec.js:37:14
```

# Page snapshot

```yaml
- link "Logo e-QUB":
  - /url: /
  - img "Logo"
  - text: e-QUB
- link "Home":
  - /url: /home
- link "equbs":
  - /url: /equbs
- link "users":
  - /url: /users
- link "idverification":
  - /url: /idverification
- link "collateralverification":
  - /url: /collateralverification
- link "Logout":
  - /url: /login
- main:
  - img "Profile Avatar"
  - paragraph: Active Equb Groups
  - heading "39" [level=2]
  - paragraph: Pending ID Verifications
  - heading "1" [level=2]
  - paragraph: Pending Collaterals
  - heading "0" [level=2]
  - heading "User Growth (Monthly)" [level=3]
  - img: Jan Mar Apr Jun Jul Sep Oct Dec 0 10 20 30 40
  - heading "Equb Growth (Monthly)" [level=3]
  - img: Jan Mar Apr Jun Jul Sep Oct Dec 0 15 30 45 60
  - heading "Verification Status" [level=3]
  - img:
    - img
    - img
    - text: "Verified: 42% Unverified: 58%"
  - list:
    - listitem:
      - img
      - text: "Verified: 24"
    - listitem:
      - img
      - text: "Unverified: 33"
  - heading "Top Equb Creators" [level=3]
  - list:
    - listitem:
      - img
      - paragraph: Admin User
      - paragraph: 35 groups
    - listitem:
      - img
      - paragraph: Hiwot Beyene
      - paragraph: 8 groups
    - listitem:
      - img
      - paragraph: Eden Asamere
      - paragraph: 4 groups
    - listitem:
      - img
      - paragraph: John Doe
      - paragraph: 1 group
- region "Notifications Alt+T"
- alert
```

# Test source

```ts
   1 | import { loginAsAdmin } from '../helpers/loginAsAdmin';
   2 |
   3 | const { test, expect } = require('@playwright/test');
   4 |
   5 | test('verify dashboard elements after login', async ({ page }) => {
   6 |   // Login as admin and verify home page
   7 |   await loginAsAdmin(page);
   8 |   await expect(page).toHaveURL(/home/);
   9 |   
   10 |   // Verify key dashboard elements are visible
   11 |   await expect(page.getByText('Active Equb Groups')).toBeVisible();
   12 |   await expect(page.getByText('Pending ID Verifications')).toBeVisible();
   13 |   await expect(page.getByText('Pending Collaterals')).toBeVisible();
   14 | });
   15 |
   16 | test('navigate to equbs page and verify page loads', async ({ page }) => {
   17 |   // Login and navigate to equbs page
   18 |   await loginAsAdmin(page);
   19 |   await expect(page).toHaveURL(/home/);
   20 |   
   21 |   // Click on Equbs navigation link
   22 |   await page.click('a[href="/equbs"]');
   23 |   
   24 |   // Verify navigation to equbs page
   25 |   await expect(page).toHaveURL('https://final-project-f45e.onrender.com/equbs');
   26 |   
   27 |   // Verify equbs page elements are visible
   28 |   await expect(page.locator('table')).toBeVisible();
   29 | });
   30 |
   31 | test('navigate to collaterals page and verify page loads', async ({ page }) => {
   32 |   // Login and navigate to collaterals page
   33 |   await loginAsAdmin(page);
   34 |   await expect(page).toHaveURL(/home/);
   35 |   
   36 |   // Click on Collaterals navigation link
>  37 |   await page.click('a[href="/collaterals"]');
      |              ^ Error: page.click: Test timeout of 30000ms exceeded.
   38 |   
   39 |   // Verify navigation to collaterals page
   40 |   await expect(page).toHaveURL('https://final-project-f45e.onrender.com/collaterals');
   41 |   
   42 |   // Verify collaterals page elements are visible
   43 |   await expect(page.locator('table, .collaterals-list, .collateral-container')).toBeVisible();
   44 | });
   45 |
   46 | test('navigate to id verification page and verify page loads', async ({ page }) => {
   47 |   // Login and navigate to id verification page
   48 |   await loginAsAdmin(page);
   49 |   await expect(page).toHaveURL(/home/);
   50 |   
   51 |   // Click on ID Verification navigation link
   52 |   await page.click('a[href="/idverification"]');
   53 |   
   54 |   // Verify navigation to id verification page
   55 |   await expect(page).toHaveURL('https://final-project-f45e.onrender.com/idverification');
   56 |   
   57 |   // Verify id verification page elements are visible
   58 |   await expect(page.locator('table')).toBeVisible();
   59 | });
   60 |
   61 | test('verify navigation menu structure exists', async ({ page }) => {
   62 |   // Login as admin
   63 |   await loginAsAdmin(page);
   64 |   await expect(page).toHaveURL(/home/);
   65 |   
   66 |   // Verify navigation elements exist
   67 |   const equbsLink = page.locator('a[href="/equbs"]');
   68 |   await expect(equbsLink).toBeVisible();
   69 |   
   70 |   // Verify some form of navigation container exists
   71 |   const navigation = page.locator('nav, .navbar, .navigation, .sidebar').first();
   72 |   await expect(navigation).toBeVisible();
   73 | });
   74 |
   75 | test('navigate to users management page', async ({ page }) => {
   76 |   // Login as admin
   77 |   await loginAsAdmin(page);
   78 |   await expect(page).toHaveURL(/home/);
   79 |   
   80 |   // Try to navigate to users page (common admin functionality)
   81 |   const usersLink = page.locator('a[href="/users"], a[href="/user-management"], a:has-text("Users")').first();
   82 |   
   83 |   if (await usersLink.isVisible()) {
   84 |     await usersLink.click();
   85 |     await expect(page).toHaveURL(/users|user-management/);
   86 |     
   87 |     // Verify users page elements
   88 |     await expect(page.locator('table, .user-list, .users-container')).toBeVisible();
   89 |   }
   90 | });
   91 |
   92 | test('navigate to reports or analytics page', async ({ page }) => {
   93 |   // Login as admin
   94 |   await loginAsAdmin(page);
   95 |   await expect(page).toHaveURL(/home/);
   96 |   
   97 |   // Try to navigate to reports/analytics page
   98 |   const reportsLink = page.locator('a[href="/reports"], a[href="/analytics"], a:has-text("Reports"), a:has-text("Analytics")').first();
   99 |   
  100 |   if (await reportsLink.isVisible()) {
  101 |     await reportsLink.click();
  102 |     await expect(page).toHaveURL(/reports|analytics/);
  103 |   }
  104 | });
  105 |
  106 | test('navigate to settings page', async ({ page }) => {
  107 |   // Login as admin
  108 |   await loginAsAdmin(page);
  109 |   await expect(page).toHaveURL(/home/);
  110 |   
  111 |   // Try to navigate to settings page
  112 |   const settingsLink = page.locator('a[href="/settings"], a:has-text("Settings")').first();
  113 |   
  114 |   if (await settingsLink.isVisible()) {
  115 |     await settingsLink.click();
  116 |     await expect(page).toHaveURL(/settings/);
  117 |     
  118 |     // Verify settings page elements
  119 |     await expect(page.locator('form, .settings-container, .config-panel')).toBeVisible();
  120 |   }
  121 | });
  122 |
  123 | test('verify profile menu interactions', async ({ page }) => {
  124 |   // Login as admin
  125 |   await loginAsAdmin(page);
  126 |   await expect(page).toHaveURL(/home/);
  127 |   
  128 |   // Check for profile avatar or profile menu
  129 |   const profileAvatar = page.locator('img[alt*="Profile"], .profile-avatar, .user-avatar').first();
  130 |   
  131 |   if (await profileAvatar.isVisible()) {
  132 |     await profileAvatar.click();
  133 |     
  134 |     // Check for profile dropdown menu
  135 |     const profileMenu = page.locator('.profile-menu, .dropdown-menu, .user-menu');
  136 |     if (await profileMenu.isVisible()) {
  137 |       await expect(profileMenu).toBeVisible();
```