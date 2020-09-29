import { Router } from 'express';


import UserController from './app/controllers/UserController';
import PizzaController from './app/controllers/PizzaController';
import DonoController from './app/controllers/DonoController';
import PizzariaController from './app/controllers/PizzariaController';
const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/pizzas', PizzaController.index);
routes.post('/pizzas', PizzaController.store);

routes.post('/dono', DonoController.store);
routes.get('/dono', DonoController.index);
routes.put('/dono', DonoController.update);
routes.delete('/dono', DonoController.destroy);

routes.post('/pizzaria', PizzariaController.store);
routes.get('/pizzaria', PizzariaController.index);
routes.put('/pizzaria', PizzariaController.update);
routes.delete('/pizzaria', PizzariaController.destroy);

export default routes;
