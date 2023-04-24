import { login } from "../support/commands"

describe("Add New Meals", () => {
    beforeEach(() => {
        login();
        cy.visit("/add-new-meals?type=Breakfast&day=2023-04-29");
    })

    it("Should display a form and a card", () => {
        cy.get("form").contains("What do you fancy?").should("exist");
        cy.get(".card").contains("Nutrition remaining for").should("exist");
    })

    it("Should display the correct day", () => {        
        cy.get(".card").contains("Saturday").should("exist");
    })

    it("Should link to results page on form submit", () => {
        cy.get("button[type=submit]").click();
        cy.url().should("include", "/results");
        cy.url().should("include", "type=Breakfast");
        cy.url().should("include", "day=2023-04-29");
    })

    it("Should get custom results on form submit", () => {
        cy.get("input[name=query]").type("Shepherds Pie");
        cy.get("button[type=submit]").click();
        cy.url().should("include", "/results");
        cy.get(".card").contains("Shepherd").should("exist");
    })
})