const { expect } = require('@playwright/test');

exports.ApplyLeavePage = class ApplyLeavePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // OrangeHRM often uses custom dropdowns
    this.leaveTypeDropdown = page.locator('.oxd-select-wrapper').first(); 
    this.leaveTypeOptions = page.locator('.oxd-select-option');
    this.fromDateInput = page.getByPlaceholder('yyyy-mm-dd').first();
    this.toDateInput = page.getByPlaceholder('yyyy-mm-dd').nth(1);
    this.commentInput = page.locator('textarea');
    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.successMessage = page.locator('.oxd-toast-content');
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/applyLeave');
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

  async applyLeave(leaveTypeIndex = 1, fromDate, toDate, comment) {
    // Select Leave Type
    await this.leaveTypeDropdown.click();
    // Wait for options to be visible
    await this.page.waitForTimeout(500); // Small wait for animation
     // Select by index (skipping the prompt if any)
    await this.leaveTypeOptions.nth(leaveTypeIndex).click();

    // Fill Dates using the new robust method
    await this.selectDate(this.fromDateInput, fromDate);
    await this.selectDate(this.toDateInput, toDate);

    // Fill Comment
    if (comment) {
      await this.commentInput.fill(comment);
    }

    // Click Apply
    await this.applyButton.click();
  }
};
