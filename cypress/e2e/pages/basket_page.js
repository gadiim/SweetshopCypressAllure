// cypress/e2e/pages/backet_page.js

class BasketPage {
    getBasketItems(index) {
      return cy.get(`#basketItems > :nth-child(${index})`).find('strong');
    }
  
    getDeliveryTypeOption(index) {
      return cy.get(`.order-md-2 > .d-block > :nth-child(${index})`);
    }
  
    logTotal(calculatedTotal, totalFromBasket) {
      cy.log(`Calculated total: £${calculatedTotal.toFixed(2)}`);
      cy.log(`Total from basket: £${totalFromBasket.toFixed(2)}`);
    }
  
    verifyTotal(calculatedTotal, totalFromBasket) {
      expect(totalFromBasket.toFixed(2)).to.equal(calculatedTotal.toFixed(2));
    }
  }
  
  export default new BasketPage();
  