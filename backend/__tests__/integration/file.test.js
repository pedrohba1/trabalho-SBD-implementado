import request from 'supertest';
import { resolve } from 'path';
import app from '../../src/app';

import generateToken from '../utils/generateToken';

let token;

describe('File', () => {
  it('should auth first', async () => {
    token = await generateToken();
  });

  it('should be able to save a file', async () => {
    const response = await request(app)
      .post('/files')
      .set('Authorization', `bearer ${token}`)
      .attach('file', resolve(__dirname, '..', 'utils', 'cat.jpg'));

    expect(response.body).toHaveProperty('id');
  });
});
