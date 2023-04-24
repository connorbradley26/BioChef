/**
 * A lot of ts-ignores in here because it's getting late and I've got too much to do to figure out how to get typescript to play nice with cypress
 * TODO: Fix types
 */

export const login = () => {
    cy.session("session", () => {
        cy.log(`Signing in.`);
        cy.visit(`/`);
        Cypress.Cookies.debug(true);
        cy.window()
            .should((window) => {
                expect(window).to.not.have.property(`Clerk`, undefined);
                // @ts-ignore
                expect(window.Clerk.isReady()).to.eq(true);
            })
            .then(async (window) => {
                // @ts-ignore
                await cy.clearCookies("/");
                // @ts-ignore
                const res = await window.Clerk.client.signIn.create({
                    identifier: "c.bradley.dev+clark_test@gmail.com",
                    password: "password+clark_test",
                });

                // @ts-ignore
                await window.Clerk.setActive({
                    session: res.createdSessionId,
                });

                cy.log(`Finished Signing in.`);
            });
    },
    {
        validate() {
            cy.visit('/meal-plans')
            cy.contains("Breakfast");
        },
        cacheAcrossSpecs: true,
    });
}


Cypress.on('uncaught:exception', (err, runnable) => {
    // Not an issue, just happens when signing in and getting back to the home page
    if (err.message.includes('attempted to hard navigate to the same URL')) {
        // returning false here prevents Cypress from
        // failing the test
        return false
    }
  })