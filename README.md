# Projeto Medicare

### Integrantes:
* Felipe Negrelli
* Edson Boldrini
* Diego Gava Monteiro
* Yago Henrique

### Aplicação Backend:
#### Configurações para desenvolvimento:

* Acessar a pasta do Backend usando o terminal;
* Instalar o cli do AodnisJS utilizando o comando `npm i -g @adonisjs/cli`;
* Executar o comando `npm install`;
* Criar um banco de dados no PostgreSQL com nome "medicare" (se ainda tiver sido criado);
* Duplicar o arquivo .env.example e renomea-lo para .env;
* Editar o arquivo .env, setando os seguintes valores de conexão com DB (ou outros que você achar melhor):
..* DB_CONNECTION=pg
..* DB_HOST=127.0.0.1
..* DB_PORT=5432
..* DB_USER=postgres
..* DB_PASSWORD=postgres
..* DB_DATABASE=medicare
    
* Rodar o comando `adonis migration:run` no terminal na raiz da aplicação para criação das tabelas do BD;
* Rodar o comando `adonis serve --dev` para iniciar;
* A aplicação estará rodando no caminho `127.0.0.1:3333`.

### Aplicação Mobile:
#### Configurações para desenvolvimento:

* Instalar o Android Studio;
* Instalar usando SDK Manager do Android Studio o SDK 27 e o SDK Tools 27.0.3;
* Criar um dispositivo virtual usando o AVD Manager do Android Studio, escolhendo a API versão 27;
* Instalar o Node.js, o JDK8 e Python2 se ainda não estiverem instalados na máquina;
* Instalar o CLI do React Native usando o comando `npm install -g react-native-cli`;
* Executar o comando `npm install` para instalar as dependências do projeto;
* Rodar o comando `react-native run-android` para instalar e emulaçar o aplicativo no Android virtualizado;
