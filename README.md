# Playwright TypeScript Test Automation Framework (POM)

[![Playwright Tests](https://github.com)](https://github.com)

A professional test automation repository implementing the **Page Object Model (POM)** design pattern using **Playwright** and **TypeScript**. Fully integrated with **GitHub Actions** for robust, multi-browser continuous integration (CI) testing.

## 🚀 Key Features
- **Design Pattern**: Implements strict Page Object Model (POM) to separate page selectors/actions from testing logic.
- **Flakiness Control**: Pre-configured automatic retry mechanisms tailored for remote CI environments.
- **Asynchronous Stability**: Utilizes Playwright's native auto-waiting functions to handle dynamic async web elements flawlessly.
- **CI/CD Automation**: Configured with a headless test pipeline triggered automatically upon code pushes.
- **Visual Reporting**: Generates exhaustive local HTML test summaries and debug traces on failure.

## 🛠️ Tech Stack
- **Language**: TypeScript
- **Testing Core**: Playwright
- **CI/CD Engine**: GitHub Actions
- **Target App**: SauceDemo (E-commerce automation practice platform)

## 📦 Project Directory
```text
playwright-demo/
├── .github/workflows/
│   └── playwright.yml       # Cloud automation configuration
├── pages/                    # Page Object Classes
│   └── LoginPage.ts
├── tests/                    # Independent Test Cases
│   └── sauceDemo.spec.ts
└── playwright.config.ts      # Core runner configurations
```

## 🏃 Local Execution Setup

1. **Clone this repository:**
   ```bash
   git clone https://github.com
   cd playwright-demo
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Execute all test cases:**
   ```bash
   npx playwright test
   ```

4. **Review interactive visual report:**
   ```bash
   npx playwright show-report
   ```