const BasePage = require('./BasePage')

class LoginPage extends BasePage {
  visitLogin() {
    this.visit('https://front.serverest.dev/login')
  }

  openRegisterForm() {
    this.clickByTestId('cadastrar')
    cy.get('.font-robot').should('be.visible')
  }

  fillUserForm({ nome, email, senha }) {
    this.typeByTestId('nome', nome)
    this.typeByTestId('email', email)
    this.typeByTestId('password', senha)
    cy.get('[data-testid="checkbox"]').click()
  }

  submitRegister() {
    this.clickByTestId('cadastrar')
  }

  registerUser(userData) {
    this.visitLogin()
    this.openRegisterForm()
    this.fillUserForm(userData)
    this.submitRegister()
    cy.wait(2000)
  }
}

module.exports = new LoginPage()
