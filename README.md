# Como testar o trabalho de SBD

## Table of Contents

- [About](#about)

## About <a name = "about"></a>

Para implementar este trabalho, primeiro você precisa executar um docker container no backend:

```
#postgres
docker run --name seePostgres -e  POSTGRES_USER=see -e POSTGRES_PASSWORD=trabalho -p 5433:5432 -d postgres
```

Depois, você precisar criar um arquivo `.env`com exatamente o mesmo conteúdo que o arquivo `.env.example` na raíz da pasta backend

Em seguida rode o comando `npm install` para instalar todas as dependências.