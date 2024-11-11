// cypress/e2e/pages/sweetshop.test.js

import MainPage from '../pages/main_page';
import BasketPage from '../pages/basket_page';
import CheckoutPage from '../pages/checkout_page';

describe('Sweetshop Basket Functionality Test', () => {
  let total = 0;
  let productNames = new Set();

  beforeEach(() => {

  total = 0; 
  productNames = new Set();
    MainPage.visit();

    for (let i = 1; i <= 4; i++) {
      for (let j = 0; j < i; j++) {
        MainPage.addItem(i, j);

        MainPage.getItemPrice(i).then((text) => {
          const price = parseFloat(text.replace('£', ''));
          total += price;
        });

        MainPage.getItemName(i).then((text) => {
          productNames.add(text.trim());
        });
      }
    }

    cy.then(() => {
      MainPage.logTotal(total);
      MainPage.logProductNames(productNames);
      MainPage.visitBasket();
    });
  });

  it('Verify all selected items are present in basket', function() {
    let remainingProducts = [...productNames];
    const l = 4;

    for (let i = 1; i <= l; i++) {
      cy.get(`:nth-child(${i}) > div > .my-0`)
        .invoke('text')
        .then((text) => {
          const productName = text.trim();
          const index = remainingProducts.indexOf(productName);
          if (index !== -1) {
            remainingProducts.splice(index, 1);
          }
        });
    }

    cy.then(() => {
      if (remainingProducts.length > 0) {
        cy.log(`Items not found in the basket: ${remainingProducts.join(', ')}`);
      }
      expect(remainingProducts.length).to.equal(0);
    });
  });

  it('Verify total price in GBP is correct', function() {
    const calculatedTotal = total;
    const basketItemIndex = Array.from(productNames).length + 1;

    BasketPage.getBasketItems(basketItemIndex)
      .invoke('text')
      .then((text) => {
        const totalFromBasket = parseFloat(text.replace('£', ''));
        BasketPage.logTotal(calculatedTotal, totalFromBasket);
        BasketPage.verifyTotal(calculatedTotal, totalFromBasket);
      });
  });

  it('Change delivery type to Standard Shipping and verify total price', function() {
    BasketPage.getDeliveryTypeOption(2).click();

    const calculatedTotal = total;
    const basketItemIndex = Array.from(productNames).length + 1;

    BasketPage.getBasketItems(basketItemIndex)
      .invoke('text')
      .then((text) => {
        const totalFromBasket = parseFloat(text.replace('£', ''));
        BasketPage.logTotal(calculatedTotal, totalFromBasket);
        BasketPage.verifyTotal(calculatedTotal, totalFromBasket);
      });
  });

  it('Fill the details and click on checkout', function() {
    cy.fixture('form_data').then((data) => {
      CheckoutPage.fillDetails(data);
      CheckoutPage.clickCheckout();
    });
  });
  total = 0;
});



