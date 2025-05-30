import { loginAsAdmin } from '../helpers/loginAsAdmin';
const { test, expect } = require('@playwright/test');

test.describe('Equb Request Rejection Tests', () => {

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

  test('Reject a join request and verify badge', async ({ page }) => {
  const secondRequest = page.locator('.join-request-item').nth(1);;
  const requesterName = await secondRequest.locator('h4.font-medium').innerText();

  const rejectButton = secondRequest.getByRole('button', { name: 'Reject' });
  await expect(rejectButton).toBeVisible();
  await expect(rejectButton).toBeEnabled();

  // Click Reject button
  await rejectButton.click();

  // Wait for confirmation modal
  const confirmRejectButton = page.getByRole('button', { name: 'Confirm Reject' });
  await expect(confirmRejectButton).toBeVisible();
  await confirmRejectButton.click();

  // Wait for toast
  await expect(page.getByText('Join request rejected successfully!')).toBeVisible();

  // Wait for the requests list to reload
  await page.waitForSelector('.join-request-item', { state: 'visible' });

  // Find the request by name after reload
  const updatedRequest = page.locator('.join-request-item', { hasText: requesterName }).first();

  // Ensure the Rejected badge appears
  await expect(updatedRequest.getByText('Rejected')).toBeVisible();

  // Ensure no Reject button exists in this item now
  await expect(updatedRequest.getByRole('button', { name: 'Reject' })).toHaveCount(0);
});

});
