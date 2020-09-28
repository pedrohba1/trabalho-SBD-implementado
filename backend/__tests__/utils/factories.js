import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../../src/app/models/User';
import Provider from '../../src/app/models/Provider';

factory.define('User', User, {
  account: {
    name: 'Peter',
    email: 'user@gmail.com',
    password: '123456',
  },
  location: {
    address: 'rua do beira',
    position: {
      type: 'Point',
      coordinates: [10.333843231201172, 44.79633268628585],
    },
  },
});

factory.define('Provider', Provider, {
  name: `tonio's pizzaria`,
  logo_id: 1,
  location: {
    address: 'avenue in parma something',
    number: 2469,
    state: 'Italy',
    position: {
      type: 'Point',
      coordinates: [10.320281982421875, 44.79815986183056],
    },
  },
});

export default factory;
