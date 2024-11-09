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



cypress/e2e/pages/sweetshop.test.js

cy.request({
  url: 'https://sweetshop.netlify.app/',
  failOnStatusCode: false
}).then((response) => {
  if (response.status !== 200) {
    throw new Error('Site is unavailable, stopping tests.');
  }
});


// describe('Sweetshop Basket Functionality Test', () => {

//   let total = 0;
//   let productNames = new Set();

//   beforeEach(() => {

//     total = 0; 
//     productNames = new Set();
//     cy.visit('https://sweetshop.netlify.app/');
//     cy.url().should('eq', 'https://sweetshop.netlify.app/');

//     for (let i = 1; i <= 4; i++) {
//       for (let j = 0; j < i; j++) {
//         cy.get(`:nth-child(${i}) > .card > .card-footer > .btn`).click();

//         cy.get(`:nth-child(${i}) > .card > .card-body > :nth-child(3) > .text-muted`)
//           .invoke('text')
//           .then((text) => {
//             const price = parseFloat(text.replace('£', ''));
//             total += price;

//           });
//         cy.get(`:nth-child(${i}) > .card > .card-body > .card-title`)
//           .invoke('text')
//           .then((text) => {
//             productNames.add(text.trim());
//           });
//       }
//     }

//     cy.then(() => {
//       cy.log(`Calculated total: £${total.toFixed(2)}`);
//       cy.log(`Product names: ${Array.from(productNames).join(', ')}`);

//       cy.visit('https://sweetshop.netlify.app/basket');
//     });

//   });


//   it('Verify all selected items are present in basket', function () {

//     let remainingProducts = [...productNames];
//     const range = Array.from(productNames).length;

//     for (let i = 1; i <= range; i++) {
//       cy.get(`:nth-child(${i}) > div > .my-0`)
//         .invoke('text')
//         .then((text) => {
//           const productName = text.trim();
//           const index = remainingProducts.indexOf(productName);
//           if (index !== -1) {
//             remainingProducts.splice(index, 1);
//           }
//         });
//     };

//     cy.then(() => {
//       if (remainingProducts.length > 0) {
//         cy.log(`Items not found in the basket: ${remainingProducts.join(', ')}`);
//       }
//       expect(remainingProducts.length).to.equal(0);
//     });
//   });

//   it('Verify total price in GBP is correct', function () {

//     const calculatedTotal = total;
//     const basketItemIndex = Array.from(productNames).length + 1;

//     cy.get(`#basketItems > :nth-child(${basketItemIndex})`)
//       .find('strong')
//       .invoke('text')
//       .then((text) => {
//         const totalFromBasket = parseFloat(text.replace('£', ''));
//         cy.log(`Calculated total: £${calculatedTotal.toFixed(2)}`);
//         cy.log(`Total from basket: £${totalFromBasket.toFixed(2)}`);
//         expect(totalFromBasket.toFixed(2)).to.equal(calculatedTotal.toFixed(2));
//       });
//   });

//   it('Change delivery type to Standard Shipping and verify total price', function () {

//     cy.get('.order-md-2 > .d-block > :nth-child(2)').click();

//     const calculatedTotal = total;
//     const basketItemIndex = Array.from(productNames).length + 1;

//     cy.get(`#basketItems > :nth-child(${basketItemIndex})`)
//       .find('strong')
//       .invoke('text')
//       .then((text) => {
//         const totalFromBasket = parseFloat(text.replace('£', ''));
//         cy.log(`Total from basket: £${totalFromBasket.toFixed(2)}`);
//         cy.then(() => {
//           cy.log(`Calculated total: £${calculatedTotal.toFixed(2)}`);
//         });
//         cy.then(() => {
//           expect(totalFromBasket.toFixed(2)).to.equal(calculatedTotal.toFixed(2));
//         });
//       });
//   });

//   it('Fill the details and click on checkout', function() {
    
//     cy.fixture('form_data').then((data) => {
//       cy.get(':nth-child(1) > #name').type(data.firstName);
//       cy.get(':nth-child(2) > #name').type(data.lastName);
//       cy.get('#email').type(data.email);
//       cy.get('#address').type(data.address);
//       cy.get('#address2').type(data.address2);
//       cy.get('#country').select(1);
//       cy.get('#city').select(1);
//       cy.get('#zip').type(data.zip);
//       cy.get('#cc-name').type(data.ccName);
//       cy.get('#cc-number').type(data.ccNumber);
//       cy.get('#cc-expiration').type(data.ccExpiration);
//       cy.get('#cc-cvv').type(data.ccCVV);
  
//       cy.get('.needs-validation > .btn').click();
//     });
//   });

// });
