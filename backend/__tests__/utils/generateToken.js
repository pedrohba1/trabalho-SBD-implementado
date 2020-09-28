import request from 'supertest';
import factory from './factories';
import app from '../../src/app';

export default async function generateToken() {
  const user = await factory.attrs('User');

  const { email, password } = user.account;

  const response = await request(app)
    .post('/sessions')
    .send({ email, password });

  return response.body.token;
}
