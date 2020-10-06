import { Client } from 'pg';

const connectionString = 'postgres://see:trabalho@localhost:5433/see';
const client = new Client({
  connectionString,
});
client.connect();

export default client;
