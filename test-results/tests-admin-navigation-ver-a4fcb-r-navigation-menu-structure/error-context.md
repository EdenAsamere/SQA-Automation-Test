# Test info

- Name: verify sidebar navigation menu structure
- Location: C:\Users\Hp\Desktop\sqa\SQA-Automation-Test\tests\admin-navigation.spec.js:142:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.sidebar, .nav-menu, nav, .navigation').first()
Expected: visible
Received: hidden
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.sidebar, .nav-menu, nav, .navigation').first()
    9 × locator resolved to <nav class="fixed inset-0 z-50 w-full md:hidden pointer-events-none">…</nav>
      - unexpected value "hidden"

    at C:\Users\Hp\Desktop\sqa\SQA-Automation-Test\tests\admin-navigation.spec.js:149:33
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
  138 |     }
  139 |   }
  140 | });
  141 |
  142 | test('verify sidebar navigation menu structure', async ({ page }) => {
  143 |   // Login as admin
  144 |   await loginAsAdmin(page);
  145 |   await expect(page).toHaveURL(/home/);
  146 |   
  147 |   // Verify sidebar or navigation menu exists
  148 |   const sidebar = page.locator('.sidebar, .nav-menu, nav, .navigation');
> 149 |   await expect(sidebar.first()).toBeVisible();
      |                                 ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  150 |   
  151 |   // Verify common navigation links are present
  152 |   const equbsLink = page.locator('a[href="/equbs"]');
  153 |   await expect(equbsLink).toBeVisible();
  154 |   
  155 |   // Check for other common admin navigation items
  156 |   const navigationItems = [
  157 |     'Home', 'Dashboard', 'Equbs', 'Users', 'Reports', 'Settings'
  158 |   ];
  159 |   
  160 |   for (const item of navigationItems) {
  161 |     const navItem = page.locator(`a:has-text("${item}"), .nav-item:has-text("${item}")`).first();
  162 |     if (await navItem.isVisible()) {
  163 |       await expect(navItem).toBeVisible();
  164 |     }
  165 |   }
  166 | });
  167 |
  168 | test('verify breadcrumb navigation', async ({ page }) => {
  169 |   // Login as admin
  170 |   await loginAsAdmin(page);
  171 |   await expect(page).toHaveURL(/home/);
  172 |   
  173 |   // Navigate to equbs page
  174 |   await page.click('a[href="/equbs"]');
  175 |   await expect(page).toHaveURL('https://final-project-f45e.onrender.com/equbs');
  176 |   
  177 |   // Check for breadcrumb navigation
  178 |   const breadcrumb = page.locator('.breadcrumb, .breadcrumbs, .page-path');
  179 |   if (await breadcrumb.isVisible()) {
  180 |     await expect(breadcrumb).toBeVisible();
  181 |   }
  182 | });
  183 |
  184 | test('test responsive navigation menu toggle', async ({ page }) => {
  185 |   // Login as admin
  186 |   await loginAsAdmin(page);
  187 |   await expect(page).toHaveURL(/home/);
  188 |   
  189 |   // Set mobile viewport to test responsive navigation
  190 |   await page.setViewportSize({ width: 375, height: 667 });
  191 |   
  192 |   // Look for mobile menu toggle button
  193 |   const menuToggle = page.locator('.menu-toggle, .nav-toggle, .hamburger, button:has-text("Menu")').first();
  194 |   
  195 |   if (await menuToggle.isVisible()) {
  196 |     await menuToggle.click();
  197 |     
  198 |     // Verify mobile menu opens
  199 |     const mobileMenu = page.locator('.mobile-menu, .nav-menu.open, .sidebar.open');
  200 |     if (await mobileMenu.isVisible()) {
  201 |       await expect(mobileMenu).toBeVisible();
  202 |     }
  203 |   }
  204 | }); 
```