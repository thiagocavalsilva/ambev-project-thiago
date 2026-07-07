const BasePage = require('./BasePage')

class UsersPage extends BasePage {
  openUsersList() {
    this.clickByTestId('listarUsuarios')
  }

  deleteUser() {
    this.openUsersList()
    cy.get(':nth-child(7) > :nth-child(5) > .row > .btn-danger').click()
  }
}

module.exports = new UsersPage()
