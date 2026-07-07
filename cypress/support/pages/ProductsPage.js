const BasePage = require('./BasePage')

class ProductsPage extends BasePage {
  openProductsForm() {
    this.clickByTestId('cadastrarProdutos')
  }

  fillProduct({ nome, preco, descricao, quantidade }) {
    this.typeByTestId('nome', nome)
    this.typeByTestId('preco', preco)
    this.typeByTestId('descricao', descricao)
    this.typeByTestId('quantity', quantidade)
  }

  saveProduct() {
    this.clickByTestId('cadastarProdutos')
  }

  registerProduct(productData) {
    this.openProductsForm()
    this.fillProduct(productData)
    this.saveProduct()
  }

  openProductsList() {
    this.clickByTestId('listarProdutos')
  }

  deleteProduct() {
    this.openProductsList()
    cy.get(':nth-child(6) > :nth-child(6) > .row > .btn-danger').click()
  }
}

module.exports = new ProductsPage()
