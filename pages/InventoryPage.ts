import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly itemTotalLabel: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  }

  // Dynamically adds a product to the cart by its index
  async addProductToCart(index: number) {
    await this.page.locator('.inventory_item').nth(index).locator('button').click();
  }

  // Dynamically reads the price string from a specific item on the shelf
  async getItemPrice(index: number): Promise<number> {
    const priceText = await this.page.locator('.inventory_item_price').nth(index).innerText();
    return parseFloat(priceText.replace('$', ''));
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async fillCheckoutInformation(firstName: string, lastName: string, zip: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zip);
    await this.continueButton.click();
  }

  // Extracts the mathematical numeric sum value from the checkout page total label
  async getCalculatedSubtotal(): Promise<number> {
    const totalText = await this.itemTotalLabel.innerText(); // Format: "Item total: $39.98"
    return parseFloat(totalText.replace('Item total: $', ''));
  }
}

