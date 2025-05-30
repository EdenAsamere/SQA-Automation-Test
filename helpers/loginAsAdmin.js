export async function loginAsAdmin(page) {
  await page.goto('http://localhost:3000/login');
  await page.fill('#phone', '932013310');
  await page.fill('#password', 'SecurePass123!');
  await page.click('button[type="submit"]');
}
