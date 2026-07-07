import LoginPage from '../support/pages/LoginPage'
import ProductsPage from '../support/pages/ProductsPage'

describe('Cadastro de produtos', () => {
  it('deve cadastrar um produto após criar um usuário', () => {
    const email = `thiagosilva${Date.now()}${Math.floor(Math.random() * 10000)}@email.com`
    const userData = {
      nome: 'Thiago Silva',
      email,
      senha: 'senha123'
    }

    const productData = {
      nome: 'Produto de Teste',
      preco: '99',
      descricao: 'Produto de Teste',
      quantidade: '10'
    }

    LoginPage.registerUser(userData)
    ProductsPage.registerProduct(productData)
  })
})