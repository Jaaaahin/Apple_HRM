# Apple HRM Automated Testing

Playwright-based automated test suite for OrangeHRM demo application.

## Test Coverage

- **Login Tests** (`tests/login.spec.js`)
  - Valid login
  - Invalid credentials
  - Empty credentials
  - Invalid username
  - Invalid password

- **Apply Leave** (`tests/applyLeave.spec.js`)
  - Submit leave request

- **Quick Launch** (`tests/quickLaunch.spec.js`)
  - Assign leave via quick launch icon

## Tech Stack

- Playwright
- Allure Reports

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Run Tests

```bash
# Run all tests
npx playwright test

# Run specific browser
npx playwright test --project=chromium

# Run with UI
npx playwright test --ui
```

## Reports

```bash
# Generate Allure report
allure generate allure-results -o allure-report --clean
allure open allure-report
```

## Configuration

Edit `playwright.config.js` to customize:
- Test timeout
- Browser selection
- Retry settings
- Reporters

## Known Issues

- Demo site (opensource-demo.orangehrmlive.com) can be slow/unresponsive
- Some tests may timeout on slow connections
- Date picker interactions need stabilization
