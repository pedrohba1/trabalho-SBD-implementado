# Como testar o trabalho de SBD

## Table of Contents

- [About](#about)

## About <a name = "about"></a>

Para implementar este trabalho, primeiro você precisa executar um docker container no backend:

```
#postgres
docker run --name seePostgres -e  POSTGRES_USER=see -e POSTGRES_PASSWORD=trabalho -p 5433:5432 -d postgres
```

Rode o script de criação do banco no arquivo em  `database/db_script.sql`. O Banco está rodando em localhost, na porta 5433, usuário "see" e senha "trabalho". 

Depois, você precisar criar um arquivo `.env`com exatamente o mesmo conteúdo que o arquivo `.env.example` na raíz da pasta backend

Em seguida rode o comando `npm install` para instalar todas as dependências.

em seguida rode `npm run dev` e o projeto estará rodando.

Use o arquivo do Insomnia para testar as requisições ao banco de dados.
