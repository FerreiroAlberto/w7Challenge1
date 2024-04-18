import { Router as router } from 'express';
import { PetController } from '../controllers/pet.controller.js';
import createDebug from 'debug';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('W7:pets:router');

export class PetsRouter {
  router = router();
  constructor(
    private readonly controller: PetController,
    readonly authInterceptor: AuthInterceptor
  ) {
    debug('Instantiated pet router');
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
