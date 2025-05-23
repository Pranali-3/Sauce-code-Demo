import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

test('Add multiple items and complete checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
  await inventoryPage.openCart();

  await cartPage.checkout();
  await checkoutPage.fillInformation('John', 'Doe', '12345');
  await checkoutPage.finishCheckout();

  expect(await checkoutPage.isOrderComplete()).toBeTruthy();
});
