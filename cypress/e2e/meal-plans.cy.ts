
import { login } from "../support/commands";

describe("Meal Plans", () => {
    beforeEach(() => {
        login();
    })

    it("Should render 21 blank meal plans", () => {
        cy.visit("/meal-plans");
        cy.get(".carousel-item").should("have.length", 21);
    })

    it("Should navigate to add-meal on card click", () => {
        cy.visit("/meal-plans");
        cy.get("button").contains("Add New Meal").first().click();
        cy.url().should("include", "/add-new-meals");
    })
})