import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { PetsRouter } from './routers/pet.router.js';
import { PetRepository } from './repositories/pet.repo.js';
import { PetController } from './controllers/pet.controller.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';

const debug = createDebug('W7:app');

export const createApp = () => {
  const app = express();
  debug('Starting app');

  const petRepo = new PetRepository();
  const petController = new PetController(petRepo);
  const petRouter = new PetsRouter(petController);
  const errorMiddleware = new ErrorsMiddleware();

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));
  app.use('/pets', petRouter.router);
  app.use(errorMiddleware.handle.bind(errorMiddleware));

  return app;
};
