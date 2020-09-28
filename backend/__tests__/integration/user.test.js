import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import User from '../../src/app/models/User';
import Location from '../../src/app/models/Location';

import factory from '../utils/factories';

describe('User', () => {
  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.body).toHaveProperty('id');
  });

  it('should encrypt user password when new user is created', async () => {
    const user = await factory.attrs('User');
    user.account.email = 'user2@gmail.com';

    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.body).toHaveProperty('password_hash');

    const { password_hash } = response.body;

    const compareHash = await bcrypt.compare('123456', password_hash);
    expect(compareHash).toBe(true);
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should be able to auth in the login', async () => {
    const user = await factory.attrs('User');

    const { email, password } = user.account;

    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.body).toHaveProperty('token');
  });

  it('should set city_id to the city the user is inside', async () => {
    const user = await User.findOne({
      where: { name: 'Peter' },
      include: [
        {
          model: Location,
          as: 'location',
          attributes: ['city_id'],
        },
      ],
    });

    expect(user.location).toHaveProperty('city_id');
  });
});
