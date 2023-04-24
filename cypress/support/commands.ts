/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// cypress/support/commands.js
Cypress.Commands.add('loginByGoogleApi', () => {
    cy.log('Logging in to Google')
    cy.log('process.env.GOOGLE_CLIENT_ID', Cypress.env("GOOGLE_CLIENT_ID"))
    cy.request({
      method: 'POST',
      url: 'https://www.googleapis.com/oauth2/v4/token',
      body: {
        grant_type: 'refresh_token',
        client_id: Cypress.env('GOOGLE_CLIENT_ID'),
        client_secret: Cypress.env('GOOGLE_CLIENT_SECRET'),
        refresh_token: Cypress.env('GOOGLE_REFRESH_TOKEN'),
      },
    }).then(({ body }) => {
      cy.log(JSON.stringify(body, null, 2))
      const { access_token, id_token } = body
  
      cy.request({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: { Authorization: `Bearer ${access_token}` },
      }).then(({ body }) => {
        cy.log(body)
        const userItem = {
          token: id_token,
          user: {
            googleId: body.sub,
            email: body.email,
            givenName: body.given_name,
            familyName: body.family_name,
            imageUrl: body.picture,
          },
        }
        cy.setCookie('next-auth.callback-url', 'http%3A%2F%2Flocalhost%3A3000%2F')
        cy.setCookie('next-auth.csrf-token', '93f9b7d532f91f892563af292c8245c19ebb8c7147ec141d6d105f79c8a68571%7C0eba9f6ffe2daaa6299a45aa4775ff0d5207f848330b1bcd079cd507cb019938')
        cy.setCookie(Cypress.env("COOKIE_NAME"), userItem.token);
        // window.cookies.setItem(Cypress.env("COOKIE_NAME"), userItem.token)
      })
    })
  })