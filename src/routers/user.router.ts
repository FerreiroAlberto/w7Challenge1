import { Router as router } from 'express';
import createDebug from 'debug';
import { UserController } from '../controllers/user.controller';

const debug = createDebug('W7:users:router');

export class UsersRouter {
  router = router();
  constructor(private readonly controller: UserController) {
    debug('Instantiated users router');
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
