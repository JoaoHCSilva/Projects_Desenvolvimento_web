🐄 Simulador de Projeção Pecuária
Um Web App interativo para projeção de crescimento de rebanhos animais, desenvolvido com JavaScript puro. Ferramenta ideal para produtores rurais e gestores do agronegócio realizarem planejamentos estratégicos.

✨ Funcionalidades
📊 Projeção Automática: Calcula o crescimento do rebanho considerando triplicação anual

🐮 Múltiplas Espécies: Suporte para bois, vacas, galinhas e patos

💰 Análise Financeira: Projeção de valores baseada no preço de mercado

⚖️ Cálculo de Peso: Estimativa de peso total do rebanho

📱 Design Responsivo: Interface adaptável para desktop e mobile

🎯 Interface Intuitiva: Formulário simples com resultados em tempo real

🛠️ Tecnologias Utilizadas
Frontend: HTML5, CSS3 (Grid + Flexbox), JavaScript ES6+

Armazenamento: JSON local como banco de dados

Recursos: CSS Variables, Media Queries, JavaScript Modules

🚀 Como Executar
Clone o repositório:

bash
git clone https://github.com/JoaoHCSilva/Projects_Desenvolvimento_web/edit/main/criacao_gado.git
Acesse o diretório:

bash
cd simulador-pecuaria
Execute com servidor local:

bash
# Usando Python
python -m http.server 8000

# Ou usando Node.js
npx http-server

# Ou usando PHP
php -S localhost:8000
Acesse no navegador:

text
http://localhost:8000
📁 Estrutura do Projeto
text
simulador-pecuaria/
│
├── index.html          # Estrutura principal
├── style.css           # Estilos e design responsivo
├── script.js           # Lógica principal da aplicação
├── dados.js            # Banco de dados local em JSON
│
└── README.md
🎯 Como Usar
Selecione o animal desejado no dropdown

Informe a quantidade de anos para projeção

Clique em "Calcular" para gerar a simulação

Visualize os resultados ano a ano com:

Quantidade de animais

Valor total projetado

Peso total do rebanho

💡 Exemplo de Projeção
Entrada:

Animal: Boi

Anos: 5

Resultado:

Ano 1: 2 unidades | R$ 7.000,00 | 500kg

Ano 2: 6 unidades | R$ 21.000,00 | 1.500kg

...

Ano 5: 162 unidades | R$ 567.000,00 | 40.500kg

🔧 Personalização
Adicionar Novos Animais
Edite o arquivo dados.js:

javascript
const dados = {
  // ... animais existentes ...
  novo_animal: {
    peso: 150,
    preco: 2500,
    quantidade: 1
  }
};
Modificar Taxa de Crescimento
No arquivo script.js, função calcularGado():

javascript
// Alterar de triplicação para outra taxa
gado: gadoInicial * 2, // Duplicação anual
🌟 Próximas Melhorias
Gráficos interativos para visualização de dados

Exportação de relatórios em PDF/Excel

Diferentes taxas de crescimento por espécie

Integração com API de preços de mercado

Modo de comparação entre múltiplas espécies
