import request from 'supertest';
import app from '../../src/app';
import factory from '../utils/factories';
import Provider from '../../src/app/models/Provider';
import Location from '../../src/app/models/Location';

import generateToken from '../utils/generateToken';

let token;

describe('Product', () => {
  it('should auth first', async () => {
    token = await generateToken();
  });

  it('should be able to register a provider', async () => {
    const provider = await factory.attrs('Provider');

    const response = await request(app)
      .post('/providers')
      .set('Authorization', `bearer ${token}`)
      .send(provider);

    expect(response.body).toHaveProperty('id');
  });

  it('should assign a city to the provider', async () => {
    const provider = await Provider.findOne({
      where: { name: `tonio's pizzaria` },
      include: [
        {
          model: Location,
          as: 'location',
          attributes: ['city_id'],
        },
      ],
    });

    expect(provider.location).toHaveProperty('city_id');
  });
});
