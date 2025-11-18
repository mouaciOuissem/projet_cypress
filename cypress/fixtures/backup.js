/// <reference types="cypress" />

describe("fonctionnalité d'authentification", ()=> {

    beforeEach("visiter le lien", () =>{
        //cy.visit("https://www.saucedemo.com/") // comme on peut dire visiter ce site
        // on va rajouter des val env 
        // recette => https://www.saucedemo.com
        // intégration => https://www.saucedemo1.com
        // preprod => https://www.saucedemo2.com
        // prod => https://www.saucedemo3.com 
        let environnement = Cypress.env("var"); // variable d'environnement
        let url; // on stock ici le lien selon l'environnement 
        switch (environnement){
            case "recette":
                url = "https://www.saucedemo.com"
                break;
            case "integration":
                url = "https://www.saucedemo1.com"
                break;
            case "preprod":
                url = "https://www.saucedemo2.com"
                break;
            case "prod":
                url = "https://www.saucedemo.com" 
                break;
            default:
        }
        cy.visit(url)
    })
    

    /*export const login = () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get("#user-name").type("standard_user")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
    }*/

    it("login with valid credentials",{tags: '@regression'}, ()=>{
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
    it("login with invalid credentials" , {tags:'@smoke'}, ()=>{ // si on veut mettre plusieurs tag on met [@smoke]
        cy.get("#user-name").type("kjhg")
        cy.get("#password").type(",nbvdrtyu")
        cy.get("#login-button").click()
        cy.get("svg[data-icon = 'times-circle']").should("be.visible")
        cy.get("h3[data-test=error]").should("be.visible")
        //cy.get("span.title").should("be.visible")
        //cy.url().should("eq","https://www.saucedemo.com/inventory.html")
    })
    it("login with fixtures credentials" , ()=>{ 
        cy.fixture("jdd_json").then((users)=>{
            cy.get("#user-name").type(user.name)
            cy.get("#password").type(user.pass)
            cy.get("#login-button").click()
            if(user.result == "ok"){
                cy.get("span.title").should("be.visible")
                cy.url().should("eq","https://www.saucedemo.com/inventory.html")
            }else{
                cy.get("svg[data-icon='times-circle']").should("be.visible")
                cy.get("h3[data-test=error]").should("be.visible")
            }

        })
        /*cy.get("#user-name").type("kjhg")
        cy.get("#password").type(",nbvdrtyu")
        cy.get("#login-button").click()
        cy.get("svg[data-icon = 'times-circle']").should("be.visible")
        cy.get("h3[data-test=error]").should("be.visible")*/
        //cy.get("span.title").should("be.visible")
        //cy.url().should("eq","https://www.saucedemo.com/inventory.html")
    })

    
})