import LoginPage from '../support/pages/LoginPage'
import UsersPage from '../support/pages/UsersPage'

describe('Exclusão de usuários', () => {
  it('deve excluir um usuário da lista', () => {
    const email = `thiagosilva${Date.now()}${Math.floor(Math.random() * 10000)}@email.com`
    const userData = {
      nome: 'Thiago Silva',
      email,
      senha: 'senha123'
    }

    LoginPage.registerUser(userData)
    UsersPage.deleteUser()
  })
})