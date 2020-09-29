import client from '../../database'


class PizzariaController {

  async store (req, res) {

    const {nome, site, telefone, cep, nmro_predio, abertura, fechamento, cpf_dono} = req.body;

    const text = `INSERT INTO pizzaria.dono_de_negocio(id, nome, site, telefone, cep, nmro_predio, abertura, abertura, fechamento, cpf_dono) 
                    VALUES(null, $1, $2, $3, $4, $5, TO_TIME('12:00:00', $6), TO_TIME('00:00:00', $7), $8) RETURNING *`
    const values = [nome,  site, telefone, cep, nmro_predio, abertura, fechamento, cpf_dono]

    try {
      const result = await client.query(text, values)
      console.log(result.rows[0])
      return res.json({ result: result.rows[0]});

    } catch (err) {
      console.log(err.stack)
      return res.json({ error: 'error'});
    }
  }
}

export default new PizzariaController();
