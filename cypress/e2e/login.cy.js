/// <reference types="cypress" />

describe("fonctionnalité d'authentification", ()=> {

    beforeEach("visiter le lien", () =>{
        cy.visit("https://www.saucedemo.com/") // comme on peut dire visiter ce site
        cy.log("tttttttttttttttttttttttttttttttttttttttttttt")
    })
    

    it("login with valid credentials", {tags:'@smoke'}, ()=>{
        // ramener le curseur sur le username
        // cibler un élément c'est avec get   
        cy.get("#user-name").type("standard_user") // taper quelques chose 
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
        // Assertion pour vérifier après le login je suis bien sur la page inventory
        cy.get("span.title").should("be.visible") // on peut mettre cellà ou l'autre en bas 
        //cy.url().eq("https://www.saucedemo.com/inventory.html")
        cy.url().should("eq","https://www.saucedemo.com/inventory.html")
    })

    // test 
    it("login with invalid credentials" , {tags: '@regression'}, ()=>{ // si on veut mettre plusieurs tag on met [@smoke]
        cy.get("#user-name").type("kjhg")
        cy.get("#password").type(",nbvdrtyu")
        cy.get("#login-button").click()
        cy.get("svg[data-icon = 'times-circle']").should("be.visible")
        cy.get("h3[data-test=error]").should("be.visible")
        //cy.get("span.title").should("be.visible")
        //cy.url().should("eq","https://www.saucedemo.com/inventory.html")
    })
    it("login with fixtures credentials" , {tags:['@fixtures','@smoke']}, ()=>{ 
        cy.fixture("jdd_list").then((obj)=>{
            obj.compte.forEach(u => {
                cy.visit("https://www.saucedemo.com/")
                cy.get("#user-name").type(u.name)
                cy.get("#password").type(u.pass)
                cy.get("#login-button").click()
                if(u.result == "ok"){
                    cy.get("span.title").should("be.visible")
                    cy.url().should("eq","https://www.saucedemo.com/inventory.html")
                }else{
                    cy.get("svg[data-icon='times-circle']").should("be.visible")
                    cy.get("h3[data-test=error]").should("be.visible")
                }

            })
        })

    })

    // réecrir le 3ème test pour mieux comprendre
    it("login with simple fixture", {tags: '@regression'}, ()=> {
            cy.fixture("jdd").then((compte)=>{
                cy.get("#user-name").type(compte.name)
                cy.get("#password").type(compte.pass)
                cy.get("#login-button").click()
                //compte.result == "ok" ? cy.get("span.title").should("be.visible"):cy.get("h3[data-test=error]").should("be.visible")
                if(compte.result == "ok"){
                    //cy.get("span.title").should("be.visible")
                    cy.url().should('include', '/inventory.html')
                }else{    
                    cy.get("h3[data-test=error]").should("be.visible")
                }
            })
    })

})