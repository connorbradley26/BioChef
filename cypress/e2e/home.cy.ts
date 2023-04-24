
describe('Navigation', () => {
    it('should navigate to the home page', () => {
        cy.visit('/')
    })
    it('should not be logged in', () => {
        cy.visit('/')
        cy.contains("Get Started")
    })

    //TODO set up logged in user
})


describe('Google', function () {
    beforeEach(function () {
      cy.loginByGoogleApi()
    })
  
    it('shows onboarding', function () {
      cy.contains('Get Started').should('be.visible')
    })
  })