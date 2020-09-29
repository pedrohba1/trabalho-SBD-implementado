CREATE SCHEMA pizzaria;
SET search_path TO pizzaria;
SET datestyle TO DMY;


CREATE TABLE dono_de_negocio  (
cpf VARCHAR(11) NOT NULL PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
linkedin VARCHAR(60),
cep VARCHAR(8),
data_nascimento DATE,
nmro_residencia INT
);


CREATE TABLE pizzaria  (
id SERIAL NOT NULL PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
site VARCHAR(50),
telefone VARCHAR(50) NOT NULL,
cep VARCHAR(50) NOT NULL,
nmro_predio VARCHAR(50) NOT NULL,
abertura TIME,
fechamento TIME,
cpf_dono VARCHAR(11) NOT NULL,
CONSTRAINT donoNegocioFK FOREIGN KEY(cpf_dono)
REFERENCES dono_de_negocio(cpf)
);

CREATE TABLE entregador  (
cnh VARCHAR(11) NOT NULL PRIMARY KEY,
nome VARCHAR(40) NOT NULL,
salario REAL NOT NULL,
id_pizzaria INT NOT NULL,
CONSTRAINT pizzariaFK FOREIGN KEY(id_pizzaria)
REFERENCES pizzaria(id)
);

CREATE TABLE cliente_consumidor (
cpf VARCHAR(11) NOT NULL PRIMARY KEY,
nome VARCHAR(60) NOT NULL,
CEP VARCHAR(8) NOT NULL,
data_nascimento DATE,
nmro_residencia INT NOT NULL
);

CREATE TABLE pedido  (
id_pedido SERIAL NOT NULL PRIMARY KEY,
id_entregador VARCHAR(11) NOT NULL,
localizacao VARCHAR(50) NOT NULL,
preco_total FLOAT NOT NULL,
hora_de_entrega DATE, 
hora_de_saida DATE,
cpf_consumidor VARCHAR(11) NOT NULL,
CONSTRAINT consumidorFK  FOREIGN KEY (cpf_consumidor)
REFERENCES cliente_consumidor(cpf),
CONSTRAINT entregadorFK FOREIGN KEY (id_entregador)
REFERENCES entregador(cnh)
);

CREATE TABLE pizza  (
id INT NOT NULL PRIMARY KEY,
id_pizzaria INT NOT NULL,
descricao VARCHAR(255) NOT NULL,
nome VARCHAR(50) NOT NULL,
tipo VARCHAR(50) NOT NULL,
codigo SERIAL NOT NULL,
preco REAL NOT NULL,
CONSTRAINT pizzariafk FOREIGN KEY(id_pizzaria)
REFERENCES pizzaria(id)
ON UPDATE CASCADE
ON DELETE CASCADE,
CONSTRAINT pizzapk UNIQUE(codigo, id_pizzaria)
);

CREATE TABLE ingrediente_extra  (
id SERIAL NOT NULL PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
preco_extra REAL NOT NULL
);
CREATE TABLE acompanhamento  (
id_p INT NOT NULL PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
descricao VARCHAR(50),
tipo VARCHAR(50),
cod SERIAL NOT NULL,
preco REAL NOT NULL,
CONSTRAINT pizzaFK FOREIGN KEY(id_p)
REFERENCES pizzaria(id)
ON UPDATE CASCADE
ON DELETE CASCADE,
UNIQUE(cod)
);

CREATE TABLE pizza_ingrediente  (
id_pizza INT NOT NULL,
id_ingrediente INT NOT NULL PRIMARY KEY,
CONSTRAINT pizza_fk FOREIGN KEY(id_pizza)
REFERENCES pizza(id),
CONSTRAINT ingrediente_fk FOREIGN KEY(id_ingrediente)
REFERENCES ingrediente_extra(id)
);

CREATE TABLE pizza_pedido  (
id_pizzaria INT NOT NULL,
id_pedido INT NOT NULL,
CONSTRAINT pizzaria_fk FOREIGN KEY (id_pizzaria)
REFERENCES pizzaria(id),
CONSTRAINT pedidoFK FOREIGN KEY (id_pedido)
REFERENCES pedido(id_pedido),
PRIMARY KEY (id_pizzaria, id_pedido)
);

CREATE TABLE acomp_pedido  (
qtd SMALLINT NOT NULL,
id_acompanhamento INT NOT NULL,
id_pedido INT NOT NULL,
CONSTRAINT acompFK FOREIGN KEY(id_acompanhamento)
REFERENCES acompanhamento(id_p)
ON UPDATE CASCADE
ON DELETE CASCADE,
CONSTRAINT pedidoFK FOREIGN KEY(id_pedido)
REFERENCES pedido(id_pedido)
ON UPDATE CASCADE
ON DELETE CASCADE,
PRIMARY KEY(id_acompanhamento, id_pedido)
);
