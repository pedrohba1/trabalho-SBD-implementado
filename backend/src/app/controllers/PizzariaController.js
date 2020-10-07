import client from '../../database';

class PizzariaController {
  async store(req, res) {
    const {
      nome,
      site,
      telefone,
      cep,
      nmro_predio,
      abertura,
      fechamento,
      id_dono,
    } = req.body;

    const text = `INSERT INTO pizzaria.pizzaria(id_pizzaria, nome, site, telefone, cep, nmro_predio, abertura, fechamento, id_dono)
                    VALUES(DEFAULT, $1, $2, $3, $4, $5, TO_TIMESTAMP($6, 'HH24:MI'), TO_TIMESTAMP($7, 'HH24:MI'), $8) RETURNING *`;
    const values = [
      nome,
      site,
      telefone,
      cep,
      nmro_predio,
      abertura,
      fechamento,
      id_dono,
    ];

    try {
      const result = await client.query(text, values);
      console.log(result.rows[0]);
      return res.json({ result: result.rows[0] });
    } catch (err) {
      console.log(err.stack);
      return res.json({ error: 'error' });
    }
  }

  async index(req, res) {
    const text = `SELECT * FROM pizzaria.pizzaria`;

    try {
      const result = await client.query(text);
      return res.json({ result: result.rows });
    } catch (err) {
      console.log(err.stack);
      return res.json({ error: 'error' });
    }
  }

  async update(req, res) {
    const {
      nome,
      site,
      telefone,
      cep,
      nmro_predio,
      abertura,
      fechamento,
      id_dono,
      id_pizzaria,
    } = req.body;
    const text = `UPDATE pizzaria.pizzaria
    SET nome = $1, site = $2, telefone = $3, cep = $4, nmro_predio = $5, abertura = TO_TIMESTAMP($6, 'HH24:MI'), fechamento = TO_TIMESTAMP($7, 'HH24:MI'), id_dono = $8
    WHERE id_pizzaria = $9 RETURNING *`;
    const values = [
      nome,
      site,
      telefone,
      cep,
      nmro_predio,
      abertura,
      fechamento,
      id_dono,
      id_pizzaria,
    ];

    try {
      const result = await client.query(text, values);
      return res.json({ result: result.rows });
    } catch (err) {
      console.log(err.stack);
      return res.json({ error: 'error' });
    }
  }

  async destroy(req, res) {
    const { id_pizzaria } = req.body;

    const text = `DELETE FROM pizzaria.pizzaria WHERE id_pizzaria = $1 RETURNING *`;
    const values = [id_pizzaria];

    try {
      const result = await client.query(text, values);
      return res.json({ result: result.rows });
    } catch (err) {
      console.log(err.stack);
      return res.json({ error: 'error' });
    }
  }
}

export default new PizzariaController();
