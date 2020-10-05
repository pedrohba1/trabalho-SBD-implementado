CREATE SCHEMA pizzaria;
SET search_path TO pizzaria;
SET datestyle TO DMY;

CREATE TABLE dono_de_negocio  (
    id_dono SERIAL NOT NULL PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    linkedin VARCHAR(60),
    cep VARCHAR(8),
    data_nascimento DATE,
    nmro_residencia INT
);

CREATE TABLE pizzaria  (
    id_pizzaria SERIAL NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    site VARCHAR(50),
    telefone VARCHAR(50) NOT NULL,
    cep VARCHAR(50) NOT NULL,
    nmro_predio VARCHAR(50) NOT NULL,
    abertura TIME,
    fechamento TIME,
    id_dono INT NOT NULL,
    CONSTRAINT donoNegocioFK FOREIGN KEY(id_dono)
    REFERENCES dono_de_negocio(id_dono)
    ON DELETE CASCADE
);

CREATE TABLE entregador  (
    id_entregador SERIAL NOT NULL PRIMARY KEY,
    cnh VARCHAR(11) NOT NULL,
    nome VARCHAR(40) NOT NULL,
    salario REAL NOT NULL,
    id_pizzaria INT NOT NULL,
    CONSTRAINT pizzariaFK FOREIGN KEY(id_pizzaria)
    REFERENCES pizzaria(id_pizzaria)
);

CREATE TABLE cliente_consumidor (
    id_cliente SERIAL NOT NULL PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(60) NOT NULL,
    CEP VARCHAR(8) NOT NULL,
    data_nascimento DATE,
    nmro_residencia INT NOT NULL
);

CREATE TABLE pedido  (
    id_pedido SERIAL NOT NULL PRIMARY KEY,
    id_entregador INT NOT NULL,
    localizacao VARCHAR(50) NOT NULL,
    preco_total FLOAT NOT NULL,
    hora_de_entrega DATE,
    hora_de_saida DATE,
    id_cliente INT NOT NULL,
    CONSTRAINT consumidorFK  FOREIGN KEY (id_cliente)
    REFERENCES cliente_consumidor(id_cliente),
    CONSTRAINT entregadorFK FOREIGN KEY (id_entregador)
    REFERENCES entregador(id_entregador)
);

CREATE TABLE pizza  (
    id_pizza SERIAL NOT NULL PRIMARY KEY,
    id_pizzaria INT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    preco REAL NOT NULL,
    CONSTRAINT pizzariafk FOREIGN KEY(id_pizzaria)
    REFERENCES pizzaria(id_pizzaria)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE ingrediente_extra  (
    id_ingrediente SERIAL NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco_extra REAL NOT NULL
);

CREATE TABLE acompanhamento  (
    id_acompanhamento SERIAL NOT NULL PRIMARY KEY,
    id_pizzaria INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(50),
    tipo VARCHAR(50),
    preco REAL NOT NULL,
    CONSTRAINT pizzariaFK FOREIGN KEY(id_pizzaria)
    REFERENCES pizzaria(id_pizzaria)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE pizza_ingrediente  (
    id_pizza_ingrediente SERIAL NOT NULL PRIMARY KEY,
    id_pizza INT NOT NULL,
    id_ingrediente INT NOT NULL,
    CONSTRAINT pizza_fk FOREIGN KEY(id_pizza)
    REFERENCES pizza(id_pizza),
    CONSTRAINT ingrediente_fk FOREIGN KEY(id_ingrediente)
    REFERENCES ingrediente_extra(id_ingrediente)
);

CREATE TABLE pizza_pedido  (
    id_pizza_pedido SERIAL NOT NULL PRIMARY KEY,
    id_pizzaria INT NOT NULL,
    id_pedido INT NOT NULL,
    CONSTRAINT pizzaria_fk FOREIGN KEY (id_pizzaria)
    REFERENCES pizzaria(id_pizzaria),
    CONSTRAINT pedidoFK FOREIGN KEY (id_pedido)
    REFERENCES pedido(id_pedido)
);

CREATE TABLE acomp_pedido  (
    id_acomp_pedido SERIAL NOT NULL PRIMARY KEY,
    qtd SMALLINT NOT NULL,
    id_acompanhamento INT NOT NULL,
    id_pedido INT NOT NULL,
    CONSTRAINT acompFK FOREIGN KEY(id_acompanhamento)
    REFERENCES acompanhamento(id_acompanhamento)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT pedidoFK FOREIGN KEY(id_pedido)
    REFERENCES pedido(id_pedido)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

