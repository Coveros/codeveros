describe('Login Page', () => {
  it('Has expected tabs', () => {
    cy.visit('/');
    cy.get('[role="tab"]').contains('Sign In').should('exist');
    cy.get('[role="tab"]').contains('Register').should('exist');
  });
});
