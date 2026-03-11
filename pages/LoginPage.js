const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
      waitUntil: 'load',
      timeout: 90000
    });
    // Explicitly wait for the form to be ready
    await this.usernameInput.waitFor({ state: 'visible', timeout: 30000 });
  }

  async login(username, password) {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/dashboard/, { timeout: 15000 });
    await expect(this.dashboardHeading).toBeVisible({ timeout: 15000 });
  }

  async verifyLoginFailure() {
    await expect(this.page.getByText('Invalid credentials')).toBeVisible({ timeout: 10000 });
  }

  async verifyRequiredFields() {
    await expect(this.page.getByText('Required').first()).toBeVisible({ timeout: 10000 });
  }
};
