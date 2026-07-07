import LoginPage from '../support/pages/LoginPage'
import ProductsPage from '../support/pages/ProductsPage'

describe('Exclusão de produtos', () => {
  it('deve excluir um produto da lista', () => {
    const email = `thiagosilva${Date.now()}${Math.floor(Math.random() * 10000)}@email.com`
    const userData = {
      nome: 'Thiago Silva',
      email,
      senha: 'senha123'
    }

    LoginPage.registerUser(userData)
    ProductsPage.deleteProduct()
  })
})