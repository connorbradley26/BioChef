import { login } from "../support/commands"

describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('should not be logged in', () => {
        cy.contains("Get Started")
    })

    it('should be logged in', () => {
        login();
        cy.visit('/');
        cy.contains("Meal Plans")
    })
})


