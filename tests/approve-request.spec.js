import { loginAsAdmin } from '../helpers/loginAsAdmin';
const { test, expect } = require('@playwright/test');

test.describe('Equb Request Approval Tests', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.waitForURL(/home/);

    await page.click('a[href="/equbs"]');
    await page.waitForURL(/\/equbs$/);

    await page.click('text=Software Engineers Mahber');
    await page.waitForURL(/equbs\/6827afb1681862f14881948c/);

    const joinRequestsTab = page.getByRole('button', { name: 'Join Requests' });
    await expect(joinRequestsTab).toBeVisible();
    await joinRequestsTab.click();

    // Wait for at least one join request item to appear, up to 60s timeout
    await page.waitForSelector('.join-request-item', { state: 'visible', timeout: 60000 });

    // Confirm join requests are present
    const countAfter = await page.locator('.join-request-item').count();
    console.log('Join requests count after wait:', countAfter);
    expect(countAfter).toBeGreaterThan(0);
  });

  test('Approve a join request', async ({ page }) => {
  const firstRequest = page.locator('.join-request-item').first();
  const requesterName = await firstRequest.locator('h4.font-medium').innerText();


  const approveButton = firstRequest.getByRole('button', { name: 'Approve' });
  await expect(approveButton).toBeVisible();
  await expect(approveButton).toBeEnabled();

  await approveButton.click();

  // Wait for success toast
  await expect(page.getByText('Join request approved successfully!')).toBeVisible();

 // Click Members tab properly
  const membersTab = page.getByRole('button', { name: 'Members' });
  await expect(membersTab).toBeVisible();
  await membersTab.click();

  // Locate members list container
  const membersList = page.locator('.members-list');

  // Wait for the approved member name to appear inside the members list
  await expect(membersList.getByText(requesterName)).toBeVisible();

  
});


});
