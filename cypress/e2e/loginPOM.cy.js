/// <reference types="cypress" />
import loginPage from "../pages/login.page.js"    

describe("authentification avec POM",()=> {
    beforeEach("aller à la page d'accueil",()=> {
        cy.visit("https://www.saucedemo.com/")
    })
    it("login with valid credentials", ()=> {  
        loginPage.saisirUsername("standard_user")
        loginPage.saisirPassword("secret_sauce")
        loginPage.se_connecter()
        cy.url().should('include','/inventory.html')
    })
    it("login with wrong credentials", ()=> {
        loginPage.saisirUsername("wrong_user")
        loginPage.saisirPassword("wrong_pass")
        loginPage.se_connecter()
        loginPage.getErrorMessage().should("be.visible")
    })
})