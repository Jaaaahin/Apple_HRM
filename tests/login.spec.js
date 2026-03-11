const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const loginData = require('../data/loginData.json');




test('Login to OrangeHRM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await expect(page).toHaveTitle(/OrangeHRM/);
  await loginPage.login(loginData.validUser.username, loginData.validUser.password);
  await loginPage.verifyLoginSuccess();
});


test("Login to OrangeHRM with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await expect(page).toHaveTitle(/OrangeHRM/);
  await loginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);
  await loginPage.verifyLoginFailure();

});


test("Login to OrangeHRM with empty credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await expect(page).toHaveTitle(/OrangeHRM/);
  await loginPage.login(loginData.emptyUser.username, loginData.emptyUser.password);
  await loginPage.verifyRequiredFields();
});

test("Login to OrangeHRM with invalid username", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await expect(page).toHaveTitle(/OrangeHRM/);
  await loginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);
  await loginPage.verifyLoginFailure();
});

test("Login to OrangeHRM with invalid password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await expect(page).toHaveTitle(/OrangeHRM/);
  await loginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);
  await loginPage.verifyLoginFailure();
});

