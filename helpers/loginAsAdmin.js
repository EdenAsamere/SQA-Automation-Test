export async function loginAsAdmin(page) {
  await page.goto('https://final-project-f45e.onrender.com/login');
  await page.fill('#phone', '932013310');
  await page.fill('#password', 'SecurePass123!');
  await page.click('button[type="submit"]');
}
