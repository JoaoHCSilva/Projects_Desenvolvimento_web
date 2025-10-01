import db from "./dados.js";
const form = document.querySelector("form");
const saida = document.querySelector(".saida");
//manipulando a lista de dados
let lista = form.inAnimal;
Object.keys(db).forEach((animal) => {
  lista.innerHTML += `<option class="opcao" value="${animal}"> ${animal}</option>`;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  saida.innerHTML = "";
  const anos = Number(form.inAnos.value);
  let gado = calcularGado(anos);
  //   console.log(gado);
  for (let i = 0; i < anos; i++) {
    saida.innerHTML += `<dl>
    <dt>${i + 1}ºano</dt>
     <dd>Quantidade: ${gado[i].gado} UN </dd>
     <dd>Preço: <spam class="precoGado">R$:${gado[i].preco.toFixed(
       2
     )}<spam> </dd>
     <dd>Peso total: ${gado[i].pesoTotal}kg </dd>
     </dl>`;
  }
  gado = "";
});

function calcularGado(anos) {
  const selecao = form.inAnimal.value;
  let dados = [];
  let infoComplementar = {};
  let gadoInicial = 0;
  Object.entries(db).forEach(([animal, valor]) => {
    if (animal == selecao) {
      gadoInicial = valor.quantidade;
      Object.assign(infoComplementar, valor);
      console.log(infoComplementar);
      for (let i = 1; i <= anos; i++) {
        if (i == 1) {
          dados.push({
            gado: gadoInicial * 1,
            preco: infoComplementar.preco,
            pesoTotal: infoComplementar.peso,
          });
        } else {
          dados.push({
            gado: gadoInicial * 3,
            preco: infoComplementar.preco * 3,
            pesoTotal: infoComplementar.peso * 3,
          });
          gadoInicial = gadoInicial * 3;
          infoComplementar.preco = infoComplementar.preco * 3;
          infoComplementar.peso = infoComplementar.peso * 3;
        }
      }
    }
  });
  return dados;
}
