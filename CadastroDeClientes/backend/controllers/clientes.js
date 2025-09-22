import Cliente from "../models/cliente.js";
import { Sequelize, Op } from "sequelize";
/*

ROTAS GET

*/
//FUNCAO PARA LER OS DADOS
export async function fnLerDados(req, res) {
  try {
    const data = await Cliente.findAll().then((dados) => {
      res.json(dados);
    });
  } catch (error) {
    console.log(error);
  }
}

//ROTA PARA O FORMULARIO
export async function fnFormulario(req, res) {
  res.render("cadastro");
}

//ROTA PAINEL EXIBIR OS DADOS DIRETO NO PAINEL DE CLIENTES
export async function fnPainel(req, res) {
  //INDICADORES
  const Feminino = await Cliente.count({
    where: {
      id_genero: 2,
    },
  });
  const Masculino = await Cliente.count({
    where: {
      id_genero: 1,
    },
  });
  const totalClientes = await Cliente.count();
  const naoDeclarados = await Cliente.count({
    where: { id_genero: 3 },
  });

  //FILTRAR USERs
  const busca = req.query.busca || "";
  const where = {};
  if (busca) {
    where[Op.or] = [
      { primeiro_nome: { [Op.like]: `%${busca}%` } },
      { segundo_nome: { [Op.like]: `%${busca}%` } },
      { email: { [Op.like]: `%${busca}%` } },
      { id_genero: { [Op.like]: `%${busca}%` } },
    ];
  }

  //PAGINAÇÃO
  const page = parseInt(req.query.page) || 1; // Página atual
  const limit = 5; // Clientes por página
  const offset = (page - 1) * limit;
  try {
    const { count, rows } = await Cliente.findAndCountAll({
      where,
      limit,
      offset,
      raw: true,
    });
    const totalPages = Math.ceil(count / limit);
    res.render("painel", {
      dados: rows,
      currentPage: page,
      totalPages,
      busca,
      Feminino,
      Masculino,
      totalClientes,
      naoDeclarados,
    });
  } catch (error) {
    console.error("Erro na paginação:", error);
    res.status(500).send("Erro interno");
  }
}

//EDITAR OU APAGAR
export async function fnEdicao(req, res) {
  const id = req.params.id;
  try {
    const cliente = await Cliente.findByPk(id, { raw: true });
    res.render("editar", { cliente });
  } catch (erro) {
    console.erro("Erro ao buscar cliente", erro);
    res.status(500).json({
      erro: 500,
      describe: "Erro interno",
    });
  }
}
/*

ROTAS POST

*/
//FUNCAO PARA ATUALIZAR CLIENTES
export async function fnAtualizar(req, res) {
  let sexoSelect;
  const id = req.params.id;
  const { primeiroNome, segundoNome, nascimento, email, sexo } = req.body;
  switch (sexo) {
    case "Masculino":
      sexoSelect = 1;
      break;
    case "Feminino":
      sexoSelect = 2;
      break;
    case "naoDeclarado":
      sexoSelect = 3;
      break;
  }
  try {
    await Cliente.update(
      {
        primeiro_nome: primeiroNome,
        segundo_nome: segundoNome,
        data_nascimento: nascimento,
        email,
        id_genero: sexoSelect,
      },
      {
        where: { id_cliente: id },
      }
    );
    res.redirect("/painel");
  } catch (erro) {
    res.status(500).send({
      erro: erro,
      describe: "Erro interno",
    });
  }
}

//FUNCAO PARA EXCLUIR CLIENTES
export async function fnExcluir(req, res) {
  const id = req.params.id;
  try {
    await Cliente.destroy({ where: { id_cliente: id } });
    res.redirect("/painel");
  } catch (erro) {
    res.status(500).send({
      erro: erro,
      describe: "Erro interno",
    });
  }
}

//FUNCAO PARA ADICIONAR CLIENTES
export async function fnAddClientes(req, res) {
  let sexo;

  switch (req.body.sexo) {
    case "Masculino":
      sexo = 1;
      break;
    case "Feminino":
      sexo = 2;
      break;
    case "Não declarado":
      sexo = 3;
      break;
  }

  // Validação de campos
  if (
    !req.body.primeiroNome ||
    !req.body.segundoNome ||
    !req.body.nascimento ||
    !req.body.email ||
    !req.body.sexo
  ) {
    return res.render("cadastro", {
      erro: "Por favor, preencha todos os campos.",
    });
  }

  // Verificação de e-mail duplicado
  const emailExistente = await Cliente.findOne({
    where: { email: req.body.email },
  });
  if (emailExistente) {
    return res.render("cadastro", { erro: "Este e-mail já está cadastrado." });
  }

  const dados = {
    primeiro_nome: req.body.primeiroNome,
    segundo_nome: req.body.segundoNome,
    data_nascimento: req.body.nascimento,
    email: req.body.email,
    id_genero: sexo,
  };

  try {
    await Cliente.create(dados);
    res.redirect("/painel");
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    res.render("add", { erro: "Erro ao cadastrar cliente. Tente novamente." });
  }
}
