describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://goals.lak.nz')
    cy.get('#offline-login').click()
    // type test and press enter
    cy.get('#goal-input').type('test{enter}')
    cy.get('#goal-input').type('test2{enter}')
    cy.get(':nth-child(2) > input').click()
    cy.get(':nth-child(3) > input').click()

    cy.get('#set-goal-continue-btn').click()
    cy.get('#prioriteze-goals-list-holder > :nth-child(2) > :nth-child(2)').click()
    cy.get('#continue-on-prioritise-section-button').click()
    cy.get('#task-input').type('test task{enter}')
    cy.get('#continue-btn-on-plan-section').click()
    cy.get('#go_deeper_btn').click()
    cy.get('#task-input').type('test task sub {enter}')
    cy.get('#continue-btn-on-plan-section').click()


  })
})