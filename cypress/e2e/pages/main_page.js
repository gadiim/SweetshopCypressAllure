// cypress/e2e/pages/main_page.js

class MainPage {
    visit() {
      cy.visit('https://sweetshop.netlify.app/');
      cy.url().should('eq', 'https://sweetshop.netlify.app/');
    }
  
    addItem(i, j) {
      cy.get(`:nth-child(${i}) > .card > .card-footer > .btn`).click();
    }
  
    getItemPrice(i) {
      return cy.get(`:nth-child(${i}) > .card > .card-body > :nth-child(3) > .text-muted`).invoke('text');
    }
  
    getItemName(i) {
      return cy.get(`:nth-child(${i}) > .card > .card-body > .card-title`).invoke('text');
    }
  
    logTotal(total) {
      cy.log(`Calculated total: £${total.toFixed(2)}`);
    }
  
    logProductNames(productNames) {
      cy.log(`Product names: ${Array.from(productNames).join(', ')}`);
    }
  
    visitBasket() {
      cy.visit('https://sweetshop.netlify.app/basket');
    }
  }
  
  export default new MainPage();
  