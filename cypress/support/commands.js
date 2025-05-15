// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Command to login a user
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[id=email]').type(email);
  cy.get('input[id=password]').type(password);
  cy.get('button[type=submit]').click();
});

// Command to register a user
Cypress.Commands.add('register', (name, email, password) => {
  cy.visit('/register');
  cy.get('input[id=name]').type(name);
  cy.get('input[id=email]').type(email);
  cy.get('input[id=password]').type(password);
  cy.get('button[type=submit]').click();
});
