# Gerenciador de locadora

O projeto consiste em duas branchs:
* Api - API desenvolvida em c# asp.net Core 6.0 com Entity Framework Core utilizando como banco de dados o Mysql
* Website - Webinterface desenvolvida em react com typescript, utilizando a biblioteca Antdesign como indicado

## 💻 Pré-requisitos

É possível executar o projeto de duas maneiras:
* Utilizando `Docker`
* Utilizando `Node, Visual studio (c# asp.net core), Mysql`.

## 🚀 Executando via `Docker`

Para executar o projeto via docker, siga estas etapas:

Primeiro precisamos gerar a imagem docker do website, o Dockerfile reside na branch `website`, na pasta root.
```
docker build -t website-react .
```
Obs: o nome da imagem é gerada como `website-react`, pois no docker-compose é utilizado esta tag como referência, caso troque o nome da tag, troque também o docker-compose.

O próximo passo consiste em rodarmos o arquivo docker-compose.yml, que reside na branch `api`, também na pasta root, com o comando:
```
docker compose up
```

Após aguardar os três contâiners rodarem, já será possível acessar todo o projeto:
* Mysql - Tabelas criadas e populadas pelo Entity Framework. O contâiner está configurado para rodar na porta `3306` (padrão do mysql), por isso se já estiver em uso pelo seu servidor local, será necessário alterar o mapeamento de portas no `docker-compose.yml`.
* C# Asp.net - Endpoints dos CRUD's e Swagger como rota default. Existem duas portas que correspondem ao acesso http e https, que são, respectivamente, `5000` e `5001`, por default o website usará a porta https, como definido no Env do container.
* ReactJs - Páginas que implementam os CRUD's criados, rodando na porta mapeada `5300`.




## ☕ Executando com Node, Visual studio e Mysql



Primeiro será necessário a configuração do banco de dados, com um usuário válido para acessar o banco `Locadora` que será gerado ao rodar a API caso ainda não exista.

Alterar as configurações no settings.json para que corresponda com as informações do seu usuário.

Após isso, é possível iniciar a solução através do Visual studio.


Para iniciar o site em React, segue-se a instalação padrão de bibiliotecas utilizando `npm` ou `yarn`, neste caso utilizei npm:

Na root do projeto, digitar os comandos:
```
npm install

npm start

```
Com isso, o website ja deverá estar rodando na porta padrão do React `3000`.

> Não se esqueça de modificar a variável de ambiente no arquivo `.env.example` apagando o `.example` e inserindo a url da sua API rodando localmente.

## Postman Workspace
 `https://www.postman.com/duvique/workspace/locadora`



Pretendo aperfeiçoar mais este projeto futuramente, até breve!

## 🤝 Obrigado
