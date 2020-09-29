import client from '../../database'


class DonoController {

  async store (req, res){

    const {cpf, nome, linkedin, cep, data_nascimento, nmro_residencia} = req.body;

    const text = `INSERT INTO pizzaria.dono_de_negocio(cpf, nome,linkedin, cep, data_nascimento, nmro_residencia) VALUES($1, $2, $3, $4, TO_DATE('17/12/2015', $5), $6) RETURNING *`
    const values = [cpf,nome, linkedin, cep, data_nascimento , nmro_residencia]

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
    const {cpf, nome, linkedin, cep, data_nascimento, nmro_residencia} = req.body;

    const text = `UPDATE pizzaria.dono_de_negocio SET nome = $2, linkedin = $3, cep = $4, data_nascimento = TO_DATE('17/12/2015', $5), nmro_residencia = $6 WHERE cpf = $1`
    const values = [cpf, nome, linkedin, cep, data_nascimento , nmro_residencia]

    try {
      const result = await client.query(text, values)
      return res.json({ result: result.rows });

    } catch (err) {
      console.log(err.stack)
      return res.json({ error: 'error'});
    }
  }

  async destroy(req,res){
    const {cpf} = req.body;

    const text = `DELETE FROM pizzaria.dono_de_negocio WHERE cpf = $1`
    const values = [cpf]

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
