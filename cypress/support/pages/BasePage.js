class BasePage {
  visit(url) {
    cy.visit(url)
  }

  clickByTestId(testId) {
    cy.get(`[data-testid="${testId}"]`).click()
  }

  typeByTestId(testId, value) {
    cy.get(`[data-testid="${testId}"]`).clear().type(value)
  }
}

module.exports = BasePage
