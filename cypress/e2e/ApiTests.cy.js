describe("E2E API - ServeRest", () => {
  let token;
  let usuarioId;
  let produtoId;
  const timestamp = Date.now();

  const usuario = {
    nome: `Usuario Teste ${timestamp}`,
    email: `usuario.teste.${timestamp}@qa.com`,
    password: "teste123",
    administrador: "true"
  };

  const produto = {
    nome: `Produto Teste ${timestamp}`,
    preco: 100,
    descricao: "Produto criado via teste E2E Cypress",
    quantidade: 10
  };

  it("Deve cadastrar um novo usuário administrador", () => {
    cy.request({
      method: "POST",
      url: "/usuarios",
      body: usuario
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");

      usuarioId = response.body._id;
      expect(usuarioId).to.exist;
    });
  });

  it("Deve realizar login com o usuário cadastrado", () => {
    cy.request({
      method: "POST",
      url: "/login",
      body: {
        email: usuario.email,
        password: usuario.password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Login realizado com sucesso");

      token = response.body.authorization;
      expect(token).to.exist;
    });
  });

  it("Deve buscar o usuário cadastrado por ID", () => {
    cy.request({
      method: "GET",
      url: `/usuarios/${usuarioId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body._id).to.eq(usuarioId);
      expect(response.body.nome).to.eq(usuario.nome);
      expect(response.body.email).to.eq(usuario.email);
      expect(response.body.administrador).to.eq(usuario.administrador);
    });
  });

  it("Deve cadastrar um produto usando token de administrador", () => {
    cy.request({
      method: "POST",
      url: "/produtos",
      headers: {
        Authorization: token
      },
      body: produto
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");

      produtoId = response.body._id;
      expect(produtoId).to.exist;
    });
  });

  it("Deve buscar o produto cadastrado por ID", () => {
    cy.request({
      method: "GET",
      url: `/produtos/${produtoId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body._id).to.eq(produtoId);
      expect(response.body.nome).to.eq(produto.nome);
      expect(response.body.preco).to.eq(produto.preco);
      expect(response.body.descricao).to.eq(produto.descricao);
      expect(response.body.quantidade).to.eq(produto.quantidade);
    });
  });

  it("Deve validar erro de login com senha inválida", () => {
    cy.request({
      method: "POST",
      url: "/login",
      failOnStatusCode: false,
      body: {
        email: usuario.email,
        password: "senha_errada"
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq("Email e/ou senha inválidos");
    });
  });

  it("Deve excluir o produto criado no teste", () => {
    cy.request({
      method: "DELETE",
      url: `/produtos/${produtoId}`,
      headers: {
        Authorization: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Registro excluído com sucesso");
    });
  });

  it("Deve excluir o usuário criado no teste", () => {
    cy.request({
      method: "DELETE",
      url: `/usuarios/${usuarioId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Registro excluído com sucesso");
    });
  });
});