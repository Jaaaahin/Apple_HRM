const { expect } = require('@playwright/test');

exports.AssignLeavePage = class AssignLeavePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Quick Launch locators
    this.quickLaunchItem = page.locator('.oxd-grid-item').filter({ hasText: /^Assign Leave$/ });
    this.assignLeaveQuickLaunchButton = this.quickLaunchItem.locator('button');
    this.assignLeaveIcon = this.quickLaunchItem.locator("//*[name()='svg' and contains(@class,'oxd-icon')]");

    // Assign Leave Form locators
    this.employeeNameInput = page.getByPlaceholder('Type for hints...');
    this.leaveTypeDropdown = page.locator('.oxd-select-wrapper').first();
    this.leaveTypeOptions = page.locator('.oxd-select-option');
    this.fromDateInput = page.locator('div').filter({ hasText: /^From Date$/ }).locator('input');
    this.toDateInput = page.locator('div').filter({ hasText: /^To Date$/ }).locator('input');
    this.commentInput = page.locator('textarea');
    this.assignButton = page.getByRole('button', { name: 'Assign' });
  }

  async clickAssignLeaveQuickLaunch() {
    // Wait for the parent container to be visible
    await this.quickLaunchItem.waitFor({ state: 'visible', timeout: 30000 });
    // Wait for the button to be visible
    await expect(this.assignLeaveQuickLaunchButton).toBeVisible({ timeout: 15000 });
    // Click on the button or icon
    await this.assignLeaveQuickLaunchButton.click();
  }

  async selectDate(locator, date) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
    // Clear the field using keyboard shortcuts (Control+A, Backspace)
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    // Fill the date
    await locator.fill(date);
    // Click outside to close the calendar widget
    await this.page.locator('body').click();
  }

  async assignLeave(employeeName, leaveTypeIndex = 1, fromDate, toDate, comment) {
    // Fill Employee Name with sequential typing to trigger autocomplete
    await this.employeeNameInput.waitFor({ state: 'visible' });
    await this.employeeNameInput.click();
    await this.employeeNameInput.pressSequentially(employeeName, { delay: 200 });
    
    // Wait for the hint and select the first one
    await this.page.waitForSelector('.oxd-autocomplete-dropdown', { timeout: 20000 });
    await this.page.locator('.oxd-autocomplete-option').first().click();

    // Select Leave Type
    await this.leaveTypeDropdown.waitFor({ state: 'visible' });
    await this.leaveTypeDropdown.click();
    await this.page.waitForTimeout(1000); // Wait for transition
    await this.leaveTypeOptions.nth(leaveTypeIndex).waitFor({ state: 'visible' });
    await this.leaveTypeOptions.nth(leaveTypeIndex).click();

    // Fill Dates using the new robust method
    await this.selectDate(this.fromDateInput, fromDate);
    await this.selectDate(this.toDateInput, toDate);

    // Fill Comment
    if (comment) {
      await this.commentInput.fill(comment);
    }

    // Click Assign
    await this.assignButton.waitFor({ state: 'visible' });
    await this.assignButton.click();
  }
};
