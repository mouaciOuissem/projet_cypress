/// <reference types="cypress" />

describe("fonctionnalité d'authentification", ()=> {

    beforeEach("visiter le lien", () =>{
        cy.visit("https://www.saucedemo.com/") // comme on peut dire visiter ce site
        cy.log("tttttttttttttttttttttttttttttttttttttttttttt")
        // on va rajouter des val env 
        // recette => https://www.saucedemo.com
        // intégration => https://www.saucedemo1.com
        // preprod => https://www.saucedemo2.com
        // prod => https://www.saucedemo3.com 
        /*let environnement = Cypress.env("var"); // variable d'environnement
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
        cy.visit(url)*/
    })
    

    /*export const login = () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get("#user-name").type("standard_user")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
    }*/

    it("login with valid credentials", ()=>{
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
    it("login with invalid credentials" , ()=>{ // si on veut mettre plusieurs tag on met [@smoke]
        cy.get("#user-name").type("kjhg")
        cy.get("#password").type(",nbvdrtyu")
        cy.get("#login-button").click()
        cy.get("svg[data-icon = 'times-circle']").should("be.visible")
        cy.get("h3[data-test=error]").should("be.visible")
        //cy.get("span.title").should("be.visible")
        //cy.url().should("eq","https://www.saucedemo.com/inventory.html")
    })
    it("login with fixtures credentials" , ()=>{ 
        cy.fixture("jdd.json").then((obj)=>{
            Obj.foreEach(u => {
                cy.visit("https://www.saucedemo.com/")
                cy.get("#user-name").type(u.name)
                cy.get("#password").type(u.pass)
                cy.get("#login-button").click()
                if(user.result == "ok"){
                    cy.get("span.title").should("be.visible")
                    cy.url().should("eq","https://www.saucedemo.com/inventory.html")
                }else{
                    cy.get("svg[data-icon='times-circle']").should("be.visible")
                    cy.get("h3[data-test=error]").should("be.visible")
                }

            })
            
        })

        /*cy.get("#user-name").type("kjhg")
        cy.get("#password").type(",nbvdrtyu")
        cy.get("#login-button").click()
        cy.get("svg[data-icon = 'times-circle']").should("be.visible")
        cy.get("h3[data-test=error]").should("be.visible")*/
        //cy.get("span.title").should("be.visible")
        //cy.url().should("eq","https://www.saucedemo.com/inventory.html")
    })

    // réecrir le 3ème test pour mieux comprendre
    it("login with simple fixture", {tags: '@regression'}, ()=> {
            cy.fixture("jdd.json").then((compte)=>{
                cy.get("#user-name").type(compte.name)
                cy.get("#password").type(compte.pass)
                cy.get("#login-button").click()
                /*if(compte.result == "ok"){
                    cy.get("span.title").should("be.visible")
                }else{    
                    cy.get("h3[data-test=error]").should("be.visible")
                }*/
                compte.result == "ok" ? cy.get("span.title").should("be.visible"):cy.get("h3[data-test=error]").should("be.visible")

            })
    })



    
})

/// <reference types="cypress" />
describe("Gestion complète des articles sur SauceDemo", () => {
    beforeEach("visite le lien", () => {
    
          // Connexion
        cy.visit("https://www.saucedemo.com");
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();
    })
        it("Ajoute deux articles, vérifie le panier puis les supprime", () => {
    
        // Ajouter le premier article
        cy.get(".inventory_item").eq(0).within(() => {
          cy.contains("Add to cart").click();
          cy.contains("Remove").should("be.visible");
        });
    
    
        // Vérifier que le panier affiche 1
        cy.get(".shopping_cart_badge").should("be.visible").and("have.text", "1");
    
        // Ajouter le deuxième article
        cy.get(".inventory_item").eq(1).within(() => {
          cy.contains("Add to cart").click();
          cy.contains("Remove").should("be.visible");
        });
    
        // Vérifier que le panier affiche 2
        cy.get(".shopping_cart_badge").should("be.visible").and("have.text", "2");
    
    
        // Supprimer le premier article
        cy.get(".inventory_item").eq(0).within(() => {
          cy.contains("Remove").click();
          cy.contains("Add to cart").should("be.visible");
        });
    
        // Supprimer le deuxième article
        cy.get(".inventory_item").eq(1).within(() => {
          cy.contains("Remove").click();
          cy.contains("Add to cart").should("be.visible");
        });
    
        // Vérifier que le panier est vide
        cy.get(".shopping_cart_badge").should("not.exist");
      });
    });