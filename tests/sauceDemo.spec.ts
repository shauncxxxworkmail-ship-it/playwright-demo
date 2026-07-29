import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('SauceDemo Login Automation (POM)', () => {
  
  // Example 1: Appending Case ID directly to the title string
  test('Success Login - Happy Path [CASE-101] @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(process.env.TEST_USER!, process.env.TEST_PASSWORD!);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Failed Login - Negative Path [CASE-102] @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('wrong_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user');
  });
});

test.describe('SauceDemo Advanced Business Logic Automation', () => {

  // Example 2: Using Playwright's structured metadata object array for Case IDs
  test('E2E Dynamic Checkout Workflow [CASE-201] @checkout @regression', {
    tag: ['@TC-201', '@high-priority'],
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login('standard_user', 'secret_sauce');

    const priceItem1 = await inventoryPage.getItemPrice(0);
    const priceItem2 = await inventoryPage.getItemPrice(1);
    const expectedSum = priceItem1 + priceItem2;

    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.goToCart();
    await inventoryPage.checkoutButton.click();
    await inventoryPage.fillCheckoutInformation('John', 'Doe', '90210');

    const actualSubtotal = await inventoryPage.getCalculatedSubtotal();
    expect(actualSubtotal).toBe(expectedSum);

    await inventoryPage.finishButton.click();
    await expect(inventoryPage.completeHeader).toHaveText('Thank you for your order!');
  });

  // Example 3: Injecting Dynamic Case IDs into a Data-Driven Matrix Loop
  const invalidUserMatrix = [
    { id: 'CASE-301', username: 'locked_out_user', pass: 'secret_sauce', expectedError: 'Sorry, this user has been locked out.' },
    { id: 'CASE-302', username: 'wrong_user', pass: 'secret_sauce', expectedError: 'Username and password do not match any user' },
    { id: 'CASE-303', username: 'standard_user', pass: '', expectedError: 'Password is required' }
  ];

  for (const scenario of invalidUserMatrix) {
    test(`[${scenario.id}] Data-Driven Security Check - User: "${scenario.username}" @security`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigateToLogin();
      await loginPage.login(scenario.username, scenario.pass);
      await expect(loginPage.errorMessage).toContainText(scenario.expectedError);
    });
  }
});

