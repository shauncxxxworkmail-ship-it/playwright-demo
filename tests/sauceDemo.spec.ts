import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('SauceDemo Login Automation (POM)', () => {
  
  test('Success Login - Happy Path', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLogin();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify that you have successfully logged in and can see the product page title.
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Failed Login - Negative Path', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLogin();
    await loginPage.login('wrong_user', 'wrong_password');
    
    // Verify that the correct error message appears.
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user');
  });
});