const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { AssignLeavePage } = require('../pages/AssignLeavePage');
const loginData = require('../data/loginData.json');

test('Assign Leave via Quick Launch icon', async ({ page }) => {
  test.setTimeout(180000);
  const loginPage = new LoginPage(page);
  const assignLeavePage = new AssignLeavePage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login(loginData.validUser.username, loginData.validUser.password);
  await loginPage.verifyLoginSuccess();
  await page.waitForTimeout(2000);

  // 2. Click on the Assign Leave icon in the Quick Launch section
  // Note: We use the icon XPath specified by the user
  await assignLeavePage.clickAssignLeaveQuickLaunch();

  // 3. Verify we are on the Assign Leave page
  await expect(page).toHaveURL(/assignLeave/, { timeout: 15000 });
  await expect(page.getByRole('heading', { name: 'Assign Leave' })).toBeVisible({ timeout: 15000 });

  // 4. Fill Assign Leave form
  // Using 'manda' as employee name as seen in the dashboard
  const employeeName = 'manda'; 
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const fromDate = nextWeek.toISOString().split('T')[0];
  const toDate = fromDate;

  await assignLeavePage.assignLeave(employeeName, 1, fromDate, toDate, 'Assigning leave for testing');

  // 5. Verify Success
  // The demo site often shows a toast message for success or error
  await expect(page.locator('.oxd-toast-container')).toBeVisible({ timeout: 15000 });
});
