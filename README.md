<h1 align="center">
    passVault
</h1>
<br>

## Features

- [x] Criação de usuario
- [x] Autenticação com JWT
- [x] CRUD de senhas
      <br>

## Configurando variaveis de ambiente

1. Substitua os valores das variaveis no arquivo [.env.sample](.env.sample) por valores reais
1. Renomeie o arquivo para .env

## Rodando a aplicação

#### Antes de começar você tem que ter instalado na sua maquina: [Git](https://git-scm.com), [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/install/).

1. Clonar o repositório
   ```bash
   git clone https://github.com/Ribeir0o/passVault.git
   ```
1. Entrar na pasta do projeto
   ```bash
   cd passVault
   ```
1. Startar os containers
   ```bash
   docker-compose up -d
   ```
   > Ao criar o container do MySQL pode ser que ele demore para startar (~1 min) por conta dos arquivos que ele gera, se quiser saber como checar se o server já está rodando, clique [aqui](#checando-se-o-mysql-está-rodando)
1. Quando o server do mysql estiver rodando, execute as migrations:

   ```bash
   docker exec -it api yarn migrate
   ```

## Rodando testes

- Todos os testes

  ```bash
  yarn test
  ```

- Apenas testes unitários

  ```bash
  yarn test:unit
  ```

- Apenas testes de integração

  ```bash
  yarn test:integration
  ```

## Checando se o Mysql está rodando

```bash
docker exec -it db service mysql status
```

Caso o server esteja rodando o output vai ser:

```log
[info] MySQL Community Server 5.7.33 is running.
```
