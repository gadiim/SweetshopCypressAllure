// cypress/e2e/pages/checkout_page.js

class CheckoutPage {
    fillDetails(data) {
      cy.get(':nth-child(1) > #name').type(data.firstName);
      cy.get(':nth-child(2) > #name').type(data.lastName);
      cy.get('#email').type(data.email);
      cy.get('#address').type(data.address);
      cy.get('#address2').type(data.address2);
      cy.get('#country').select(1);
      cy.get('#city').select(1);
      cy.get('#zip').type(data.zip);
      cy.get('#cc-name').type(data.ccName);
      cy.get('#cc-number').type(data.ccNumber);
      cy.get('#cc-expiration').type(data.ccExpiration);
      cy.get('#cc-cvv').type(data.ccCVV);
    }
  
    clickCheckout() {
      cy.get('.needs-validation > .btn').click();
    }
  }
  
  export default new CheckoutPage();
  
