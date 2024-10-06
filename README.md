# 📱 Quiz Game em React Native

Este é um projeto de um **quiz interativo** desenvolvido em **React Native**, onde os usuários podem responder perguntas e visualizar seus resultados ao final, com a opção de revisar suas respostas. O jogo foi criado para um trabalho da faculdade com objetivo de construir um quiz com uma experiência fluida e dinâmica, permitindo uma navegação intuitiva entre as questões e a revisão de respostas.

## 📝 Funcionalidades

- Exibição de perguntas com múltiplas respostas.
- Controle de respostas do usuário, permitindo selecionar e alterar as respostas.
- Verificação e contagem de respostas corretas ao final do jogo.
- Modo de **revisão**, onde o usuário pode ver o que acertou e errou, com feedback visual (verde para correto, vermelho para incorreto).
- Possibilidade de iniciar um novo jogo ao final ou revisar as questões respondidas.

## 🚀 Tecnologias Utilizadas

- **React Native**: Framework principal para desenvolvimento mobile.
- **Context API**: Para gerenciamento de estado global, como o armazenamento de perguntas e respostas do usuário.
- **Expo**: Plataforma para desenvolvimento e execução do app em dispositivos físicos.

## 📂 Estrutura do Projeto

A estrutura do projeto segue uma organização em componentes e contextos, facilitando o entendimento e a manutenção do código.

```bash
├── Pages/
│   ├── components/                # Componentes reutilizáveis no projeto
│   │   ├── AnswerList.jsx          # Renderiza a lista de respostas para um formulário ou questionário
│   │   ├── AnswerListGame.jsx      # Lista de respostas dentro do jogo, com lógica de marcação de respostas corretas/incorretas
│   │   ├── Button.jsx              # Componente de botão reutilizável
│   │   ├── DropdownComponent.jsx   # Componente dropdown para seleção de opções
│   │   ├── ListItem.jsx            # Componente reutilizavel para listagem de elementos
│   ├── FinalResult/                # Página que exibe o resultado final do jogo
│   ├── Form/                       # Formulário de cadastro de perguntas ou temas
│   ├── Game/                       # Página principal do jogo, onde as perguntas são exibidas e respondidas
│   ├── GameConfig/                 # Configurações iniciais do jogo (ex.: seleção de quantidade de perguntas/temas)
│   ├── Home/                       # Página inicial com opções de navegação para outras seções
│   ├── List/                       # Página para exibição de listas de temas ou perguntas
│   ├── ReviewQuestions/            # Página para revisão de questões após o jogo, mostrando respostas corretas/incorretas
├── context/
│   ├── AnswerContext.js            # Contexto para gerenciamento de respostas do usuário
│   ├── QuestionContext.js          # Contexto para gerenciamento das questões exibidas no jogo
│   ├── ThemeContext.js             # Contexto para gerenciamento de temas das perguntas
├── services/
│   ├── answerService.js            # Serviço responsável por buscar ou manipular dados de respostas
│   ├── dbService.js                # Serviço para operações no banco de dados
│   ├── questionService.js          # Serviço responsável por lidar com as questões, como criar ou buscar perguntas
│   ├── themeService.js             # Serviço para manipular dados de temas, como criar ou listar temas
└── App.js                          # Arquivo principal que inicializa o aplicativo e configura a navegação
```
## 🎮 Como Jogar

1. **Iniciar o Jogo**: O usuário inicia o jogo e as perguntas são carregadas.
2. **Responder**: O usuário seleciona as respostas corretas utilizando checkboxes para cada pergunta.
3. **Finalizar**: Após responder todas as perguntas, o usuário pode ver seu resultado final.
4. **Revisar**: O usuário pode revisar as perguntas, verificando suas respostas e as corretas.
5. **Novo Jogo**: O usuário pode iniciar um novo jogo.

## ⚙️ Instalação e Execução

Para rodar este projeto em seu ambiente local, siga os passos abaixo:

### Pré-requisitos
- Ter o Node.js instalado.
- Ter o Expo CLI instalado globalmente: npm install -g expo-cli

## 👥 Contribuidores

- [Paulo Henrique Tristão](https://github.com/PauloTristao) - Desenvolvedor
- [Guilherme Gonçalves Garcia](https://github.com/guigarciag) - Desenvolvedor
