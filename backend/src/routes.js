import { Router } from 'express';


import UserController from './app/controllers/UserController';
import PizzaController from './app/controllers/PizzaController';
import DonoController from './app/controllers/DonoController';
const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/pizzas', PizzaController.index);
routes.post('/pizzas', PizzaController.store);

routes.post('/dono', DonoController.store);

export default routes;
