
// describe('Login', () => {
//   before(() => {
//     cy.log(`Visiting https://company.tld`)
//     cy.visit("/")
//   })
//   it('get login button', () => {
//     cy.get('[data-test=login]').should('be.visible').click()
//   })
//     it('Login through Google', () => {
//         // cy.get('[data-profileindex=0]')
//         const username = Cypress.env('GOGLE_USER_NAME')
//         const password = Cypress.env('GOOGLE_PASSWORD')
//         const loginUrl = "http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
//         const cookieName = Cypress.env('COOKIE_NAME')
//         const socialLoginOptions = {
//           username: username,
//           password: password,
//           loginUrl: loginUrl,
//           headless: false,
//           logs: false,
           
//           loginSelector: 'form',
//           postLoginSelector: 'button[data-test=loggedin]',
//           isPopup: false,
//           screenshotOnError: true
//         }
//         preLoginSelector: '',
//         // div[data-profileindex]
//         cy.log(JSON.stringify(socialLoginOptions, null, 2))
//         cy.clearCookies()
//         return cy.task('GoogleSocialLogin', socialLoginOptions).then(results => {          

  
//           results['cookies'].forEach(cookie => {
//             if (cookie.domain.includes(cookieName)) {
//               cy.setCookie(cookie.name, cookie.value, {
//                 domain: cookie.domain,
//                 expiry: cookie.expires,
//                 httpOnly: cookie.httpOnly,
//                 path: cookie.path,
//                 secure: cookie.secure
//               })
//             }
//           })
//           cy.window().then(window => {
//             Object.keys(results.ssd).forEach(key => window.sessionStorage.setItem(key, results.ssd[key]))
//             Object.keys(results.lsd).forEach(key => window.localStorage.setItem(key, results.lsd[key]))
//           })
          
//         })
//     })
// })
