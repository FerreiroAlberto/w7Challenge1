import { Router as router } from 'express';
import createDebug from 'debug';
import { MovieController } from '../controllers/movie.controller.js';

const debug = createDebug('W7:movies:router');

export class MoviesRouter {
  router = router();
  constructor(private readonly controller: MovieController) {
    debug('Instantiated movie router');
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
