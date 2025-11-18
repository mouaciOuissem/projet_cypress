/// <reference types="cypress" />

describe("fonctionnalité d'authentification", ()=> {

    beforeEach("visiter le lien", () =>{
        cy.visit("https://www.saucedemo.com/") // comme on peut dire visiter ce site
        cy.log("tttttttttttttttttttttttttttttttttttttttttttt")
        cy.get("#user-name").type("standard_user") // taper quelques chose 
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click() 
    })
    

    it("Ajout au panier parcour 2", ()=>{
        // ajouter le dernier produit au panier puis le vérifié si c'est bien lui
        // ajouter le premier 4 au panier 
        let pro1 ,price1

        cy.get(".inventory_item").eq(4).within(() => {
                cy.contains("Add to cart").click();
                cy.contains("Remove").should("be.visible");
                cy.get('.inventory_item_name').eq(0).then(prodNameCard=> {
                pro1 =prodNameCard.text();
                cy.log(pro1)
            })
            cy.get('.inventory_item_price').eq(0).then(ouissam=> {
                price1 =ouissam.text();
                cy.log(price1)
            })
        });
        
        // verifier si panier contient 1 seul produit
        cy.get("span[data-test='shopping-cart-badge']").should("be.visible").and("have.text", "1");
        //visiter  le  panier
        cy.get("a[data-test='shopping-cart-link']").click()
        // vérifier que c'est bien le bon produit
        //cy.get(".cart_item").should("have.length", 1)
        cy.get('.inventory_item_name').eq(0).then(obj=> {
            obj.text()==pro1 ? cy.log("le produit est le bon") : cy.log("le produit est incorrect")
        });

        cy.get('.inventory_item_price').eq(0).then(obj=> {
                obj.text()==price1 ? cy.log("le prix est le bon") : cy.log("le prix est incorrect")
    });


        cy.get("button[data-test='continue-shopping']").click()
        let pro2 ,price2

        cy.get(".inventory_item").eq(5).within(() => {
                cy.contains("Add to cart").click();
                cy.contains("Remove").should("be.visible");
                cy.get('.inventory_item_name').eq(0).then(prodNameCard=> {
                pro2 =prodNameCard.text();
                cy.log(pro2)
            })
            cy.get('.inventory_item_price').eq(0).then(ouissam=> {
                price2 =ouissam.text();
                cy.log(price2)
            })
        });
        
        // verifier si panier contient 1 seul produit
        cy.get("span[data-test='shopping-cart-badge']").should("be.visible").and("have.text", "2");
        //visiter  le  panier
        cy.get("a[data-test='shopping-cart-link']").click()
        // vérifier que c'est bien le bon produit
        //cy.get(".cart_item").should("have.length", 1)
        cy.get('.inventory_item_name').eq(0).then(obj=> {
            obj.text()==pro2 ? cy.log("le 2eme produit est le bon") : cy.log("le 2eme produit est incorrect")
        });

        cy.get('.inventory_item_price').eq(0).then(obj=> {
                obj.text()==price2 ? cy.log("le 2 eme prix est le bon") : cy.log("le 2eme prix est incorrect")
    });
        

            //cy.log(pro1)
        //cy.get(".inventory_item_name").eq(0).invoke('text').then(el => {product_name = el})
        //cy.log(product_name)
        //cy.get(".inventory_item_name").eq(0).should("have.text", product_name)
        // revenir à la page des produits
        /*cy.get("button[data-test='continue-shopping']").click()
        // Ajouter un deuxième produit au panier
        cy.get(".inventory_item").eq(5).within(() => {
            cy.contains("Add to cart").click();
            cy.contains("Remove").should("be.visible");
        });
        // aller au panier
        cy.get("span[data-test='shopping-cart-badge']").should("be.visible").and("have.text", "2");
        cy.get("a[data-test='shopping-cart-link']").click()
        // vérifier que c'est bien les bons produits
        cy.get(".cart_item").should("have.length", 2)
        let product_name2
         cy.get(".inventory_item_name").eq(1).then(el => product_name2 = el.text())
         
        cy.get(".inventory_item_name").eq(0).should("have.text", product_name)
        cy.get(".inventory_item_name").eq(1).should("have.text", product_name2)
*/

        // Supprimer les deux produits du panier
    })   
})