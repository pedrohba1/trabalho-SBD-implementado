INSERT INTO pizzaria.dono_de_negocio (id_dono, cpf, nome, linkedin, cep, data_nascimento, nmro_residencia)
VALUES (default, '12345678910', 'Jubiscreide', NULL, NULL, NULL, NULL),
       (default, '10987654321', 'Jubis', 'jubis pizza', NULL, NULL, NULL),
       (default, '01234543210', 'Creide', NULL, NULL, NULL, NULL),
       (default, '98765456789', 'Bisc', NULL, NULL, NULL, NULL),
       (default, '15975315975', 'Eide', NULL, NULL, NULL, NULL);

INSERT INTO pizzaria.pizzaria (id_pizzaria, nome, site, telefone, cep, nmro_predio, abertura, fechamento, id_dono)
VALUES (default, 'Casa Blanca', 'www.casablanca.com', '32345687', '38408546', '52', '15:00:00', '23:00:00', 1),
	   (default, 'Minas Tche', 'www.minastche.com', '32335567', '38408200', '10', '14:00:00', '02:00:00', 2),
	   (default, 'Porto Alegre', 'www.portaalegre.com', '32546847', '38408645','54','16:00:00','01:00:00', 3),
	   (default, 'Pontual', 'www.pontual.com','32546871', '38408204', '100', '15:00:00', '22:00:00', 4),
	   (default, 'Casa das Massas', 'www.casadasmassas', '32478476', '38408710', '700', '15:00:00','23:00:00', 5);

INSERT INTO pizzaria.entregador (id_entregador,id_supervisor, cnh, nome, salario, id_pizzaria)
VALUES (default,default ,'76389367278', 'Antônio Carlos', 450.00, 1),
       (default, 1,'52318257443','José Pedro', 500.00, 2),
	   (default, 1, '74462997486', 'Luisa Pereira', 480.99, 3),
       (default,2, '48601167182', 'Augusto Fernando', 600.00, 4),
	   (default,2, '27808640857', 'Fernanda Nunes', 550.00, 5);

INSERT INTO pizzaria.cliente_consumidor(id_cliente, cpf, nome, CEP, data_nascimento, nmro_residencia)
    VALUES (default, '90192407066', 'Pedro Francisco', '38407619', '1998-01-09', 55),
		   (default, '11013920023', 'Vinicius Carneiro', '38401574', '2000-04-10', 110),
           (default, '43750491038', 'Larissa Augusta', '38405216', '1989-01-11', 721),
           (default, '63236952008', 'Gessica Antônia', '38415441', '1993-09-07', 820),
           (default, '84331763072', 'Cleidiane Sousa', '38412704', '2001-03-08', 71);

INSERT INTO pizzaria.pedido (id_pedido, id_entregador, localizacao, preco_total, hora_de_entrega, hora_de_saida, id_cliente)
VALUES (DEFAULT, 1, 'Av Ortizio Borges 446', 50.0, NULL, NULL, 1),
       (DEFAULT, 2, 'Av Belarmino 446', 45.0, NULL, NULL, 2),
       (DEFAULT, 3, 'Av Segismundo 446', 55.0, NULL, NULL, 3),
       (DEFAULT, 4, 'Av João Naves 446', 55.0, NULL, NULL, 4),
       (DEFAULT, 5, 'Av Rondon Pacheco 446', 55.0, NULL, NULL, 5);



INSERT INTO pizzaria.pizza (id_pizza, id_pizzaria, descricao, nome, tipo, preco)
VALUES (default, 1, 'Queijo tomate lagartixa', 'Largato', 'salgado', 10.00),
       (default, 1, 'Queijo tomate manjericao', 'Marguerita', 'salgado', 30.00),
       (default, 1, 'Calabresa queijo cebola', 'Calabresa', 'salgada', 35.00),
       (default, 2, 'Chocolate morango', 'Chocolate com morango', 'doce', 25.00),
       (default, 2, 'Banana açúcar e canela', 'Banana', 'doce', 20.00);

INSERT INTO pizzaria.ingrediente_extra (id_ingrediente, nome, preco_extra)
VALUES (DEFAULT, 'Bacon', 3.00),
       (DEFAULT, 'Queijo', 2.00),
       (DEFAULT, 'Azeitona', 0.50),
       (DEFAULT, 'Tomate', 1.00),
       (DEFAULT, 'Lagartixa', 2.50);

INSERT INTO pizzaria.acompanhamento (id_acompanhamento, id_pizzaria, nome, descricao, tipo, preco)
VALUES (default, 1, 'Coquinha', 'Gelada', 'Bebida', 5.00),
       (default, 1, 'Batata Frita', 'Porção de 500g', 'Salgado', 10),
       (default, 1, 'Fritas com Bacon', 'Porção de 500g com batata e bacon', 'Salgado', 7.00),
       (default, 2, 'Batata com cheddar', '500g de batata com cheddar', 'Salgado', 7.00),
       (default, 2, 'Salada Caesar', 'Saladinha da boa', 'Salgado', 10.00);

INSERT INTO pizzaria.pizza_ingrediente (id_pizza_ingrediente, id_pizza, id_ingrediente)
VALUES (default, 1, 1),
       (default, 2, 2),
       (default, 3, 3),
       (default, 4, 2),
       (default, 5, 4);

INSERT INTO pizzaria.pizza_pedido (id_pizza_pedido, id_pizzaria, id_pedido)
VALUES (default, 1, 1),
       (default, 1, 2),
       (default, 1, 3),
       (default, 2, 4),
       (default, 2, 5);

INSERT INTO pizzaria.acomp_pedido (id_acomp_pedido, qtd, id_acompanhamento, id_pedido)
VALUES (default, 1, 1, 2),
       (default, 1, 1, 2),
       (default, 1, 3, 5),
       (default, 2, 2, 4),
       (default, 2, 5, 1);
