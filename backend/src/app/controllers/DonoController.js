import client from '../../database'


class DonoController {

  async store (req, res){

    const {cpf, nome, linkedin, cep, data_nascimento, nmro_residencia} = req.body;

    const text = `INSERT INTO pizzaria.dono_de_negocio(id_dono, cpf, nome, linkedin, cep, data_nascimento, nmro_residencia) 
                  VALUES(DEFAULT, $1, $2, $3, $4, TO_DATE($5, 'DD/MM/YYYY'), $6) RETURNING *`
    const values = [cpf, nome, linkedin, cep, data_nascimento , nmro_residencia]

    try {
      const result = await client.query(text, values)
      console.log(result.rows[0])
      return res.json({ result: result.rows[0]});

      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack)
      return res.json({ error: 'error'});
    }
  }

  async index (req,res){
    const text = `SELECT * FROM pizzaria.dono_de_negocio`

    try {
      const result = await client.query(text)
      return res.json({ result: result.rows });

    } catch (err) {
      console.log(err.stack)
      return res.json({ error: 'error'});
    }
  }

  async update(req,res){
    const {id_dono, cpf, nome, linkedin, cep, data_nascimento, nmro_residencia} = req.body;

    const text = `UPDATE pizzaria.dono_de_negocio SET cpf = $2, nome = $3, linkedin = $4, cep = $5, data_nascimento = TO_DATE($6, 'DD/MM/YYYY'), nmro_residencia = $7 WHERE id_dono = $1 RETURNING *`
    const values = [id_dono, cpf, nome, linkedin, cep, data_nascimento , nmro_residencia]

    try {
      const result = await client.query(text, values)
      return res.json({ result: result.rows });

    } catch (err) {
      console.log(err.stack)
      return res.json({ error: 'error'});
    }
  }

  async destroy(req,res){
    const {id_dono} = req.body;

    const text = `DELETE FROM pizzaria.dono_de_negocio WHERE id_dono = $1 RETURNING *`
    const values = [id_dono]

    try {
      const result = await client.query(text, values)
      return res.json({ result: result.rows });

    } catch (err) {
      console.log(err.stack)
      return res.json({ error: 'error'});
    }
  }

}


export default new DonoController();
