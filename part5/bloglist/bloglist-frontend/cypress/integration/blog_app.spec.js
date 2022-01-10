describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.contains("login").click()
    })
})

describe("Login", function() {
    beforeEach(function() {
        const user = {
            username: "shiftleino",
            name: "Shiftleino",
            password: "password"
        }
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.visit("http://localhost:3000")
    })

    it("succeeds with correct credentials", function() {
        cy.contains("login").click()
        cy.get("#username").type("shiftleino")
        cy.get("#password").type("password")
        cy.get("#loginButton").click()
        cy.contains("Shiftleino logged in")
    })

    it("fails with wrong credentials", function() {
        cy.contains("login").click()
        cy.get("#username").type("shiftleino")
        cy.get("#password").type("wrongpassword")
        cy.get("#loginButton").click()
        cy.contains("wrong credentials")
    })
})