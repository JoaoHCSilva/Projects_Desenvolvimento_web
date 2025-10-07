const form = document.querySelector("form");
const estacionamento = document.querySelector(".carros-estacionados");
const options = document.querySelector("#inPosicao");
const VAGAS_TOTAIS = 10;

// Armazena os dados dos carros. O índice do array + 1 pode representar a vaga.
// Para uma abordagem mais robusta, cada objeto carro deve ter a propriedade 'vaga'.
let carros = [];

// Guarda o índice do carro que está sendo editado. null se nenhum.
let editandoIndex = null;

// Função principal que redesenha todas as vagas
function renderizarEstacionamento() {
  estacionamento.innerHTML = ""; // Limpa a visualização atual

  // Cria um mapa das vagas ocupadas para fácil consulta
  const vagasOcupadas = new Map();
  carros.forEach((carro, index) => {
    vagasOcupadas.set(parseInt(carro.posicao), { carro, index });
  });

  for (let i = 1; i <= VAGAS_TOTAIS; i++) {
    if (vagasOcupadas.has(i)) {
      // Vaga ocupada
      const { carro, index } = vagasOcupadas.get(i);
      estacionamento.innerHTML += `
        <div class="carros-vaga">
            <ul>
                <li>Nome: ${carro.nome} </li>
                <li>Telefone: ${carro.telefone} </li>
                <li>Placa: ${carro.placa} </li>
                <li class="vaga-cod">Vaga: ${carro.posicao} </li>
            </ul>
            <div class="botoes">
                <button class="excluir" onclick="liberarCarro(${index})">Liberar</button>
                <button class="editar" onclick="editarCarro(${index})">Editar</button>
            </div>
        </div>`;
    } else {
      // Vaga livre
      estacionamento.innerHTML += `
        <div class="carros-vaga">
            <ul>
                <li style="text-align: center">Vaga disponível</li>
                <li class="vaga-cod">Vaga: ${i} </li>
            </ul>
             <div class="botoes">
                <button class="add" onclick="selecionarVaga(${i})">Ocupar</button>
            </div>
        </div>`;
    }
  }
  atualizarOpcoesVagas();
}

// Função para atualizar o dropdown com as vagas disponíveis
function atualizarOpcoesVagas() {
  options.innerHTML = "";
  const vagasOcupadas = carros.map((carro) => parseInt(carro.posicao));

  for (let i = 1; i <= VAGAS_TOTAIS; i++) {
    if (!vagasOcupadas.includes(i)) {
      options.innerHTML += `<option value="${i}"> ${i} </option>`;
    }
  }
}

// Evento de submit do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dados = {
    nome: form.inNome.value,
    telefone: form.inTel.value,
    placa: form.inPlaca.value,
    posicao: form.inPosicao.value,
  };

  if (!dados.nome || !dados.placa || !dados.posicao) {
    alert("Por favor, preencha nome, placa e posição.");
    return;
  }

  if (editandoIndex !== null) {
    // Modo Edição
    // Mantém a posição original se o dropdown não tiver a opção
    const carroOriginal = carros[editandoIndex];
    dados.posicao = form.inPosicao.value || carroOriginal.posicao;
    carros[editandoIndex] = dados;
    editandoIndex = null; // Sai do modo de edição
    document.querySelector(".form-title h2").textContent =
      "Entrada de veículos";
    document.querySelector(".cadastrar").textContent = "Cadastrar";
  } else {
    // Modo Cadastro
    carros.push(dados);
  }

  renderizarEstacionamento();
  form.reset();
  form.inNome.focus();
});

// Função para liberar (excluir) o carro
function liberarCarro(index) {
  const carroRemovido = carros.splice(index, 1)[0]; // Remove o carro do array e o pega
  alert(
    `Carro ${carroRemovido.placa} liberado da vaga ${carroRemovido.posicao}!`
  );
  form.reset();
  document.querySelector(".form-title h2").textContent = "Entrada de veículos";
  document.querySelector(".cadastrar").textContent = "Cadastrar";

  renderizarEstacionamento();
}

// Função para preparar a edição do carro
function editarCarro(index) {
  const carro = carros[index];
  if (!carro) return;

  // Preenche o formulário
  form.inNome.value = carro.nome;
  form.inTel.value = carro.telefone;
  form.inPlaca.value = carro.placa;

  // Adiciona a vaga atual ao dropdown para permitir a edição
  atualizarOpcoesVagas();
  if (!options.querySelector(`option[value="${carro.posicao}"]`)) {
    options.innerHTML += `<option value="${carro.posicao}" selected> ${carro.posicao} </option>`;
  }
  form.inPosicao.value = carro.posicao;

  // Entra no "modo de edição"
  editandoIndex = index;
  document.querySelector(
    ".form-title h2"
  ).textContent = `Editando Veículo (Vaga ${carro.posicao})`;
  document.querySelector(".cadastrar").textContent = "Salvar Alterações";

  // Leva o usuário ao formulário
  form.inNome.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Função para o botão "Ocupar" na vaga livre
function selecionarVaga(numeroVaga) {
  form.inPosicao.value = numeroVaga;
  form.inNome.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Inicia a aplicação
renderizarEstacionamento();
