/**
 * Scenario:
 * - Verify login page can be accessed
 * - Check for the login form elements
 * - Test successful login by mocking API responses
 */

describe('Login Page', () => {
  beforeEach(() => {
    // Clear any previous state
    cy.clearLocalStorage();
    cy.clearCookies();

    // Force reload to ensure a clean state
    cy.visit('/login', { timeout: 10000 });

    // Wait for initial page load
    cy.wait(1000); // Wait a second for any redirects or initial renders

    // Take screenshot to see what we're actually seeing
    cy.screenshot('login-page-initial');
  });

  it('should display login form properly', () => {
    // Check if we're actually on the login page
    cy.url().should('include', '/login');

    // Look for the login form heading
    cy.contains('Login to Your Account').should('be.visible');

    // Check for email and password fields using more general selectors
    cy.get('form').find('input').first().should('be.visible');
    cy.get('form').find('input[type="password"]').should('be.visible');

    // Verify button exists
    cy.get('form').find('button').contains('Login').should('be.visible');

    // Take a screenshot of the form
    cy.screenshot('login-form-visible');
  });

  it('should handle successful login', () => {
    // Setup API mocks
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'login success',
        data: {
          token: 'test-token',
        },
      },
    }).as('loginApi');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'user found',
        data: {
          user: {
            id: 'user-123',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Test+User',
          },
        },
      },
    }).as('getUserProfile');

    // Find and fill the login form
    cy.get('form').within(() => {
      // Find first input (email)
      cy.get('input').first().type('test@example.com', { force: true });

      // Find password input
      cy.get('input[type="password"]').type('password123', { force: true });

      // Submit form by clicking button
      cy.get('button').contains('Login').click({ force: true });
    });

    // Wait for API calls
    cy.wait('@loginApi');
    cy.wait('@getUserProfile');

    // Verify redirect to home page
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // Verify user is logged in
    cy.contains('Test User').should('be.visible');

    // Take success screenshot
    cy.screenshot('login-success');
  });

  it('should show error message on login failure', () => {
    // Setup API mock for failed login
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    }).as('loginFailApi');

    // Find and fill the login form
    cy.get('form').within(() => {
      // Find first input (email)
      cy.get('input').first().type('wrong@example.com', { force: true });

      // Find password input
      cy.get('input[type="password"]').type('wrongpassword', { force: true });

      // Submit form by clicking button
      cy.get('button').contains('Login').click({ force: true });
    });

    // Wait for API call
    cy.wait('@loginFailApi');

    // Verify error message
    cy.get('[role=alert]').should('be.visible');
    cy.get('[role=alert]').should('contain', 'email or password is wrong');

    // Take failure screenshot
    cy.screenshot('login-error');
  });
});
