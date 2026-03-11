# Agent Instructions

## Running Tests

```bash
npx playwright test
```

## Key Commands

- Run chromium only: `npx playwright test --project=chromium`
- Generate allure report: `allure generate allure-results -o allure-report --clean && allure open allure-report`

## Known Issues

- Demo site timeouts: Increase timeout in `playwright.config.js` if needed
- Date picker issues: May need locator updates for OrangeHRM UI changes
