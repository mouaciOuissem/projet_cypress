class LoginPage{
    elements = {
        username:() => cy.get("#user-name"),
        password:() => cy.get("#password"),
        loginButton:() => cy.get("#login-button"),
        error_msg:() => cy.get("h3[data-test=error]"),
    }
    // ce sont des actions
    saisirUsername(un){
        this.elements.username().type(un) // est une action pas une méthode
    }
    saisirPassword(pw){
        this.elements.password().type(pw)
    }
    se_connecter(){
        this.elements.loginButton().click()
    } // Tout ça c'est le pom
    getErrorMessage(){
        return this.elements.error_msg()
    }
}
export default new LoginPage();