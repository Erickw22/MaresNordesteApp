<h1 align="center">
    <p>Mares do Nordeste</p>
</h1>

## 📕 Sobre

Um aplicativo React Native para interação social, onde usuários podem se cadastrar, enviar mensagens em tempo real e compartilhar postagens. O app utiliza Firebase para autenticação e armazenamento de dados.

## Funcionalidades

- **Autenticação de Usuários**: Cadastro e login com validação de email.
- **Perfil do Usuário**: Visualização e edição do perfil, incluindo imagem de perfil.
- **Chat em Tempo Real**: Converse com outros usuários por meio de uma interface de chat.
- **Lista de Usuários**: Visualize todos os usuários registrados e inicie conversas.
- **Criação de Postagens**: Crie e visualize postagens dentro do aplicativo.
- **Navegação Intuitiva**: Navegação entre diferentes telas utilizando abas e pilhas de navegação.

## Tecnologias Usadas

- **React Native**: Framework para construir aplicativos móveis.
- **Firebase**: Usado para autenticação de usuários e armazenamento de dados em tempo real.
- **React Navigation**: Biblioteca para gerenciar a navegação entre telas.
- **Expo**: Utilizado para facilitar o desenvolvimento e testes do aplicativo.

## Capturas de Tela

 ![Tela de Login](https://github.com/user-attachments/assets/790b4010-721d-4253-a281-d299d47a7a2b)
 ![ProfileScreen](https://github.com/user-attachments/assets/0237c0ea-b1ea-4386-a560-cba90f3c0676)
 ![ListScreen](https://github.com/user-attachments/assets/95f71afb-65cd-4fd4-a44c-166a954b1246)
 ![ChatScreen](https://github.com/user-attachments/assets/6400c45c-5b48-4a08-a8d7-b8e2b21e5f57)


## Instalação

Siga as instruções abaixo para rodar o aplicativo localmente:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (opcional, mas recomendado)

### Passos para Instalação

1. **Clone o repositório**:
   ```bash
    git clone https://github.com/seu_usuario/seu_repositorio.git
   ```
2. **Navegue até o diretório do projeto:o**:
   ```bash
    cd seu_repositorio
    ```
3. **Instale as dependências:**:
   ```bash
    npm install
    # ou
    yarn install
    ```
4. **Configure o Firebase:**:
 - Crie um projeto no Firebase Console.
 - Ative os serviços de Autenticação e Firestore.
 - Crie um arquivo de configuração firebase.js e adicione as credenciais do seu projeto Firebase:
  ```bash
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";
        
    const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    };
        
    const app = initializeApp(firebaseConfig);
    export const authentication = getAuth(app);
    export const db = getFirestore(app);
   ```

5. **Inicie o aplicativo:**:

   ```bash
    npm start
    ```

## Contribuição

Sinta-se à vontade para contribuir para este projeto. Você pode abrir issues ou enviar pull requests.

## Licença
Este projeto é licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

## Contatos
- Email: erick.weslley.lima@gmail.com
- GitHub: [Erickw22](https://github.com/Erickw22)
