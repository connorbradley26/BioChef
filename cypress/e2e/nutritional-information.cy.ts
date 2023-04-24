import { login } from "../support/commands"

describe("Nutritional Information", () => {
    beforeEach(() => {
        login();    
        cy.visit("/nutritional-information");
    });

    it ("Should navigate to update page", () => {
        cy.get("button").contains("Update").click();
        cy.url().should("include", "/nutritional-information/update");
        cy.get("input[name=weight]").should("exist");
    })

    it ("Should update weight", () => {
        cy.get("button").contains("Update").click();
        cy.get("input[name=weight]").clear().type("100");
        cy.get("button[type=submit]").click();
        cy.url().should("include", "/nutritional-information");
        cy.get(".tab").should("have.length", 13);
        cy.eyesOpen({ testName: "100" });
        cy.eyesCheckWindow();
        cy.eyesClose();

    })
})