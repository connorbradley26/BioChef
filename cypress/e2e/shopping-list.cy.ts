import { login } from "../support/commands";

describe("Shopping List", () => {
    beforeEach(() => {
        login();
        cy.visit("/shopping-list");
    });

    it("Should render a list of ingredients", () => {
        cy.get("ul").should("have.length.be.greaterThan", 0);
    });

});