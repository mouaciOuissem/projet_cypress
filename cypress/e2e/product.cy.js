/// <reference types="cypress" />

//import { login } from ".jhgf"

describe("fonctionnalité d'jout au panier", ()=>{
    beforeEach("visiter le lien", () =>{
        // si on utilise m'import de larequte on met juste login()dans les paramètre
        //login()// on appelle la fonction utilitaire
        cy.visit("https://www.saucedemo.com/") // comme on peut dire visiter ce site
        cy.get("#user-name").type("standard_user") // taper quelques chose 
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()    
    })

    it("Ajout au panier et suppression", ()=>{
        cy.get("button[data-test='add-to-cart-sauce-labs-backpack']").click()
        cy.get("button[data-test='remove-sauce-labs-backpack']").should("be.visible")
        cy.get("button[data-test='add-to-cart-sauce-labs-bike-light']").click()
        cy.get("span[data-test = 'shopping-cart-badge']").should("have.text","2")
        // Suppression d'un produit
        cy.get("button[data-test='remove-sauce-labs-backpack']").click()
        cy.get("span[data-test = 'shopping-cart-badge']").should("have.text","1")
        cy.get("button[data-test='remove-sauce-labs-bike-light']").click()
        cy.get("span[data-test = 'shopping-cart-badge']").should("not.exist")
    })
    
})