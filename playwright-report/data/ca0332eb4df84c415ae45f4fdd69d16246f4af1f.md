# Test info

- Name: Read Equb groups - list displays correctly
- Location: C:\Users\Hp\Desktop\sqa\SQA-Automation-Test\tests\equb-read.spec.js:5:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)

Locator: locator(':root')
Expected pattern: /home/
Received string:  "https://final-project-f45e.onrender.com/login"
Call log:
  - expect.toHaveURL with timeout 5000ms
  - waiting for locator(':root')
    6 × locator resolved to <html lang="en" class="chromane-sonic-dark">…</html>
      - unexpected value "https://final-project-f45e.onrender.com/login"

    at C:\Users\Hp\Desktop\sqa\SQA-Automation-Test\tests\equb-read.spec.js:7:22
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
  - heading "33" [level=2]
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
      - paragraph: 29 groups
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
   5 | test('Read Equb groups - list displays correctly', async ({ page }) => {
   6 |   await loginAsAdmin(page)
>  7 |   await expect(page).toHaveURL(/home/);
     |                      ^ Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)
   8 |   await page.goto('https://final-project-f45e.onrender.com/equbs');
   9 |   await expect(page.locator('table')).toBeVisible();
  10 |
  11 |   const rows = page.locator('table tbody tr');
  12 |   const count = await rows.count();
  13 |   expect(count).toBeGreaterThan(0);
  14 |
  15 |
  16 |   const firstMatch = rows.first();
  17 |   await expect(firstMatch).toBeVisible();
  18 |
  19 | });
  20 |
```