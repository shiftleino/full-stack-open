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

describe("When logged in", function () {
    beforeEach(function () {
        const user = {
            username: "shiftleino",
            name: "Shiftleino",
            password: "password"
        }
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.visit("http://localhost:3000")
        cy.contains("login").click()
        cy.get("#username").type("shiftleino")
        cy.get("#password").type("password")
        cy.get("#loginButton").click()
    })

    it("A blog can be created", function() {
        cy.contains("create new blog").click()
        cy.get("#title").type("Best Full-Stack experience")
        cy.get("#author").type("Shiftleino")
        cy.get("#url").type("http://localhost:3000")
        cy.get("#createButton").click()
        cy.contains("Best Full-Stack experience Shiftleino")
    })
})