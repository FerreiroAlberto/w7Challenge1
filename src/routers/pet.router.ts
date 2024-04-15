import { Router as router } from 'express';
import { PetController } from '../controllers/pet.controller.js';
import createDebug from 'debug';

const debug = createDebug('W7:articles:router');

export class PetsRouter {
  router = router();
  constructor(private readonly controller: PetController) {
    debug('Instantiated pet router');
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
